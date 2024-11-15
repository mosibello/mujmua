import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";

export default function Home() {
  return (
    <>
      <Container>
        <Bounded className="b__size-md">
          <div className="text-center">
            <h1>Homepage</h1>
          </div>
        </Bounded>
      </Container>
    </>
  );
}
