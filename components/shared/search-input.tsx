"use client";

import { cn } from '@/lib/utils';
import React, {useRef, useState} from 'react';
import {Search} from "lucide-react";
import {useClickAway, useDebounce} from "react-use";
import Link from 'next/link';
import {Api} from "@/services/api-client";
import {Product} from "@prisma/client";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useClickAway(ref, () => {
    setFocused(false);
  })

  useDebounce(async () => {
    try {
      const response = await Api.products.search(searchQuery);

      setProducts(response);

    } catch (err) {
      console.error(err);
    }
  }, 200, [searchQuery]);

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  }

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Search a product..."
          onFocus={() => setFocused(true)}
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />

        {
          products.length > 0 && (
            <div
              className={cn(
                'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                focused && 'visible opacity-100 top-12',
              )}>
              {
                products.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClickItem}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                  >
                    <img
                      className="rounded-sm h-8 w-8 object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <span>{product.name}</span>
                  </Link>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  );
};
