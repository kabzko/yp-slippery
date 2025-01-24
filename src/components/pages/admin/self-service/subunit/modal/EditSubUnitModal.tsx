import toast from "react-hot-toast";
import CustomToast from "@/components/toast/CustomToast";
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SelfServiceContext } from "@/components/contexts";
import { useQueryClient } from '@tanstack/react-query';
import useUpdateSubUnit from "../hooks/useUpdateSubUnit";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  subUnit: any;
}

interface FormValues {
  name: string;
}

export default function EditSubUnitModal({ subUnit, isOpen, onClose }: ModalProps) {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const { selectedRows, setSelectedRows } = useContext(SelfServiceContext);
  const [subUnitName, setSubUnitName] = useState(null);
  const { mutate, isPending } = useUpdateSubUnit();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen && subUnit) {
      setSubUnitName(selectedRows[0]);
    }
  }, [selectedRows, isOpen, subUnit]);

  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const subUnitData = { id: subUnitName ? parseInt(subUnitName) : undefined, ...data };
    mutate(subUnitData, {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['subUnitsData'] });
        toast.custom(
          () => <CustomToast message={data.message} type="success" />,
          { duration: 4000 }
        );
        handleClose();
      },
      onError: (error: any) => {
        toast.custom(
          () => <CustomToast message={error.message} type="error" />,
          { duration: 4000 }
        );
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
    setSelectedRows([]);
    setSubUnitName(null);
  };

  useEffect(() => {
    if (subUnit && subUnit[0]) {
      for (const property in subUnit[0]) {
        if (property in subUnit[0]) {
          setValue(property as keyof FormValues, subUnit[0][property] || '', { shouldValidate: false });
        }
      }
    }
  }, [subUnit, setValue]);

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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6 w-[416px]">
                <div className="text-center sm:text-left">
                  <div className="flex justify-between p-2 w-full bg-blue-600">
                    <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
                      Edit Sub Unit
                    </h3>
                    <button onClick={onClose}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-center sm:text-left">
                    <div className="px-4 py-4 mx-6 xl:space-x-10 xl:divide-x-4">
                      <div className="flex flex-col">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div>
                              <label htmlFor="name" className="mb-1 text-sm font-normal">Sub Unit</label>
                              <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    className="pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]"
                                    placeholder="SubUnit"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-10 pt-10 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-10 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {isPending ? "Submitting..." : "Save"}
                      </button>
                    </span>
                    <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                      <button
                        type="button"
                        className="cancel-upload-csv-btn"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
