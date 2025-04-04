import { notFound } from "next/navigation";
import { GET__getProfileByHandle } from "@/services/queries-ssr";
import Container from "@/components/wrappers/Container";
import Bounded from "@/components/wrappers/Bounded";
import Heading from "@/components/ui/Heading";
import UserAvatar from "@/components/ui/UserAvatar";
import Button from "@/components/ui/Button";
import ProfileNavigation from "@/components/templates/profile/ProfileNavigation";
import GalleryGridWrapper from "@/components/ui/GalleryGridWrapper";
import { GET__getPhotos, GET__getUser } from "@/services/queries-ssr";
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

  const profileId = data?.profile?.id;

  const { data: userData, error: userError } = await GET__getUser();
  const userId = userData?.user?.id;

  return (
    <>
      <Bounded
        data-profile-id={profileId}
        className="b__size-md b__profile__header"
      >
        <Container>
          <div className="mx-auto text-center max-w-[700px]">
            <div className="mb-[1.5rem]">
              <UserAvatar initials={data?.profile?.first_name[0]} />
            </div>
            <div
              className={`${
                userId !== profileId ? `mb-[1.5rem]` : `mb-[0rem]`
              }`}
            >
              <Heading tag="h1" className="u__h1">
                {data?.profile?.first_name} {data?.profile?.last_name}
              </Heading>
            </div>
            {userId !== profileId && (
              <div>
                <Button
                  title={`Follow`}
                  theme={`secondary`}
                  className={``}
                  destination={`#`}
                />
              </div>
            )}
          </div>
        </Container>
      </Bounded>
      <Bounded className="pb-[4rem] b__profile__body">
        <ProfileNavigation profile={profile} />
        <Container className="mt-[2.75rem]">{children}</Container>
      </Bounded>
    </>
  );
}
