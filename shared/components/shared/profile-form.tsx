'use client';

import {User} from "@prisma/client";
import {FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, FormRegisterValues } from "./modals/auth-modal/forms/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Container, FormInput, Title} from "@/shared/components/shared";
import toast from "react-hot-toast";
import {signOut} from "next-auth/react";
import {Button} from "@/shared/components/ui";
import React from "react";
import {updateUserInfo} from "@/app/actions";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Data updated 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Data updating failed', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = async () => {
    await signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10">
      <Title text={`Personal data | #${data.id}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full name" required />

          <FormInput type="password" name="password" label="New password" required />
          <FormInput type="password" name="confirmPassword" label="Confirm password" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Save changes
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Sign Out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
