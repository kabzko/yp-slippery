import { useContext, useEffect, useState } from "react";
import { AccountContext, TimekeeperContext } from "../../../../contexts";
import { TimekeeperAccount } from "../../../../types";
import toast from 'react-hot-toast';
import CustomToast from "../../../../Toast/CustomToast";

interface EmailSendConfirmProps {
  isOpen: boolean;
  onClose: () => void;
}

const showToast = (message: string, type: string) => {
  toast.custom(() => <CustomToast message={message} type={type} />, {
    duration: 4000,
  });
};

export default function DynamicConfirmModal({ isOpen, onClose }: EmailSendConfirmProps) {
  const {
    sendState, setSendState,
    setSentEmailsByID, setResetPassByID, setResetSignInByID,
    selectedRows, setSelectedRows, setEnabledAccounts
  } = useContext(AccountContext);
  const { hybridTableType, accessType } = useContext(TimekeeperContext)
  const [employeeName, setEmployeeName] = useState("");
  
  const renderText = () => {
    if(hybridTableType === '1to1' || accessType === '1to1') {
      return `users`;
    }
    else if(sendState.type === 'resetSignIn') {
      return `selected employees`;
    }
  }

  const modalText = {
    "resetPass": "reset password of",
    "sendEmail": "send via email the credential to",
    "resetSignIn": "reset sign in attempts of",
    "enable": "enable Timekeeper access to",
    "disable": "disable Timekeeper access to"
  }

  const setByIds = (type: string, account: TimekeeperAccount) => {
    switch(type){
      case 'resetPass':
        setResetPassByID((prevIDs) => [...prevIDs, account.id]);
        break;
      case 'resetSignIn':
        setResetSignInByID((prevIDs) => [...prevIDs, account.id]);
        break;
      case 'sendEmail':
        setSentEmailsByID((prevIDs) => [...prevIDs, account.id]);
        break;
    }
  }

  const displayToast = (action: string) => {
    switch(action){
      case 'resetPass':
        showToast(`Successfully reset password.`, 'success');
        break;
      case 'resetSignIn':
        showToast(`Successfully reset sign in attempts.`, 'success');
        break;
      case 'sendEmail':
        showToast(`Successfully sent credential via email.`, 'success');
        break;
      case 'enable':
        showToast(`Successfully enabled timekeeper access.`, 'success');
        break;
      case 'disable':
        showToast(`Successfully disabled timekeeper access.`, 'success');
        break;
      default:
        break;
    }
  }

  const handleConfirm = async () => {
    if (Array.isArray(sendState.account)) {
      sendState.account.forEach(account => {
        setByIds(sendState.type, account);
      });
    } else {
      setByIds(sendState.type, sendState.account as TimekeeperAccount);
    }

    setSendState((prevState) => ({ 
      ...prevState, 
      isOpen: false, 
      account: { 
        id: 0, username: "", email: "" 
      }, 
      type: "" 
    }));
    displayToast(sendState.type)
    setSelectedRows([]);
    onClose();
  }
  
  const handleCancel = () => {
    if(sendState.type === 'enable') {
      setEnabledAccounts((prev: any) => {
        if (Array.isArray(sendState.account)) {
          const accountIds = sendState.account.map(account => account.id);
          return prev.filter((id: any) => !accountIds.includes(id));
        } else {
          return prev.filter((id: any) => id !== (sendState.account as TimekeeperAccount).id);
        }
  
      });
    }
    setSendState((prevState) => ({ 
      ...prevState, 
      isOpen: false, 
      account: { 
        id: 0, username: "", email: "" 
      }, 
      type: "" 
    }));
    setSelectedRows([]);
    onClose();
  }

  useEffect(() => {
    if (sendState.isOpen) {
      if ('username' in sendState.account) {
        setEmployeeName(sendState.account.username);
      }
    }
  }, [sendState.isOpen]);
  
  return (
    <>
      {isOpen && (
        <div className="absolute z-50 block">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
                <div className="text-center border-b-2 sm:text-left">
                  <div className="flex justify-center my-4 text-yellow-500 sm:p-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      fill="currentColor"
                      className="bi bi-exclamation-triangle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </div>
                  <h1 className="px-6 mb-6 text-xl font-semibold text-center">
                    {Array.isArray(sendState.account) ?  `Are you sure you want to ${sendState.type && modalText[sendState.type]} the selected ${renderText()}?`
                      : `Are you sure you want to ${sendState.type && modalText[sendState.type]} ${employeeName}?`
                    }
                  </h1>
                </div>
                <div className="justify-around w-full px-10 py-4 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button onClick={handleConfirm} type="button"
                      className="justify-center w-full px-12 py-4 text-base font-bold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm drop-shadow-xl hover:bg-gray-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                      Yes
                    </button>
                  </span>
                  <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button"
                      className="justify-center w-full px-12 py-4 text-base font-bold leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-md shadow-sm drop-shadow-xl hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                      onClick={handleCancel}>
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
}
