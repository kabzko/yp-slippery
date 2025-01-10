import { FC } from "react";
import DoneModal from "./DoneModal";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<ModalProps> = ({ isOpen, onClose }: any) => {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    onClose(); 
  }

  const closeModal = () => {
    setIsModalOpen(false); 
  }

  return (
    <>
      <DoneModal isOpen={isModalOpen} onClose={closeModal} />
      {isOpen && (
        <div className={`modal ${modalClassName}`}>
          <div className="overflow-y-auto fixed inset-0 z-20">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
                <div className="mb-10 text-center sm:text-left">
                  <div className="flex justify-center mt-2 sm:p-6">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M51.5309 0C23.0704 0 0 23.0704 0 51.5309C0 79.9914 23.0704 103.062 51.5309 103.062C79.9914 103.062 103.062 79.9914 103.062 51.5309C103.062 23.0704 79.9914 0 51.5309 0ZM56.684 77.2964H46.3778V66.9902H56.684V77.2964ZM56.684 56.684H46.3778L43.8013 25.7655H59.2605L56.684 56.684Z" fill="#EAC645" />
                    </svg>
                  </div>
                  <h1 className="text-[20px] px-20 text-center">
                    Are you sure to proceed with the submission?
                  </h1>
                  <h1 className="text-[15px] px-20 text-center mt-10">
                    Please note that updating of records can be done once the whole setup is complete
                  </h1>
                </div>
                <div className="justify-center pr-6 mt-5 w-full sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-10 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={openModal}
                    >
                      Yes! Proceed Submission
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button"
                      className="px-20 cancel-upload-csv-btn"
                      onClick={onClose}
                    >
                      No
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

export default SuccessModal;
