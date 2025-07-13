import React from 'react';
import {cn} from "@/shared/lib/utils";
import {Container, SearchInput} from "@/shared/components/shared/";
import Link from "next/link";
import {Button} from "@/shared/components/ui";
import {ArrowRight, ShoppingCart, User} from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">

        {/* Left part */}
        <div>
          <div>
            <Link href={"/"} className="text-2xl uppercase font-bold">Next Store</Link>
            <p className="text-sm text-gray-400 leading-3">descr about the shop</p>
          </div>
        </div>

        {/* Search */}
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Right part */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <User />
            Log in
          </Button>

          <div>
            <Button className="group relative">
              <b>520 ₴</b>
              <span className="h-full w-[1px] bg-white/30 mx-1"></span>
              <div className="relative flex items-center gap-1">
                <b className="group-hover:opacity-0 transition duration-300">3</b>
                <ShoppingCart size={16} className="group-hover:opacity-0 transition duration-300" />
                <ArrowRight size={20} className="absolute top-0 left-0 opacity-0 transition duration-300 translate-x-0 group-hover:opacity-100 group-hover:translate-x-2" />
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
