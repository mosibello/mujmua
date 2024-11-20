"use client";
import React, { useState, forwardRef } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import Form from "./Form";
import { SCHEMA__ImageEditorForm } from "@/lib/schema";

const FileEditorCard = forwardRef(({ file, className, authorId }, ref) => {
  const methods = useForm();
  const [formMessage, setFormMessage] = useState(null);
  const [payloadPosting, setPayloadPosting] = useState(false);

  React.useImperativeHandle(ref, () => ({
    getValues: methods.getValues, // Expose getValues to parent
    getFormDataWithCustomValues: () => {
      const formValues = methods.getValues();
      return {
        ...formValues,
        source: file?.src,
        author: authorId,
        status: `public`,
      };
    },
  }));

  const onSubmit = async (formData) => {
    try {
      console.log("Submitting Form Data for file:", file, formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className={`c__file-editor-card ${className ? className : ``}`}>
        <div className="c__file-editor-card__content-wrapper">
          <div className="row">
            <div className="col-lg-6 c__file-editor-card__col--left">
              <div className="c__file-editor-card__image-wrapper">
                <Image
                  src={file?.src}
                  alt={file?.name}
                  width={500}
                  height={500}
                  //   fill={true}
                  className="c__file-editor-card__image"
                />
              </div>
            </div>
            <div className="col-lg-6 c__file-editor-card__col--right">
              <div className="c__file-editor-card__form-wrapper">
                <FormProvider {...methods}>
                  <Form
                    isValid={methods.formState.isValid}
                    formFields={SCHEMA__ImageEditorForm}
                    register={methods.register}
                    errors={methods.formState.errors}
                    control={methods.control}
                    buttonTitle={null}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    payloadPosting={payloadPosting}
                    formMessage={formMessage}
                    disableSubmissionOnEnter={true}
                  />
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default FileEditorCard;