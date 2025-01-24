import * as Yup from 'yup';
import MultiSelect from '../MultiSelect';
import { getEmployees } from '../helpers/api';
import { useForm, Controller, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DailyLogsContext, LogsContext } from '../../../../contexts';
import { useEffect, useState, useContext } from "react";
import ReactDOM from 'react-dom';
import classNames from '../../../../../helpers/classNames';
import useUpdateLog from '../hooks/useUpdateLog';
import toast from "react-hot-toast";
import CustomToast from "../../../../Toast/CustomToast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormTooltipProps {
  id: string;
  tooltipVisible: string | null;
}

type SelectedState = {
  employee: string[];
};

type Log = {
  id: number;
  date?: string;
  employee?: any;
  reason?: string;
  timein?: string;
  timeout?: string;
  time_in_hours?: string,
  time_in_minutes?: string,
  time_out_hours?: string,
  time_out_minutes?: string,
}

export default function EditFormModal({ isOpen, onClose, }: ModalProps) {
  const [selected, setSelected] = useState<SelectedState>({
    employee: [],
  });
  const { payrollProcessType } = useContext(DailyLogsContext);
  const { logs, selectedLog, setSelectedLog } = useContext(LogsContext)
  const { mutate } = useUpdateLog();
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string[]>([])
  const [employeeNames, setNames] = useState<string[]>([])
  const queryClient = useQueryClient();

  const logsSchema = Yup.object().shape({
    id: Yup.number(),
    date: Yup.string().required('Date is required'),
    employee: Yup.array().required('Employee is required'),
    reason: Yup.string().required('Reason is required'),
    timein: Yup.number(),
    timeout: Yup.number(),
    time_in_hours: Yup.number(),
    time_in_minutes: Yup.number(),
    time_out_hours: Yup.number(),
    time_out_minutes: Yup.number(),
  });

  const { register, handleSubmit: hookFormSubmit, formState: { errors, isValid }, control, setValue, reset, watch } = useForm({
    resolver: yupResolver(logsSchema),
    defaultValues: {
      id: 0,
      date: "",
      employee: [],
      reason: "",
      timein: 0,
      timeout: 0,
      time_in_hours: 0,
      time_in_minutes: 0,
      time_out_hours: 0,
      time_out_minutes: 0,
    }
  });

  useEffect(() => {
    if (isOpen && selectedLog) {
      setFullName([`${selectedLog.employee.firstname} ${selectedLog.employee.lastname}`]);
    }
  }, [isOpen, selectedLog])

  const { data: employeeData, isPending } = useQuery({
    queryKey: ['employeeData'],
    queryFn: getEmployees
  });

  useEffect(() => {
    if (!isPending && employeeData) {
      setNames(employeeData.map((employee: any) => `${employee.id} - ${employee.firstname} ${employee.lastname}`));
    }
  }, [employeeData, isPending]);

  useEffect(() => {
    console.log(selectedLog)
  }, [selectedLog])

  useEffect(() => {
    const timeFields = ["timein", "timeout"];

    const setTimeFields = (
      timeProperty: "timein" | "timeout",
      hoursField: "time_in_hours" | "time_out_hours",
      minutesField: "time_in_minutes" | "time_out_minutes"
    ) => {
      const time = selectedLog[timeProperty];
      if (time !== null && time !== undefined) {
        const [hours, minutes] = time.split(":");
        setValue(hoursField, hours, { shouldValidate: true });
        setValue(minutesField, minutes, { shouldValidate: true });
      } else {
        setValue(hoursField, 0, { shouldValidate: true });
        setValue(minutesField, 0, { shouldValidate: true });
      }
    };

    if (selectedLog) {
      setTimeFields("timein", "time_in_hours", "time_in_minutes");
      setTimeFields("timeout", "time_out_hours", "time_out_minutes");

      for (const property in selectedLog) {
        const value = selectedLog[property] === null ? '' : selectedLog[property];
        if (!timeFields.includes(property)) {
          if (property === 'timeout_reason') {
            setValue('reason', value, { shouldValidate: true });
          } else if (property === 'employee') {
            // Convert employee object to array format
            setValue('employee', [value], { shouldValidate: true });
          } else if (property === 'id' || 
                     property === 'date' || 
                     property === 'reason' || 
                     property === 'timein' || 
                     property === 'timeout' || 
                     property === 'time_in_hours' || 
                     property === 'time_in_minutes' || 
                     property === 'time_out_hours' || 
                     property === 'time_out_minutes') {
            setValue(property as any, value, { shouldValidate: true });
          }
        }
      }
    }
  }, [selectedLog, setValue]);

  const onSubmit = (data: any) => {
    const {
      time_in_hours,
      time_in_minutes,
      time_out_hours,
      time_out_minutes,
    } = data;

    const finalValues = {
      ...data,
      id: selectedLog.id,
      employee: selectedLog.employee.id,
      timein: time_in_hours ? `${time_in_hours}:${time_in_minutes || '00'}` : null,
      timeout: time_out_hours ? `${time_out_hours}:${time_out_minutes || '00'}` : null,
    };

    mutate(finalValues, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        toast.custom(() => <CustomToast message={`Successfully updated employee.`} type='success' />, {
          duration: 4000
        });
        onClose();
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        toast.custom(() => <CustomToast message={`Failed to update employee.`} type='error' />, {
          duration: 4000
        });
      },
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  }

  const FormTooltip = ({ id, tooltipVisible }: FormTooltipProps) => {
    const labelElement = document.getElementById(id);
    if (!labelElement) return null;

    // Get the position of the label element relative to the viewport
    const rect = labelElement.getBoundingClientRect();

    return ReactDOM.createPortal(
      <div id={`${id}-tooltip`} role="tooltip"
        className={classNames('fixed z-50 w-64 rounded-lg bg-[#344960] p-4 text-xs text-white flex top-px -mt-4 -ml-64', tooltipVisible === id ? 'block' : 'hidden')}
        style={{ top: `${rect.top}px`, left: `${rect.left}px` }}>
        <p className="text-xs font-normal text-left">
          You can select multiple employees.
        </p>
        <div className="absolute w-3 h-3 bg-[#344960] transform rotate-45 top-7 -right-0.5"></div>
      </div>,
      document.body
    )
  }

  return (
    <>
      {(isOpen && selectedLog && employeeNames) && (
        <div className="block absolute z-50">
          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden w-1/2 text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:mx-6 md:mx-28">
                <div className="text-center sm:text-left">
                  <div className="flex justify-between p-5 w-full bg-blue-600">
                    <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
                      Edit Daily Logs
                    </h3>
                    <button type="button" onClick={handleClose}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mx-10">
                    <form onSubmit={hookFormSubmit(onSubmit)}>
                      <div className="my-4 space-y-3">
                        <div>
                          <label htmlFor="date" className="mb-1 label-modal">
                            Date<span className="text-red-500">*</span>
                            {errors.date && (
                              <span className="text-red-500 ml-1.5">
                                {errors.date.message}
                              </span>
                            )}
                          </label>
                          <input
                            {...register('date')}
                            className="input-text-modal"
                            type="date"
                            id="date"
                            placeholder="Select date"
                          />
                        </div>
                        <div>
                          <span
                            onMouseEnter={() => setTooltipVisible('employee')}
                            onMouseLeave={() => setTooltipVisible(null)}>
                            <label htmlFor="employee" className="mb-1 label-modal" id="employee">
                              Employee<span className="text-red-500">*</span>
                              {errors.employee && (
                                <span className="text-red-500 ml-1.5">
                                  {errors.employee.message}
                                </span>
                              )}
                            </label>
                            {tooltipVisible === 'employee' && <FormTooltip id="employee" tooltipVisible={tooltipVisible} />}
                          </span>

                          {(fullName && employeeNames) && (
                            <Controller
                              name="employee"
                              control={control}
                              render={({ field }) => (
                                <MultiSelect
                                  initialSelected={fullName}
                                  setSelected={setSelected}
                                  selected={selected.employee}
                                  items={employeeNames}
                                  itemType="employee"
                                  setFieldValue={(_, value) => setValue("employee", value)}
                                />
                              )}
                            />
                          )}
                        </div>
                        <div>
                          <label htmlFor="reason" className="mb-1 label-modal">
                            Reason<span className="text-red-500">*</span>
                            {errors.reason && (
                              <span className="text-red-500 ml-1.5">
                                {errors.reason.message}
                              </span>
                            )}
                          </label>
                          <input
                            {...register('reason')}
                            className="input-text-modal"
                            type="text"
                            id="reason"
                            placeholder="Enter Reason..."
                          />
                        </div>
                        <div className="flex space-x-3.5">
                          <div className="py-2 w-full">
                            <h1 className="mb-1 text-sm font-normal">
                              Time In
                            </h1>
                            <TimeInput name="timein" time={selectedLog.timein} register={register} />
                          </div>
                          <div className="py-2 w-full">
                            <h1 className="mb-1 text-sm font-normal">
                              Time Out
                            </h1>
                            <TimeInput name="timeout" time={selectedLog.timeout} register={register} />
                          </div>
                        </div>
                      </div>
                      <div className="justify-start my-7 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                          <button
                            type="submit"
                            disabled={!isValid}
                            className={`inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white rounded-md border shadow-sm transition duration-150 ease-in-out ${
                              !isValid
                                ? 'bg-slate-500 border-gray-700 hover:bg-gray-400'
                                : 'bg-blue-600 border-blue-700 hover:bg-blue-800'
                            } focus:outline-none hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}
                          >
                            {!isValid ? 'Invalid fields' : 'Save'}
                          </button>
                        </span>
                        <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                          <button type="button"
                            onClick={handleClose}
                            className="px-10 cancel-upload-csv-btn">
                            Close
                          </button>
                        </span>
                      </div>
                    </form>
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

const TimeInput = ({ 
  name, 
  time,
  register 
}: { 
  name: "timein" | "timeout"; 
  time: string;
  register: UseFormRegister<any>;
}) => {
  let hours, minutes;

  if (time) {
    [hours, minutes] = time.split(":");
  }

  return (
    <>
      {name && (
        <>
          <input
            {...register(`${name}_hours`)}
            className="px-3 border bg-gray-50 border-gray-300 rounded-lg h-[53.57px] w-full"
            type="text"
            placeholder="Hour"
          />
          <h1>:</h1>
          <input
            {...register(`${name}_minutes`)}
            className="px-3 border bg-gray-50 border-gray-300 rounded-lg h-[53.57px] w-full"
            type="text"
            placeholder="Minutes"
          />
        </>
      )}
    </>
  );
};