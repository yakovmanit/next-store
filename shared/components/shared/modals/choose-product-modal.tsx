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
import {coffeeSizes} from "@/shared/constants/coffee";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isCoffeeForm = Boolean(product.items[0].productType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>

        {
          isCoffeeForm ? (
            <ChooseCoffeeForm imageUrl={product.imageUrl} name={product.name} ingredients={[
              {
                id: 1,
                name: 'Drip Ethiopia Chelbesa',
                price: 40,
                imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
              },
              {
                id: 2,
                name: 'Drip monteblanco',
                price: 50,
                imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
              },
              {
                id: 3,
                name: 'Drip La Luisa',
                price: 60,
                imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
              },
              {
                id: 4,
                name: 'Drip Ethiopia Chelbesa 2',
                price: 40,
                imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
              },
              {
                id: 5,
                name: 'Drip monteblanco 2',
                price: 50,
                imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
              },
              {
                id: 6,
                name: 'Drip La Luisa 2',
                price: 60,
                imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
              },
            ]} />
          ) : (
            <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
          )
        }

        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
};
