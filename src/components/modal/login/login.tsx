import React, { FC, useState, Dispatch, Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  response: any;
  isOpen: boolean;
  handleLogin: (values: any, selectedUser: any) => Promise<void>;
  onClose: () => void;
  values: any;
}

const LoginModal: FC<ModalProps> = ({ response, handleLogin, isOpen, onClose, values }: any) => {
  const [selectedUser, setSelectedUser] = useState('');
  const cancelButtonRef = useRef(null);

  const handleSelectUser = (selectedUser: any) => {
    setSelectedUser(selectedUser);
  };

  const renderAccountsList = () => {
    return response.map((account: any) => (
      <div className='flex justify-between border-b-2 border-[#C7C7C7] p-2 mb-3 cursor-pointer text-black hover:text-blue-600' onClick={() => handleLogin(values, account)} key={account.id}>
        <div className='mx-3'>{account.fullname}</div>
        <div className='mx-3 mr-10'>{account.type}</div>
      </div>
    ));
  };

  return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className={`relative z-10`} initialFocus={cancelButtonRef} onClose={() => onClose(true)}>
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
            <div className='fixed inset-0 z-10 overflow-y-auto'>
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
                  <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all sm:my-8 w-[500px]'>
                    <div className='text-center sm:text-left'>
                      <div className="w-full bg-blue-600 p-2 flex justify-between">
                        <h3 className="text-lg leading-6 font-medium text-white">
                          Select User
                        </h3>
                        <button onClick={onClose}>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.5 0C4.2465 0 0 4.2465 0 9.5C0 14.7535 4.2465 19 9.5 19C14.7535 19 19 14.7535 19 9.5C19 4.2465 14.7535 0 9.5 0ZM14.25 12.9105L12.9105 14.25L9.5 10.8395L6.0895 14.25L4.75 12.9105L8.1605 9.5L4.75 6.0895L6.0895 4.75L9.5 8.1605L12.9105 4.75L14.25 6.0895L10.8395 9.5L14.25 12.9105Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className='xl:flex mx-6 xl:space-x-10 xl:divide-x-4 py-5 px-6 place-content-center'>
                        <div className='flex flex-col'>
                          <div className='mb-4 text-center'>
                            {!!response.length && (
                              <div className='block mt-4 mb-4'>
                                <div className='mb-4'>
                                  <h1 className='text-2xl font-bold mb-2'>Welcome back, {response[0].fullname} 👋</h1>
                                  <h1 className='text-base'>We have noticed that you have two (2) user access</h1>
                                  <h1 className='text-base'>Please select user you want to sign in.</h1>
                                </div>
                                <div className='pt-4'>
                                  <div className='flex border p-2 mb-3 justify-between rounded-md cursor-pointer text-black bg-[#DDEBFF]'>
                                    <div className='mx-3 ml-10 font-bold'>Name</div>
                                    <div className='mx-3 mr-10 font-bold'>Account Type</div>
                                  </div>
                                  {renderAccountsList()}
                                </div>
                              </div>
                            )}
                            {!!!response.length && (
                              <div className='block mt-4 mb-4'>
                                <div className='mb-4'>
                                  <h1 className='text-xl font-bold'>No list of account found!</h1>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
        </Dialog>
      </Transition.Root>
  );
};

export default LoginModal;
