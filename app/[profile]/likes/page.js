import { notFound } from "next/navigation";
import { GET__getProfileByHandle } from "@/services/queries-ssr";
import GalleryGridWrapper from "@/components/ui/GalleryGridWrapper";
import { GET__getLibraryLikes } from "@/services/queries-ssr";
import { GET__getLibraryLikes as GET__getLibraryLikesCSR } from "@/services/queries-csr";

import { Alert, AlertDescription } from "@/components/ui/shadcn/alert";
import Paragraph from "@/components/ui/Paragraph";

export default async function ProfilePage__Likes({ params }) {
  params = await params;
  let { profile } = params;
  const starting = profile.slice(0, 3);
  if (starting !== "%40") {
    return notFound();
  }
  profile = profile.split("%40")[1];
  const data = await GET__getProfileByHandle(profile);
  if (!data.profile) {
    return notFound();
  }

  const profileId = data?.profile?.id;

  const initialMediaRange = {
    start: 0,
    end: 11,
  };

  const {
    photos: initialMedia,
    count: totalCount,
    error,
  } = await GET__getLibraryLikes(0, 8, profileId);

  const fetchNextParams = [profileId];

  return (
    <>
      {initialMedia && initialMedia.length ? (
        <GalleryGridWrapper
          fetchNext={GET__getLibraryLikesCSR}
          fetchNextParams={fetchNextParams}
          initialMedia={initialMedia}
          initialMediaRange={initialMediaRange}
          totalCount={totalCount}
        />
      ) : (
        <div className="max-w-[600px] ml-auto mr-auto text-center mt-[2rem] h-[400px]">
          <Alert>
            <AlertDescription>
              <Paragraph disableParse className="u__subtitle !mb-[0]">
                {data?.profile?.first_name} {data?.profile?.last_name} hasn't
                liked anything yet.
              </Paragraph>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
