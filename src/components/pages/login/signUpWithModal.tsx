import React, { FC, useState } from 'react';

import classNames from '@/helpers/classNames';

import YahshuaIcon from '@/assets/images/yg.png';
import FBIcon from '@/assets/images/facebook.png';
import LinkedInIcon from '@/assets/images/linkedIn.png';
import GoogleIcon from '@/assets/images/icon_google.png';
import CustomToast from '@/components/Toast/CustomToast';
import toast from 'react-hot-toast';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpWithModal: FC<ModalProps> = ({ isOpen, onClose }: any) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const modalClassName = isOpen ? 'block absolute z-20' : 'hidden';

  const handleProceed = () => {
    localStorage.setItem('account_type', selectedOption.toLowerCase());
    if (!selectedOption) {
      toast.custom(() => <CustomToast message={`Please select a account type`} type='error' />, {
        duration: 4000,
      });
    }
    if (selectedOption === 'Employee' && !selectedProvider) {
      toast.custom(() => <CustomToast message={`Please select a provider...`} type='error' />, {
        duration: 4000,
      });
    }
    if (selectedOption === 'Company' && !selectedProvider) {
      location.href = `/next/register/company`;
    }
    if (selectedOption === 'Company' && selectedProvider === 'Google') {
      signInWithGoogle();
    }
    if (selectedProvider === 'LinkedIn') {
    }
    if (selectedOption === 'Company' && selectedProvider === 'Facebook') {
      handleSignInWithFacebook();
    }
    if (selectedProvider === 'yahshua') {
    }
  };

  function signInWithGoogle() {
    const left = (window.innerWidth - 600) / 2;
    const top = (window.innerHeight - 400) / 2;
    const popup: any = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/sso/login/google-oauth`,
      'popup',
      `width=600, height=400, left=${left}, top=${top}`
    );
    const checkOAuthStatus = setInterval(function () {
      if (popup.closed) {
        clearInterval(checkOAuthStatus);
      }
    }, 1000);
  }

  function handleSignInWithFacebook() {
    const left = (window.innerWidth - 600) / 2;
    const top = (window.innerHeight - 400) / 2;
    const popup: any = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/sso/login/facebook-oauth`,
      'popup',
      `width=600, height=400, left=${left}, top=${top}`
    );
    const checkOAuthStatus = setInterval(function () {
      if (popup.closed) {
        clearInterval(checkOAuthStatus);
      }
    }, 1000);
  }

  return (
    <div className={`modal ${modalClassName}`}>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          <div className='inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:pb-6'>
            <div className='text-center sm:text-left'>
              <div className='xl:flex mx-6 xl:space-x-10 xl:divide-x-4 py-10 px-6 place-content-center'>
                <div className='flex flex-col'>
                  <div className='mb-4 text-center px-4'>
                    <div className='block mt-4 mb-4'>
                      <div className='mb-4'>
                        <h1 className='text-xl font-bold'>Sign Up as:</h1>
                      </div>
                    </div>
                  </div>
                  <div className='flex space-x-4 hover:cursor-pointer'>
                    <div className='flex space-x-4'>
                      <div
                        className='w-[183px] h-[45px] hover:cursor-pointer group flex relative'
                        // onClick={() => setSelectedProvider('LinkedIn')}
                      >
                        <div
                          className={classNames(
                            'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-5 cursor-pointer border-[#ACB9CB] bg-slate-400',
                            selectedProvider === 'LinkedIn' ? 'border-2 border-blue-500' : 'border-slate-400'
                          )}
                        >
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g clipPath='url(#clip0_1041_7115)'>
                              <path
                                d='M3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5ZM15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9ZM6 17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18H6V17Z'
                                fill='#373530'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_1041_7115'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                          <h1>Employee</h1>
                        </div>
                        <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                          <h1 className='text-sm'>Coming Soon</h1>
                        </span>
                      </div>
                      {/* <div className={classNames('w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-5 cursor-pointer border-[#ACB9CB] bg-slate-400', selectedProvider === 'LinkedIn' ? 'border-2 border-blue-500' : 'border-slate-400')}>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clipPath='url(#clip0_1041_7115)'>
                            <path
                              d='M3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5ZM15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9ZM6 17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18H6V17Z'
                              fill='#373530'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_1041_7115'>
                              <rect width='24' height='24' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                        <h1>Employee</h1>
                        <span className="absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex">
                          <h1 className="text-sm">
                            Coming Soon
                          </h1>
                        </span>
                      </div> */}
                    </div>
                    <div
                      className='w-[183px] h-[45px] hover:cursor-pointer'
                      onClick={() => setSelectedOption('Company')}
                    >
                      <div
                        className={classNames(
                          'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 place-content-center cursor-pointer',
                          selectedOption === 'Company' ? 'border-2 border-blue-500' : 'border-slate-400'
                        )}
                      >
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <g clipPath='url(#clip0_1041_7118)'>
                            <path
                              d='M15 11V5L12 2L9 5V7H3V21H21V11H15ZM7 19H5V17H7V19ZM7 15H5V13H7V15ZM7 11H5V9H7V11ZM13 19H11V17H13V19ZM13 15H11V13H13V15ZM13 11H11V9H13V11ZM13 7H11V5H13V7ZM19 19H17V17H19V19ZM19 15H17V13H19V15Z'
                              fill='#373530'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_1041_7118'>
                              <rect width='24' height='24' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                        <h1>Company</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center sm:text-left'>
              <div className='xl:flex mx-6 xl:space-x-10 xl:divide-x-4 px-6 place-content-center'>
                <div className='flex flex-col'>
                  <div className='mb-4 text-center px-4'>
                    <div className='block mb-4'>
                      <div className='mb-4'>
                        <h1 className='text-xl font-bold'>Sign Up with:</h1>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='flex space-x-4'>
                      <div
                        className='w-[183px] h-[45px] hover:cursor-pointer'
                        onClick={() => setSelectedProvider('Google')}
                      >
                        <div
                          className={classNames(
                            'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-10 cursor-pointer',
                            selectedProvider === 'Google' ? 'border-2 border-blue-500' : 'border-slate-400'
                          )}
                        >
                          <img src={GoogleIcon} className='w-[18px] h-[18px]' alt='Google' />
                          <h1>Google</h1>
                        </div>
                      </div>
                      <div
                        className='w-[183px] h-[45px] hover:cursor-pointer group flex relative'
                        // onClick={() => setSelectedProvider('LinkedIn')}
                      >
                        <div
                          className={classNames(
                            'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-5 cursor-pointer border-[#ACB9CB] bg-slate-400',
                            selectedProvider === 'LinkedIn' ? 'border-2 border-blue-500' : 'border-slate-400'
                          )}
                        >
                          <img src={LinkedInIcon} className='w-[37px] h-[37px]' alt='LinkedIn' />
                          <h1>Linked In</h1>
                        </div>
                        <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                          <h1 className='text-sm'>Coming Soon</h1>
                        </span>
                      </div>
                    </div>
                    <div className='flex space-x-4'>
                      {/* <div
                        className='w-[183px] h-[45px] hover:cursor-pointer'
                        onClick={() => setSelectedProvider('Facebook')}
                      >
                        <div
                          className={classNames(
                            'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-9 cursor-pointer',
                            selectedProvider === 'Facebook' ? 'border-2 border-blue-500' : 'border-slate-400'
                          )}
                        >
                          <img src={FBIcon} className='w-[24px] h-[24px]' alt='Facebook' />
                          <h1>Facebook</h1>
                        </div>
                      </div> */}
                      <div
                        className='w-[183px] h-[45px] hover:cursor-pointer group flex relative'
                        // onClick={() => setSelectedProvider('yahshua')}
                      >
                        <div
                          className={classNames(
                            'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-7 cursor-pointer border-[#ACB9CB] bg-slate-400',
                            selectedProvider === 'yahshua' ? 'border-2 border-blue-500' : 'border-slate-400'
                          )}
                        >
                          <img src={FBIcon} className='w-[24px] h-[24px]' alt='yahshua' />
                          <h1>Facebook</h1>
                        </div>
                        <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                          <h1 className='text-sm'>Coming Soon</h1>
                        </span>
                      </div>
                      <div
                        className='w-[183px] h-[45px] hover:cursor-pointer group flex relative'
                        // onClick={() => setSelectedProvider('yahshua')}
                      >
                        <div
                          className={classNames(
                            'w-[183px] h-[45px] rounded-[10px] border flex items-center space-x-2 px-7 cursor-pointer border-[#ACB9CB] bg-slate-400',
                            selectedProvider === 'yahshua' ? 'border-2 border-blue-500' : 'border-slate-400'
                          )}
                        >
                          <img src={YahshuaIcon} className='w-[24px] h-[24px]' alt='yahshua' />
                          <h1>YAHSHUA</h1>
                        </div>
                        <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                          <h1 className='text-sm'>Coming Soon</h1>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse px-6 pb-2 pt-4 sm:pl-6 xl:pb-0 justify-center xl:pt-5'>
              <span className='flex w-full rounded-md shadow-sm sm:ml-10 sm:w-auto'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full rounded-[22.5px] border border-transparent px-12 py-2 bg-[#355FD0] text-base leading-6 font-bold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </span>
              <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto justify-center'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full rounded-[22.5px] border border-blue-600 px-10 py-2 bg-white text-base leading-6 font-bold text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                  onClick={onClose}
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpWithModal;
