import React from 'react';
import {cn} from "@/lib/utils";

interface Props {
  className?: string;
}

const cats = ['Pizzas', 'Combo', 'Cocktails', 'Coffee', 'Fizzy drinks', 'Desserts', 'Donuts'];
const activeIndex: number = 0;

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
        cats.map((cat, index) => (
          <a className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
            activeIndex === index && 'bg-white shadow-2xl text-primary'
          )} key={index}>
            <button className="cursor-pointer">{cat}</button>
          </a>
        ))
      }
    </div>
  );
};
