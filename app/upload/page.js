import Bounded from "@/components/wrappers/Bounded";

import FileUploader from "@/components/ui/FileUploader";

const UploadPage = () => {
  return (
    <Bounded className="b__size-md b__size-fit-to-screen">
      <FileUploader />
    </Bounded>
  );
};

export default UploadPage;
