import React, { useRef, useState, useEffect, useContext } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import Papa from "papaparse";
import CustomToast from "../Toast/CustomToast";
import { uploadSetupData, uploadScheduleData } from "../hooks/upload-setup/api";
import { SelfServiceContext } from "../contexts";
import { selfServiceHeaderFields, stepToApiUrl } from "../constants";
import classNames from "@/helpers/classNames";

interface UploadCSVProps {
  isOpen: boolean;
  onClose: () => void;
  fields: string[];
  module: string;
}

interface fieldObj {
  [key: string]: any;
}


export default function Upload({ isOpen, onClose, fields, module }: UploadCSVProps) {
  const { step } = useContext(SelfServiceContext);
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

  const { mutate, isPending } = useMutation({
    mutationFn: ({file, data}: {file: File | null, data: any}) => {
      const apiUrl = stepToApiUrl[step];
      if (step === 2) {
        return uploadScheduleData(file, apiUrl, data);
      }
      return uploadSetupData(file, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      showToast("Successfully imported data.", "success");
      onClose();
    },
    onSettled: () => {
      setFile(null);
    },
    // throwOnError: true,
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

    const parseFile = (fields: any) => {
      if (module === "schedule") {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function (results: any) {
            const dataFields = Object.keys(results?.data[0]);
            const isCorrect = JSON.stringify(dataFields) === JSON.stringify(fields);
            if (isCorrect) {
              const headerKeys: any = {
                Code: "code",
                "Hours per day": "workhours",
                "Time In": "timein",
                "Time Out": "timeout",
                "Flexible Schedule": "flexible_schedule",
                Monday: "workday_monday",
                Tuesday: "workday_tuesday",
                Wednesday: "workday_wednesday",
                Thursday: "workday_thursday",
                Friday: "workday_friday",
                Saturday: "workday_saturday",
                Sunday: "workday_sunday",
                Breaktime: "breaktime",
                "Break Type (Flexible/Fixed)": "breaktype",
                "No. of hours": "numberofhours",
                "No. of breaks": "numberofbreaks",
                From: "breakfrom",
                To: "breakto",
                Departments: "departments",
                Locations: "locations",
              };
              const datas = results?.data;
              for (const data of datas) {
                const newData: any = {};
                for (const key in headerKeys) {
                  newData[headerKeys[key]] = data[key];
                }
                newData.is_import = true;
                newData.source_module = "import_schedule";
                newData.allow_changes = false;
                newData.complete = true;
                console.log('Schedule data to be uploaded:', newData);
                mutate({file: null, data: newData});
              }
            } else {
              showToast(
                "You cannot proceed due to incomplete fields on your file. Please review.",
                "error"
              );
            }
          },
          error: function (error: any) {
            console.error(error);
            showToast(error, "error");
          },
        });
      } else {
        Papa.parse(file, {
          complete: function (results: any) {
            const dataFields = results?.data[0];
            const isCorrect = JSON.stringify(dataFields) === JSON.stringify(fields);
        
            if (isCorrect) {
              const newData = results?.data
                ?.slice(1)
                ?.map((row: any) => {
                  let type: { [key: string]: any } = {};
                  fields.forEach((field: any, i: any) => {
                    type[field] = row[i];
                  });
        
                  const obj: fieldObj = {};
                  fields.forEach((field: any) => {
                    const value = type[field];
                    const lowerCaseField = field.toLowerCase();
        
                    if (lowerCaseField === "flexible time" && typeof value === "string") {
                      obj[lowerCaseField] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    } else {
                      obj[lowerCaseField] = value;
                    }
                  });
  
                  const isEmpty = Object.values(obj).every(
                    (value) => value === null || value === "" || value === undefined
                  );
                  return isEmpty ? null : obj;
                })
                .filter(Boolean);
        
              const structuredData = {
                location: newData.map((data: any) => data.location),
                department: newData.map((data: any) => data.department),
                position: newData.map((data: any) => data.position),
                employment_type: newData.map((data: any) => data['employment type']),
              };
        
              if (module === 'location') {
                const capitalizeFirstLetter = (str: string) => {
                  if (typeof str === 'string') {
                    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                  }
                  return str;
                };          
                  
                const filteredData = {
                  location: structuredData.location
                    .filter((value: any) => value !== '')
                    .map((value: any) => ({ name: capitalizeFirstLetter(value) })),
                  department: structuredData.department
                    .filter((value: any) => value !== '')
                    .map((value: any) => ({ name: capitalizeFirstLetter(value) })),
                  position: structuredData.position
                    .filter((value: any) => value !== '')
                    .map((value: any) => ({ name: capitalizeFirstLetter(value) })),
                  employment_type: structuredData.employment_type
                    .filter((value: any) => value !== '')
                    .map((value: any) => ({ name: capitalizeFirstLetter(value) }))
                };

                  console.log('Parsed file new data for location:', filteredData);

                  if (newData.length > 0 && Object.keys(newData[0]).length > 0) {
                    const newHeaderFields = selfServiceHeaderFields[step];
                    const newDataArray = newData.map((obj: any) =>
                      Object.values(obj)
                    );
                    const modifiedData: any = [newHeaderFields, ...newDataArray];
                    const csvData = Papa.unparse(modifiedData);
                    const csvBlob = new Blob([csvData], { type: "text/csv" });
                    const csvFile = new File([csvBlob], "modified.csv");
                    mutate({file: csvFile, data: filteredData});
                  } else {
                    showToast("Invalid values. Please review.", "error");
                  }
                } else {
                  console.log('Parsed file new data:', newData);
                  if (newData.length > 0 && Object.keys(newData[0]).length > 0) {
                    const newHeaderFields = selfServiceHeaderFields[step];
                    const newDataArray = newData.map((obj: any) =>
                      Object.values(obj)
                    );
                    const modifiedData: any = [newHeaderFields, ...newDataArray];
                    const csvData = Papa.unparse(modifiedData);
                    const csvBlob = new Blob([csvData], { type: "text/csv" });
                    const csvFile = new File([csvBlob], "modified.csv");
                    mutate({file: csvFile, data: null});
                  } else {
                    showToast("Invalid values. Please review.", "error");
                  }
                }
            } else {
              showToast(
                "You cannot proceed due to incomplete fields on your file. Please review.",
                "error"
              );
            }
          },
          error: function (error: any) {
            console.error(error);
            showToast(error, "error");
          },
        });
      }
    };

    parseFile(fields);
  };

  return (
    <>
      {isOpen && (
        <div className={`block absolute z-20 ${modalClassName}`}>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="csv-file-div">
                <div className="text-center border-b-2 sm:text-left">
                  <div className="flex justify-between w-full p-2 bg-blue-600">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Upload File
                    </h3>
                    <button onClick={onClose}>
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                      onDrop={handleDrop}>
                      <label className={classNames("csv-file-preview cursor-pointer hover:bg-blue hover:text-blue-600 text-lg leading-normal font-bold", file === null ? "" : "hidden")}>
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
                      <div className={classNames('', file !== null ? 'csv-file-preview' : 'hidden')}>
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
                          onClick={() => setFile(null)}>
                          Remove File
                        </p>
                      </div>
                    </div>
                  </div>
                  <h1 className="pl-6 text-xs">Maximum file size: 10 mb</h1>
                </div>

                <div className="pr-6 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button onClick={handleUpload} disabled={isPending} type="submit" className="upload-csv-btn">
                      {isPending ? 'Uploading...' : 'Add File'}
                    </button>
                  </span>
                  <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={onClose}
                      type="button"
                      className="cancel-upload-csv-btn">
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
