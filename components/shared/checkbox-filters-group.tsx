'use client';

import React, {useState} from 'react';
import {
  FilterCheckbox,
  FilterCheckboxProps
} from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  selectedIds?: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
  {
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Search...',
    loading,
    className,
    onClickCheckbox,
    selectedIds,
    name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const list =  showAll ? items : defaultItems?.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {
          [...new Array(limit)].map((_, i) => (
            <Skeleton key={i} className="h-6 mb-4"></Skeleton>
          ))
        }
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {
        showAll && (
          <div className="mb-5">
            <Input
              onChange={onChangeSearchInput}
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
            />
          </div>
        )
      }

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list
          .filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item?.endAdornment}
            checked={selectedIds?.has(item.value) || false}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Hide' : '+ Show all'}
          </button>
        </div>
      )}
    </div>
  );
};
