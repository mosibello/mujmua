import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Button from "@/components/ui/Button";
import FileUploader from "@/components/ui/FileUploader";

const UploadPage = () => {
  return (
    <Bounded className="b__size-md b__size-fit-to-screen">
      <Container>
        <div className="mx-auto text-center max-w-[700px]">
          <Heading className="u__h3">
            Share your photos and videos, and let the world love them.
          </Heading>
        </div>
      </Container>
      <Container className="mt-[2.5rem]">
        <FileUploader />
      </Container>
    </Bounded>
  );
};

export default UploadPage;
