'use client'

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from "next/link";
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import {CartDrawerItem} from "@/shared/components/shared/cart-drawer-item";
import {getCartItemDetails} from "@/shared/lib";
import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";
import {Title} from "@/shared/components/shared";
import {useCart} from "@/shared/hooks";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem
  } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        {
          totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                <span className="font-bold">{items?.length}</span> products
              </SheetTitle>
            </SheetHeader>
          )
        }

        {
          !totalAmount && (
            <Title size="md" text="Cart is empty :(" className="flex flex-col items-center justify-center w-72 mx-auto h-full" />
          )
        }

        {/* Items */}
        {
          totalAmount > 0 && (
            <>
              <div className='-mx-6 mt-5 overflow-auto flex-1'>
                {
                  items.map(item => (
                    <div
                      key={item.id}
                      className='mb-2'
                    >
                      <CartDrawerItem
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        details={
                          getCartItemDetails(
                              item.ingredients,
                              item.coffeeType as CoffeeType,
                              item.coffeeSize as CoffeeSize,
                            )
                          }
                        disabled={item.disabled}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)}
                      />
                    </div>
                  ))
                }
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total amount:
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Submit
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )
        }
      </SheetContent>
    </Sheet>
  );
};
