import Bounded from "@/components/wrappers/Bounded";
import FileUploader from "@/components/ui/FileUploader";
import Gate from "@/components/misc/Gate";

const UploadPage = () => {
  return (
    <>
      <Gate />
      <Bounded className="b__size-fit-to-screen pt-[4rem] pb-[20rem]">
        <FileUploader />
      </Bounded>
    </>
  );
};

export default UploadPage;
