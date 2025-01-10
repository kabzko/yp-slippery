import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import EmojiParty from "../../../../../svg/emojiParty";
import { ProgressIndicatorContext } from "../../../../contexts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetupCompleteModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalClassName = isOpen ? 'block absolute z-20' : 'hidden';
  const { progressState, progressDispatch, skippedProgress, setSkippedProgressState } = useContext(ProgressIndicatorContext);
  const navigate = useNavigate(); 

  const handleAccept = async () => {
    if (!skippedProgress && progressState.overallProgress < 56) {
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'setUpTimeKeeper',
          progress: 56,
          inputs: {},
        },
      });
    }
    setSkippedProgressState(false);
    navigate('/timekeeper'); 
  };

  return (
    <>
      {isOpen && (
        <div className={`block absolute z-50 ${modalClassName}`}>
          <div className="overflow-y-auto fixed inset-0">
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
                    You have successfully set-up Employee Profile
                  </h1>
                  <h1 className="text-[15px] px-20 text-center mt-10">
                    In preparation for setting up your TimeKeeper access, please make sure that the ABBA Timekeeper is downloaded on your device (mobile, tablet, laptop, or desktop).
                  </h1>
                </div>
                <div className="justify-center pr-6 mt-5 w-full sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      className="px-16 upload-csv-btn"
                      onClick={handleAccept}
                    >
                      Proceed
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      className="cancel-upload-csv-btn"
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

export default SetupCompleteModal;
