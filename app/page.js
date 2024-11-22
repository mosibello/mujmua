import React from "react";
import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";
import GalleryGridWrapper from "@/components/ui/GalleryGridWrapper";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Button from "@/components/ui/Button";
import { GET__getPhotos } from "@/services/queries-ssr";

export default async function Home() {
  const initialMediaRange = {
    start: 0,
    end: 7,
  };
  const {
    photos: initialMedia,
    count: totalCount,
    error,
  } = await GET__getPhotos(initialMediaRange.start, initialMediaRange.end);

  console.log(totalCount);

  return (
    <>
      <Bounded className="b__size-lg b__hero_variant01 relative">
        <div className="c__absolute-image">
          <Image
            fill={true}
            src={`https://23219927.fs1.hubspotusercontent-na1.net/hubfs/23219927/pexels-aadil-2884865%20(1)%20(1).jpg`}
            alt={``}
            sizes="100%"
          />
        </div>
        <div className="c__image-tint"></div>
        <Container className="relative">
          <div className="u__text-inverted">
            <div className="max-w-[700px]">
              <Heading tag="h1" className="u__h1 mb-4">
                The best free stock photos and royalty free images.
              </Heading>
              <Paragraph className="u__h5">
                Powered by creators in South Asia.
              </Paragraph>
            </div>
            <div className="mt-4 pt-3">
              <Button title={`Explore More`} />
            </div>
          </div>
        </Container>
      </Bounded>
      <Bounded className="b__size-md">
        <Container>
          <Heading tag="h2" className="u__h4">
            Free Stock Photos
          </Heading>
        </Container>
        {initialMedia && (
          <Container className="mt-4 pt-5">
            <GalleryGridWrapper
              initialMedia={initialMedia}
              initialMediaRange={initialMediaRange}
              initialFilters={null}
              totalCount={totalCount}
            />
          </Container>
        )}
      </Bounded>
    </>
  );
}
