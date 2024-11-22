import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { rootURL } from "../../lib/constants";

const GalleryGrid = ({ media }) => {
  return (
    <>
      {media && media.length > 0 && (
        <div className="mx-auto">
          <div className="row">
            {media.map((elem, i) => (
              <div key={i} className="col-lg-4">
                <div className="c__gallery-grid-card relative mb-4 break-inside-avoid-column u__cursor-pointer">
                  <Image
                    src={elem.source}
                    alt={elem.title}
                    width="1000"
                    height="1000"
                    className="w-full h-[300px] object-cover brounded-lg"
                  />
                  <div className="absolute inset-0 rounded-lg transition-opacity duration-200 bg-black/40 opacity-0 hover:opacity-100">
                    <div className="c__gallery-grid-card__content-wrapper absolute bottom-0 left-0 right-0 p-4">
                      <div className="row">
                        <div className="col-6">
                          <Link
                            href={`${rootURL}/@${elem?.author?.username_handle}`}
                            className="u__inherited-anchor c__gallery-grid-card__avatar-anchor"
                          >
                            <div className="c__gallery-grid-card__avatar-row">
                              <div className="c__gallery-grid-card__avatar-row__col">
                                <UserAvatar
                                  initials={elem?.author?.first_name[0]}
                                />
                              </div>
                              <div className="c__gallery-grid-card__avatar-row__col">
                                <span className="text-white u__p u__f-700 truncate">
                                  {elem?.author?.first_name}{" "}
                                  {elem?.author?.last_name}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                        {/* <div className="col-6">
                        <div className="text-right">
                          <Button theme={`primary`} title="View" />
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div
                className={`columns-1 gap-4 sm:columns-3 ${
                  media.length > 9 && `xl:columns-3`
                }`}
              >
              </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
