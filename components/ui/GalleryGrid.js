import React from "react";
import Image from "next/image";

const GalleryGrid = ({ media }) => {
  return (
    <>
      {media && media.length > 0 && (
        <div className="mx-auto">
          <div
            className={`columns-1 gap-4 sm:columns-2 ${
              media.length > 9 && `xl:columns-3`
            }`}
          >
            {media.map((elem, i) => (
              <div
                key={i}
                className="relative mb-4 break-inside-avoid u__cursor-pointer"
              >
                <Image
                  src={elem.source}
                  alt={elem.title}
                  width="1000"
                  height="1000"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 rounded-lg transition-opacity duration-200 bg-black/40 opacity-0 hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm font-medium">
                      {elem.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
