'use client'

import React from 'react';
import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock
} from "@/shared/components/shared";
import {Input, Textarea} from "@/shared/components/ui";
import {useCart} from "@/shared/hooks";
import {getCartItemDetails} from "@/shared/lib";
import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";



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
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-4">
              {
                items.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    imageUrl={item.imageUrl}
                    details={
                      getCartItemDetails(
                        item.ingredients,
                        item.coffeeType as CoffeeType,
                        item.coffeeSize as CoffeeSize,
                      )
                    }
                    disabled={item.disabled}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
                  />
                ))
              }
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Your personal data">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Name" />
              <Input name="lastName" className="text-base" placeholder="Surneme" />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Phone number" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Your address">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Enter your address" />
              <Textarea
                className="text-base"
                placeholder="Your comment for order"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </div>

        {/* Right part */}
        <CheckoutSidebar totalAmount={totalAmount}/>
      </div>
    </Container>
  );
};
