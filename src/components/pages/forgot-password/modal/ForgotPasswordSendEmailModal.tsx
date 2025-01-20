import React from 'react';

import PropTypes from 'prop-types';

const ForgotPasswordSendEmailModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const modalClassName = isOpen ? 'block absolute z-10' : 'hidden';

  return (
    <div className={`modal ${modalClassName}`}>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:pb-6'>
            <div className='text-center sm:text-left'>
              <div className='mt-2'>
                <h1 className='text-3xl px-10 text-center font-bold'>Instructions Sent 😉</h1>
              </div>
              <div className='sm:p-2 flex justify-center'>
                <svg width='78' height='78' viewBox='0 0 78 78' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <mask
                    id='mask0_3238_1182'
                    style={{ mask: 'alpha' }}
                    maskUnits='userSpaceOnUse'
                    x='0'
                    y='0'
                    width='78'
                    height='78'
                  >
                    <rect width='78' height='78' fill='#D9D9D9' />
                  </mask>
                  <g mask='url(#mask0_3238_1182)'>
                    <path
                      d='M13 65C11.2125 65 9.68229 64.3635 8.40938 63.0906C7.13646 61.8177 6.5 60.2875 6.5 58.5V19.5C6.5 17.7125 7.13646 16.1823 8.40938 14.9094C9.68229 13.6365 11.2125 13 13 13H65C66.7875 13 68.3177 13.6365 69.5906 14.9094C70.8635 16.1823 71.5 17.7125 71.5 19.5V58.5C71.5 60.2875 70.8635 61.8177 69.5906 63.0906C68.3177 64.3635 66.7875 65 65 65H13ZM39 42.25L13 26V58.5H65V26L39 42.25ZM39 35.75L65 19.5H13L39 35.75ZM13 26V19.5V58.5V26Z'
                      fill='#2757ED'
                    />
                  </g>
                </svg>
              </div>
              <h1 className='text-[15px] px-10 text-center mt-4'>
                We sent instructions to change your password to your email. Please check your inbox or spam folder.
                Thank you and GOD bless!
              </h1>
            </div>
            <div className='mt-4 sm:mt-4 sm:flex sm:flex-row-reverse pr-6 sm:pl-6 justify-center w-full pt-2'>
              <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
                <button
                  type='button'
                  className='inline-flex justify-center drop-shadow-xl w-full rounded-3xl border border-transparent px-20 py-2 bg-[#00b395] text-base leading-6 font-bold text-white shadow-sm hover:bg-[#29b9a1] focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                  onClick={onClose}
                >
                  Continue
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordSendEmailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ForgotPasswordSendEmailModal;
