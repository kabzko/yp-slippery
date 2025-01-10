import { useContext, useEffect, useState } from "react";
import { SelfServiceContext } from "../../../../contexts";

const Stepper = ({ step }: any) => {
  const { setSelectedRows } = useContext(SelfServiceContext);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  useEffect(() => {
    const industry = localStorage.getItem('industry');
    console.log(industry);
    setSelectedIndustry(industry);
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [step]);

  const getStepClasses = (currentStep: number) => {
    const baseClasses = "my-6 mr-2 flex h-[40px] w-[35px] items-center justify-center rounded-[10px] text-sm font-medium";
    return step === currentStep
      ? `${baseClasses} bg-[#2757ED] text-white`
      : `${baseClasses} bg-[#ebedef] text-[#40464f]`;
  };

  const getTextClasses = (currentStep: number) => {
    const baseTextClasses = "font-medium after:flex after:text-[0.8rem] after:content-[data-content]";
    return step === currentStep
      ? `${baseTextClasses} text-[#2757ED]`
      : `${baseTextClasses} text-neutral-500 dark:text-neutral-300`;
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-2 bg-white shadow border-b-zinc-300">
      <div className="flex items-center">
        <span className={getStepClasses(1)}>1</span>
        <span className={getTextClasses(1)}>
          Location, Department, Position, and Employment Type
        </span>
      </div>
      <hr className="w-20 mr-1 divide-[#2757ED]" />
      <div className="flex items-center">
        <span className={getStepClasses(2)}>2</span>
        <span className={getTextClasses(2)}>
          Schedule
        </span>
      </div>
      <hr className="w-20 mr-1" />
      {selectedIndustry === '3' && (
        <>
          <div className="flex items-center">
            <span className={getStepClasses(3)}>3</span>
            <span className={getTextClasses(3)}>
              Division
            </span>
          </div>
          <hr className="w-20 mr-1" />
          <div className="flex items-center">
            <span className={getStepClasses(4)}>4</span>
            <span className={getTextClasses(4)}>
              Section
            </span>
          </div>
          <hr className="w-20 mr-1" />
          <div className="flex items-center">
            <span className={getStepClasses(5)}>5</span>
            <span className={getTextClasses(5)}>
              Unit
            </span>
          </div>
          <hr className="w-20 mr-1" />
          <div className="flex items-center">
            <span className={getStepClasses(6)}>6</span>
            <span className={getTextClasses(6)}>
              Sub Unit
            </span>
          </div>
          <hr className="w-20 mr-1" />
        </>
      )}
    </div>
  );
};

export default Stepper;


