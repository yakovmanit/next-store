"use client"

import React, {useState} from 'react';
import {Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup} from "./index";
import { Input } from '../ui';
import {useFilterIngredients} from "@/hooks/useFilterIngredients";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: 0,
    priceTo: 2000
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    })
  };

  const items = ingredients.map(item => ({ text: item.name, value: String(item.id) }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Top checkboxes */}
      <div className="flex flex-col gap-2">
        <FilterCheckbox name="Topname" text="Top" value="1" />
        <FilterCheckbox name="Newname" text="New" value="1" />
      </div>

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
          max={1000}
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
        selectedIds={selectedIds}
      />

    </div>
  );
};
