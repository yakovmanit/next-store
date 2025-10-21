import React from 'react';
import {cn} from "@/shared/lib/utils";
import {WhiteBlock} from "@/shared/components/shared/white-block";
import {CheckoutItemDetails} from "@/shared/components/shared/checkout-item-details";
import {Button, Skeleton} from "@/shared/components/ui";
import {ArrowRight} from "lucide-react";

const VAT = 10;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = (
  {
    className,
    totalAmount,
    loading
  }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn('w-85 p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total amount:</span>
        {
          loading ? (
            <Skeleton className="h-11 w-48" />
          ) : (
            <span className="h-11 text-[34px] font-extrabold">{totalPrice}</span>
          )
        }
      </div>

      <CheckoutItemDetails
        title="Price for products:"
        value={loading
          ? <Skeleton className="h-8 w-20" />
          : `${totalAmount}`}
      />

      <CheckoutItemDetails
        title="Taxes:"
        value={loading
          ? <Skeleton className="h-8 w-20" />
          : `${vatPrice} ₴`}
      />

      <CheckoutItemDetails
        title="Delivery:"
        value={loading
          ? <Skeleton className="h-8 w-20" />
          : `${DELIVERY_PRICE} ₴`}
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Buy
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
