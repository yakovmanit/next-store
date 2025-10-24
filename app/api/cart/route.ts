import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import crypto from "crypto";
import {findOrCreateCart} from "@/shared/lib/find-or-create-cart";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    // TODO: remove to dynamic data when auth ready
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart)
  } catch (err) {
    console.log('[CART_GET] Server error', err);
    return NextResponse.json({ message: 'Failed to get cart' }, { status: 500 });
  }

}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    // Check the same ingredients
    const cartIngredientIds = findCartItem?.ingredients.map(ing => ing.id).sort() || [];
    const requestIngredientIds = (data.ingredients || []).sort();

    const isSameIngredients =
      findCartItem &&
      cartIngredientIds.length === requestIngredientIds.length &&
      cartIngredientIds.every((id, index) => id === requestIngredientIds[index]);

    if (findCartItem && isSameIngredients) {
      // Add +1 to an existing product quantity
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      // Create new product with different ingredients
      const createData: any = {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
      };

      if (data.ingredients && data.ingredients.length > 0) {
        createData.ingredients = { connect: data.ingredients.map(id => ({ id })) };
      }

      await prisma.cartItem.create({
        data: createData,
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const res = NextResponse.json(updatedUserCart);

    res.cookies.set('cartToken', token);

    return res;

  } catch (err) {
    console.log('[CART_POST] Server error', err);

    return NextResponse.json({ message: 'Cart not created'}, { status: 500 });
  }
}