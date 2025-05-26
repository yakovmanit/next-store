"use client"

import React, {useEffect, useRef} from 'react';
import {Title} from "@/components/shared/";
import {ProductCard} from "@/components/shared/product-card";
import {cn} from "@/lib/utils";
import { useIntersection} from "react-use";
import {useCategoryStore} from "@/store/category";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, listClassName, categoryId, className }) => {
  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(intersectionRef as React.RefObject<HTMLDivElement>, {
    threshold: 0.4,
  });

  const setActiveCategoryId = useCategoryStore(state => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      // console.log(title, categoryId);
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
