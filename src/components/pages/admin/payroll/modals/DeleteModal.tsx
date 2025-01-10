import { useContext, useEffect, useState } from 'react';
import { DailyLogsContext, LogsContext } from '../../../../contexts';
import useDeleteLog from '../hooks/useDeleteLog';
import toast from "react-hot-toast";
import CustomToast from "../../../../Toast/CustomToast";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteModal({ isOpen, onClose }: Props) {
  const { logs, selectedLog, setSelectedLog } = useContext(LogsContext)
  const { step, payrollProcessType } = useContext(DailyLogsContext);
  const [name, setName] = useState<string[]>([])
  const { mutate } = useDeleteLog();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen && selectedLog) {
      setName([`${selectedLog.employee.firstname} ${selectedLog.employee.lastname}`]);
    }
  }, [isOpen, selectedLog])

  const handleConfirm = () => {
    if (!selectedLog) return;
    
    mutate(selectedLog.id, {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        toast.custom(
          () => <CustomToast message={`Successfully deleted daily log.`}  type="success" />,
          { duration: 4000 }
        );
        setSelectedLog(null);
        onClose();
      },
      onError: (error: any) => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        toast.custom(
          () => <CustomToast message={error.message || "Failed to delete daily log."} type="error" />,
          { duration: 4000 }
        );
      },
    });
  };

  const modalText = () => {
    let text = '';
    if (selectedLog === undefined) return;
    else {
      text = payrollProcessType === 'manual' ? `${name}'s log?` : `${selectedLog?.id}'s log?`;
    }
    return text;
  }

  return (
    <>
      {isOpen && (
        <div className="block absolute z-50">
          <div className="overflow-y-auto fixed inset-0 z-20">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
                </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:pb-6">
                <div className="text-center border-b-2 sm:text-left">
                  <div className="flex justify-center my-4 text-red-500 sm:p-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      fill="currentColor"
                      className="bi bi-exclamation-triangle-fill"
                      viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
              </div>
                  <h1 className="px-6 mb-6 text-xl font-semibold text-center">
                    Are you sure you want to{" "}
                    <span className="text-red-500">delete</span>{" "}
                    {modalText()}
                  </h1>
            </div>
                <div className="justify-around px-10 py-4 w-full sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                      onClick={handleConfirm}
                type="button"
                      className="justify-center px-12 py-2 w-full text-base font-bold leading-6 text-white bg-blue-600 rounded-md border border-transparent shadow-sm drop-shadow-xl transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                      Yes
              </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                      className="px-12 py-2 cancel-upload-csv-btn"
                      onClick={onClose}>
                      No
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