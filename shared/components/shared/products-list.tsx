import {Container, TopBar, Filters} from "@/shared/components/shared";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list";
import {Suspense} from "react";
import {findCoffee, GetSearchParams} from "@/shared/lib/find-coffee";

export async function ProductsList({ params }: { params: GetSearchParams }) {
  const categories = await findCoffee(params);

  return (
    <>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-15">

          {/* Filters */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16 mb-20">
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
                ))
              }
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}