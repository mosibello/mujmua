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
import { GET__getPhotos } from "@/services/queries-ssr";
import { GET__getPhotos as GET__getPhotosCSR } from "@/services/queries-csr";

export default async function ProfilePageLayout({ params, children }) {
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

  return (
    <>
      <Bounded className="b__size-md b__profile__header">
        <Container>
          <div className="mx-auto text-center max-w-[700px]">
            <div className="mb-[1.5rem]">
              <UserAvatar initials={data?.profile?.first_name[0]} />
            </div>
            <div className="mb-[1.5rem]">
              <Heading tag="h1" className="u__h1">
                {data?.profile?.first_name} {data?.profile?.last_name}
              </Heading>
            </div>
            <div>
              <Button
                title={`Follow`}
                theme={`secondary`}
                className={``}
                destination={`#`}
              />
            </div>
          </div>
        </Container>
      </Bounded>
      <Bounded className="pb-[4rem] b__profile__body">{children}</Bounded>
    </>
  );
}
