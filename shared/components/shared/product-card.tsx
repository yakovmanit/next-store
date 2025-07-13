import React from 'react';
import Link from "next/link";
import {Title} from "@/shared/components/shared";
import {Button} from "@/shared/components/ui";
import {Plus} from "lucide-react";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px] object-cover" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      </Link>


      <p className="text-sm text-gray-400">
        Text 1, Text 2, Text 3, Text 4, Text 5, Text 6
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          <b>{price} ₴</b>
        </span>

        <Button variant="secondary" className="text-base font-bold">
          <Plus size={20} className="mr-1" />
          Add to cart
        </Button>
      </div>

    </div>
  );
};
