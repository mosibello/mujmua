const handleUploads = async (e) => {
  e.preventDefault();
  if (!files?.length) return;

  setPayloadPosting(true);
  setUploadingIntent(uploadingIntent + 1);

  const uploadedFileNames = new Set();

  const compressImage = (file) =>
    new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6, // Adjust the quality as needed
        success: (compressedFile) => resolve(compressedFile),
        error: (err) => reject(err),
      });
    });

  const uploadProcess = async () => {
    try {
      const uploadPromises = files.map(async (file) => {
        if (uploadedFileNames.has(file.name)) {
          console.log(
            `File ${file.name} is a duplicate and will not be uploaded.`
          );
          return Promise.resolve();
        }

        uploadedFileNames.add(file.name);

        try {
          setProgresses((prevState) => ({
            ...prevState,
            [file.name]: getRandomNumber(5, 20),
          }));

          let fileToUpload = file;
          try {
            fileToUpload = await compressImage(file);
          } catch (compressionError) {
            console.warn(
              `Compression failed for ${file.name}. Proceeding with original file.`,
              compressionError
            );
          }

          const { data, error } = await POST__uploadFile(
            fileToUpload,
            `images`,
            `${userId}/${slugify(file.name)}-${uuidv4()}`
          );

          if (error) {
            throw new Error(`Upload error: ${error.message}`);
          }

          setUploadedFiles((prevState) => [
            ...prevState,
            {
              name: file.name,
              src: `${supabaseStorageBucketURL}/${data.fullPath}`,
            },
          ]);

          setProgresses((prevState) => ({
            ...prevState,
            [file.name]: 100,
          }));
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          setFormMessage({
            type: `error`,
            message: `Failed to upload ${file.name}: ${error.message}`,
          });
          throw error; // Propagate error to handle in `Promise.all`
        }
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error("One or more uploads failed");
    }
  };

  toast.promise(uploadProcess(), {
    loading: "Uploading images...",
    success: () => {
      setTimeout(() => {
        setReadyToTagfiles(true);
        setPayloadPosting(false);
        setPageContent({
          heading: `Make your photos and videos easy to find and be seen.`,
          description: `Add some keywords that describe your photo and what is in it.`,
        });
      }, 500);
      return `${files.length} image(s) uploaded successfully!`;
    },
    error: () => {
      setPayloadPosting(false);
      return "Some images failed to upload. Please try again.";
    },
  });
};
