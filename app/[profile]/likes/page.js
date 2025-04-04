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
import { GET__getLibraryLikes } from "@/services/queries-ssr";
import { GET__getLibraryLikes as GET__getLibraryLikesCSR } from "@/services/queries-csr";

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

  const initialMediaRange = {
    start: 0,
    end: 8,
  };

  const {
    photos: initialMedia,
    count: totalCount,
    error,
  } = await GET__getLibraryLikes(0, 8, userId);

  console.log(initialMedia);

  const fetchNextParams = [userId];

  return (
    <>
      {initialMedia && (
        <GalleryGridWrapper
          fetchNext={GET__getLibraryLikesCSR}
          fetchNextParams={fetchNextParams}
          initialMedia={initialMedia}
          initialMediaRange={initialMediaRange}
          totalCount={totalCount}
        />
      )}
    </>
  );
}
