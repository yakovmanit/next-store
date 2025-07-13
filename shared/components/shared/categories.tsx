"use client"

import React from 'react';
import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/store/category";
import {Category} from "@prisma/client";

interface Props {
  className?: string;
  items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore(state => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
        items.map(({ id, name }, index) => (
          <a className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
            categoryActiveId === id && 'bg-white shadow-2xl text-primary'
          )}
             href={`/#${name}`}
             key={index}
          >
            <button className="cursor-pointer">{name}</button>
          </a>
        ))
      }
    </div>
  );
};
