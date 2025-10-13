import React from 'react';
import {CheckoutItemDetails, Container, Title, WhiteBlock} from "@/shared/components/shared";
import {Button, Input, Textarea} from "@/shared/components/ui";
import {ArrowRight} from "lucide-react";

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        {/* Left part */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            Cart
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
        <div className="w-85">
          <WhiteBlock className='p-6 sticky top-4'>
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total amount:</span>
              <span className="h-11 text-[34px] font-extrabold">1234</span>
            </div>

            <CheckoutItemDetails title="Price for products:" value={'1000'} />

            <CheckoutItemDetails title="Taxes:" value={'200'} />

            <CheckoutItemDetails title="Delivery:" value={'34'} />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Buy
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
};
