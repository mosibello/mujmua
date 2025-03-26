import { notFound } from "next/navigation";
import {
  GET__getPhotoById,
  GET__getUser,
  GET__getUserLikeStatusForPhoto,
} from "@/services/queries-ssr";
import PhotoViewport from "@/components/templates/photo/PhotoViewport";
import Heading from "@/components/ui/Heading";
import Container from "@/components/wrappers/Container";

export default async function PhotoPage({ params }) {
  params = await params;
  let { slug } = params;
  const photoId = slug.split("-").pop();
  const data = await GET__getPhotoById(photoId);
  const { data: userData, error } = await GET__getUser();
  const userId = userData?.user?.id;
  let userLikeStatus = null;
  if (userId) {
    userLikeStatus = await GET__getUserLikeStatusForPhoto(userId, photoId);
  }
  let photo;
  if (!data.photo) {
    return notFound();
  }
  photo = data.photo;
  console.log(userLikeStatus);
  const pageData = {
    photo,
    userId,
    userLikeStatus,
  };

  return (
    <>
      <PhotoViewport data={pageData} />
      {/* <Container>
        <hr />
      </Container>
      <Container className="mt-0 mt-[2rem] pb-[2rem]">
        <Heading className="u__h3">More like this</Heading>
      </Container> */}
    </>
  );
}
