import * as Yup from 'yup';
import MultiSelect from '../MultiSelect';
import { getEmployees } from '../helpers/api';
import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { fetchDepartmentData } from '@/components/pages/self-service/location/hooks/useDepartmentQueries';
// import { fetchLocationData } from '@/components/pages/self-service/location/hooks/useLocationQueries';
// import { FormTooltip } from '@/components/pages/admin/setup/daily-logs/Tooltip';
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
  const { mutate} = useUpdateLog();
  const [queryKey, setQueryKey] = useState<string>("");
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string[]>([])
  const [employeeNames, setNames] = useState<string[]>([])
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen && selectedLog) {
      setFullName([`${selectedLog.employee.firstname} ${selectedLog.employee.lastname}`]);
      // setFullName([selectedLog.employee.firstname, selectedLog.employee.lastname]);
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

  const initialLogsValues = {
    id: 0,
    date: "",
    employee: [],
    reason: "",
    timein: "",
    timeout: "",
    time_in_hours: "", // temp property
    time_in_minutes: "", // temp property
    time_out_hours: "", // temp property
    time_out_minutes: "", // temp property
  };

  const logsSchema = Yup.object({
    date: Yup.string().required("(Required)"),
    employee: Yup.mixed().required('(Required)'),//Yup.array()
    // .of(Yup.string())
    // .test('is-in-array', '(Invalid value)', function (value) {
    // 	const { employeeNames, selectedLog } = this.parent.context || {};
    // 	const selectedEmployeeNames = Array.isArray(value) ? value : [value];
    // 	const allEmployeeNames = [...(employeeNames || [])];
    // 	if (selectedLog && selectedLog.employee) {
    // 		allEmployeeNames.push(`${selectedLog.employee.firstname} ${selectedLog.employee.lastname}`);
    // 	}
    // 	return selectedEmployeeNames.every(v => allEmployeeNames.includes(v));
    // })

    // .test('is-in-array', '(Invalid value)', function (value) {
    // 	if (!Array.isArray(value)) return false;
    // 	if (value.length === 0) return false;
    // 	return value.every(v => employeeNames.includes(v ?? ''));  // Handle potential undefined values safely
    // })
    // .required('(Required)'),
    reason: Yup.string().required("(Required)"),
    timein: Yup.number(),
    timeout: Yup.number(),
    time_in_hours: Yup.number(),
    time_in_minutes: Yup.number(),
    time_out_hours: Yup.number(),
    time_out_minutes: Yup.number(),
  });

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

  const handleSubmit = async (data: any) => {
    const newLog = {
      id: selectedLog.id,
      employee: selectedLog.employee.id,
      date: data.date,
      timeout_reason: data.reason,
      timein: data.timein,
      timeout: data.timeout,
    };
    mutate(newLog, {
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
  };

  const handleClose = () => {
    onClose();
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
                  <Formik
                    initialValues={initialLogsValues}
                    validationSchema={logsSchema}
                    context={{ employeeNames: employeeNames || [], selectedLog }}
                    onSubmit={(values, actions) => {
                      const {
                        time_in_hours,
                        time_in_minutes,
                        time_out_hours,
                        time_out_minutes,
                        //employee,
                        ...rest
                      } = values;

                      const finalValues = {
                        ...rest,
                        //employee: selectedLog.employee,//Array.isArray(employee) ? employee.join(',') : employee,
                        timein: time_in_hours ? `${time_in_hours}:${time_in_minutes || '00'}` : null,
                        timeout: time_out_hours ? `${time_out_hours}:${time_out_minutes || '00'}` : null,
                      };
                      // console.log(finalValues)
                      handleSubmit(finalValues);
                      actions.resetForm({
                        values: initialLogsValues,
                      });
                    }} enableReinitialize>
                    {({ isSubmitting, resetForm, isValid, setValues, errors, values, setFieldValue }) => {
                      useEffect(() => {
                        const timeFields = [
                          "timein",
                          "timeout",
                        ];

                        const setTimeFields = (timeProperty: string, hoursField: string, minutesField: string) => {
                          const time = selectedLog[timeProperty];
                          if (time !== null && time !== undefined) {
                            const [hours, minutes] = time.split(":");
                            setFieldValue(hoursField, hours, false);
                            setFieldValue(minutesField, minutes, false);
                          } else {
                            setFieldValue(hoursField, '', false);
                            setFieldValue(minutesField, '', false);
                          }
                        };

                        if (selectedLog) {
                          setTimeFields("timein", "time_in_hours", "time_in_minutes");
                          setTimeFields("timeout", "time_out_hours", "time_out_minutes");

                          for (const property in selectedLog) {
                            const value = selectedLog[property] === null ? '' : selectedLog[property];
                            if (!timeFields.includes(property)) {
                              if (property === 'timeout_reason') {
                                setFieldValue('reason', value, false);
                              } else {
                                setFieldValue(property, value, false);
                              }
                            }
                          }
                        }
                      }, [selectedLog]);
                      useEffect(() => {
                        if (errors) console.log(errors)
                      }, [errors])

                      useEffect(() => {
                        if (values) console.log(values)
                      }, [values])

                      return (
                        <span className="mt-7">
                          <div className="flex justify-between p-5 w-full bg-blue-600">
                            <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
                              Edit Daily Logs
                            </h3>
                            <button type="button" onClick={() => { resetForm(); handleClose(); }}>
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
                            <Form>
                              <div className="my-4 space-y-3">
                                <div>
                                  <label htmlFor="date" className="mb-1 label-modal">
                                    Date<span className="text-red-500">*</span>
                                    <ErrorMessage
                                      name="date"
                                      component="span"
                                      className="text-red-500 ml-1.5"
                                    />
                                  </label>
                                  <Field
                                    className="input-text-modal"
                                    name="date"
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
                                      <ErrorMessage
                                        name="employee"
                                        component="span"
                                        className="text-red-500 ml-1.5"
                                      />
                                    </label>
                                    {tooltipVisible === 'employee' && <FormTooltip id="employee" tooltipVisible={tooltipVisible} />}
                                  </span>

                                  {(fullName && employeeNames) && (
                                    <MultiSelect
                                      initialSelected={fullName}
                                      setSelected={setSelected}
                                      selected={selected.employee}
                                      items={employeeNames} itemType="employee"
                                      setFieldValue={setFieldValue}
                                    />
                                  )}
                                </div>
                                <div>
                                  <label htmlFor="reason" className="mb-1 label-modal">
                                    Reason<span className="text-red-500">*</span>
                                    <ErrorMessage
                                      name="reason"
                                      component="span"
                                      className="text-red-500 ml-1.5"
                                    />
                                  </label>
                                  <Field
                                    className="input-text-modal"
                                    name="reason"
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
                                    <div className="flex space-x-1.5 items-center">
                                      <TimeInput
                                        name="time_in"
                                        time={selectedLog && selectedLog?.timein}
                                      />
                                    </div>
                                  </div>
                                  <div className="py-2 w-full">
                                    <h1 className="mb-1 text-sm font-normal">
                                      Time Out
                                    </h1>
                                    <div className="flex space-x-1.5 items-center">
                                      <TimeInput
                                        name="time_out"
                                        time={selectedLog && selectedLog?.timeout}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="justify-start my-7 sm:flex sm:flex-row-reverse">
                                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                  {!isValid ? (
                                    <button disabled={!isValid}
                                      className={`inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white rounded-md border border-gray-700 shadow-sm transition duration-150 ease-in-out bg-slate-500 focus:outline-none hover:bg-gray-400 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
                                      Invalid fields
                                    </button>
                                  ) : (
                                    <button type="submit" disabled={isSubmitting}
                                      className={`inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white bg-blue-600 rounded-md border border-blue-700 shadow-sm transition duration-150 ease-in-out focus:outline-none hover:bg-blue-800 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
                                      {isSubmitting ? "Submitting..." : "SAVE"}
                                    </button>
                                  )}
                                </span>
                                <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                  <button type="button"
                                    onClick={() => { resetForm(); handleClose(); }}
                                    className="px-10 cancel-upload-csv-btn">
                                    CLOSE
                                  </button>
                                </span>
                              </div>
                            </Form>
                          </div>
                        </span>
                      );
										}}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const TimeInput = ({ name, time }: { name: any; time: string }) => {
  let hours, minutes;

  if (time) {
    [hours, minutes] = time.split(":");
  }

  return (
    <>
      {name && (
        <>
          <Field
            className="px-3 border bg-gray-50  border-gray-300 rounded-lg h-[53.57px] w-full"
            name={`${name}_hours`}
            type="text"
            id={`${name}_hours`}
            placeholder="Hour"
          />
          <h1>:</h1>
          <Field
            className="px-3 border bg-gray-50 border-gray-300 rounded-lg h-[53.57px] w-full"
            name={`${name}_minutes`}
            type="text"
            id={`${name}_minutes`}
            placeholder="Minutes"
          />
        </>
      )}
    </>
  );
};