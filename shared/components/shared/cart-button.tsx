'use client'

import React from 'react';
import {cn} from "@/shared/lib/utils";
import { Button } from '../ui';
import {ArrowRight, ShoppingCart} from "lucide-react";
import {CartDrawer} from "@/shared/components/shared/";
import {useCartStore} from "@/shared/store/cart";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore(store => store.totalAmount);
  const loading = useCartStore(store => store.loading);
  const items = useCartStore(store => store.items);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn("group relative min-w-25", className)}
      >
        <b>{totalAmount} ₴</b>
        <span className="h-full w-[1px] bg-white/30 mx-1"></span>
        <div className="relative flex items-center gap-1">
          <b className="group-hover:opacity-0 transition duration-300">{items.length}</b>
          <ShoppingCart size={16} className="group-hover:opacity-0 transition duration-300" />
          <ArrowRight size={20} className="absolute top-0 left-0 opacity-0 transition duration-300 translate-x-0 group-hover:opacity-100 group-hover:translate-x-2" />
        </div>
      </Button>
    </CartDrawer>
  );
};
