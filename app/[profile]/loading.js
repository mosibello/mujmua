import Container from "@/components/wrappers/Container";
import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <Container className="flex flex-col justify-center items-center h-[100px] w-full mt-[3rem]">
      <Spinner />
    </Container>
  );
}
