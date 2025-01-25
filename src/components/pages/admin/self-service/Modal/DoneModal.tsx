import { FC } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import EmojiParty from "@/svg/emojiParty";
import { ProgressIndicatorContext } from "@/components/contexts";
import useUpdateCompanySetupStatus from "@/components/hooks/useUpdateCompanySetupStatus";
import { toast } from "react-hot-toast";
import CustomToast from "@/components/toast/CustomToast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DoneModal: FC<ModalProps> = ({ isOpen, onClose }: any) => {
  const modalClassName = isOpen ? 'block absolute z-20' : 'hidden';
  const { progressDispatch, skippedProgress, progressState } = useContext(ProgressIndicatorContext);
  const navigate = useNavigate();
  const { mutate } = useUpdateCompanySetupStatus();

  const handleAccept = async () => {
    const callbackReq = {
      onSuccess: () => {
        location.href = '/dashboard'
      },
      onError: (err: any) => {
        toast.custom(() => <CustomToast message={err} type='error' />, {
          duration: 4000,
        });
      }
    }
    mutate(void 0, callbackReq)
  };

  return (
    <>
      {isOpen && (
        <div className={`modal ${modalClassName}`}>
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
                <div className="text-center sm:text-left mb-10">
                  <div className="mt-2 sm:p-6 flex justify-center">
                    <EmojiParty />
                  </div>
                  <h1 className="text-[20px] px-20 text-center">
                    You have successfully set-up Miscellaneous List!
                  </h1>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse pr-6 sm:pl-6 justify-center w-full">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button type="button"
                      className="inline-flex justify-center drop-shadow-xl w-full rounded-md border border-transparent px-16 py-2 bg-blue-600 text-base leading-6 font-bold text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={handleAccept}
                    >
                      Proceed to dashboard
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