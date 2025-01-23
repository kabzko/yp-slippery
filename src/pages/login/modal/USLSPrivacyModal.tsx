import { FC, Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogin: (
    event: React.FormEvent<HTMLFormElement> | null,
    selectedUser: any,
    is_resend: boolean,
    is_privacy_agree: boolean
  ) => void;
}

const USLSPrivacyModal: FC<ModalProps> = ({ isOpen, onClose, handleLogin }: any) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className={`relative z-10`} initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='transition-all ease-in-out duration-500 delay-[200ms]'
          enterFrom='opacity-0 translate-y-6'
          enterTo='opacity-100 translate-y-0'
          leave='transition-all ease-in-out duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='transition-all ease-in-out duration-500 delay-[200ms]'
              enterFrom='opacity-0 translate-y-6'
              enterTo='opacity-100 translate-y-0'
              leave='transition-all ease-in-out duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Panel className='relative transform overflow-hidden bg-white rounded-2xl text-left shadow-xl transition-all sm:my-8 sm:align-middle sm:pb-6 w-11/12'>
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
                      onClick={handleLogin}
                    >
                      Agree and Continue
                    </button>
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default USLSPrivacyModal;
