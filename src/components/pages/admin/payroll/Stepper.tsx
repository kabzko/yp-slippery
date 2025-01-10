import Step from "../../../stepper/Step";

export default function Stepper({ step, payrollProcessType }: { step: number, payrollProcessType: string }) {
  return (
    <div className="flex justify-center items-center w-full px-4 py-0 bg-white drop-shadow !mt-0">
      <Step isActive={step === 1} isCompleted={step > 1} stepNumber={1} stepName="Previous Payroll Process" />
      <hr className="mr-1 w-20"></hr>
      {(payrollProcessType !== '' && payrollProcessType !== 'manual') && (step !== 1) ? (
        <>
          <Step isActive={step === 2} isCompleted={step > 2} stepNumber={2} stepName="Import Daily Logs" />
        </>
      ) : (
        <>
          <Step isActive={step === 2} isCompleted={step > 2} stepNumber={2} stepName="Import Daily Logs" />
        </>
      )}
    </div>
  );
};