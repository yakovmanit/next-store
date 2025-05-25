import React from 'react';
import {Title, FilterCheckbox, RangeSlider} from "./index";
import { Input } from '../ui';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

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
    </div>
  );
};
