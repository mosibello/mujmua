import { notFound } from "next/navigation";
import {
  GET__getPhotoById,
  GET__getUser,
  GET__getUserLikeStatusForPhoto,
  GET__getPhotos,
} from "@/services/queries-ssr";
import { GET__getPhotos as GET__getPhotosCSR } from "@/services/queries-csr";
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

  const categories = photo?.categories;
  const authorId = photo?.author?.id;
  const relatedPhotosRange = {
    start: 0,
    end: 8,
  };

  const relatedPhotosData = await GET__getPhotos(
    relatedPhotosRange.start,
    relatedPhotosRange.end,
    {},
    null,
    photoId,
    { authorId, categories }
  );
  const {
    photos: relatedPhotosInitialMedia,
    count: relatedPhotosTotalCount,
    error: relatedPhotosError,
  } = relatedPhotosData;

  // console.log(relatedPhotosData);

  const pageData = {
    photo,
    userId,
    userLikeStatus,
  };

  return (
    <>
      <PhotoViewport data={pageData} />
      {relatedPhotosInitialMedia && relatedPhotosInitialMedia.length > 0 && (
        <>
          <Container>
            <hr />
          </Container>
          <Container className="mt-0 mt-[2rem] pb-[2rem]">
            <Heading className="u__h3">More like this</Heading>
            <div className="mt-4 pt-5">
              <GalleryGridWrapper
                initialMedia={relatedPhotosInitialMedia}
                initialMediaRange={relatedPhotosRange}
                totalCount={relatedPhotosTotalCount}
                fetchNext={GET__getPhotosCSR}
                fetchNextParams={[null, null, photoId, null]}
              />
            </div>
          </Container>
        </>
      )}
    </>
  );
}
