import {Container, TopBar, Title, Filters} from "@/components/shared";

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
            <div className="flex flex-const gap-16">
              Products list
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}
