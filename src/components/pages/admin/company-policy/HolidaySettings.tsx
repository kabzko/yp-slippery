import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

const HolidaySettings = ({ control }: { control: any }) => {
  const { setValue, trigger, formState: { errors } } = useFormContext();

  const [noHolidayPayChecked, setNoHolidayPayChecked] = useState(false);
  const [noHolidayPayAfterChecked, setNoHolidayPayAfterChecked] = useState(false);
  const [activateNoWorkNoPayChecked, setActivateNoWorkNoPayChecked] = useState(false);
  const [holidayOnRestDayChecked, setHolidayOnRestDayChecked] = useState(false);

  const jobLevelOptions = [
    { value: 'Hour', label: 'Hourlies' },
    { value: 'Month', label: 'Monthlies' },
    { value: 'Supervisor', label: 'Supervisor' },
  ];

  const employmentTypeOptions = [
    { value: 'Regular', label: 'Regular' },
    { value: 'Probationary', label: 'Probationary' },
    { value: 'PartTime', label: 'Part-Time' },
  ];

  const holidayTypeOptions = [
    { value: 'regular', label: 'Regular Holiday' },
    { value: 'special', label: 'Special Non-working Holiday' },
  ];

  const ensureArrayValue = (value: any) => {
    return Array.isArray(value) ? value : [];
  };

  const inputErrorClass = 'border-red-500'; 

 
  useEffect(() => {
    if (holidayOnRestDayChecked) {
      trigger(['daysAbsentHoliday', 'holidayType']); 
    }
    if (noHolidayPayChecked) {
      trigger(['daysAbsent', 'jobLevel']);
    }
    if (noHolidayPayAfterChecked) {
      trigger(['daysAbsentEmployment']);
    }
    if (activateNoWorkNoPayChecked) {
      trigger(['employmentType']);
    }
  }, [
    holidayOnRestDayChecked,
    noHolidayPayChecked,
    noHolidayPayAfterChecked,
    activateNoWorkNoPayChecked,
    trigger,
  ]);

  return (
    <div className="p-8 max-w-[1000px] min-w-[1000px] min-h-[420px] mx-auto bg-white rounded-lg shadow-md">
      <div className="flex space-x-8">
        {/* Left Side container */}
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="noHolidayPay"
              className="form-checkbox"
              checked={noHolidayPayChecked}
              onChange={() => setNoHolidayPayChecked(!noHolidayPayChecked)}
            />
            <label htmlFor="noHolidayPay" className="text-xs">No Holiday Pay (if absent before the day)</label>
          </div>

          {noHolidayPayChecked && (
            <>
              <div className="flex space-x-8 mt-4 ml-5">
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="daysAbsent" className="text-xs font-bold text-gray-700">Days Absent</label>
                  <Controller
                    name="daysAbsent"
                    defaultValue={1}
                    control={control}
                    rules={{
                       required: noHolidayPayChecked ? "This field is required." : true,
                       min: { value: 1, message: "required*"}
                      }}
                    render={({ field }) => (
                      <>
                        <input
                          type="number"
                          {...field}
                          className={`p-2 border border-gray-300 rounded-md ${errors.daysAbsent ? inputErrorClass : ''}`}
                          placeholder="No. Days"
                        />
                        {errors.daysAbsent && (
                          <span className="text-xs text-red-500">No. Days required*</span>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="jobLevel" className="text-xs font-bold text-gray-700">Job Level</label>
                  <Controller
                    name="jobLevel"
                    control={control}
                    rules={{
                      required: noHolidayPayChecked ? "Job Level is required." : false
                    }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          options={jobLevelOptions}
                          isMulti
                          className={`border-gray-300 rounded-md ${errors.jobLevel ? inputErrorClass : ''}`}
                          placeholder="Select Job Level"
                          value={ensureArrayValue(field.value)}  
                          getOptionLabel={(e) => e.label}
                          getOptionValue={(e) => e.value}
                        />
                        {errors.jobLevel && (
                          <span className="text-xs text-red-500">Job Level required*</span>
                        )}
                      </>
                    )}
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-gray-500 text-xs underline"
                      onClick={() => {
                        const allValues = jobLevelOptions.map(option => option);
                        setValue('jobLevel', allValues);
                      }}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 text-xs underline"
                      onClick={() => setValue('jobLevel', [])} 
                    >
                      Deselect All
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 relative group ml-5">
                <input type="checkbox" id="leavePriorToHoliday" className="form-checkbox" />
                  <label htmlFor="leavePriorToHoliday" className="text-xs">Applied any type of Leave prior to Holiday</label>

                   <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-blue-500 text-blue-500 text-xs font-semibold">
                     i
                   </div>
 
                <span className="absolute z-10 w-[210px] scale-0 rounded-lg bg-[#344960] p-2 text-xs text-white group-hover:scale-100 flex -top-4 left-1/2 transform translate-x-5">
                   <p className="text-left text-xs font-normal">
                     Paid or unpaid leave applied prior to the Holiday shall be paid.
                   </p>
                 <div className="absolute w-3 h-3 bg-[#344960] transform rotate-45 -left-1.5 top-1/2 -translate-y-1/2" />
               </span>
             </div>
            </>
          )}

          <div className="text-blue-500 text-xs font-bold mt-4">
            <label>No Holiday Pay (If absent AFTER the day)</label>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2 mt-2">
              <input
                type="checkbox"
                id="noHolidayPayAfter"
                className="form-checkbox"
                checked={noHolidayPayAfterChecked}
                onChange={() => setNoHolidayPayAfterChecked(!noHolidayPayAfterChecked)}
              />
              <label htmlFor="noHolidayPayAfter" className="text-xs">No Holiday Pay (If absent before the day)</label>
            </div>

            <div className="flex space-x-2 mt-2">
              <input
                type="checkbox"
                id="activateNoWorkNoPay"
                className="form-checkbox ml-6"
                checked={activateNoWorkNoPayChecked}
                onChange={() => setActivateNoWorkNoPayChecked(!activateNoWorkNoPayChecked)}
              />
              <label htmlFor="activateNoWorkNoPay" className="text-xs">Activate No work, No pay policy for Monthlies</label>
            </div>
          </div>

          <div className="flex space-x-8 mt-4 ml-5">
            <div className="flex flex-col space-y-2 w-1/2">
              {noHolidayPayAfterChecked && (
                <>
                  <label htmlFor="daysAbsentEmployment" className="text-xs font-bold text-gray-700">Days Absent</label>
                  <Controller
                    name="daysAbsentEmployment"
                    defaultValue={1}
                    control={control}
                    rules={{
                       required: noHolidayPayAfterChecked ? "This field is required." : false,
                       min: { value: 1, message: "required*"}
                     }}
                    render={({ field }) => (
                      <>
                        <input
                          type="number"
                          {...field}
                          className={`p-2 border border-gray-300 rounded-md ${errors.daysAbsentEmployment ? inputErrorClass : ''}`}
                          placeholder="No. Days"
                        />
                        {errors.daysAbsentEmployment && (
                          <span className="text-xs text-red-500">No. Days required*</span>
                        )}
                      </>
                    )}
                  />
                </>
              )}
            </div>

            <div className="flex flex-col space-y-2 w-1/2">
              {activateNoWorkNoPayChecked && (
                <>
                  <label htmlFor="employmentType" className="text-xs font-bold text-gray-700">Employment Type</label>
                  <Controller
                    name="employmentType"
                    control={control}
                    rules={{
                      required: activateNoWorkNoPayChecked ? "Employment Type is required." : false
                    }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          options={employmentTypeOptions}
                          isMulti
                          className={`border-gray-300 rounded-md ${errors.employmentType ? inputErrorClass : ''}`}
                          placeholder="Select Employment Type"
                          value={ensureArrayValue(field.value)}  
                          getOptionLabel={(e) => e.label}
                          getOptionValue={(e) => e.value}
                        />
                        {errors.employmentType && (
                          <span className="text-xs text-red-500">Employment Type equired*</span>
                        )}
                      </>
                    )}
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-gray-500 text-xs underline"
                      onClick={() => {
                        const allValues = employmentTypeOptions.map(option => option);
                        setValue('employmentType', allValues);
                      }}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 text-xs underline"
                      onClick={() => setValue('employmentType', [])}
                    >
                      Deselect All
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='border-r-2 border-gray-300'></div>

        {/* Right Container for Paid Holiday Settings */}
        <div className="max-h-full w-1/2">
          <div className="p-4">
            <h2 className="text-blue-500 text-lg font-bold">Paid Holiday Settings</h2>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="holidayOnRestDay"
                className="form-checkbox"
                checked={holidayOnRestDayChecked}
                onChange={() => setHolidayOnRestDayChecked(!holidayOnRestDayChecked)}
              />
              <label htmlFor="holidayOnRestDay" className="text-xs">Holiday falls on Rest Day</label>
            </div>

            {holidayOnRestDayChecked && (
              <>
                <div className="flex flex-col space-y-2 mt-4">
                  <label htmlFor="daysAbsentHoliday" className="text-xs font-bold text-gray-700">Days Absent</label>
                  <Controller
                    name="daysAbsentHoliday"
                    defaultValue={1}
                    control={control}
                    rules={{
                      required: holidayOnRestDayChecked ? "This field is required." : false,
                      min: { value: 1, message: "required*"}
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type="number"
                          {...field}
                          className={`p-2 border border-gray-300 rounded-md ${errors.daysAbsentHoliday ? inputErrorClass : ''}`}
                          placeholder="No. Days"
                        />
                        {errors.daysAbsentHoliday && (
                          <span className="text-xs text-red-500">No. Days required*</span>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-2 mt-4">
                  <label htmlFor="holidayType" className="text-xs font-bold text-gray-700">Holiday Type</label>
                  <Controller
                    name="holidayType"
                    control={control}
                    rules={{
                      required: holidayOnRestDayChecked ? "Holiday Type is required." : false
                    }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          options={holidayTypeOptions}
                          isMulti
                          className={`border-gray-300 rounded-md ${errors.holidayType ? inputErrorClass : ''}`}
                          placeholder="Select Holiday Type"
                          value={ensureArrayValue(field.value)}  
                          getOptionLabel={(e) => e.label}
                          getOptionValue={(e) => e.value}
                        />
                        {errors.holidayType && (
                          <span className="text-xs text-red-500">Holidat Type Required*</span>
                        )}
                      </>
                    )}
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-gray-500 text-xs underline"
                      onClick={() => {
                        const allValues = holidayTypeOptions.map(option => option);
                        setValue('holidayType', allValues); 
                      }}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 text-xs underline"
                      onClick={() => setValue('holidayType', [])} 
                    >
                      Deselect All
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidaySettings;


