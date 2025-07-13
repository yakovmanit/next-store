"use client"

import React from 'react';
import {Title, RangeSlider, CheckboxFiltersGroup} from "./index";
import { Input } from '../ui';
import {useQueryFilters, useIngredients, useFilters} from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map(item => ({ text: item.name, value: String(item.id) }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  }

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
        selected={filters.productTypes}
        onClickCheckbox={filters.setProductTypes}
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
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
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
            value={String(filters.prices.priceFrom)}
            onChange={e => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={2000}
            placeholder="2000"
            value={String(filters.prices.priceTo)}
            onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 2000,
          ]}
          onValueChange={updatePrices}
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
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />

    </div>
  );
};
