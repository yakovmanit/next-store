'use client'

import React, {useEffect} from 'react';
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
import {useCartStore} from "@/shared/store/cart";
import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({children, className }) => {
  const totalAmount = useCartStore(state => state.totalAmount);
  const fetchCartItems = useCartStore(state => state.fetchCartItems);
  const items = useCartStore(state => state.items);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            <span className="font-bold">{items.length}</span> products
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
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
                    item.coffeeSize && item.coffeeType
                      ? getCartItemDetails(item.coffeeType as CoffeeType, item.coffeeSize as CoffeeSize, item.ingredients)
                      : ''
                  }
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

            <Link href="/cart">
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

      </SheetContent>
    </Sheet>
  );
};
