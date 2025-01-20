import React, { FC, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogin: (event: React.FormEvent<HTMLFormElement> | null, selectedUser: any, is_resend: boolean, is_privacy_agree: boolean) => void;
  savedUser: any;
}

const USLSPrivacyModal: FC<ModalProps> = ({ isOpen, onClose, handleLogin, savedUser }: any) => {
  const modalClassName = isOpen ? 'block absolute z-20' : 'hidden';

  return (
    <div className={`modal ${modalClassName}`}>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          <div className='inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6 w-11/12'>
            <div className='text-center px-6 py-4 h-[50rem]'>
              <iframe
                id='myFrame'
                className='w-full h-full'
                src='https://django-ysc-payroll-files.s3.ap-southeast-1.amazonaws.com/static/landing_page/pdf/usls_dp.pdf'
              ></iframe>
            </div>
            <div className='sm:flex px-6 pb-2 sm:pl-6 xl:pb-0 justify-end'>
              <span className='flex w-full rounded-md shadow-sm sm:ml-10 sm:w-auto'>
                <button
                  type='button'
                  className='justify-center w-full rounded-[22.5px] border border-transparent px-4 py-1 bg-[#fafafa] text-base leading-6 font-bold shadow focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-3'
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type='button'
                  className='justify-center w-full rounded-[22.5px] border border-transparent  px-4 py-1 bg-[#355FD0] text-base leading-6 font-bold text-white shadow focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                  onClick={() => handleLogin(null, savedUser, false, true)}
                >
                  Agree and Continue
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USLSPrivacyModal;
