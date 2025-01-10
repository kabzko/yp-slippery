import { FC } from "react";
import useCreateLocationWizard from "./location/hooks/useCreateWizardLocation";
import useEmploymentTypeWizard from "../../../hooks/employment-type/useCreateEmploymentTypeWizard";
import useCreateDepartmentWizard from "../../../hooks/department/useCreateDepartmentsWizard";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: FC<ModalProps> = ({ isOpen, onClose } : any) => {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const locationWizard = useCreateLocationWizard();
  const employementTypeWizard = useEmploymentTypeWizard();
  const departmentWizard = useCreateDepartmentWizard();
  const positionWizard = useCreateDepartmentWizard();

  const handleWizard = async () => {
    try {
        await locationWizard.mutateAsync()
        await employementTypeWizard.mutateAsync()
        await departmentWizard.mutateAsync()
        await positionWizard.mutateAsync()
    } catch (error) {
        console.log({error})
    }
  }

  return (
    <div className={`modal ${modalClassName}`}>
        <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:pb-6">
                    <div className="text-center sm:text-left">
                        <div className="px-10 py-10 mx-6 xl:flex xl:space-x-10 xl:divide-x-4 place-content-center">
                            <div className="flex flex-col">
                                <div className="mb-4 text-center">
                                    <div className="flex justify-center pb-6">
                                        <svg width="56" height="83" viewBox="0 0 56 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.9785 57.2671L13.9537 49.6249L13.9302 42.4088C13.9302 42.4088 31.4759 31.8342 43.082 24.8393L49.6637 35.76L13.9785 57.2671Z" fill="#0081CD"/>
                                            <path d="M6.59705 11.0698L12.9567 0.00497643L49.6492 21.6318L49.6492 28.1421L49.6492 35.7695L6.59705 11.0698Z" fill="#010F7C"/>
                                            <path d="M0 4.99227L12.957 0.00634766V75.2397L0 82.0358V4.99227Z" fill="#02B3BE"/>
                                        </svg> 
                                    </div>
                                    <div className="block mt-4 mb-4">
                                        <div className="mb-4">
                                            <h1 className="text-4xl font-bold">WELCOME TO YAHSHUA </h1>
                                            <h1 className="text-4xl font-bold">PAYROLL SETUP!</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h1 className="text-base font-bold">To initiate the process, kindly prepare all</h1>
                                        <h1 className="text-base font-bold">relevant company information, </h1>
                                        <h1 className="text-base font-bold">encompassing Location, Department</h1>
                                        <h1 className="text-base font-bold">Position, Employment Type, and Schedule.</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="justify-center px-6 pb-4 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6 xl:pb-0 ">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-10 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        onClick={handleWizard}
                        >
                            I'm Ready
                        </button>
                    </span>
                    <span className="flex justify-center w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button"
                        className="inline-flex justify-center w-full px-10 py-2 text-base font-bold leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                        onClick={onClose}
                        >
                            Be Right Back
                        </button>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WelcomeModal;