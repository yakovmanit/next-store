import React from 'react';
import {cn} from "@/shared/lib/utils";

import * as CartItem from './cart-item-details';
import {CartItemProps} from "@/shared/components/shared/cart-item-details/cart-item-details.types";
import {Trash2Icon} from "lucide-react";
import {CountButton} from "./cart-item-details";

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = (
  {
    imageUrl,
    name,
    price,
    quantity,
    details,
    disabled,
    onClickCountButton,
    onClickRemove,
    className,
  }) => {
  return (
    <div className={cn('flex bg-white gap-5 p-4', {
      'opacity-50 pointer-events-none': disabled,
    }, className)}>
      <CartItem.Image src={imageUrl}/>

      <div className='flex-1'>
        <CartItem.Info details={details} name={name} />

        <hr className='my-3'/>

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />

            <Trash2Icon onClick={onClickRemove} className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
