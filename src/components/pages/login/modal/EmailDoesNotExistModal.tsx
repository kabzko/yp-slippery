import React, { FC, useState, Dispatch, Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailDoesNotExistModal: FC<ModalProps> = ({ isOpen, onClose}: any) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className={`relative z-20`} initialFocus={cancelButtonRef} onClose={() => onClose(true)}>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
          <div className='fixed z-20 inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all sm:my-8 w-[520px]'>
                  <div className='text-center sm:text-left'>
                    <div className="w-full p-2 flex justify-end">
                      <button onClick={onClose}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 0C4.2465 0 0 4.2465 0 9.5C0 14.7535 4.2465 19 9.5 19C14.7535 19 19 14.7535 19 9.5C19 4.2465 14.7535 0 9.5 0ZM14.25 12.9105L12.9105 14.25L9.5 10.8395L6.0895 14.25L4.75 12.9105L8.1605 9.5L4.75 6.0895L6.0895 4.75L9.5 8.1605L12.9105 4.75L14.25 6.0895L10.8395 9.5L14.25 12.9105Z" fill="#C7C7C7"/>
                        </svg>
                      </button>
                    </div>
                    <div className='xl:flex xl:space-x-10 place-content-center'>
                      <div className='flex flex-col'>
                        <div className='text-center'>
                          <div className='block mt-4'>
                            <div className="sm:p-2 flex justify-center">
                              <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M51.5309 0C23.0704 0 0 23.0704 0 51.5309C0 79.9914 23.0704 103.062 51.5309 103.062C79.9914 103.062 103.062 79.9914 103.062 51.5309C103.062 23.0704 79.9914 0 51.5309 0ZM56.684 77.2964H46.3778V66.9902H56.684V77.2964ZM56.684 56.684H46.3778L43.8013 25.7655H59.2605L56.684 56.684Z" fill="#D65846" />
                              </svg>
                            </div>
                            <div className='mb-4'>
                              <h1 className='text-3xl font-bold text-[#FF3D00] pb-4'>Sorry, we found an error! 😢</h1>
                              <h1 className='text-lg'>No email address was found in your</h1>
                              <h1 className='text-lg'>employee information. Please contact your <span className='text-lg text-blue-700'>ADMIN/</span></h1>
                              <h1 className='text-lg'><span className='text-lg text-blue-700'>HR Personnel</span> to update your email address.</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sm:mt-4 sm:flex sm:flex-row-reverse px-6 pb-2 sm:pl-6 xl:pb-0 justify-center'>
                    <span className='flex-row w-full'>
                      <h1 className='text-center'>Thank you and GOD bless!</h1>
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

export default EmailDoesNotExistModal;
