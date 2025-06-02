"use client"

import React, {useEffect, useState} from 'react';
import {Title, RangeSlider, CheckboxFiltersGroup} from "./index";
import { Input } from '../ui';
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {useSet} from "react-use";
import qs from 'qs';
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps{
  productTypes: string;
  sizes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const router = useRouter();
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients(
    searchParams.get('ingredients')?.split(',')
  );
  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [sizes, { toggle: toggleSizes } ] = useSet(new Set<string>(
    searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
  ));
  const [productTypes, { toggle: toggleProductTypes } ] = useSet(new Set<string>(
    searchParams.has('productTypes') ? searchParams.get('productTypes')?.split(',') : []
  ));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    })
  };

  const items = ingredients.map(item => ({ text: item.name, value: String(item.id) }));

  useEffect(() => {
    const filters = {
      ...prices,
      productTypes: Array.from(productTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    }

    const query = qs.stringify(filters, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });

  }, [prices, productTypes, sizes, selectedIngredients]);

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Top checkboxes */}
      <CheckboxFiltersGroup
        title={"Roast"}
        name="sizes"
        className="mb-5"
        items={[
          { text: 'Filter', value: '1' },
          { text: 'Espresso', value: '2' },
        ]}
        selected={productTypes}
        onClickCheckbox={toggleProductTypes}
      />

      <CheckboxFiltersGroup
        title={"Sizes"}
        name="sizes"
        className="mb-5"
        items={[
          { text: 'size 35', value: '35' },
          { text: 'size 45', value: '45' },
          { text: 'size 65', value: '65' },
        ]}
        selected={sizes}
        onClickCheckbox={toggleSizes}
      />

      {/* Range slider */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Range slider:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={2000}
            value={String(prices.priceFrom)}
            onChange={e => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={2000}
            placeholder="2000"
            value={String(prices.priceTo)}
            onChange={e => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[
            prices.priceFrom || 0,
            prices.priceTo || 2000,
          ]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>

      {/* Bottom checkboxes */}
      <CheckboxFiltersGroup
        title={"Includes"}
        className="mt-5"
        limit={4}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />

    </div>
  );
};
