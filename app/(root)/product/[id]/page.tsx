import React from 'react';
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductForm} from "@/shared/components/shared";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <Container  className="flex my-10">
        <ProductForm product={product} />
      </Container>
    </div>
  );
};
