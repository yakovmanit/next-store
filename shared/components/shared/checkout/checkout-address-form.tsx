import React from 'react';
import {WhiteBlock} from "@/shared/components/shared";
import {Input, Textarea} from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Your address" className={className}>
      <div className="flex flex-col gap-5">
        <Input name="firstName" className="text-base" placeholder="Enter your address" />
        <Textarea
          className="text-base"
          placeholder="Your comment for order"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
