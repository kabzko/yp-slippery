import toast from "react-hot-toast";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomToast from "../../../../../Toast/CustomToast";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"; 
import { SelfServiceContext } from "../../../../../contexts";
import { useQueryClient } from "@tanstack/react-query";
// import useTagRestday from "../../../../../hooks/useTagRestDay";
import classNames from "../../../../../../helpers/classNames";
import useUpdateSchedule from "../hooks/useUpdateSchedule";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function EditScheduleModal({
  data,
  isOpen,
  onClose,
}: ModalProps) {
  const modalClassName = isOpen && data !== null ? "block absolute z-10" : "hidden";
  const { selectedRows, setSelectedRows } = useContext(SelfServiceContext);
  const [inputRestday, setInputRestday] = useState("");
  // const { tagsRestday, handleKeyDownRestDay, handleRemoveTagRestday } =
  //   useTagRestday(inputRestday, setInputRestday);
  const queryClient = useQueryClient();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleSettingsOpen, setIsScheduleSettingsOpen] = useState(false);
  const [scheduleSettings, setScheduleSettings] = useState({
    flexible_time: false,
    breakhours: 0.0,
    isFlexibleHoursChecked: false,
    isFixedHoursChecked: false,
    isBreakTimeChecked: false,
  });

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm({
      defaultValues: {
        old_name: data.name,
        timein: data.timein,
        timeout: data.timeout,
        workhours: data.workhours,
        flexible_time: data.flexible_time,
        workdays: data.workdays,
        breakhours: data.breakhours,
        break_type: data.break_type,
      },
    });

  const [workdays, setWorkdays] = useState<number[]>(getValues("workdays") || []); // Local state for workdays

  useEffect(() => {
    setWorkdays(getValues("workdays") || []); // Sync local state with form state
  }, [getValues("workdays")]); // Watch for changes in workdays

  useEffect(() => {
    if (isOpen && data) {
      reset(data[0]); 
    }
  }, [selectedRows, isOpen, data]);

  const { mutate, isPending} = useUpdateSchedule();

  const onSubmit = async (data: any) => {
    if (!data.timein || !data.timeout) {
      toast.custom(
        () => <CustomToast message="Please provide both Time In and Time Out." type="error" />,
        { duration: 4000 }
      );
      return;
    }

    const timeIn = data.timein.split(":").map(Number);
    const timeOut = data.timeout.split(":").map(Number);
    const breakHours = Number(scheduleSettings.breakhours) || 0;

    if (timeIn.length !== 2 || timeOut.length !== 2) {
      toast.custom(
        () => <CustomToast message="Time In and Time Out must be in HH:MM format." type="error" />,
        { duration: 4000 }
      );
      return;
    }

    const totalWorkHours =
      timeOut[0] - timeIn[0] + (timeOut[1] - timeIn[1]) / 60;

    if (scheduleSettings.flexible_time) {
      console.log("Flexible time is checked, proceeding to submit.");
    } else if (scheduleSettings.isFlexibleHoursChecked) {
      const totalExpectedHours = totalWorkHours - breakHours;
      if (Number(data.workhours) !== totalExpectedHours) {
        toast.custom(
          () => <CustomToast message={`Hours Per Day Must be ${totalExpectedHours.toFixed(2)} Hours.`} type="error" />,
          { duration: 4000 }
        );
        return; 
      }
    } else if (scheduleSettings.isFixedHoursChecked) {
      const totalExpectedHours = totalWorkHours - breakHours;
      if (Number(data.workhours) !== totalExpectedHours) {
        toast.custom(
          () => <CustomToast message={`Hours Per Day Must be ${totalExpectedHours.toFixed(2)} Hours.`} type="error" />,
          { duration: 4000 }
        );
        return; 
      }
    } else {
      if (data.workhours && Number(data.workhours) !== totalWorkHours) {
        toast.custom(
          () => <CustomToast message={`Hours Per Day Must be ${totalWorkHours.toFixed(2)} Hours.`} type="error" />,
          { duration: 4000 }
        );
        return; 
      }
    }

    const selectedWorkdays = data.workdays || [];

    const submitData = {
      id: selectedRows[0],
      ...data,
      workdays: selectedWorkdays,
      ...scheduleSettings,
    };

      mutate(submitData, {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['schedulesData'] });
        toast.custom(
          () => <CustomToast message={data.message} type="success" />,
          { duration: 4000 }
        );
        reset();
        onClose();
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
  };

  const handleSaveSettings = () => {
    const breakType = scheduleSettings.isFixedHoursChecked
        ? "fixed"
        : scheduleSettings.isFlexibleHoursChecked
        ? "flexible"
        : "nobreak"; 

    setScheduleSettings((prev) => ({
        ...prev,
        flexible_time: scheduleSettings.flexible_time,
        breakhours: scheduleSettings.breakhours,
        break_type: breakType, 
    }));

    console.log("Saved Settings:", scheduleSettings);
    console.log("Break Type:", breakType);
    setIsScheduleSettingsOpen(false);
  };

  const handleWorkdayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = index; // Use the index directly

    // Create a new array based on the current selection
    const updatedWorkdays = e.target.checked
      ? [...workdays, value] // Add the day if checked
      : workdays.filter((day: number) => day !== value); // Remove the day if unchecked

    // Update the workdays state with the new array
    setWorkdays(updatedWorkdays); // Update local state
    setValue("workdays", updatedWorkdays); // Update the form state
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isOpen && (
          <div className={`block absolute z-10 modal ${modalClassName}`} >
            <div className="overflow-y-auto fixed inset-0 z-50">
              <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6 w-[416px]">
                  <div className="text-center sm:text-left">
                    <div className="flex justify-between p-2 w-full bg-blue-600">
                      <h3 className="text-lg font-medium leading-6 text-white">
                        Edit Schedules
                      </h3>
                      <button type="button" onClick={handleClose}>
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
                    <div className="flex justify-end px-4 py-2">
                      <div
                        onClick={() => setIsScheduleSettingsOpen(true)}
                        className="cursor-pointer"
                      >
                        <SettingsIcon />
                      </div>
                    </div>
                    <div className="px-4 py-4 mx-6">
                      <div className="flex flex-col">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <div>
                                <label
                                  htmlFor="schedule_code"
                                  className="mb-1 text-sm font-normal"
                                >
                                  Schedule Code
                                </label>
                                <Controller
                                  control={control}
                                  name="old_name"
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      className={`pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]`}
                                      type="text"
                                      id="schedule_code"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <div className="py-2 xl:w-1/2 lg:w-full">
                              <h1 className="mb-1 text-sm font-normal">
                                Time In
                              </h1>
                              <div className="flex space-x-2">
                                <Controller
                                  control={control}
                                  name="timein"
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      className="px-2 border-2 border-[#878787] rounded-[5px] h-[53.57px] w-full"
                                      type="text"
                                      placeholder="HH:MM"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div className="py-2 xl:w-1/2 lg:w-full">
                              <h1 className="mb-1 text-sm font-normal">
                                Time Out
                              </h1>
                              <div className="flex space-x-2">
                                <Controller
                                  control={control}
                                  name="timeout"
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      className="px-2 border-2 border-[#878787] rounded-[5px] h-[53.57px] w-full"
                                      type="text"
                                      placeholder="HH:MM"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label
                                htmlFor="workhours"
                                className="mb-1 text-sm font-normal"
                              >
                                Work Hours
                              </label>
                              <Controller
                                control={control}
                                name="workhours"
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    className={`pl-2 border-2 h-[46px] w-full border-[#878787] rounded-[5px]`}
                                    type="number"
                                    id="workhours"
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="rest_day"
                              className="mb-1 text-sm font-normal"
                            >
                              Rest Day
                            </label>
                            <div className="flex flex-col">
                              {[
                                "Sunday",
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                              ].map((day, index) => (
                                <div key={day} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={day}
                                    value={index} // Corresponding number for the day
                                    checked={workdays.includes(index)} // Check if the day is selected
                                    onChange={(e) => handleWorkdayChange(e, index)} // Call the new function
                                  />
                                  <label htmlFor={day} className="ml-2">
                                    {day}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-10 mt-2 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                          <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-10 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            {isPending ? 'Saving...' : 'Save'}
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
          </div>
        )}
      </form>

      {isScheduleSettingsOpen && (
        <div className={`block absolute z-10 modal`}>
          <div className="overflow-y-auto fixed inset-0 z-50">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6 w-[406px]">
                <div className="text-center sm:text-left">
                  <div className="flex justify-between p-2 w-full bg-blue-600">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Schedule Settings
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsScheduleSettingsOpen(false)}
                    >
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
                  <div className="px-4 py-4 mx-6">
                    {/* Add your form fields for Schedule Settings here */}
                    <div className="flex flex-col">
                      <div className="mb-4">
                        <input
                          type="checkbox"
                          id="flexible_time"
                          checked={scheduleSettings.flexible_time}
                          onChange={(e) => {
                            setScheduleSettings((prev) => ({
                              ...prev,
                              flexible_time: e.target.checked,
                            }));
                          }}
                        />
                        <label
                          htmlFor="flexible_time"
                          className="pl-2 text-sm font-normal"
                        >
                          Flexible Schedule
                        </label>
                      </div>
                      <div>
                        <div className="mb-4">
                          <input
                            type="checkbox"
                            id="break_time"
                            checked={scheduleSettings.isBreakTimeChecked}
                            onChange={(e) => {
                              setScheduleSettings((prev) => ({
                                ...prev,
                                isBreakTimeChecked: e.target.checked,
                              }));
                            }}
                          />
                          <label
                            htmlFor="break_time"
                            className="pl-2 text-sm font-normal"
                          >
                            BreakTime
                          </label>
                        </div>
                        <div className="flex flex-col pl-4 space-y-6">
                          <div>
                            <input
                              type="checkbox"
                              id="flexible_hours"
                              checked={scheduleSettings.isFlexibleHoursChecked}
                              onChange={(e) => {
                                setScheduleSettings((prev) => ({
                                  ...prev,
                                  isFlexibleHoursChecked: e.target.checked,
                                  isFixedHoursChecked: false,
                                }));
                              }}
                            />
                            <label
                              htmlFor="flexible_hours"
                              className="pl-2 text-sm font-normal"
                            >
                              Flexible Hours
                            </label>
                            <div
                              className={classNames(
                                "mt-2",
                                scheduleSettings.isFlexibleHoursChecked
                                  ? "block"
                                  : "hidden"
                              )}
                            >
                              <label
                                htmlFor="flexible_hours"
                                className="pl-2 text-sm font-normal"
                              >
                                No. of Hours
                              </label>
                              <input
                                disabled={
                                  !scheduleSettings.isFlexibleHoursChecked
                                }
                                type="number"
                                placeholder="24"
                                value={scheduleSettings.breakhours}
                                onChange={(e) => {
                                  setScheduleSettings((prev) => ({
                                    ...prev,
                                    breakhours: Number(e.target.value),
                                  }));
                                }}
                                className="px-2 border-2 border-[#878787] rounded-[5px] h-[53.57px] w-full"
                              />
                            </div>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="fixed_hours"
                              checked={scheduleSettings.isFixedHoursChecked}
                              onChange={(e) => {
                                setScheduleSettings((prev) => ({
                                  ...prev,
                                  isFixedHoursChecked: e.target.checked,
                                  isFlexibleHoursChecked: false,
                                }));
                              }}
                            />
                            <label
                              htmlFor="fixed_hours"
                              className="pl-2 text-sm font-normal"
                            >
                              Fixed Hours
                            </label>
                            <div
                              className={classNames(
                                "mt-2",
                                scheduleSettings.isFixedHoursChecked
                                  ? "block"
                                  : "hidden"
                              )}
                            >
                              <label
                                htmlFor="fixed_hours"
                                className="pl-2 text-sm font-normal"
                              >
                                No. of Breaks
                              </label>
                              <input
                                disabled={!scheduleSettings.isFixedHoursChecked}
                                type="number"
                                placeholder="24"
                                value={scheduleSettings.breakhours}
                                onChange={(e) => {
                                  setScheduleSettings((prev) => ({
                                    ...prev,
                                    breakhours: Number(e.target.value),
                                  }));
                                }}
                                className="px-2 border-2 border-[#878787] rounded-[5px] h-[53.57px] w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-10 pt-10 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button
                          type="submit"
                          className="inline-flex px-2 justify-center w-full rounded-md border border-transparent py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          onClick={handleSaveSettings}
                        >
                          Save Settings
                        </button>
                      </span>
                      <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button
                          type="button"
                          className="cancel-upload-csv-btn"
                          onClick={() => setIsScheduleSettingsOpen(false)}
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
        </div>
      )}
    </>
  );
}

const TimeInput = ({ control, name }: { control: any; name: string }) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <input
              {...field}
              className="px-2 border-2 border-[#878787] rounded-[5px] h-[53.57px] w-full"
              type="text"
              placeholder="24"
            />
          </>
        )}
      />
    </>
  );
};

