"use client";
import React, { useState } from "react";
import AuthCard from "@/components/ui/AuthCard";
import Form from "@/components/ui/Form";
import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";
import { SCHEMA__AuthForm } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { createClient } from "@/supabase/client";

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

  const [formMessage, setFormMessage] = useState(null);
  const [payloadPosting, setPayloadPosting] = useState(false);

  const supabase = createClient();

  const onSubmit = async (formData) => {
    setPayloadPosting(true);
    setFormMessage(null);
    try {
      let { data, error } = await supabase.auth.signInWithOtp(formData);
      setPayloadPosting(false);
      reset();
      setFormMessage({
        type: `success`,
        message: `Please continue logging in by clicking on the magic link we sent you on your email address.`,
      });
    } catch (err) {
      console.log(err);
      setPayloadPosting(false);
      setFormMessage({
        type: `error`,
        message: `Oops, something went wrong. Please try again later`,
      });
    }
  };

  return (
    <>
      <Bounded className="b__auth__variant01 b__size-lg u__background-light">
        <Container>
          <div className="max-w-[500px] mx-auto">
            <AuthCard>
              <Form
                isValid={isValid}
                formFields={SCHEMA__AuthForm}
                register={register}
                errors={errors}
                control={control}
                buttonTitle={`Get Magic Link`}
                onSubmit={handleSubmit(onSubmit)}
                payloadPosting={payloadPosting}
                formMessage={formMessage}
              />
            </AuthCard>
          </div>
        </Container>
      </Bounded>
    </>
  );
};

export default Login;
