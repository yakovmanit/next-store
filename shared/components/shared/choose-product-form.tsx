"use client"

import React from 'react';
import {cn} from "@/shared/lib/utils";
import {ProductImage} from "@/shared/components/shared/product-image";
import {Title} from "@/shared/components/shared/title";
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = (
  {
    imageUrl,
    name,
    onClickAdd,
    className,
  }
) => {
  const textDetails = 'lorem ipsum dolor sit amet consectetur adipisicing elit.';
  const totalPrice = 199;

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} className='font-extrabold mb-1' />

        <p className='text-grey-400'>{textDetails}</p>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};