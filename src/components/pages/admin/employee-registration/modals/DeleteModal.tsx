import toast from "react-hot-toast";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CustomToast from "../../../../Toast/CustomToast"
import { EmployeeContext, EmployeeRegistrationContext } from "../../../../contexts";
import useDeleteProfile from "../hooks/useDeleteEmployee";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteEmployeeModal({ isOpen, onClose }: Props) {
  const { selectedEmployee, selectedRows, setSelectedRows } = useContext(EmployeeContext);
  const { step } = useContext(EmployeeRegistrationContext);
  const { mutate } = useDeleteProfile();
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    try {
      await Promise.all(
        selectedRows.map((row) =>
          mutate(row, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["employees"] });
              toast.custom(
                () => (
                  <CustomToast
                    message={
                      step === 1
                        ? "Successfully deleted employee profile(s)."
                        : "Successfully deleted job information(s)."
                    }
                    type="success"
                  />
                ),
                { duration: 4000 }
              );
            },
            onError: (error: any) => {
              toast.custom(
                () => (
                  <CustomToast
                    message={error?.message || "An error occurred while deleting"}
                    type="error"
                  />
                ),
                { duration: 4000 }
              );
            },
          })
        )
      );
      setSelectedRows([]);
      onClose();
    } catch (error: any) {
      toast.custom(
        () => (
          <CustomToast
            message={error?.message || "An error occurred while deleting"}
            type="error"
          />
        ),
        { duration: 4000 }
      );
    }
  };

  const modalText = () => {
    if (!selectedEmployee) return "";
    return selectedRows.length > 1
      ? step === 1
        ? "these employee profiles?"
        : "these job informations?"
      : step === 1
      ? `${selectedEmployee?.first_name} ${selectedEmployee?.last_name}'s employee profile?`
      : `${selectedEmployee?.first_name} ${selectedEmployee?.last_name}'s job information?`;
  };

  return (
    <>
      {isOpen && (
        <div className="block absolute z-50">
          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
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
                       className="px-12 upload-csv-btn">
                      Yes
                  </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                      className="px-12 cancel-upload-csv-btn"
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