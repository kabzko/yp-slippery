import toast from "react-hot-toast";
import { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from "@tanstack/react-query";
import CustomToast from "@/components/toast/CustomToast";
import useUpdateLocation from "../hooks/Location/useUpdateLocation";
import useUpdateDepartment from "../hooks/Department/useUpdateDepartment";
import useUpdatePosition from "../hooks/Position/useUpdatePosition";
import useUpdateEmploymentType from "../hooks/EmploymentType/useUpdateEmploymentType";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedData: any;
}

const EditModal: FC<ModalProps> = ({ selectedData, isOpen, onClose }) => {
  const modalClassName = isOpen && selectedData ? 'block absolute z-10' : 'hidden';
  const [title, setTitle] = useState('');
  const [fieldName, setFieldName] = useState('');

  const queryClient = useQueryClient();

  const locationMutation = useUpdateLocation();
  const departmentMutation = useUpdateDepartment();
  const positionMutation = useUpdatePosition();
  const employmentTypeMutation = useUpdateEmploymentType();

  const getActiveMutation = () => {
    const property = Object.keys(selectedData || {}).find(key => key !== 'id');
    if (!property) return { mutate: null, isPending: false };

    switch (property) {
      case 'locations':
        return { mutate: locationMutation.mutate, isPending: locationMutation.isPending };
      case 'departments':
        return { mutate: departmentMutation.mutate, isPending: departmentMutation.isPending };
      case 'positions':
        return { mutate: positionMutation.mutate, isPending: positionMutation.isPending };
      case 'employmenttypes':
        return { mutate: employmentTypeMutation.mutate, isPending: employmentTypeMutation.isPending };
      default:
        return { mutate: null, isPending: false };
    }
  };

  const { mutate, isPending } = getActiveMutation();

  useEffect(() => {
    if (selectedData) {
      const property = Object.keys(selectedData).find(key => key !== 'id');
      if (!property) {
        return;
      }
      switch (property) {
        case 'locations':
          setTitle('Location');
          break;
        case 'departments':
          setTitle('Department');
          break;
        case 'positions':
          setTitle('Position');
          break;
        case 'employmenttypes':
          setTitle('Employment Type');
          break;
        default:
          setTitle('');
      }
    }
  }, [selectedData]);

  const defaultInitialValues = {
    locations: '',
    departments: '',
    positions: '',
    employmenttypes: ''
  };

  const { control, handleSubmit, reset, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
    defaultValues: selectedData ? { ...defaultInitialValues, ...selectedData } : defaultInitialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (selectedData) {
      Object.keys(selectedData).forEach((key) => {
        setFieldName(key);
        setValue(key, selectedData[key] ?? '', { shouldValidate: true });
      });
    }
  }, [selectedData, setValue]);

  const handleAccept = async (values: any) => {
    if (!selectedData.id || !mutate) return;

    const property = Object.keys(selectedData).find(key => key !== 'id');
    if (!property) return;

    let newData;
    let queryKey;
    switch (property) {
      case 'locations':
        newData = { id: selectedData.id, name: values[property] };
        queryKey = 'locationData';
        break;
      case 'departments':
        newData = { id: selectedData.id, name: values[property] };
        queryKey = 'departmentData';
        break;
      case 'positions':
        newData = { id: selectedData.id, name: values[property] };
        queryKey = 'positionsData';
        break;
      case 'employmenttypes':
        newData = { id: selectedData.id, name: values[property] };
        queryKey = 'employmentTypesData';
        break;
      default:
        return;
    }
    
    try {
      await (mutate as any)(newData, {
        onSuccess(data: { message: string }) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          toast.custom(
            () => <CustomToast message={data.message} type="success" />,
            { duration: 4000 }
          );
          onClose();
        },
        onError(error: any) {
          const errorMessage = error?.message || 'An error occurred while updating';
          toast.custom(
            () => <CustomToast message={errorMessage} type="error" />,
            { duration: 4000 }
          );
        }
      });
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred while updating';
      toast.custom(
        () => <CustomToast message={errorMessage} type="error" />,
        { duration: 4000 }
      );
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      {isOpen && (
        <div className={`modal ${modalClassName}`}>
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
                      Edit {title}
                    </h3>
                    <button type="button" onClick={() => { handleClose(); reset(); }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 pt-4 mx-6 xl:space-x-10 xl:divide-x-4">
                    <div className="flex flex-col">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div>
                            <label htmlFor={fieldName} className="mb-1 text-sm font-normal">
                              {title}
                            </label>
                            <Controller
                              control={control}
                              name={fieldName}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className="pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px] px-2.5 my-1.5"
                                  placeholder={title}
                                />
                              )}
                            />
                            {errors[fieldName] && (
                              <span className="text-sm text-red-600">required*</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-start px-10 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      disabled={!isValid || isSubmitting}
                      type="button"
                      className="px-12 disabled:cursor-not-allowed disabled:bg-red-500 upload-csv-btn"
                      onClick={handleSubmit(handleAccept)}
                    >
                      {!isValid ? "Invalid" : isSubmitting ? "Submitting..." : "Save"}
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button"
                      className="cancel-upload-csv-btn"
                      onClick={() => { handleClose(); reset(); }}>
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
};

export default EditModal;
