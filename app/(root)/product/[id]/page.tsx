import React from 'react';
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, Title} from "@/shared/components/shared";
import {ProductImage} from "@/shared/components/shared/product-image";
import {GroupVariants} from "@/shared/components/shared/group-variants";

export default async function ProductModalPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <Container  className="flex my-10">
        <div className="flex flex-1">
          <ProductImage imageUrl={product.imageUrl} className="w-full max-w-[20vw] mx-auto" />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-3" />

          <p className="text-gray-400 mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias distinctio doloribus eligendi libero natus officia possimus quibusdam sed suscipit ullam. Aut est explicabo impedit iure, molestiae quibusdam reiciendis reprehenderit saepe!</p>

          <GroupVariants
            value="2"
            items={[
              {
                name: "filter",
                value: "1",
              },
              {
                name: "omni",
                value: "2",
              },
              {
                name: "espresso",
                value: "3",
                disabled: true,
              },
            ]} />
        </div>
      </Container>
    </div>
  );
};
