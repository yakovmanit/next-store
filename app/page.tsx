import {Container, TopBar, Title, Filters} from "@/components/shared";
import {ProductsGroupList} from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
        <Title size={"lg"} text={'All products'} className="font-semibold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-15">

          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="flex flex-const gap-16 mb-16">
              <ProductsGroupList title="Coffee blend" items={[
                {
                  id: 1,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 500 }],
                },
                {
                  id: 2,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 3,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 600 }],
                },
                {
                  id: 4,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 5,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
              ]} />
            </div>
            <div className="flex flex-const gap-16 mb-10">
              <ProductsGroupList title="Coffee monosort" items={[
                {
                  id: 6,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 7,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 8,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 9,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 10,
                  name: 'Colombia coffee',
                  imageUrl: 'https://www.elitecoffee.od.ua/wp-content/uploads/2023/05/SUMMER-1-KG.png',
                  price: 550,
                  items: [{ price: 550 }],
                },
              ]} />
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}
