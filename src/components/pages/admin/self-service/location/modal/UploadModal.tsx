import React, { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomToast from "../../../../../Toast/CustomToast";
// import { addLocationData } from "../hooks/useLocationQueries";
// import { addDepartmentData } from "../hooks/useDepartmentQueries";
// import { addPositionData } from "../hooks/usePositionsQueries";
// import { addEmploymentTypeData } from "../hooks/useEmploymentTypeQueries";
// import { uploadSetupData } from "@/components/hooks/upload-setup/api";
// import {
//   selfServiceHeaderFields,
//   stepToApiUrl,
// } from "../../../../../constants"
import classNames from "../../../../../../helpers/classNames";

interface UploadCSVProps {
  isOpen: boolean;
  onClose: () => void;
  fields: string[];
}

export default function Upload({ isOpen, onClose }: UploadCSVProps) {
  const modalClassName = isOpen ? "block absolute z-10" : "hidden";
  const inputRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const showToast = (message: string, type: string) => {
    toast.custom(() => <CustomToast message={message} type={type} />, {
      duration: 4000,
    });
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setFile(e?.dataTransfer?.files[0]);
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
      e.target.value = "";
    }
  };

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file); // Append the file to FormData

      const response = await fetch('/next/api/csv', { // Adjust the endpoint to match your API route
        method: 'POST',
        body: formData,
      });
      console.log({formData})
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      return response.json(); // Return the response data
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      showToast("Successfully imported data.", "success");
      onClose();
    },
    onSettled: () => {
      setFile(null);
    },
    onError: (error: any) => {
      showToast(error.message, "error");
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
    }
  }, [isOpen]);

  const handleUpload = () => {
    if (file == null) return;

    // Directly call the upload mutation with the selected file
    uploadMutation.mutate(file);
    console.log({file})
  };

  return (
    <>
      {isOpen && (
        <div className={`block absolute z-20 ${modalClassName}`}>
          <div className="overflow-y-auto fixed inset-0 z-20">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="csv-file-div">
                <div className="text-center border-b-2 sm:text-left">
                  <div className="flex justify-between p-2 w-full bg-blue-600">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Upload File
                    </h3>
                    <button onClick={onClose}>
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.5 0C4.2465 0 0 4.2465 0 9.5C0 14.7535 4.2465 19 9.5 19C14.7535 19 19 14.7535 19 9.5C19 4.2465 14.7535 0 9.5 0ZM14.25 12.9105L12.9105 14.25L9.5 10.8395L6.0895 14.25L4.75 12.9105L8.1605 9.5L4.75 6.0895L6.0895 4.75L9.5 8.1605L12.9105 4.75L14.25 6.0895L10.8395 9.5L14.25 12.9105Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 sm:p-6">
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <label
                        className={classNames(
                          "csv-file-preview cursor-pointer hover:bg-blue hover:text-blue-600 text-lg leading-normal font-bold",
                          file === null ? "" : "hidden"
                        )}
                      >
                        "Drag and drop files here"
                        <input
                          name="csvUpload"
                          id="csvUpload"
                          ref={inputRef}
                          type="file"
                          className="sr-only"
                          accept=".csv"
                          onChange={handleChange}
                        />
                      </label>
                      <div
                        className={classNames(
                          "",
                          file !== null ? "csv-file-preview" : "hidden"
                        )}
                      >
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios/25/csv.png"
                          alt="csv"
                        />
                        <p className="text-sm font-light text-slate-800">
                          {file?.name}
                        </p>
                        <p
                          className="text-blue-500 underline cursor-pointer"
                          onClick={() => setFile(null)}
                        >
                          Remove File
                        </p>
                      </div>
                    </div>
                  </div>
                  <h1 className="pl-6 text-xs">Maximum file size: 10 mb</h1>
                </div>

                <div className="pr-6 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={handleUpload}
                      type="submit"
                      className="upload-csv-btn"
                    >
                      Add File
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={onClose}
                      type="button"
                      className="cancel-upload-csv-btn"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
