import { FC , useState } from "react";
import classNames from "@/helpers/classNames";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DynamicScheduleModal: FC<ModalProps> = ({ isOpen, onClose } : any) => {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';
  const [expand, setExpand] = useState(false)

  const handleToggleExpand = () => {
    setExpand(!expand)
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
                                <div className="mb-4 text-center border-b-4">
                                    <h1 className="text-xl font-medium">Do you prefer using Dynamic Schedule ?</h1>
                                    <h1 className="cursor-pointer text-[#2757ED] text-xl font-medium"><a onClick={handleToggleExpand}>Learn More...</a></h1>
                                    <div className={classNames('', expand ? "block mt-4 mb-4" : 'hidden')}>
                                        <div className="mb-4">
                                            <h1 className="text-2xl font-bold">Activate Dynamic Schedule</h1>
                                            <h1 className="text-2xl font-normal">&#40; Adjustable schedule &#41;</h1>
                                        </div>
                                        <div>
                                            <h1 className="text-base font-bold">Once activated and assigned to a specific employee,</h1>
                                            <h1 className="text-base font-bold">the schedule <span className="text-[#2757ED]">will automatically adjust to the nearest available</span></h1>
                                            <h1 className="text-base font-bold"><span className="text-[#2757ED]">dynamic schedule.</span> This will avoid lateness and extend</h1>
                                            <h1 className="text-base font-bold">working hours accordingly.</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h1 className="text-base font-normal">If you would like to use Dynamic Schedule please</h1>
                                        <h1 className="text-base font-normal">provide time interval. After selecting interval</h1>
                                        <h1 className="text-base font-normal">click Activate Dynamic Schedule button</h1>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <h1 className="mb-1 text-sm font-bold">
                                                Time Interval
                                            </h1>
                                            <input type="text" className={`pl-2 border-2 h-[35px] w-full border-[#878787] rounded`} list="1 minute" placeholder="Select..."/>
                                            <datalist id="1 minute">
                                                <option value="1 minute"/>
                                                <option value="3 minutes"/>
                                                <option value="5 minutes"/>
                                                <option value="10 minutes"/>
                                                <option value="15 minutes"/>
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-4 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6 xl:pb-0">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-10 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        onClick={onClose}
                        >
                            Activate Dynamic Schedule
                        </button>
                    </span>
                    <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button"
                        className="inline-flex justify-center w-full px-10 py-2 text-base font-bold leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                        onClick={onClose}
                        >
                            NO, Create Schedule Manually
                        </button>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DynamicScheduleModal;