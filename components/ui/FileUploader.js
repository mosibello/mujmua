"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { toast } from "sonner";
import { formatBytes, getRandomNumber } from "../../lib/helpers";
import { Progress } from "@/components/ui/shadcn/progress";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppWrapper";
import { v4 as uuidv4 } from "uuid";
import { POST__uploadFile } from "../../lib/actions";
import slugify from "slugify";
import { supabaseStorageBucketURL } from "@/lib/constants";

const FileUploader = ({
  onValueChange,
  onUpload,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFileCount = 4,
  multiple = false,
  disabled = false,
}) => {
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

  const [files, setFiles] = useState([]);
  const [payloadPosting, setPayloadPosting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [uploadingIntent, setUploadingIntent] = useState(0);
  const [readyToTagfiles, setReadyToTagfiles] = useState(false);

  const { user } = useAppContext();
  const userId = user?.data?.user?.id;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!files?.length) return;

    setPayloadPosting(true);
    setUploadingIntent(uploadingIntent + 1);

    const uploadedFileNames = new Set();

    console.log(files);

    const uploadProcess = async () => {
      try {
        const uploadPromises = files.map((file) => {
          if (uploadedFileNames.has(file.name)) {
            console.log(
              `File ${file.name} is a duplicate and will not be uploaded.`
            );
            return Promise.resolve();
          }

          uploadedFileNames.add(file.name);

          return new Promise(async (resolve, reject) => {
            try {
              setProgresses((prevState) => ({
                ...prevState,
                [file.name]: getRandomNumber(10, 45),
              }));

              const { data, error } = await POST__uploadFile(
                file,
                `images`,
                `${userId}/${slugify(file.name)}-${uuidv4()}`
              );

              console.log(`posted data`, data);

              setUploadedFiles((prevState) => [
                ...prevState,
                {
                  name: file.name,
                  src: `${supabaseStorageBucketURL}/${data.fullPath}`,
                },
              ]);

              if (error) {
                throw new Error(`Error: ${error.message}`);
              }

              setProgresses((prevState) => ({
                ...prevState,
                [file.name]: 100,
              }));

              resolve();
            } catch (error) {
              console.log(error);
              setFormMessage({
                type: `error`,
                message: error.message,
              });
              reject(error);
            }
          });
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        throw new Error("One or more uploads failed");
      }
    };

    toast.promise(uploadProcess(), {
      loading: "Uploading images...",
      success: (data) => {
        setTimeout(() => {
          setReadyToTagfiles(true);
          setPayloadPosting(false);
        }, 500);
        return `${files.length} image(s) uploaded successfully!`;
      },
      error: (data) => {
        setPayloadPosting(false);
        return "Some images failed to upload. Please try again.";
      },
    });
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error("Cannot upload more than 1 file at a time");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(`Cannot upload more than ${maxFileCount} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }
    },
    [files, maxFileCount, multiple, onUpload, setFiles]
  );

  function onRemove(index) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  function isFileWithPreview(file) {
    return "preview" in file && typeof file.preview === "string";
  }

  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  useEffect(() => {
    console.log(uploadedFiles);
  }, [readyToTagfiles]);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    // maxSize: 1024 * 1000,
    onDrop,
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {readyToTagfiles &&
          uploadedFiles.length &&
          uploadedFiles.map((elem, index) => {
            return (
              <div
                key={index}
                className="flex flex-col bg-white rounded-[8px] overflow-hidden"
              >
                <div className="relative h-[400px] w-full">
                  <Image
                    src={elem.src}
                    alt={elem.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    loading={`lazy`}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {!readyToTagfiles && (
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="max-w-[800px] mx-auto">
            <div className="relative flex flex-col gap-6 overflow-hidden px-4">
              <div
                {...getRootProps()}
                className={cn(
                  "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isDragActive && "border-muted-foreground/50",
                  isDisabled && "pointer-events-none opacity-60"
                )}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-medium text-muted-foreground">
                      Drop the files here
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-px">
                      <p className="font-medium text-muted-foreground">
                        Drag {`'n'`} drop files here, or click to select files
                      </p>{" "}
                      <p className="text-sm text-muted-foreground/70">
                        You can upload 4 files (up to 4MB each)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {files?.length ? (
              <div className="mt-10">
                <ScrollArea className="h-fit w-full px-4">
                  <div className="c__lib__scroll-area__content-wrapper flex max-h-48 flex-col gap-4">
                    {files?.map((file, index) => (
                      <div
                        key={index}
                        className="relative flex items-center gap-3.5"
                      >
                        <div className="flex flex-1 gap-2.5">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={48}
                            height={48}
                            loading="lazy"
                            className="aspect-square shrink-0 rounded-md object-cover"
                          />
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex flex-col gap-px">
                              <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatBytes(file.size)}
                              </p>
                            </div>
                            {progresses?.[file.name] ? (
                              <div className="pr-5">
                                <Progress value={progresses?.[file.name]} />
                              </div>
                            ) : null}
                          </div>
                          {uploadingIntent < 1 && (
                            <button
                              type="button"
                              className="c__util-button h-[35px]"
                              onClick={() => onRemove(index)}
                            >
                              <X className="size-4" aria-hidden="true" />
                              <span className="sr-only">Remove file</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                {files && files.length > 0 && (
                  <div className="mt-10 text-end">
                    <Button
                      actionable
                      title="Upload"
                      type="submit"
                      isLoading={payloadPosting}
                      theme={`secondary`}
                      // isDisabled={!isValid}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </form>
      )}
    </>
  );
};

export default FileUploader;
