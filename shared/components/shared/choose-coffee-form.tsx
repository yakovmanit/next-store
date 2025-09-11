"use client"

import React, {useEffect, useState} from 'react';
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import { Button } from '../ui';
import {GroupVariants, ProductImage, IngredientItem} from "@/shared/components/shared";
import {CoffeeSize, coffeeSizes, CoffeeType, coffeeTypes} from "@/shared/constants/coffee";
import {useSet} from "react-use";
import {Ingredient, ProductItem} from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChooseCoffeeForm: React.FC<Props> = (
  {
    imageUrl,
    name,
    ingredients,
    items,
    onClickAddCart,
    className,
  }
) => {
  // console.log('items', items);

  const [size, setSize] = useState<CoffeeSize>(20);
  const [type, setType] = useState<CoffeeType>(1);

  const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

  const textDetails = 'lorem ipsum dolor sit amet consectetur adipisicing elit.';

  const filteredProductsByType = items.filter(item => item.productType === type);
  const availableProductSizes = coffeeSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredProductsByType.some(product => Number(product.size) === Number(item.value)),
  }));

  useEffect(() => {
    const isAvailableSize = availableProductSizes?.find(item => Number(item.value) === size && !item.disabled);
    const firstAvailableSize = availableProductSizes?.find(item => !item.disabled);

    if (!isAvailableSize && firstAvailableSize) {
      setSize(Number(firstAvailableSize.value) as CoffeeSize);
    }
  }, [type]);

  console.log({ items, filteredProductsByType, availableProductSizes });

  const hangleClickAdd = () => {
    onClickAddCart?.();

    console.log({
      size,
      type,
      ingredients: selectedIngredients,
    });
  }

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} className='font-extrabold mb-1' />

        <p className='text-grey-400'>{textDetails}</p>

        <GroupVariants
          items={availableProductSizes}
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
          Add to cart for {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};