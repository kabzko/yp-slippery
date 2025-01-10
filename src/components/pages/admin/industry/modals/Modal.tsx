import React, { useContext } from "react";
import { ProgressIndicatorContext } from "../../../../contexts";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIndustry: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedIndustry }) => {
  const { progressDispatch, progressState, skippedProgress } = useContext(ProgressIndicatorContext);
  const modalClassName = isOpen ? "block absolute z-10" : "hidden";

  const handleAccept = () => {
    if (selectedIndustry && !skippedProgress && progressState.overallProgress < 19) {
      progressDispatch({
        type: "UPDATE_STEP",
        payload: {
          step: "selectBusinessIndustryType",
          progress: selectedIndustry !== '3' ? 25 : 19,
          inputs: {},
        },
      });
    }
    localStorage.setItem("industry", selectedIndustry.toLowerCase());
    console.log({ selectedIndustry });
    window.location.href = `/self-service`;
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={`modal ${modalClassName}`}>
      <div className="fixed inset-0 z-20 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
            <div className="text-center sm:text-left">
              <div className="flex justify-center mt-2 sm:p-6">
                <svg
                  width="56"
                  height="83"
                  viewBox="0 0 56 83"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.9785 57.2676L13.9537 49.6254L13.9302 42.4092C13.9302 42.4092 31.4759 31.8347 43.0819 24.8398L49.6637 35.7605L13.9785 57.2676Z"
                    fill="#0081CD"
                  />
                  <path
                    d="M6.59668 11.0703L12.9564 0.00546472L49.6488 21.6323L49.6488 28.1426L49.6488 35.77L6.59668 11.0703Z"
                    fill="#010F7C"
                  />
                  <path
                    d="M0 4.99178L12.957 0.00585938V75.2392L0 82.0353V4.99178Z"
                    fill="#02B3BE"
                  />
                </svg>
              </div>
              <h1 className="pl-6 text-center text-blue-600 text-[32px] font-bold">
                WELCOME TO YAHSHUA PAYROLL SETUP!
              </h1>
              <h1 className="px-6 pt-5 pb-4 text-xl font-bold text-center">
                To initiate the process, kindly prepare all relevant company
                information, encompassing{" "}
                {selectedIndustry === "3" ? (
                  <span className="text-xl font-bold text-blue-700">
                    Location, Department, Position, Employment Type, Division,
                    Section, Unit, Sub Unit and Schedule.
                  </span>
                ) : (
                  <span className="text-xl font-bold text-blue-700">
                    Location, Department, Position, Employment Type.
                  </span>
                )}
              </h1>
            </div>
            <div className="relative flex justify-between px-10 pt-16">
              <button
                onClick={handleCancel}
                className="w-[200px] h-[45px] text-blue-600 bg-white border-blue-600 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center mb-5"
              >
                Be right back
              </button>
              <button
                onClick={handleAccept}
                className="w-[200px] h-[45px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center mb-5"
              >
                I'm ready
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
