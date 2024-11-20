// Parent component
const parentComp = () => {
  const handlePostPhotos = async (e) => {};
  return (
    <>
      {readyToTagfiles && uploadedFiles.length && (
        <>
          {uploadedFiles.map((elem, index) => {
            return (
              <FileEditorCard className={`mb-[2rem]`} file={elem} key={index} />
            );
          })}
          <StickyBottomDrawer>
            <div className="text-center">
              <Button
                title="Submit Your Content"
                actionable
                isLoading={payloadPosting}
                onClick={() => handlePostPhotos()}
                theme={`primary`}
              />
            </div>
          </StickyBottomDrawer>
        </>
      )}
    </>
  );
};

// Child Component
const FileEditorCard = () => {
  const onSubmit = async (formData) => {
    setPayloadPosting(true);
    setFormMessage(null);
    try {
      // SUPA BASE LOGIC HERE
      if (error) {
        throw new Error(`Error: ${error.message}`);
      }
      setPayloadPosting(false);
      reset();
      setFormMessage({
        type: `success`,
        message: `Please verify your email address by clicking on the link we sent you on your email address.`,
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
  return (
    <div className="c__file-editor-card__form-wrapper">
      <Form
        isValid={isValid}
        formFields={SCHEMA__ImageEditorForm}
        register={register}
        errors={errors}
        control={control}
        buttonTitle={null}
        onSubmit={handleSubmit(onSubmit)}
        payloadPosting={payloadPosting}
        formMessage={formMessage}
        disableSubmissionOnEnter={true}
      />
    </div>
  );
};

// Form component
const Form = ({
  formFields,
  register,
  errors,
  isValid,
  onSubmit,
  payloadPosting,
  formMessage,
  buttonTitle = "Get Started",
  disableSubmissionOnEnter,
}) => {
  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="c__form">
      {formFields && formFields.constructor === Array ? (
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          onKeyDown={disableSubmissionOnEnter ? (e) => checkKeyDown(e) : null}
        >
          <div className="c__form__fields-wrapper">
            {formFields.map((elem) => {
              const {
                name,
                label,
                placeholder,
                type,
                width,
                required,
                pattern,
                defaultValue,
              } = elem;
              return (
                <div
                  key={name}
                  className={`c__form__fieldset c__form__fieldset--${width} ${
                    type === "hidden" ? `c__form__fieldset--hidden` : ``
                  }`}
                >
                  <div className="c__form__field">
                    {label && (
                      <label className="c__form__label" htmlFor={name}>
                        {label}
                      </label>
                    )}
                    <div className="c__form__input-wrapper">
                      {type === "textarea" ? (
                        <textarea
                          className={`c__form__input ${
                            errors[elem.name] ? `c__form__input--error` : ``
                          }`}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          defaultValue={defaultValue ? defaultValue : null}
                          {...register(name, {
                            required: required ? required.message : required,
                            pattern: pattern ? pattern : null,
                          })}
                        ></textarea>
                      ) : (
                        <input
                          className={`c__form__input ${
                            errors[elem.name] ? `c__form__input--error` : ``
                          }`}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          defaultValue={defaultValue ? defaultValue : null}
                          {...register(name, {
                            required: required ? required.message : required,
                            pattern: pattern ? pattern : null,
                          })}
                        />
                      )}
                    </div>
                  </div>
                  {errors[elem.name] && (
                    <div id={`${elem.name}-error`} className="c__form__error">
                      <span>{errors[elem.name].message}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {buttonTitle && (
            <div className="c__form__button-wrapper">
              <Button
                actionable
                title={buttonTitle}
                type="submit"
                isLoading={payloadPosting}
                // isDisabled={!isValid}
              />
            </div>
          )}
          {formMessage && (
            <div
              className={`c__form__message c__form__message--${formMessage.type}`}
            >
              {parse(formMessage.message)}
            </div>
          )}
        </form>
      ) : (
        <div className={`c__form__message c__form__message--error`}>
          Error rendering the form. <br />
          Please check form fields are set up corectly
        </div>
      )}
    </div>
  );
};

export default Form;
