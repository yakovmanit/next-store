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
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isCoffeeForm = Boolean(firstItem.productType);

  const addCartItem = useCartStore(store => store.addCartItem);
  const loading = useCartStore(store => store.loading);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      // if (isCoffeeForm) {
      //   await addCartItem({
      //     productItemId,
      //     ingredients,
      //   });
      // } else {
      //   await addCartItem({
      //     productItemId: firstItem.id,
      //   });
      // }

      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success('Product added to the cart')

      router.back();
    } catch (err) {
      toast.error('Product not added to the cart');
      console.error(err);
    }
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
              onSubmit={() => onSubmit()}
              loading={loading}
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              price={firstItem.price}
              onSubmit={() => onSubmit()}
              loading={loading}
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
