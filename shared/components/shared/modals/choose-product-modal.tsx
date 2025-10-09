"use client"

import React from 'react';
import {Dialog} from "@/shared/components/ui";
import {DialogContent, DialogTitle} from "@/shared/components/ui/dialog";
import {cn} from "@/shared/lib/utils";
import {useRouter} from "next/navigation";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {ProductWithRelations} from "@/@types/prisma";
import {useCartStore} from "@/shared/store/cart";
import toast from "react-hot-toast";
import {ProductForm} from "@/shared/components/shared";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>

        <ProductForm product={product} onSubmit={() => router.back()} />

        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
};
