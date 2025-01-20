import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import CustomToast from '@/components/Toast/CustomToast';
import ForgotPasswordSendEmailModal from './modal/ForgotPasswordSendEmailModal';

import { static_images } from '@/initialData';

function ForgotPassword() {
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [process, setProcess] = useState(false);
  const [email, setEmail] = useState('');

  const requestForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setProcess(true);
      const data = {
        email: email,
      };
      const config = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`/forgot_password/`, config);
      if (!res.ok) {
        throw res;
      }
      toast.custom(
        () => (
          <CustomToast
            message={
              'A link to reset your password has been sent to your registered email address. Please check your inbox and enter the code to proceed.'
            }
            type='success'
          />
        ),
        { duration: 6000 }
      );
    } catch (err: any) {
      const contentType = err.headers.get('Content-Type');
      let errData;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        errData = await err.json();
      } else {
        errData = await err.text();
      }
      let finalErrorMessage = errData;
      if (Object.hasOwn(errData, 'response')) {
        finalErrorMessage = errData.response.data.message;
      }
      toast.custom(() => <CustomToast message={finalErrorMessage} type='error' />, {
        duration: 7000,
      });
    } finally {
      setProcess(false);
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-between px-6 pt-[100px] mx-auto h-screen '>
      <div className='w-full h-[0px] bottom-[130px] absolute border-b border-indigo-500 blur-sm'></div>
      <div className='w-full h-16 absolute bottom-[10px] opacity-40 bg-gradient-to-r from-blue-600 to-sky-300 rounded-full blur-[50px]' />
      <div className='absolute bottom-0 left-0'>
        <div className='relative'>
          <img src={static_images.sally} className='w-[700px] h-[700px]' alt='sally' />
          <img src={static_images.sally_shadow} className='w-[766px] h-[77px]' alt='sally-shadow' />
        </div>
      </div>
      <div className='absolute bottom-0 right-[300px]'>
        <div className='relative'>
          <img src={static_images.sally_dog} className='w-[220.96px] h-[220.96px]' alt='sally-dog' />
          <img src={static_images.sally_dog_shadow} className='w-[225.06px] h-[64.23px]' alt='sally-dog-shadow' />
        </div>
      </div>
      <div className='shadow-lg rounded-[30px] md:mt-0 xl:w-[500px] lg:w-[500px] sm:w-[400px] px-14 h-auto bg-white z-10 pt-14 pb-14'>
        <div className='flex flex-col items-center'>
          <img src={static_images.yto_icon} className='h-40 mb-5' alt='yto-icon' />
          <h1 className='text-2xl text-center font-bold leading-none tracking-tight text-indigo-dye lg:text-[25px] mb-2 mt-4'>
            Forgot your password?
          </h1>
        </div>
        <div className='p-2 space-y-1 sm:p-4'>
          <div className=''>
            <p className='text-sm	text-center font-normal'>
              Enter your email below and we’ll send you a link to reset your password.
            </p>
          </div>
          <ForgotPasswordSendEmailModal isOpen={openEmailModal} onClose={() => setOpenEmailModal(false)} />
          <form onSubmit={requestForgotPassword}>
            <div className='w-full flex flex-col space-y-1 mt-6 px-6'>
              <div className='relative mb-7'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <mask
                      id='mask0_80_12346'
                      style={{ maskType: 'alpha' }}
                      maskUnits='userSpaceOnUse'
                      x='0'
                      y='0'
                      width='19'
                      height='19'
                    >
                      <rect width='19' height='19' fill='#D9D9D9' />
                    </mask>
                    <g mask='url(#mask0_80_12346)'>
                      <path
                        d='M3.16659 15.8331C2.73117 15.8331 2.35843 15.6781 2.04836 15.368C1.73829 15.0579 1.58325 14.6852 1.58325 14.2498V4.74978C1.58325 4.31436 1.73829 3.94162 2.04836 3.63155C2.35843 3.32148 2.73117 3.16644 3.16659 3.16644H15.8333C16.2687 3.16644 16.6414 3.32148 16.9515 3.63155C17.2615 3.94162 17.4166 4.31436 17.4166 4.74978V14.2498C17.4166 14.6852 17.2615 15.0579 16.9515 15.368C16.6414 15.6781 16.2687 15.8331 15.8333 15.8331H3.16659ZM9.49992 10.2914L15.8333 6.33311V4.74978L9.49992 8.70811L3.16659 4.74978V6.33311L9.49992 10.2914Z'
                        fill='#878787'
                      />
                    </g>
                  </svg>
                </div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 pl-11 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-[45px]'
                  placeholder='Email Address'
                  tabIndex={1}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  id='signin-button'
                  type='submit'
                  className='w-full h-11 text-white bg-[#00b395] hover:bg-[#29b9a1] focus:ring-4 focus:outline-none focus:ring-[#3af5d6] font-semibold rounded-xl text-sm px-5 py-2.5 text-center mb-2 disabled:opacity-50'
                  tabIndex={2}
                  disabled={process}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <Link
          id='back-to-login'
          to='/login'
          className='underline flex justify-center text-indigo-dye text-[#00b395] text-sm font-semibold pb-4'
          tabIndex={3}
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
