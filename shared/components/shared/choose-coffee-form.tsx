"use client"

import React from 'react';
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import { Button } from '../ui';
import {GroupVariants, ProductImage, IngredientItem} from "@/shared/components/shared";
import {CoffeeSize, CoffeeType, coffeeTypes} from "@/shared/constants/coffee";
import {Ingredient, ProductItem} from "@prisma/client";
import { useCoffeeOptions } from '@/shared/hooks';
import {getCoffeeDetails} from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChooseCoffeeForm: React.FC<Props> = (
  {
    imageUrl,
    name,
    ingredients,
    items,
    onSubmit,
    className,
  }
) => {
  const { size, type, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient } = useCoffeeOptions(items);

  const { totalPrice, textDetails } = getCoffeeDetails(type, size, items, ingredients, selectedIngredients);

  const hangleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  }

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} className='font-extrabold mb-1' />

        <p className='text-grey-400'>{textDetails}</p>

        <GroupVariants
          items={availableSizes}
          value={String(size)}
          onClick={value => setSize(Number(value) as CoffeeSize)}
        />

        <GroupVariants
          items={coffeeTypes}
          value={String(type)}
          onClick={value => setType(Number(value) as CoffeeType)}
        />

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={hangleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};