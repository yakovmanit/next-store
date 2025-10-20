import React from 'react';
import {
  FormInput,
  FormTextarea,
  WhiteBlock,
} from "@/shared/components/shared";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Your address" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Enter your address" />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Your comment for order"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
