import { notFound } from "next/navigation";
import { GET__getProfileByHandle } from "@/services/queries-ssr";
import Container from "@/components/wrappers/Container";
import Bounded from "@/components/wrappers/Bounded";
import Heading from "@/components/ui/Heading";
import UserAvatar from "@/components/ui/UserAvatar";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { rootURL } from "@/lib/constants";
import GalleryGridWrapper from "@/components/ui/GalleryGridWrapper";
import { GET__getUserLikes } from "@/services/queries-ssr";
import { GET__getPhotos as GET__getPhotosCSR } from "@/services/queries-csr";

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

  const userId = data?.profile?.id;
  console.log(userId);

  const userLikesData = await GET__getUserLikes(userId);

  console.log(userLikesData);

  return (
    <>
      {/* {initialMedia && (
            <GalleryGridWrapper
              fetchNext={GET__getPhotosCSR}
              fetchNextParams={fetchNextParams}
              initialMedia={initialMedia}
              initialMediaRange={initialMediaRange}
              totalCount={totalCount}
            />
          )} */}
    </>
  );
}
