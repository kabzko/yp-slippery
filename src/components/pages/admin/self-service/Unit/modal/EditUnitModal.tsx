import toast from "react-hot-toast";
import CustomToast from "@/components/toast/CustomToast";
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelfServiceContext } from "@/components/contexts"; 
import {  useQueryClient } from '@tanstack/react-query';
import useUpdateUnit from "../hooks/useUpdateUnit";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: any;
}

interface UnitFormValues {
  name: string;
}

export default function EditUnitModal({ unit, isOpen, onClose }: ModalProps) {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const { selectedRows, setSelectedRows } = useContext(SelfServiceContext)
  const [unitName, setUnitName] = useState(null);
  const queryClient = useQueryClient();
  const initialUnitValues = {
    name: ""
  }

  const { register, handleSubmit, reset, setValue } = useForm<UnitFormValues>({
    defaultValues: initialUnitValues
  });

  useEffect(() => {
    if (isOpen && unit) {
      setUnitName(selectedRows[0])
    }
  }, [selectedRows, isOpen, unit])

  useEffect(() => {
    if (unit && unit[0]) {
      setValue('name', unit[0].name ?? '');
    }
  }, [unit, setValue]);

  const { mutate, isPending } = useUpdateUnit();

  const onSubmit = async (data: UnitFormValues) => {
    const unitData = { id: unitName ? parseInt(unitName) : undefined, ...data };
    mutate(unitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['unitsData'] });
        toast.custom(
          () => <CustomToast message="Successfully updated unit." type="success" />,
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
    setUnitName(null);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isOpen && (
        <div className={`block absolute z-20 ${modalClassName}`}>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6 w-[416px]">
                <div className="text-center sm:text-left">
                  <div className="flex justify-between w-full p-2 bg-blue-600">
                    <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
                      Edit Unit
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
                              <label
                                htmlFor="name"
                                className="mb-1 text-sm font-normal">
                                Unit
                              </label>
                              <input
                                className="pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]"
                                {...register("name")}
                                type="text"
                                id="name"
                                placeholder="Unit"
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
                    <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
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
    </form>
  );
}