import { useState, useEffect, useContext } from "react";
import { DailyLogsContext, LogsContext } from "../../../../contexts";
import useAddLog from "../hooks/useAddLog"; 
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { nanoid } from "nanoid";
import { useForm, Controller } from "react-hook-form";
import MultiSelect from "../../payroll/MultiSelect";
import { getEmployees } from "../helpers/api";
import ReactDOM from "react-dom";
import classNames from "@/helpers/classNames";
import toast from 'react-hot-toast';
import CustomToast from "@/components/Toast/CustomToast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SelectedState = {
  employee: string[];
};

export default function CreateFormModal({ isOpen, onClose }: ModalProps) {
  const [selected, setSelected] = useState<SelectedState>({
    employee: [],
  });
  const { payrollProcessType } = useContext(DailyLogsContext);
  const { logs } = useContext(LogsContext);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const {mutate} = useAddLog();
  const queryClient = useQueryClient();
  const [employeeNames, setNames] = useState<string[]>([]);

  const { data: employeeData, isPending } = useQuery({
    queryKey: ["employeeData"],
    queryFn: getEmployees,
  });

  useEffect(() => {
    if (!isPending && employeeData) {
      setNames(employeeData.map((employee: any) => `${employee.id} - ${employee.firstname} ${employee.lastname}`));
    }
  }, [employeeData, isPending]);

  const initialLogsValues = {
    date: "",
    employee: "",
    reason: "",
    timein: "",
    timeout: "",
    time_in_hours: "",
    time_in_minutes: "",
    time_out_hours: "",
    time_out_minutes: "",
  };

  const FormTooltip = ({ id, tooltipVisible }: { id: string; tooltipVisible: string | null }) => {
    const labelElement = document.getElementById(id);
    if (!labelElement) return null;

    // Get the position of the label element relative to the viewport
    const rect = labelElement.getBoundingClientRect();

    return ReactDOM.createPortal(
      <div
        id={`${id}-tooltip`}
        role="tooltip"
        className={classNames(
          "fixed z-50 w-64 rounded-lg bg-[#344960] p-4 text-xs text-white flex top-px -mt-4 -ml-64",
          tooltipVisible === id ? "block" : "hidden"
        )}
        style={{ top: `${rect.top}px`, left: `${rect.left}px` }}
      >
        <p className="text-xs font-normal text-left">You can select multiple employees.</p>
        <div className="absolute w-3 h-3 bg-[#344960] transform rotate-45 top-7 -right-0.5"></div>
      </div>,
      document.body
    );
  };

  const { control, handleSubmit, setValue, reset, formState: { isSubmitting, isValid }} = useForm({
    defaultValues: initialLogsValues,
  });

  const validateDate = (value: string) => {
    return value ? true : "Date is required";
  };

  const validateEmployee = (value: string[]) => {
    return value.length > 0 && value.every((v) => employeeNames.includes(v ?? "")) ? true : "Select at least one employee";
  };

  const validateReason = (value: string) => {
    return value ? true : "Reason is required";
  };

  const onSubmit = async (data: any) => {
    const newLog = {
      ...data,
      employee: Array.isArray(data.employee)
        ? data.employee.map((emp: any) => emp.split(" - ")[0].trim()).join(",")
        : data.employee.split(" - ")[0].trim(),
      company: "2",
      timein_reason: "",
    };
  
    mutate(newLog, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        toast.custom(
          () => <CustomToast message={`Successfully created daily logs.`} type="success" />,
          { duration: 4000 }
        );
        reset();
        onClose();
      },
      onError: (error: any) => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        toast.custom(
          () => <CustomToast message={error.message || "Failed to create daily logs."} type="error" />,
          { duration: 4000 }
        );
      },
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleSetFieldValue = (fieldName: string, value: string[]) => {
    setValue(fieldName as any, value);
  };

  return (
    <>
      {isOpen && (
        <div className="block absolute z-50">
          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden w-1/3 text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:mx-6 md:mx-28">
                <div className="text-center sm:text-left">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between p-5 w-full bg-blue-600">
                      <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">Create Daily Logs</h3>
                      <button type="button" onClick={() => { reset(); handleClose(); }}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mx-10">
                      <div className="my-4 space-y-3">
                        <div>
                          <label htmlFor="date" className="mb-1 label-modal">
                            Date<span className="text-red-500">*</span>
                          </label>
                          <Controller
                            control={control}
                            name="date"
                            rules={{ validate: validateDate }}
                            render={({ field }) => <input className="input-text-modal" {...field} type="date" />}
                          />
                        </div>
                        <div>
                          <span
                            onMouseEnter={() => setTooltipVisible("employee")}
                            onMouseLeave={() => setTooltipVisible(null)}
                          >
                            <label htmlFor="employee" className="mb-1 label-modal" id="employee">
                              Employee<span className="text-red-500">*</span>
                            </label>
                            {tooltipVisible === "employee" && <FormTooltip id="employee" tooltipVisible={tooltipVisible} />}
                          </span>
                          <MultiSelect
                            initialSelected={undefined}
                            setSelected={setSelected}
                            selected={selected.employee}
                            items={employeeNames}
                            itemType="employee"
                            setFieldValue={handleSetFieldValue}
                          />
                        </div>
                        <div>
                          <label htmlFor="reason" className="mb-1 label-modal">
                            Reason<span className="text-red-500">*</span>
                          </label>
                          <Controller
                            control={control}
                            name="reason"
                            rules={{ validate: validateReason }}
                            render={({ field }) => <input className="input-text-modal" {...field} />}
                          />
                        </div>
                        <div className="flex space-x-4">
                          <div className="py-2 w-full">
                            <h1 className="mb-1 label-modal">Time In</h1>
                            <div className="flex items-center space-x-2">
                              <TimeInput name="time_in" control={control} />
                            </div>
                          </div>
                          <div className="py-2 w-full">
                            <h1 className="mb-1 label-modal">Time Out</h1>
                            <div className="flex items-center space-x-2">
                              <TimeInput name="time_out" control={control} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="justify-start my-7 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                          {!isValid ? (
                            <button disabled={!isValid}
                              className={`inline-flex justify-center px-4 py-2 w-full text-base font-bold leading-6 text-white rounded-md border border-gray-700 shadow-sm transition duration-150 ease-in-out bg-slate-500 focus:outline-none hover:bg-gray-500 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
                              Invalid fields
                            </button>
                          ) : (
                            <button type="submit" disabled={isSubmitting}
                              className={`inline-flex justify-center px-4 py-2 w-full text-base font-bold leading-6 text-white bg-blue-600 rounded-md border border-blue-700 shadow-sm transition duration-150 ease-in-out focus:outline-none hover:bg-blue-800 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
                              {isSubmitting ? "Submitting..." : "Save"}
                            </button>
                          )}
                        </span>
                        <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                          <button type="button"
                            onClick={() => { reset(); handleClose(); }}
                            className="cancel-upload-csv-btn">
                            Close
                          </button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const TimeInput = ({ name, control }: { name: string; control: any }) => {
  return (
    <>
      <Controller
        control={control}
        name={`${name}_hours`}
        render={({ field }) => 
        <input {...field} 
        className="border bg-gray-50  border-gray-300 rounded-lg h-[40px] w-full" 
        placeholder="Hour" />}
      />
      <Controller
        control={control}
        name={`${name}_minutes`}
        render={({ field }) => <input {...field}
        className="border bg-gray-50 border-gray-300 rounded-lg h-[40px] w-full"
        placeholder="Minutes" />}
      />
    </>
  );
};
