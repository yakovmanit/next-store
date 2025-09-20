'use client'

import React from 'react';
import {
  Sheet,
  SheetClose,
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

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            <span className="font-bold">3</span> products
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className='-mx-6 mt-5 overflow-auto flex-1'>
          <div className='mb-2'>
            <CartDrawerItem
              id={1}
              imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BiJcJYemwOvf8pqscrulgbi_j9WicFTIgA&s'}
              name={'Coffee'}
              price={415}
              quantity={1}
              details={getCartItemDetails(2, 30, [{ name: 'Test drip coffee' }, { name: 'Test drip coffee 2' }])}
            />
          </div>
          <div className='mb-2'>
            <CartDrawerItem
              id={1}
              imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BiJcJYemwOvf8pqscrulgbi_j9WicFTIgA&s'}
              name={'Coffee'}
              price={415}
              quantity={1}
              details={getCartItemDetails(2, 30, [{ name: 'Test drip coffee' }, { name: 'Test drip coffee 2' }])}
            />
          </div>
          <div className='mb-2'>
            <CartDrawerItem
              id={1}
              imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BiJcJYemwOvf8pqscrulgbi_j9WicFTIgA&s'}
              name={'Coffee'}
              price={415}
              quantity={1}
              details={getCartItemDetails(2, 30, [{ name: 'Test drip coffee' }, { name: 'Test drip coffee 2' }])}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total amount:
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">399 ₴</span>
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
