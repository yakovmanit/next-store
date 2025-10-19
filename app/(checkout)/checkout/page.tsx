'use client'

import React from 'react';
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm
} from "@/shared/components/shared";
import {useCart} from "@/shared/hooks";

export default function CheckoutPage() {
  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem
  } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  }

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        {/* Left part */}
        <div className="flex flex-col gap-10 flex-1 mb-20">

          <CheckoutCart
            items={items}
            onClickCountButton={onClickCountButton}
            removeCartItem={removeCartItem}
          />

          <CheckoutPersonalForm />

          <CheckoutAddressForm />
        </div>

        {/* Right part */}
        <CheckoutSidebar totalAmount={totalAmount}/>
      </div>
    </Container>
  );
};
