import Step from "../../../stepper/Step";

export default function Stepper({ step, accessType }: { step: number, accessType: string }) {
  return (
    <div className="flex justify-center items-center w-full px-4 py-0 bg-white drop-shadow !mt-0">
      <Step isActive={step === 1} isCompleted={step > 1} stepNumber={1} stepName="Set up Timekeeper Access" />
      <hr className="w-20 mr-1"></hr>
      {accessType !== 'Hybrid' ? (
        <>
          <Step isActive={step === 2} isCompleted={step > 2} stepNumber={2} stepName="Timekeeper Accounts" />
          <hr className="w-20 mr-1"></hr>
          <Step isActive={step === 3} isCompleted={step > 3} stepNumber={3} stepName="Tutorial" />
        </>
      ) : (
        <>
          <Step isActive={step === 2} isCompleted={step > 2} stepNumber={2} stepName="1 is to Many" />
          <hr className="w-20 mr-1"></hr>
          <Step isActive={step === 3} isCompleted={step > 3} stepNumber={3} stepName="1 is to 1" />
          <hr className="w-20 mr-1"></hr>
          <Step isActive={step === 4} isCompleted={step > 4} stepNumber={4} stepName="Tutorial" />
        </>
      )}
    </div>
  );
};