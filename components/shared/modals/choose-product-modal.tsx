"use client"

import React from 'react';
import {Dialog} from "@/components/ui";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Product} from "@prisma/client";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

interface Props {
  product: Product;
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
        <DialogTitle>
          {product.name}
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
