import React from "react";

const Stepper = () => {
  return (
    <div className="flex justify-center border-b-zinc-300 bg-white items-center px-4 py-2 shadow">
      <div className="flex items-center">
        <span className="my-6 mr-2 flex h-[40px] w-[35px] items-center justify-center rounded-[10px] bg-[#ebedef] text-sm font-medium text-[#40464f]">
          1
        </span>
        <span className="font-medium text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300">
          Statutory Setting
        </span>
      </div>
      <hr className="w-20 mr-1"></hr>
      <div className="flex items-center">
        <span className="my-6 mr-2 flex h-[40px] w-[35px] items-center justify-center rounded-[10px] bg-[#ebedef] text-sm font-medium text-[#40464f]">
          2
        </span>
        <span className="font-medium text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300">
          Tax Setting
        </span>
      </div>
      <hr className="w-20 mr-1"></hr>
      <div className="flex items-center">
        <span className="my-6 mr-2 flex h-[40px] w-[35px] items-center justify-center rounded-[10px] bg-[#ebedef] text-sm font-medium text-[#40464f]">
          3
        </span>
        <span className="whitespace-pre-line font-medium text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300">
          Late, Undertime and Night <br/> Differential Setting
        </span>
      </div>
      <hr className="w-20 mr-1"></hr>
      <div className="flex items-center">
        <span className="my-6 mr-2 flex h-[40px] w-[35px] items-center justify-center rounded-[10px] bg-[#ebedef] text-sm font-medium text-[#40464f]">
          4
        </span>
        <span className="font-medium text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300">
          Overtime, Rest Day and Holiday Settings
        </span>
      </div>
      <hr className="w-20 mr-1"></hr>
      <div className="flex items-center">
        <span className="my-6 mr-2 flex h-[40px] w-[35px] items-center justify-center rounded-[10px] bg-[#ebedef] text-sm font-medium text-[#40464f]">
          5
        </span>
        <span className="font-medium text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300">
          Leave Setting
        </span>
      </div>
    </div>
  );
}

export default Stepper;
