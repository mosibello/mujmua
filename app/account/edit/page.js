"use client";
import React, { useState, useEffect } from "react";
import AuthCard from "@/components/ui/AuthCard";
import Spinner from "@/components/ui/Spinner";
import Form from "@/components/ui/Form";
import Bounded from "@/components/wrappers/Bounded";
import Container from "@/components/wrappers/Container";
import { SCHEMA__ProfileForm } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { createClient } from "@/supabase/client";
import { useAppContext } from "@/context/AppWrapper";
import { loginPageUrl } from "@/lib/constants";

const EditAccount = () => {
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
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAppContext();
  const { user_metadata: userMetaData } = user?.data?.user || ``;

  const supabase = createClient();

  const onSubmit = async (formData) => {
    setPayloadPosting(true);
    setFormMessage(null);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: formData,
      });
      if (error) {
        throw new Error(`Error: ${error.message}`);
      }
      setPayloadPosting(false);
      setFormMessage({
        type: `success`,
        message: `Profile successfully updated.`,
      });
    } catch (error) {
      console.log(error);
      setPayloadPosting(false);
      setFormMessage({
        type: `error`,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (user && userMetaData) {
      reset({
        first_name: userMetaData?.first_name,
        last_name: userMetaData?.last_name,
        short_bio: userMetaData?.short_bio,
        city: userMetaData?.city,
        country: userMetaData?.country,
        website: userMetaData?.website,
      });
      setIsLoading(false);
    } else {
      if (typeof window !== "undefined") {
        window.location.href = loginPageUrl;
      }
    }
  }, []);

  return (
    <>
      <Bounded className="b__auth__variant01 b__size-lg u__background-light">
        <Container>
          <div className="max-w-[800px] mx-auto">
            <AuthCard heading={`Update your information`} description={null}>
              {isLoading && <Spinner />}
              {!isLoading && (
                <Form
                  isValid={isValid}
                  formFields={SCHEMA__ProfileForm}
                  register={register}
                  errors={errors}
                  control={control}
                  buttonTitle={`Save`}
                  onSubmit={handleSubmit(onSubmit)}
                  payloadPosting={payloadPosting}
                  formMessage={formMessage}
                />
              )}
            </AuthCard>
          </div>
        </Container>
      </Bounded>
    </>
  );
};

export default EditAccount;
