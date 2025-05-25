import React from 'react';
import {Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup} from "./index";
import { Input } from '../ui';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Top checkboxes */}
      <div className="flex flex-col gap-2">
        <FilterCheckbox text="Top" value="1" />
        <FilterCheckbox text="New" value="1" />
      </div>

      {/* Range slider */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Range slider:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[0, 1000]}
        />
      </div>

      {/* Bottom checkboxes */}
      <CheckboxFiltersGroup
        title={"Includes"}
        className="mt-5"
        limit={6}
        defaultItems={[
          { text: 'text 1', value: '1' },
          { text: 'text 2', value: '2' },
          { text: 'text 3', value: '3' },
          { text: 'text 4', value: '4' },
          { text: 'text 5', value: '5' },
          { text: 'text 6', value: '6' },
          { text: 'text 7', value: '7' },
          { text: 'text 8', value: '8' },
        ]}
        items={[
          { text: 'text 1', value: '1' },
          { text: 'text 2', value: '2' },
          { text: 'text 3', value: '3' },
          { text: 'text 4', value: '4' },
          { text: 'text 5', value: '5' },
          { text: 'text 6', value: '6' },
          { text: 'text 7', value: '7' },
          { text: 'text 8', value: '8' },
        ]}
      />

    </div>
  );
};
