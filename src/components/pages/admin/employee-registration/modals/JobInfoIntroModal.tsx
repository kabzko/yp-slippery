import { FC, useState } from "react";
import toast from 'react-hot-toast';
import CustomToast from "../../../../Toast/CustomToast";
import UploadCSV from "./UploadCSV";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobInfoIntroModal: FC<ModalProps> = ({ isOpen, onClose }: any) => {
  const [uploadModalState, setUploadModalState] = useState(false);

  const handleDownload = async() =>{
    toast.custom(() => <CustomToast message={`Successfully downloaded template.`} type='success' />, {
      duration: 4000
    })
  }

  const closeUploadModal = () => {
    setUploadModalState(false)
  }

  return (
    <>
      <UploadCSV isOpen={uploadModalState} onClose={closeUploadModal} />
      {isOpen && (
        <div className="absolute z-50 block">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
                <div className="flex flex-col items-center px-10 mb-10 text-center sm:text-left">
                  <div className="flex justify-center mt-2 sm:p-6">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M51.5309 0C23.0704 0 0 23.0704 0 51.5309C0 79.9914 23.0704 103.062 51.5309 103.062C79.9914 103.062 103.062 79.9914 103.062 51.5309C103.062 23.0704 79.9914 0 51.5309 0ZM56.684 77.2964H46.3778V66.9902H56.684V77.2964ZM56.684 56.684H46.3778L43.8013 25.7655H59.2605L56.684 56.684Z" fill="#EAC645" />
                    </svg>
                  </div>
                  <h1 className="text-[20px] text-center">
                    Please <span className="font-semibold">download the template</span> and {""}
                    <span className="font-semibold">fill out employee's job information</span> such as: {""}
                  </h1>
                  <ul className="grid grid-cols-2 mt-5 text-base text-justify list-disc list-inside gap-x-3">
                    <li>Employment Type</li>
                    <li>Date Hired</li>
                    <li>Schedule</li>
                    <li>Rate Status</li>
                    <li>Department</li>
                    <li>Position</li>
                    <li>Hours per day</li>
                    <li>Basic Salary</li>
                    <li>Days per Month</li>
                    <li>Confidential Level</li>
                    <li>Salary Effective Date</li>
                    <li>Location</li>
                  </ul>
                </div>
                <div className="flex flex-col-reverse justify-center w-full px-10 mt-3">
                  <button className="underline text-blue-500 self-center mt-2.5" onClick={onClose}>
                    Skip
                  </button>
                  <span className="w-full mt-4 rounded-md shadow-sm sm:w-auto">
                    <button type="button" onClick={() => {setUploadModalState(true)}}
                      className="items-center w-full px-10 py-2 text-base font-bold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm drop-shadow-xl hover:bg-gray-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5"
                    >
                      Upload File
                    </button>
                  </span>
                  <span className="w-full rounded-md shadow-sm sm:w-auto">
                    <button type="button" onClick={handleDownload}
                      className="items-center w-full px-20 py-2 text-base font-bold leading-6 text-blue-600 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-md shadow-sm drop-shadow-xl hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                    >
                      Download Template
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default JobInfoIntroModal;