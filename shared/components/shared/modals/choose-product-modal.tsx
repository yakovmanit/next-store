"use client"

import React from 'react';
import {Dialog} from "@/shared/components/ui";
import {DialogContent, DialogTitle} from "@/shared/components/ui/dialog";
import {cn} from "@/shared/lib/utils";
import {useRouter} from "next/navigation";
import {ChooseProductForm} from "@/shared/components/shared/choose-product-form";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {ProductWithRelations} from "@/@types/prisma";
import {ChooseCoffeeForm} from "@/shared/components/shared/choose-coffee-form";
import {useCartStore} from "@/shared/store/cart";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isCoffeeForm = Boolean(firstItem.productType);

  const addCartItem = useCartStore(store => store.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
  }

  const onAddCoffee = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients,
    });
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>

        {
          isCoffeeForm ? (
            <ChooseCoffeeForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
              onSubmit={onAddCoffee}
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              price={firstItem.price}
              onSubmit={onAddProduct}
            />
          )
        }

        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
};
