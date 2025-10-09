'use client';

import { ProductWithRelations } from '@/@types/prisma';
import React from 'react';
import toast from 'react-hot-toast';
import { ChooseCoffeeForm } from './choose-coffee-form';
import { ChooseProductForm } from './choose-product-form';
import {useCartStore} from "@/shared/store/cart";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCartStore(store => store.addCartItem);
  const loading = useCartStore(store => store.loading);

  const firstItem = product.items[0];
  const isCoffeeForm = Boolean(firstItem.productType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' added to cart');

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  if (isCoffeeForm) {
    return (
      <ChooseCoffeeForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
