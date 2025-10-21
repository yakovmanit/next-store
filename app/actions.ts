'use server';

import {CheckoutFormValues} from "@/shared/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {cookies} from "next/headers";
import {createPayment, sendEmail} from "@/shared/lib";
import {PayOrderTemplate} from "@/shared/components/shared";

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
      'Next Pizza / Pay for order #' + order.id,
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