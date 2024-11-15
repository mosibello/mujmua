import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";
import React from "react";

const Signup = () => {
  return (
    <>
      <Container>
        <Bounded className="b__size-lg">
          <div className="text-center">
            <h1 className="u__h1">Sign up</h1>
          </div>
        </Bounded>
      </Container>
    </>
  );
};

export default Signup;
