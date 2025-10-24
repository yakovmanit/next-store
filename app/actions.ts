'use server';

import {CheckoutFormValues} from "@/shared/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {cookies} from "next/headers";
import {createPayment, sendEmail} from "@/shared/lib";
import {PayOrderTemplate, VerificationUserTemplate} from "@/shared/components/shared";
import {getUserSession} from "@/shared/lib/get-user-session";
import {hashSync} from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found')
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found')
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }

    const order = await prisma.order.create({
      data: {
        userId: 1,
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const monoPayment = await createPayment(
      order.totalAmount,
      order.id,
    );

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: monoPayment.invoiceId,
      },
    })

    await sendEmail(
      data.email,
      'Pay for order #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: monoPayment.pageUrl,
      }) as React.ReactNode,
    );

    return monoPayment.pageUrl;

  } catch(error) {
    console.log('[CreateOrder] Server error', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('No permission to update user info');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });

  } catch (error) {
    console.log('[UpdateUserInfo] Server error', error);
    throw new Error('User info updating error');
  }
}

export async function registerUser(body: Prisma.UserCreateInput){
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Your verification Code',
      VerificationUserTemplate({
        code,
      }) as React.ReactNode,
    );

  } catch (error) {
    console.log('Error [REGISTER_USER]', error);
    throw error;
  }
}