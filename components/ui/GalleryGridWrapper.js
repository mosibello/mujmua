"use client";
import React, { useState, useEffect } from "react";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Button from "@/components/ui/Button";
import { GET__getPhotos } from "@/lib/data-service-client";

const GalleryGridWrapper = ({ initialMedia, initialMediaRange }) => {
  const rangeDifference = initialMediaRange.end - initialMediaRange.start;
  const [media, setMedia] = useState(initialMedia);
  const [mediaRange, setMediaRange] = useState({
    start: media.length + 1,
    end: initialMediaRange.end + (media.length + 1),
  });
  const [photosIsLoading, setPhotosIsLoading] = useState(false);
  const handleLoadPhotos = async () => {
    setPhotosIsLoading(true);
    const { photos, error } = await GET__getPhotos(
      false,
      mediaRange.start,
      mediaRange.end
    );
    if (photos) {
      setMedia((prevState) => [...prevState, ...photos]);
      setMediaRange((prevState) => ({
        start: (prevState.start += rangeDifference),
        end: (prevState.end += rangeDifference),
      }));
      setPhotosIsLoading(false);
    }
    console.log(mediaRange);
  };
  return (
    <>
      <GalleryGrid media={media} />
      <div className="text-center mt-[3rem]">
        <Button
          title="Load More"
          actionable
          isLoading={photosIsLoading}
          onClick={() => handleLoadPhotos()}
          theme={`primary`}
        />
      </div>
    </>
  );
};

export default GalleryGridWrapper;
