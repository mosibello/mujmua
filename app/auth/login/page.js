"use client";

import Form from "@/components/ui/Form";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";
import { SCHEMA__ContactForm } from "@/lib/schema";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  return (
    <>
      <Container>
        <Bounded className="b__size-lg">
          <div className="text-center">
            <Heading tag="h1" className="u__h1 mb-[1rem]">
              Log in
            </Heading>
          </div>
          <div className="max-w-[500px] mx-auto mt-[2.5rem]">
            <Form
              isValid={isValid}
              formFields={SCHEMA__ContactForm}
              register={register}
              errors={errors}
              control={control}
              //   onSubmit={handleSubmit(onSubmit)}
              //   payloadPosting={payloadPosting}
              //   formMessage={formMessage}
            />
          </div>
        </Bounded>
      </Container>
    </>
  );
};

export default Login;
