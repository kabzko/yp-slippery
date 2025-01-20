import React, { useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import CustomToast from '@/components/Toast/CustomToast';

import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { static_images } from '@/initialData';

function ChangePassword() {
  const navigate = useNavigate();
  const params = useParams();
  const code = params.code || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [process, setProcess] = useState(false);

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setProcess(true);
      const data = {
        code: code,
        password: password,
        repassword: confirmPassword,
      };
      const config = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`/force_change_password/`, config);
      if (!res.ok) {
        throw res;
      }
      toast.custom(() => <CustomToast message={'Your password has been changed successfully.'} type='success' />, {
        duration: 6000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
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
    <div className='relative flex flex-col items-center justify-between px-6 pt-[80px] mx-auto h-screen'>
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
      <div className='shadow-lg rounded-[30px] md:mt-0 xl:w-[500px] lg:w-[500px] sm:w-[400px] px-8 py-5 z-10 bg-white'>
        <div className='flex flex-col items-center'>
          <img src={static_images.yto_icon} className='h-40 mb-5' alt='yto-icon' />
          <h1 className='text-2xl text-center font-bold leading-none tracking-tight text-indigo-dye lg:text-[25px] mb-2 mt-4'>
            Change Your Password! 😁
          </h1>
        </div>
        <div className='px-6 pb-6 pt-2 space-y-2 sm:p-8'>
          <div className='mb-4'>
            <p className='text-sm text-center font-normal'>
              Please make sure your password contains one uppercase letter, one lowercase letter, one number, one
              character, and atleast 8 characters long.
            </p>
          </div>
          <div>
            <form onSubmit={changePassword}>
              <div className='mb-3 space-y-6'>
                <div className='space-y-2'>
                  <label className='text-[15px] font-bold'>New Password</label>
                  <div className='relative mx-auto'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <mask
                          id='mask0_80_12343'
                          style={{ maskType: 'alpha' }}
                          maskUnits='userSpaceOnUse'
                          x='0'
                          y='0'
                          width='19'
                          height='19'
                        >
                          <rect width='19' height='19' fill='#D9D9D9' />
                        </mask>
                        <g mask='url(#mask0_80_12343)'>
                          <path
                            d='M4.75008 17.4164C4.31466 17.4164 3.94192 17.2614 3.63185 16.9513C3.32178 16.6413 3.16675 16.2685 3.16675 15.8331V7.91644C3.16675 7.48103 3.32178 7.10828 3.63185 6.79821C3.94192 6.48814 4.31466 6.33311 4.75008 6.33311H5.54175V4.74978C5.54175 3.65464 5.92769 2.72113 6.69956 1.94926C7.47144 1.17738 8.40494 0.791443 9.50008 0.791443C10.5952 0.791443 11.5287 1.17738 12.3006 1.94926C13.0725 2.72113 13.4584 3.65464 13.4584 4.74978V6.33311H14.2501C14.6855 6.33311 15.0582 6.48814 15.3683 6.79821C15.6784 7.10828 15.8334 7.48103 15.8334 7.91644V15.8331C15.8334 16.2685 15.6784 16.6413 15.3683 16.9513C15.0582 17.2614 14.6855 17.4164 14.2501 17.4164H4.75008ZM9.50008 13.4581C9.9355 13.4581 10.3082 13.3031 10.6183 12.993C10.9284 12.6829 11.0834 12.3102 11.0834 11.8748C11.0834 11.4394 10.9284 11.0666 10.6183 10.7565C10.3082 10.4465 9.9355 10.2914 9.50008 10.2914C9.06466 10.2914 8.69192 10.4465 8.38185 10.7565C8.07178 11.0666 7.91675 11.4394 7.91675 11.8748C7.91675 12.3102 8.07178 12.6829 8.38185 12.993C8.69192 13.3031 9.06466 13.4581 9.50008 13.4581ZM7.12508 6.33311H11.8751V4.74978C11.8751 4.09005 11.6442 3.52929 11.1824 3.06748C10.7206 2.60568 10.1598 2.37478 9.50008 2.37478C8.84036 2.37478 8.2796 2.60568 7.81779 3.06748C7.35598 3.52929 7.12508 4.09005 7.12508 4.74978V6.33311Z'
                            fill='#878787'
                          />
                        </g>
                      </svg>
                    </div>
                    <input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      className='bg-gray-50 border border-gray-300 text-gray-900 pl-11 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-[45px]'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      tabIndex={1}
                      required
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 flex items-center px-4 text-blue-400'
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      tabIndex={2}
                    >
                      {showPassword ? (
                        <EyeIcon className='h-5 w-5 text-[#00b395]' />
                      ) : (
                        <EyeSlashIcon className='h-5 w-5 text-[#00b395]' />
                      )}
                    </button>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-[15px] font-bold'>Confirm Password</label>
                  <div className='relative mx-auto'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <mask
                          id='mask0_80_12343'
                          style={{ maskType: 'alpha' }}
                          maskUnits='userSpaceOnUse'
                          x='0'
                          y='0'
                          width='19'
                          height='19'
                        >
                          <rect width='19' height='19' fill='#D9D9D9' />
                        </mask>
                        <g mask='url(#mask0_80_12343)'>
                          <path
                            d='M4.75008 17.4164C4.31466 17.4164 3.94192 17.2614 3.63185 16.9513C3.32178 16.6413 3.16675 16.2685 3.16675 15.8331V7.91644C3.16675 7.48103 3.32178 7.10828 3.63185 6.79821C3.94192 6.48814 4.31466 6.33311 4.75008 6.33311H5.54175V4.74978C5.54175 3.65464 5.92769 2.72113 6.69956 1.94926C7.47144 1.17738 8.40494 0.791443 9.50008 0.791443C10.5952 0.791443 11.5287 1.17738 12.3006 1.94926C13.0725 2.72113 13.4584 3.65464 13.4584 4.74978V6.33311H14.2501C14.6855 6.33311 15.0582 6.48814 15.3683 6.79821C15.6784 7.10828 15.8334 7.48103 15.8334 7.91644V15.8331C15.8334 16.2685 15.6784 16.6413 15.3683 16.9513C15.0582 17.2614 14.6855 17.4164 14.2501 17.4164H4.75008ZM9.50008 13.4581C9.9355 13.4581 10.3082 13.3031 10.6183 12.993C10.9284 12.6829 11.0834 12.3102 11.0834 11.8748C11.0834 11.4394 10.9284 11.0666 10.6183 10.7565C10.3082 10.4465 9.9355 10.2914 9.50008 10.2914C9.06466 10.2914 8.69192 10.4465 8.38185 10.7565C8.07178 11.0666 7.91675 11.4394 7.91675 11.8748C7.91675 12.3102 8.07178 12.6829 8.38185 12.993C8.69192 13.3031 9.06466 13.4581 9.50008 13.4581ZM7.12508 6.33311H11.8751V4.74978C11.8751 4.09005 11.6442 3.52929 11.1824 3.06748C10.7206 2.60568 10.1598 2.37478 9.50008 2.37478C8.84036 2.37478 8.2796 2.60568 7.81779 3.06748C7.35598 3.52929 7.12508 4.09005 7.12508 4.74978V6.33311Z'
                            fill='#878787'
                          />
                        </g>
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='confirm_password'
                      name='confirm_password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 pl-11 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-[45px]'
                      placeholder='Password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      tabIndex={3}
                      required
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 flex items-center px-4 text-blue-400'
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      tabIndex={4}
                    >
                      {showPassword ? (
                        <EyeIcon className='h-5 w-5 text-[#00b395]' />
                      ) : (
                        <EyeSlashIcon className='h-5 w-5 text-[#00b395]' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'></div>
              <div className='px-6'>
                <button
                  id='confirm-button'
                  type='submit'
                  className='w-full h-11 text-white bg-[#00b395] hover:bg-[#29b9a1] focus:ring-4 focus:outline-none focus:ring-[#3af5d6] font-semibold rounded-3xl text-sm px-5 py-2.5 text-center my-5 disabled:opacity-50'
                  tabIndex={5}
                  disabled={process}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
          <Link
            id='back-to-login'
            to='/login'
            className='underline flex justify-center text-indigo-dye text-[#00b395] text-sm font-semibold pb-4'
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
