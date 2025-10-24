import {Container, ProductsList, Title} from "@/shared/components/shared";
import {Suspense} from "react";
import {GetSearchParams} from "@/shared/lib/find-coffee";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  const params = await searchParams;

  return (
    <>
      <Container className="mt-8">
        <Title size={"lg"} text={'All products'} className="font-semibold" />
      </Container>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList params={params} />
      </Suspense>
    </>
  );
}
