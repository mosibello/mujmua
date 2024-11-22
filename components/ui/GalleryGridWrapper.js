"use client";
import React, { useState, useEffect } from "react";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Button from "@/components/ui/Button";
import { GET__getPhotos } from "@/services/queries-csr";

const GalleryGridWrapper = ({
  initialMedia,
  initialMediaRange,
  totalCount,
  initialFilters,
}) => {
  const rangeDifference = initialMediaRange.end - initialMediaRange.start + 1;
  const [buttonClickCounter, setButtonClickCounter] = useState(0);
  const [media, setMedia] = useState(initialMedia);
  const [mediaRange, setMediaRange] = useState({
    start: media.length,
    end: initialMediaRange.end + media.length,
  });
  const [photosIsLoading, setPhotosIsLoading] = useState(false);
  const [totalRowsRendered, setTotalRowsRendered] = useState(rangeDifference);

  const handleLoadPhotos = async () => {
    setPhotosIsLoading(true);
    const { photos, error } = await GET__getPhotos(
      mediaRange.start,
      mediaRange.end,
      initialFilters
    );
    if (photos) {
      setMedia((prevState) => [...prevState, ...photos]);
      setMediaRange((prevState) => ({
        start: prevState.start + rangeDifference,
        end: prevState.end + rangeDifference,
      }));
      setButtonClickCounter((prevState) => prevState + 1);
      setTotalRowsRendered((prevState) => prevState + rangeDifference);
      setPhotosIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(`initial media range:`, initialMediaRange);
    console.log(`next media range:`, mediaRange);
    console.log(`total rows rendered:`, totalRowsRendered);
    // console.log(`media:`, media);
  }, [buttonClickCounter]);

  return (
    <>
      <GalleryGrid media={media} />
      <div className="text-center mt-[3rem]">
        {totalRowsRendered >= totalCount ? (
          ``
        ) : (
          <Button
            title="Load More"
            actionable
            isLoading={photosIsLoading}
            onClick={() => handleLoadPhotos()}
            theme={`primary`}
          />
        )}
      </div>
    </>
  );
};

export default GalleryGridWrapper;
