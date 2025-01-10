import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

const StatutorySettings = ({ control }: { control: any }) => {
  const { setValue, watch } = useFormContext();

  const [monthlyChecked, setMonthlyChecked] = useState(false);
  const [hourlyChecked, setHourlyChecked] = useState(false);

  const sssTypeMonthly = watch('SSSTypeMonthly');
  const philHealthTypeMonthly = watch('PHILHEALTHTypeMonthly');
  const pagibigTypeMonthly = watch('PAGIBIGTypeMonthly');

  const sssTypeHourly = watch('SSSTypeHourly');
  const philHealthTypeHourly = watch('PHILHEALTHTypeHourly');
  const pagibigTypeHourly = watch('PAGIBIGTypeHourly');

  const salaryTypeOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quincenal', label: 'Quincenal' },
  ];

  const isQuincenalSelected = (value: string) => value === 'Quincenal';

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      width: '130px',
    }),
  };

  const isAnyQuincenalSelectedMonthly = [
    sssTypeMonthly, philHealthTypeMonthly, pagibigTypeMonthly
  ].some(isQuincenalSelected);

  const isAnyQuincenalSelectedHourly = [
    sssTypeHourly, philHealthTypeHourly, pagibigTypeHourly
  ].some(isQuincenalSelected);

  return (
    <div className="p-8 min-w-[1150px] max-w-[1150px] min-h-[450px] mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-500">Basic Salary (Salary Rate and Status)</h2>
      <div className="flex flex-col mt-4 md:flex-row md:space-x-8">
        {/* Left Side container (Monthly) */}
        <div className="flex flex-col space-y-4 w-full md:w-[48%]">
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              id="monthlySalary"
              className="form-checkbox"
              checked={monthlyChecked}
              onChange={() => setMonthlyChecked(!monthlyChecked)}
            />
            <label htmlFor="monthlySalary" className="text-sm font-bold">Monthly</label>
          </div>

          {monthlyChecked && (
            <div className="mt-4">
              <table className="w-full table-auto" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th className="text-sm font-normal w-[25%]"></th>
                    <th className="text-sm font-normal w-[30%]"></th>
                    <th className={`text-sm font-normal w-[15%] ${isAnyQuincenalSelectedMonthly ? '' : 'invisible'}`}>Apply</th>
                    <th className={`text-sm font-normal w-[30%] ${isAnyQuincenalSelectedMonthly ? '' : 'invisible'}`} style={{ minWidth: '200px', whiteSpace: 'nowrap' }}>
                      Minimum Reduction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['SSS', 'PHILHEALTH', 'PAGIBIG'].map((insurance, index) => {
                    const insuranceType = `${insurance}TypeMonthly`;
                    const isQuincenal = isQuincenalSelected(watch(insuranceType));
                    const applyCheckboxName = `${insurance}ApplyMonthly`; 

                    return (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{insurance}</td>

                        <td className="px-4 py-2">
                          <Controller
                            name={insuranceType}
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={salaryTypeOptions}
                                styles={customSelectStyles}
                                placeholder="Select.."
                                value={salaryTypeOptions.find(option => option.value === field.value) || null}
                                onChange={(selectedOption: any) => setValue(insuranceType, selectedOption?.value || '')}
                              />
                            )}
                          />
                        </td>

                        {isQuincenal && (
                          <>
                            <td className={`flex justify-center py-5 ${isQuincenal ? '':'invisible'}`}>
                              <Controller
                                name={`${insurance}ApplyMonthly`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    id={`apply${insurance}`}
                                    className="form-checkbox"
                                    checked={field.value === 'APPLY'}
                                    onChange={(e) => setValue(`${insurance}ApplyMonthly`, e.target.checked ? 'APPLY' : 'NOT APPLIED')}
                                  />
                                )}
                              />
                            </td>

                            <td className={`${isQuincenal ? '':'invisible'}`}>
                              <Controller
                                name={`${insurance}MinReductionMonthly`}
                                control={control}
                                rules={{
                                  required: watch(applyCheckboxName) === 'APPLY' ? 'required*' : false,
                                  min: watch(applyCheckboxName) === 'APPLY' ? { value: 0.01, message: 'required*' } : undefined,
                                }}
                                defaultValue={0.00}
                                render={({ field, fieldState }) => (
                                  <>
                                    <input
                                      type="number"
                                      {...field}
                                      className={`p-2 border border-gray-300 rounded-md max-w-[150px] ${fieldState?.error ? 'border-red-500' : ''}`}
                                      placeholder="Enter.."
                                    />
                                    {fieldState?.error && <span className="text-sm text-red-500">{fieldState?.error.message}</span>}
                                  </>
                                )}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Side container (Hourly) */}
        <div className="hidden border-r-2 border-gray-300 md:block"></div>

        <div className="flex flex-col space-y-4 w-full md:w-[48%]">
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              id="hourlySalary"
              className="form-checkbox"
              checked={hourlyChecked}
              onChange={() => setHourlyChecked(!hourlyChecked)}
            />
            <label htmlFor="hourlySalary" className="text-sm font-bold">Hourly</label>
          </div>

          {hourlyChecked && (
            <div className="flex px-4 mt-4 space-x-4">
              <div className="flex flex-col space-y-1 w-1/4">
                <label htmlFor="daysPerMonth" className="text-sm">Days per Month</label>
                <Controller
                  name="daysPerMonth"
                  control={control}
                  rules={{ required: 'Days per Month is required' }}
                  defaultValue={20}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type="number"
                        id="daysPerMonth"
                        {...field}
                        className={`p-2 border border-gray-300 rounded-md ${fieldState?.error ? 'border-red-500' : ''}`}
                        placeholder="Enter days"
                      />
                      {fieldState?.error && <span className="text-sm text-red-500">{fieldState?.error.message}</span>}
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1 w-1/4">
                <label htmlFor="hoursPerDay" className="text-sm">Hours per Day</label>
                <Controller
                  name="hoursPerDay"
                  control={control}
                  rules={{ required: 'Hours per Day is required' }}
                  defaultValue={8}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type="number"
                        id="hoursPerDay"
                        {...field}
                        className={`p-2 border border-gray-300 rounded-md ${fieldState?.error ? 'border-red-500' : ''}`}
                        placeholder="Enter hours"
                      />
                      {fieldState?.error && <span className="text-sm text-red-500">{fieldState?.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>
          )}

          {hourlyChecked && (
            <div className="mt-4">
              <table className="w-full table-auto" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th className="text-xs font-normal w-[25%]"></th>
                    <th className="text-xs font-normal w-[30%]"></th>
                    <th className={`text-sm font-normal w-[15%] ${isAnyQuincenalSelectedHourly ? '' : 'invisible'}`}>Apply</th>
                    <th className={`text-sm font-normal w-[30%] ${isAnyQuincenalSelectedHourly ? '' : 'invisible'}`} style={{ minWidth: '200px', whiteSpace: 'nowrap' }}>
                      Minimum Reduction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['SSS', 'PHILHEALTH', 'PAGIBIG'].map((insurance, index) => {
                    const insuranceType = `${insurance}TypeHourly`;
                    const isQuincenal = isQuincenalSelected(watch(insuranceType));
                    const applyCheckboxName = `${insurance}ApplyHourly`; 

                    return (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{insurance}</td>

                        <td className="px-4 py-2">
                          <Controller
                            name={insuranceType}
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={salaryTypeOptions}
                                styles={customSelectStyles}
                                placeholder="Select.."
                                value={salaryTypeOptions.find(option => option.value === field.value) || null}
                                onChange={(selectedOption: any) => setValue(insuranceType, selectedOption?.value || '')}
                              />
                            )}
                          />
                        </td>

                        {isQuincenal && (
                          <>
                            <td className={`flex justify-center py-5 ${isQuincenal ? '':'invisible'}`}>
                              <Controller
                                name={`${insurance}ApplyHourly`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    id={`apply${insurance}Hourly`}
                                    className="form-checkbox"
                                    checked={field.value === 'APPLY'}
                                    onChange={(e) => setValue(`${insurance}ApplyHourly`, e.target.checked ? 'APPLY' : 'NOT APPLIED')}
                                  />
                                )}
                              />
                            </td>

                            <td className={`${isQuincenal ? '':'invisible'}`}>
                              <Controller
                                name={`${insurance}MinReductionHourly`}
                                control={control}
                                rules={{
                                  required: watch(applyCheckboxName) === 'APPLY' ? 'required*' : false,
                                  min: watch(applyCheckboxName) === 'APPLY' ? { value: 0.01, message: 'required*' } : undefined,
                                }}
                                defaultValue={0.00}
                                render={({ field, fieldState }) => (
                                  <>
                                    <input
                                      type="number"
                                      {...field}
                                      className={`p-2 border border-gray-300 rounded-md max-w-[150px] ${fieldState?.error ? 'border-red-500' : ''}`}
                                      placeholder="Enter.."
                                    />
                                    {fieldState?.error && <span className="text-sm text-red-500">{fieldState?.error.message}</span>}
                                  </>
                                )}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default StatutorySettings