import toast from "react-hot-toast";
import { FC, useState } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import CustomToast from "@/components/Toast/CustomToast";
import useAddLocation from "../hooks/Location/useAddLocation";
import useAddDepartment from "../hooks/Department/useAddDepartment";
import useAddPosition from "../hooks/Position/useAddPosition";
import useAddEmploymentType from "../hooks/EmploymentType/useAddEmploymentType";
import { useForm, Controller } from 'react-hook-form';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DefaultInitialValues {
  [key: string]: string;
  locations: string;
  departments: string;
  positions: string;
  employmenttypes: string;
}

interface MutationData {
  name: string;
}

interface ApiResponse {
  message: string;
  data?: any;
}

interface MutationOptions {
  onSuccess: (response: ApiResponse) => void;
  onError: (error: Error) => void;
}

const CreateModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const [flexibleHourChecked, setFlexibleHourChecked] = useState(false);
  const [fixedHourChecked, setFixedHourChecked] = useState(false);
  const queryClient = useQueryClient();

  const defaultInitialValues: DefaultInitialValues = {
    locations: '',
    departments: '',
    positions: '',
    employmenttypes: ''
  };

  const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm({
    defaultValues: defaultInitialValues,
    mode: "onChange", 
  });

  const { mutate: mutateLocation, isPending: isLocationPending } = useAddLocation();
  const { mutate: mutateDepartment, isPending: isDepartmentPending } = useAddDepartment();
  const { mutate: mutatePosition, isPending: isPositionPending } = useAddPosition();
  const { mutate: mutateEmploymentType, isPending: isEmploymentTypePending } = useAddEmploymentType();

  const mutationConfigs = {
    locations: {
      mutate: (payload: MutationData, options: MutationOptions) => 
        mutateLocation(payload, options),
      queryKey: ["locationData"] as const
    },
    departments: {
      mutate: (payload: MutationData, options: MutationOptions) => 
        mutateDepartment(payload, options),
      queryKey: ["departmentData"] as const
    },
    positions: {
      mutate: (payload: MutationData, options: MutationOptions) => 
        mutatePosition(payload, options),
      queryKey: ['positionsData'] as const
    },
    employmenttypes: {
      mutate: (payload: MutationData, options: MutationOptions) => 
        mutateEmploymentType(payload, options),
      queryKey: ['employmentTypesData'] as const
    }
  } as const;

  const onSubmit = async (data: DefaultInitialValues) => {
    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;
  
      const config = mutationConfigs[key as keyof typeof mutationConfigs];
      if (!config) return;
  
      config.mutate(
        { name: value },
        {
          onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: config.queryKey });
            toast.custom(
              () => <CustomToast message={response.message || `Successfully added ${value}`} type="success" />,
              { duration: 4000 }
            );
            reset();
            onClose();
          },
          onError: (error) => {
            console.error("Error creating:", error);
            toast.custom(
              () => <CustomToast message={error.message || "Something went wrong"} type="error" />,
              { duration: 4000 }
            );
          }
        }
      );
    });
  };
  

  const handleFlexibleHourChecked = () => {
    setFlexibleHourChecked(!flexibleHourChecked);
  };

  const handleFixedHourChecked = () => {
    setFixedHourChecked(!fixedHourChecked);
  };

  const isAnyPending = isLocationPending || isDepartmentPending || isPositionPending || isEmploymentTypePending;

  return (
    <>
      {isOpen && (
        <div className={`block absolute z-10 ${modalClassName}`}>
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
                      Create Location, Department, Position, and Employment type
                    </h3>
                    <button type="button" onClick={onClose}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 py-4 mx-6 xl:space-x-10 xl:divide-x-4">
                    <div className="flex flex-col">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div>
                            <label htmlFor="locations" className="mb-1 text-sm font-normal">
                              Location
                            </label>
                            <Controller
                              control={control}
                              name="locations"
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Location"
                                  className={`pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]`}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label htmlFor="departments" className="mb-1 text-sm font-normal">
                              Department
                            </label>
                            <Controller
                              control={control}
                              name="departments"
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Department"
                                  className={`pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]`}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label htmlFor="positions" className="mb-1 text-sm font-normal">
                              Position
                            </label>
                            <Controller
                              control={control}
                              name="positions"
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Position"
                                  className={`pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]`}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label htmlFor="employmenttypes" className="mb-1 text-sm font-normal">
                              Employment Type
                            </label>
                            <Controller
                              control={control}
                              name="employmenttypes"
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Employment Type"
                                  className={`pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]`}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-start px-10 pt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      disabled={!isValid || isSubmitting || isAnyPending}
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className={`inline-flex justify-center w-full rounded-md border border-transparent px-10 py-2 text-base leading-6 font-bold text-white shadow-sm focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5 
                      ${!isValid || isSubmitting || isAnyPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#355FD0]'} `}
                    >
                      {!isValid ? "Invalid" : isAnyPending ? "Saving..." : isSubmitting ? "Submitting..." : "Save"}
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      className="cancel-upload-csv-btn"
                      onClick={() => {
                        reset();
                        onClose();
                      }}
                    >
                      Close
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

export default CreateModal;




