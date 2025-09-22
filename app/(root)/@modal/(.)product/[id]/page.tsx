import {notFound} from "next/navigation";
import {prisma} from "@/prisma/prisma-client";
import {ChooseProductModal} from "@/shared/components/shared";

export default async function ProductModalPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ChooseProductModal product={product} />
    </>
  )
}
