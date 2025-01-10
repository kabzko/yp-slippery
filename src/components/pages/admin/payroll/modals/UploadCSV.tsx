import React, { useRef, useState, useEffect, useContext } from "react";
import { useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import Papa from "papaparse";
import CustomToast from "../../../../Toast/CustomToast";
// import { addLogsfromCSV } from '../helpers/api';
import useImportFile from "../hooks/useImportFile";
import { DailyLogsContext, LogsContext } from "../../../../contexts";
import classNames from "../../../../../helpers/classNames";

interface UploadCSVProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadCSV({ isOpen, onClose }: UploadCSVProps) {
  const { step, payrollProcessType } = useContext(DailyLogsContext)
  const { logs } = useContext(LogsContext);
  const inputRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);
  const { mutate } = useImportFile();
  const queryClient = useQueryClient();

  const showToast = (message: string, type: string) => {
    toast.custom(() => <CustomToast message={message} type={type} />, {
      duration: 4000,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
    }
  }, [isOpen]);

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
      e.target.value = '';
    }
  };

  const handleUpload = () => {
    if (file == null) return;

    const fieldSets = [
      ["date","employee","reason","time_in","time_out"],
      ["date","employee_id","reason","in_1","out_1", "in_2", "out_2"]
    ];

    const parseFile = (fields: any) => {
      Papa.parse(file, {
        complete: function (results: any) {
          const dataFields = results?.data[0];
          const isCorrect = JSON.stringify(dataFields) === JSON.stringify(fields);

          if (isCorrect) {
            const newData = results?.data?.slice(1)?.map((row: any, index: number) => {
              let log: { [key: string]: any } = {};
              fields.forEach((field: any, i: any) => {
                log[field] = row[i];
              });

              // template 1
              if (fields.length === 5) {
                const date = log["date"];
                const employee = log["employee"];
                const reason = log["reason"];
                const time_in = log["time_in"];
                const time_out = log["time_out"];

                if (!date || !employee || !reason || !time_in || !time_out) {
                  return null;
                }

                return {
                  date: date,
                  employee: employee,
                  reason: reason,
                  time_in: time_in,
                  time_out: time_out,
                }
              } else {
                // for template 2
              }
            }).filter(Boolean);
            const newDataArray = newData.map((obj: any) => Object.values(obj));
            const modifiedData = [fields, ...newDataArray];
            const csvData = Papa.unparse(modifiedData);
            const csvBlob = new Blob([csvData], { type: 'text/csv' });
            const csvFile = new File([csvBlob], 'modified.csv');

              if (newData) { 
                console.log(modifiedData); 
                mutate(csvFile, { 
                  onSuccess: (data: any) => { 
                    queryClient.invalidateQueries({ queryKey: ["logs"] }); 
                    toast.custom( () => <CustomToast message={data.message} type="success" />, 
                    { duration: 4000 } ); },
                  onError: (error) => { 
                    queryClient.invalidateQueries({ queryKey: ["logs"] }); 
                    toast.custom( () => <CustomToast message="Invalid values." type="error" />, 
                    { duration: 4000 } 
                  ); 
                } 
              }); 
            } else { 
                queryClient.invalidateQueries({ queryKey: ['logs'] }); 
                toast.custom(
                   () => <CustomToast message="You cannot proceed due to incomplete fields on your file. Please review." type="error" />, 
                   { duration: 4000 } 
                  ); 
                }
              } 
           },
        error: function (error: any) {
          console.error(error);
          toast.custom(
           () => <CustomToast message={error.message} type="error" />, 
           { duration: 4000 } 
          );
        },
      });

    };
    const selectedFields = payrollProcessType === 'manual' ? fieldSets[0] : fieldSets[1];
    parseFile(selectedFields);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute z-20 block">
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
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
                      <label
                        className={classNames('', file === null ? 'csv-file-preview cursor-pointer hover:bg-blue hover:text-blue-600 text-lg leading-normal font-bold' : 'hidden')}>
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
                      <div className={classNames('', file !== null ? 'csv-file-preview' : "hidden")}>
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
                    <button onClick={handleUpload} type="submit" className="upload-csv-btn">
                      Add File
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