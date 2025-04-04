import Container from "@/components/wrappers/Container";
import Spinner from "@/components/ui/Spinner";
import GalleryGrid from "@/components/loaders/GalleryGrid";

export default function Loading() {
  return (
    <Container className="w-full mt-[3rem]">
      <GalleryGrid />
    </Container>
  );
}
