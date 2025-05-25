import {Container, TopBar, Title} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
        <Title size={"lg"} text={'All products'} className="font-semibold" />
      </Container>
      <TopBar />

      <div className="h-500"></div>
    </>
  );
}
