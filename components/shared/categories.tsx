"use client"

import React from 'react';
import {cn} from "@/lib/utils";
import {useCategoryStore} from "@/store/category";

interface Props {
  className?: string;
}

const cats = [
  { id: 1, name: 'Coffee blend' },
  { id: 2, name: 'Coffee monosort' },
  { id: 3, name: 'Drips' },
  { id: 4, name: 'Sets' },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore(state => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
        cats.map(({ id, name }, index) => (
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
