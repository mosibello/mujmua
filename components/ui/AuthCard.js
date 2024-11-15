import React from "react";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

const AuthCard = ({ children }) => {
  return (
    <div className="c__auth-card">
      <div className="c__auth-card__wrapper">
        {/* <div className="c__auth-card__branding-wrapper">
          <span className="b__header__header01__logo u__font-family-heading u__f-900 u__heading-color--primary u__h5 u__letter-spacing--tight">
            Mujmua
          </span>
        </div> */}
        <div className="c__auth-card__content-wrapper mb-[2rem]">
          <Heading tag="h1" className="u__h4 mb-[1rem]">
            Sign in
          </Heading>
          <Paragraph>
            Create an account if you do not have an existing one by entering
            your email address below
          </Paragraph>
        </div>
        <div className="c__auth-card__form-wrapper">{children}</div>
      </div>
    </div>
  );
};

export default AuthCard;
