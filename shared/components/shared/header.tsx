'use client';

import React, {useState} from 'react';
import {cn} from "@/shared/lib/utils";
import {AuthModal, CartButton, Container, ProfileButton, SearchInput} from "@/shared/components/shared/";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Order paid successfully!';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Email varified successfully!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <div className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">

        {/* Left part */}
        <div>
          <div>
            <Link href={"/"} className="text-2xl uppercase font-bold">Next Store</Link>
            <p className="text-sm text-gray-400 leading-3">descr about the shop</p>
          </div>
        </div>

        {/* Search */}
        {
          hasSearch && (
            <div className="mx-10 flex-1">
              <SearchInput />
            </div>
          )
        }

        {/* Right part */}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {
            hasCart && (
              <CartButton />
            )
          }
        </div>
      </Container>
    </div>
  );
};
