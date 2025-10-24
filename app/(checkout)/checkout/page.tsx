'use client'

import React, {useEffect, useState} from 'react';
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm,
} from "@/shared/components/shared";
import {useCart} from "@/shared/hooks";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {Api} from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    loading,
  } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.success('Order creation successful', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }

    } catch (error) {
      console.warn(error);
      setSubmitting(false);

      toast.error('Order creation failed', {
        icon: '❌',
      });
    }
  }

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  }

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left part */}
            <div className="flex flex-col gap-10 flex-1 mb-20">

              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none': ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none': ''} />
            </div>

            {/* Right part */}
            <CheckoutSidebar
              totalAmount={totalAmount}
              loading={loading || submitting}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};
