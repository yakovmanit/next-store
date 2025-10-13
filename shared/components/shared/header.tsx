import React from 'react';
import {cn} from "@/shared/lib/utils";
import {CartButton, Container, SearchInput} from "@/shared/components/shared/";
import Link from "next/link";
import {Button} from "@/shared/components/ui";
import {User} from "lucide-react";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
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
          <Button variant="outline" className="flex items-center gap-2">
            <User />
            Log in
          </Button>

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
