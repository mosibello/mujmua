import React from "react";
import { SimpleImageCard } from "@/components/ui/GalleryGrid.js";

const GalleryGrid = () => {
  return (
    <>
      <div className="row c__gallery-grid__row">
        {Array(6)
          .fill(null)
          .map((elem, index) => {
            return (
              <div key={index} className="col-md-6 col-lg-4">
                <SimpleImageCard data={null} index={index} loading />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GalleryGrid;
