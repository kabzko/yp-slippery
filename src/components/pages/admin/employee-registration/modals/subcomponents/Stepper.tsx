import Step from '../../../../../stepper/Step';

export default function Stepper ({ step }: { step: number }) {
    return (
      <div className="flex flex-col items-center mx-10 my-4 bg-white md:flex-row">
        <Step
          isActive={step === 1}
          isCompleted={step > 1}
          stepNumber={1}
          stepName="Personal Information"
        />
        <hr className="w-full mx-2 md:w-16"></hr>
        <Step
          isActive={step === 2}
          isCompleted={step > 2}
          stepNumber={2}
          stepName="Contact Information"
        />
        <hr className="w-full mx-2 md:w-16"></hr>
        <Step
          isActive={step === 3}
          isCompleted={step > 3}
          stepNumber={3}
          stepName="Emergency Contact"
        />
      </div>
    );
  };