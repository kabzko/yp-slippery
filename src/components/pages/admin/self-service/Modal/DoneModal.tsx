import { FC } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import EmojiParty from "../../../../../svg/emojiParty";
import { ProgressIndicatorContext } from "../../../../contexts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DoneModal: FC<ModalProps> = ({ isOpen, onClose }: any) => {
  const modalClassName = isOpen ? 'block absolute z-20' : 'hidden';
  const { progressDispatch, skippedProgress, progressState } = useContext(ProgressIndicatorContext);
  const navigate = useNavigate();

  const handleAccept = async () => {
    if(!skippedProgress && progressState.overallProgress < 42){
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'registerEmployees',
          progress: 42,
          inputs: {},
        },
      });
    }
    navigate('/employee-registration')
  };

  return (
    <>
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
                    <EmojiParty />
                  </div>
                  <h1 className="text-[20px] px-20 text-center">
                    You have successfully set-up Miscellaneous List!
                  </h1>
                  <h1 className="text-[15px] px-20 text-center mt-10">
                    In preparation for employee registration, please ensure that employees information &#40;<span className="text-blue-600">Last name, First name, and Email</span>&#41; are ready
                  </h1>
                </div>
                <div className="justify-center pr-6 mt-5 w-full sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-20 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={handleAccept}
                    >
                      Proceed
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button"
                      className="px-14 cancel-upload-csv-btn"
                      onClick={onClose}
                    >
                      Be right back
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

export default DoneModal;