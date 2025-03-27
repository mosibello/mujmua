import { notFound } from "next/navigation";
import {
  GET__getPhotoById,
  GET__getUser,
  GET__getUserLikeStatusForPhoto,
  GET__getRelatedPhotos,
} from "@/services/queries-ssr";
import { GET__getRelatedPhotos as GET__getRelatedPhotosCSR } from "@/services/queries-csr";
import PhotoViewport from "@/components/templates/photo/PhotoViewport";
import Heading from "@/components/ui/Heading";
import Container from "@/components/wrappers/Container";
import GalleryGridWrapper from "@/components/ui/GalleryGridWrapper";

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

  const categories = photo?.category?.map((elem) => elem.value) || [];
  const authorId = photo?.author?.id;
  const relatedPhotosRange = {
    start: 0,
    end: 7,
  };

  const relatedPhotosData = await GET__getRelatedPhotos(
    photoId,
    categories,
    authorId,
    relatedPhotosRange.start,
    relatedPhotosRange.end
  );

  const {
    photos: relatedPhotosMedia,
    count: relatedPhotosCount,
    error: relatedPhotosError,
  } = relatedPhotosData;

  // console.log(relatedPhotosData);

  // console.log(relatedPhotosMedia, relatedPhotosCount);

  const pageData = {
    photo,
    userId,
    userLikeStatus,
  };

  return (
    <>
      <PhotoViewport data={pageData} />
      {relatedPhotosMedia && relatedPhotosMedia.length > 0 && (
        <>
          <Container>
            <hr />
          </Container>
          <Container className="mt-0 mt-[2rem] pb-[2rem]">
            <Heading className="u__h3">More like this</Heading>
            <div className="mt-4 pt-5">
              <GalleryGridWrapper
                initialMedia={relatedPhotosMedia}
                initialMediaRange={relatedPhotosRange}
                initialFilters={null}
                totalCount={relatedPhotosCount}
              />
            </div>
          </Container>
        </>
      )}
    </>
  );
}
