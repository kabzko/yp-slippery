import React, { FC, useState } from "react";
import SignUpWithModal from "./signUpWithModal";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpAsModal: FC<ModalProps> = ({ isOpen, onClose } : any) => {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const [signUpWith, setSignUpWith] = useState(false)

  const openModal = () => {
    setSignUpWith(true);
    onClose
    }

    const closeModal = () => {
      setSignUpWith(false)
    }

  return (
    <>
        <SignUpWithModal isOpen={signUpWith} onClose={closeModal} />
        <div className={`modal ${modalClassName}`}>
            <div className="fixed z-20 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6">
                        <div className="text-center sm:text-left">
                            <div className="xl:flex mx-6 xl:space-x-10 xl:divide-x-4 py-10 px-6 place-content-center">
                                <div className="flex flex-col">
                                    <div className="mb-4 text-center px-4">
                                        <div className="block mt-4 mb-4">
                                            <div className="mb-4">
                                                <h1 className="text-xl font-bold">Would you like to Sign Up as: </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <div className="flex">
                                            <input type="checkbox"/>
                                            <label className="text-xl font-normal pl-4">Employee</label>
                                        </div>
                                        <div className="flex">
                                            <input type="checkbox"/>
                                            <label className="text-xl font-normal pl-4">Company</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse px-6 pb-4 sm:pl-6 xl:pb-0 justify-center mb-6">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-10 sm:w-auto">
                            <button type="button"
                            className="inline-flex justify-center w-full rounded-[22.5px] border border-transparent px-12 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={openModal}
                            >
                                Next
                            </button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto justify-center">
                            <button type="button"
                            className="inline-flex justify-center w-full rounded-[22.5px] border border-blue-600 px-10 py-2 bg-white text-base leading-6 font-bold text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={onClose}
                            >
                                Cancel
                            </button>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  );
};

export default SignUpAsModal;