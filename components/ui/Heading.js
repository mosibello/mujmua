import React from "react";
import parse from "html-react-parser";

const Heading = ({ children, className = "u__h1", tag, disableParse }) => {
  const HeadingTag = tag ? tag : `h2`;
  return (
    <>
      <HeadingTag
        className={`c__heading ${className} u__font-weight-heading mb-[0.5rem] d-block`}
      >
        {disableParse
          ? children
          : children.includes("<span")
          ? parse(children)
          : parse(children)}
      </HeadingTag>
    </>
  );
};

export default Heading;
