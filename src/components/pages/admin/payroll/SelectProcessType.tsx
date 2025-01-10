import { useContext } from "react";
import { DailyLogsContext } from "../../../contexts";

export default function SelectProcessType() {
  const { setPayrollProcessType, payrollProcessType, setStep } = useContext(DailyLogsContext);

  const selectedClass = (payrollProcessType: string, type: string) => {
    if (payrollProcessType === type) {
      return 'ring-2 ring-blue-400 drop-shadow-md';
    } else {
      return 'outline outline-1 outline-slate-300';
    }
  }

  const handleSelectedType = (type: string) => {
    setPayrollProcessType(type);
    setStep(2);
  }

  return (
    <>
      <div className="mb-7">
        <p className="text-xl font-semibold text-center">
          What's your previous payroll process before
        </p>
        <p className="text-xl font-semibold text-center">YAHSHUA Payroll?</p>
      </div>
      <div className="flex gap-6 justify-center justify-items-center items-center">
        {/* Manual Option */}
        <div
          id="manualType"
          onClick={() => handleSelectedType("manual")}
          className={`bg-white text-center h-[232px] px-8 py-6 rounded-lg outline outline-1 outline-slate-300 cursor-pointer w-60 space-y-3 flex flex-col justify-center items-center ${selectedClass(payrollProcessType, "manual")}`}
        >
          <svg className="w-16 h-16 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
          </svg>
          <p className="text-lg font-semibold text-blue-600">Manual</p>
          <p>Manual calculation of salaries and deductions.</p>
        </div>

        {/* Biometrics Option */}
        <div
          id="biometricsType"
          onClick={() => handleSelectedType("biometrics")}
          className={`bg-white text-center h-[232px] px-8 py-6 rounded-lg outline outline-1 outline-slate-300 cursor-pointer w-60 space-y-3 flex flex-col justify-center items-center ${selectedClass(payrollProcessType, "biometrics")}`}
        >
          <svg className="w-16 h-16 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a28.076 28.076 0 0 1-1.091 9M7.231 4.37a8.994 8.994 0 0 1 12.88 3.73M2.958 15S3 14.577 3 12a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088A5.98 5.98 0 0 1 18 12a30 30 0 0 1-.464 6.232M6 12a6 6 0 0 1 9.352-4.974M4 21a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M7.5 19.336C9 17.092 9 14.845 9 12a3 3 0 1 1 6 0c0 .749 0 1.521-.031 2.311M12 12c0 3 0 6-2 9" />
          </svg>
          <p className="text-lg font-semibold text-blue-600">Biometrics</p>
          <p>Managed payroll using fingerprint or ID scan.</p>
        </div>

        {/* Cloud-based Payroll Option */}
        <div
          id="otherType"
          onClick={() => handleSelectedType("other")}
          className={`bg-white text-center h-[232px] px-8 py-6 rounded-lg outline outline-1 outline-slate-300 cursor-pointer w-60 space-y-3 flex flex-col justify-center items-center ${selectedClass(payrollProcessType, "other")}`}
        >
          <svg className="w-16 h-16 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
          </svg>
          <p className="text-lg font-semibold text-blue-600">Other Cloud-based Payroll</p>
          <p>Managed payroll through another cloud service.</p>
        </div>
      </div>
    </>
  );
}

