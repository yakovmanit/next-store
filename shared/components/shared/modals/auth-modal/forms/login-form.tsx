import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {formLoginSchema, FormLoginValues} from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormInput, Title} from "@/shared/components/shared";
import {Button} from "@/shared/components/ui";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!res?.ok) {
        throw Error();
      }

      onClose?.();

      toast.success('Logged In successfully', {
        icon: '✅'
      });

    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Lig In failed', {
        icon: '❌'
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Log In" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your E-Mail to Log In</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
};
