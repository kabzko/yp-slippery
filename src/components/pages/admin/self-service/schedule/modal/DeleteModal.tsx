import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import{ useQueryClient } from "@tanstack/react-query";
import CustomToast from "../../../../../Toast/CustomToast";
import { SelfServiceContext } from "../../../../../contexts";
import useDeleteSchedule from "../hooks/useDeleteSchedule";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSched: any;
}

export default function DeleteModal({ selectedSched, isOpen, onClose }: ModalProps) {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const { selectedRows, setSelectedRows } = useContext(SelfServiceContext)
  const [schedCode, setSchedCode] = useState<string>('');
  const deleteSchedule = useDeleteSchedule();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedSched && selectedRows.length === 1) {
      setSchedCode(selectedSched[0]?.value);
    }
  }, [selectedSched, selectedRows]);

  const handleAccept = async () => {
    Promise.all(selectedRows.map((row) => 
      deleteSchedule.mutate(row, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['schedulesData'] });
          toast.custom(
            () => <CustomToast message={data.message} type="success" />,
            { duration: 4000 }
          );
        },
        onError: (error: any) => {
          toast.custom(
            () => <CustomToast message={error.message} type="error" />,
            { duration: 4000 }
          );
        },
      })
    )).finally(() => {
      setSelectedRows([]);
      onClose();
    });
  };

  const handleCancel = () => {
    setSelectedRows([])
    onClose()
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
              <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:pb-6">
                <div className="pb-5 text-center sm:text-left">
                  <div className="flex justify-center mt-2 sm:p-6">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M51.5309 0C23.0704 0 0 23.0704 0 51.5309C0 79.9914 23.0704 103.062 51.5309 103.062C79.9914 103.062 103.062 79.9914 103.062 51.5309C103.062 23.0704 79.9914 0 51.5309 0ZM56.684 77.2964H46.3778V66.9902H56.684V77.2964ZM56.684 56.684H46.3778L43.8013 25.7655H59.2605L56.684 56.684Z" fill="#D65846" />
                    </svg>
                  </div>
                  <h1 className="px-20 text-xl text-center">
                   {selectedRows.length > 1 
                      ? "Are you sure you want to " 
                      : `Are you sure you want to `}
                      <span style={{ color: 'red' }}>delete</span>
                   {selectedRows.length > 1 
                      ? " these items?" 
                      : ` ${schedCode}?`}
                  </h1>
                </div>
                <div className="justify-center pr-6 mt-5 w-full sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button type="button"
                      className="px-12 upload-csv-btn"
                      onClick={handleAccept}
                    >
                      Yes
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button"
                      className="px-12 cancel-upload-csv-btn"
                      onClick={handleCancel}
                    >
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