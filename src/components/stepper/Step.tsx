import classNames from "../../helpers/classNames";

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
  stepNumber: number;
  stepName: string;
}

export default function Step ({ isActive, isCompleted, stepNumber, stepName }: StepProps) {
  const stepNumberClass = classNames(
    'my-6 mr-2 flex h-10 w-9 items-center justify-center rounded-lg text-lg',
    isActive ? 'font-semibold bg-slate-900 text-white' : '',
    isCompleted ? 'font-normal bg-blue-700 text-white' : '',
    (!isActive && !isCompleted) ? 'font-normal bg-neutral-200 text-slate-400' : ''
  );

  const stepNameClass = classNames(
    'after:flex after:text-[0.8rem] after:content-[data-content] text-lg',
    isActive ? 'font-semibold text-slate-900' : '',
    isCompleted ? 'font-semibold text-blue-700' : '',
    (!isActive && !isCompleted) ? 'font-normal text-neutral-400' : ''
  );

  return (
    <div className="flex items-center">
      <span className={stepNumberClass}>
        {stepNumber}
      </span>
      <span className={stepNameClass}>
        {stepName}
      </span>
    </div>
  );
};