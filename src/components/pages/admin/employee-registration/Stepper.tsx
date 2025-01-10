import Step from "../../../stepper/Step"

export default function Stepper({ step }: { step: number }) {
  return (
    <div className="flex justify-center items-center w-full px-4 py-0 bg-white drop-shadow !mt-0">
      <Step isActive={step === 1} isCompleted={step > 1} stepNumber={1} stepName="Employee Profile" />
      <hr className="w-20 mr-1"></hr>
      <Step isActive={step === 2} isCompleted={step > 2} stepNumber={2} stepName="Employee Job Information" />
    </div>
  );
};