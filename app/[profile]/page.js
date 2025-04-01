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

export default async function ProfilePage({ params }) {
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

  const authorId = data?.profile?.id;
  console.log(authorId);

  const initialMediaRange = {
    start: 0,
    end: 10,
  };
  const {
    photos: initialMedia,
    count: totalCount,
    error,
  } = await GET__getPhotos(initialMediaRange.start, initialMediaRange.end);

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
      <Bounded className="pt-[1rem] pb-[4rem] b__profile__body">
        <Container>
          <div className="c__tabular-navigation">
            <div className="c__tabular-navigation__row">
              <div className="c__tabular-navigation__col">
                <div className="c__tabular-navigation__item c__tabular-navigation__item--active">
                  <Link className="u__h6" href="/gallery">
                    Gallery
                  </Link>
                </div>
              </div>
              <div className="c__tabular-navigation__col">
                <div className="c__tabular-navigation__item">
                  <Link className="u__h6" href={`${rootURL}/@${profile}/likes`}>
                    Likes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container className="mt-[1.5rem]">
          {initialMedia && (
            <Container className="mt-4 pt-5">
              <GalleryGridWrapper
                fetchNext={GET__getPhotosCSR}
                fetchNextParams={null}
                initialMedia={initialMedia}
                initialMediaRange={initialMediaRange}
                totalCount={totalCount}
              />
            </Container>
          )}
        </Container>
      </Bounded>
    </>
  );
}
