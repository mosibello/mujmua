import Link from "next/link";
import React from "react";

const Button = ({
  title,
  destination,
  target,
  className,
  linkClassName,
  theme = `primary`,
  size = `default`,
  actionable,
  type,
  onClick,
  isLoading,
  isDisabled,
}) => {
  return (
    <>
      {actionable ? (
        <>
          {title && (
            <button
              onClick={onClick}
              type={type}
              className={`c__button c__button--${theme} ${
                className ? className : ``
              } c__button__size--${size} ${
                isLoading ? `c__button--loading` : ``
              } ${isDisabled ? `c__button--disabled` : ``}`}
            >
              <div className="c__button__content">
                <span>{title}</span>
                <figure className="c__button__loading-icon">
                  <svg className="c__spinner" viewBox="0 0 50 50">
                    <circle
                      className="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      strokeWidth="5"
                    ></circle>
                  </svg>
                </figure>
              </div>
            </button>
          )}
        </>
      ) : (
        <>
          {title && (
            <Link
              className={`c__button__anchor-element ${
                linkClassName ? linkClassName : ``
              }`}
              href={destination || "#"}
              target={target || `_self`}
            >
              <span
                className={`c__button c__button--${theme} ${
                  className ? className : ``
                } c__button__size--${size}`}
              >
                <div className="c__button__content">
                  <span>{title}</span>
                </div>
              </span>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Button;
