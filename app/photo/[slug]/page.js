import { notFound } from "next/navigation";
import { GET__getPhotoById } from "@/services/queries-ssr";
import Container from "@/components/wrappers/Container";
import Bounded from "@/components/wrappers/Bounded";
import UserAvatar from "@/components/ui/UserAvatar";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { rootURL } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default async function PhotoPage({ params }) {
  params = await params;
  let { slug } = params;
  const photoId = slug.split("-").pop();
  const data = await GET__getPhotoById(photoId);
  let photo;
  if (!data.photo) {
    return notFound();
  }
  photo = data.photo;
  return (
    <Bounded className="b__size-sm b__photo__viewport">
      <Container>
        <div className="b__photo__viewport__header">
          <div className="row b__photo__viewport__header__row justify-between">
            <div className="col-lg-6">
              <div className="b__photo__viewport__header__avatar-wrapper">
                <div className="c__avatar-row">
                  <div className="c__avatar-row__col">
                    <Link
                      href={`${rootURL}/@${photo?.author?.username_handle}`}
                    >
                      <UserAvatar initials={photo?.author?.first_name[0]} />
                    </Link>
                  </div>
                  <div className="c__avatar-row__col">
                    <Link
                      href={`${rootURL}/@${photo?.author?.username_handle}`}
                      className="u__inherited-anchor c__avatar-row__anchor u__z-index-10 relative"
                    >
                      <span className="u__p u__f-600 truncate">
                        {photo?.author?.first_name} {photo?.author?.last_name}
                      </span>
                    </Link>
                    <br />
                    <span className="u__p u__f-600 u__text-light u__text-light--with-hover cursor-pointer">
                      Follow
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="b__photo__viewport__header__actions-wrapper">
                <div className="b__photo__viewport__header__actions-row">
                  {/* <div className="b__photo__viewport__header__actions-col">
                    <Button
                      title={`Collect`}
                      size={`default`}
                      actionable
                      theme={`ghost-secondary`}
                    />
                  </div> */}
                  <div className="b__photo__viewport__header__actions-col">
                    <Button
                      title={`Like`}
                      size={`default`}
                      actionable
                      theme={`secondary`}
                    />
                  </div>
                  <div className="b__photo__viewport__header__actions-col">
                    <Button
                      title={`Free Download`}
                      size={`default`}
                      className={``}
                      destination={photo.source}
                      target={`_blank`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="b__photo__viewport__main">
          <div className="b__photo__viewport__main__image-wrapper">
            <Image
              src={photo.source}
              alt={photo.title}
              sizes="100%"
              fill={true}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div className="b__photo__viewport__footer"></div>
      </Container>
    </Bounded>
  );
}
