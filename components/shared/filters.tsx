"use client"

import React, {useEffect, useState} from 'react';
import {Title, RangeSlider, CheckboxFiltersGroup} from "./index";
import { Input } from '../ui';
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {useSet} from "react-use";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: 0,
    priceTo: 2000
  });

  const [sizes, { toggle: toggleSizes } ] = useSet(new Set<string>([]));
  const [productTypes, { toggle: toggleProductTypes } ] = useSet(new Set<string>([]));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    })
  };

  const items = ingredients.map(item => ({ text: item.name, value: String(item.id) }));

  useEffect(() => {
    console.log('prises: ', prices, 'productTypes: ', productTypes, 'sizes: ', sizes, 'selectedIngredients: ', selectedIngredients );
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
            placeholder="1000"
            value={String(prices.priceTo)}
            onChange={e => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[
            prices.priceFrom,
            prices.priceTo,
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
