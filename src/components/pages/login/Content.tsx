import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import CustomToast from '../../Toast/CustomToast';
import ConfirmOtpModal from './modal/ConfirmOtpModal';
import ForceChangePasswordModal from './modal/ForceChangePasswordModal';
import AccountModal from './modal/AccountModal';
import USLSPrivacyModal from './modal/USLSPrivacyModal';
import SignInWithGoogle from './signInGoogle';

import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';

import { static_images } from '@/initialData';

function Login() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('account_type');
  }
  const broadcastChannel = new BroadcastChannel('integration-channel');
  const [accounts, setAccounts] = useState([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [process, setProcess] = useState<boolean>(false);
  const [isOtpSubmission, setIsOtpSubmission] = useState<boolean>(false);
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false);
  const [openEmailConfirmationModal, setOpenEmailConfirmationModal] = useState<boolean>(false);
  const [openForceChangePasswordModal, setOpenForceChangePasswordModal] = useState<boolean>(false);
  const [accountModal, setAccountModal] = useState<boolean>(false);
  const [showUSLSPrivacyModal, setShowUSLSPrivacyModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [ssoData, setSsoData] = useState<string>('');
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    if (ssoData) {
      login(null);
    }
  }, [ssoData]);

  useEffect(() => {
    broadcastChannel.onmessage = (event) => {
      if (event.data.authtoken) {
        setSsoData(event.data?.authtoken);
      } else if (event.data?.redirect_url) {
        location.href = event.data.redirect_url;
      } else {
        toast.custom(() => <CustomToast message={event.data.message} type='error' />, {
          duration: 4000,
        });
      }
    };
    return () => {
      broadcastChannel.close();
    };
  }, []);

  const login = async (
    event: React.FormEvent<HTMLFormElement> | null,
    selectedUser: any = null,
    is_resend: boolean = false,
    is_privacy_agree: boolean = false,
    otp: string = ''
  ) => {
    event?.preventDefault();
    try {
      setProcess(true);
      let data: any = {
        email: email,
        password: password,
        is_resend: is_resend,
        is_validate: (isOtpSubmission && !is_resend),
        is_privacy_agree: is_privacy_agree,
        code: otp,
      };
      if (ssoData) {
        data['authtoken'] = ssoData;
      }
      if (selectedUser) {
        data = {
          email: selectedUser.email,
          selected_user: selectedUser,
          is_resend: is_resend ? true : false,
          is_validate: (isOtpSubmission && !is_resend),
          is_second_attempt: true,
          is_privacy_agree: is_privacy_agree ? true : false,
          code: otp,
        };
      }
      const config = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-CSRFToken': (document.getElementsByName('static_url')[0] as HTMLInputElement)?.defaultValue,
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`/login/`, config);
      if (!res.ok) {
        throw res;
      }
      const contentType = res.headers.get('Content-Type');
      let responseData;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }
      if (responseData.selected_user) {

      } else if (selectedUser) {
          
      }
      if (responseData.is_otp) {
        if (is_resend) {
          toast.custom(() => <CustomToast message={`OTP email sent successfully...`} type='success' />, {
            duration: 4000,
          });
        }
        if (accountModal) {
          setAccountModal(false);
        }
        setIsOtpSubmission(true);
      } else if (data.is_multiple_accounts) {
        setAccountModal(true);
        setAccounts(data.user || []);
      } else if (data.show_privacy_notice) {
        if (accountModal) {
          setAccountModal(false);
        }
        setShowUSLSPrivacyModal(true);
      } else {
        if (typeof data === 'string' && data.includes('Account Not Yet Verified. Check your email to verify you account.')) {
          if (accountModal) {
            setAccountModal(false);
          }
          setOpenEmailConfirmationModal(true);
          return;
        }
        toast.custom(() => <CustomToast message={`Signing in...`} type='success' />, {
          duration: 4000,
        });
        location.href = `/dashboard`;
      }
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

  const forceChangePassword = async (password: string, confirmPassword: string) => {
    try {
      setProcess(true);
      const data = {
        token: token,
        password: password,
        repassword: confirmPassword,
      };
      const config = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-CSRFToken': (document.getElementsByName('static_url')[0] as HTMLInputElement)?.defaultValue,
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`/force_change_password/`, config);
      if (!res.ok) {
        throw res;
      }
      toast.custom(() => <CustomToast message={'You have successfully changed your password.'} type='success' />, {
        duration: 6000,
      });
      setOpenForceChangePasswordModal(false);
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
    <div className='relative flex flex-col items-center justify-between px-6 py-8 mx-auto lg:py-6 '>
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
        <div className='flex flex-col items-center mb-5'>
          <img src={static_images.yto_logo} className='h-48' alt='yto-logo' />
        </div>
        <div className='px-8 pb-6 space-y-2'>
          <div className='mb-4'>
            <h1 className='text-xl font-medium text-center leading-none tracking-tight text-indigo-dye lg:text-[25px] mb-4'>
              Sign in
            </h1>
            <p className='text-sm	text-center font-normal'>Enjoy multiple device in one account.</p>
          </div>
          <div>
            <form onSubmit={login}>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
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
                    id='password'
                    name='password'
                    className='bg-gray-50 border border-gray-300 text-gray-900 pl-11 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-[45px]'
                    placeholder='Password'
                    tabIndex={2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center px-4 text-blue-600'
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    tabIndex={3}
                  >
                    {showPassword ? (
                      <EyeIcon className='h-5 w-5 text-blue-600' />
                    ) : (
                      <EyeSlashIcon className='h-5 w-5 text-blue-600' />
                    )}
                  </button>
                </div>
              </div>
              <div className='flex justify-end'>
                <Link
                  id='forgot-password'
                  to='/forgot-password'
                  className='text-sm font-semibold text-blue-600 hover:underline float-right mb-5'
                  tabIndex={4}
                >
                  Forgot password?
                </Link>
              </div>
              <div className='pt-6 px-6'>
                <button
                  id='signin-button'
                  type='submit'
                  className='w-full h-11 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-semibold rounded-3xl text-sm px-5 py-2.5 text-center mb-5 disabled:opacity-50'
                  tabIndex={5}
                  disabled={process}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className='border-t text-gray-400 border-gray-400 flex justify-center pb-4 bg-white'>
            <span className='absolute -translate-y-[15px] bg-white px-8 text-base uppercase'>or</span>
          </div>
          <div className='mb-5 relative flex justify-between px-10 pb-2'>
            <>
              <SignInWithGoogle />
            </>
            <div className='group flex relative'>
              <button>
                <div className='w-[45px] h-[45px] border border-[#ACB9CB] bg-slate-400 rounded-lg flex justify-center items-center'>
                  <img src={static_images.facebook_logo} className='w-[37px] h-[37px]' alt='LinkedIn' />
                </div>
              </button>
              <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                <h1 className='text-sm'>Coming Soon</h1>
              </span>
            </div>
            <div className='group flex relative'>
              <button>
                <div className='w-[45px] h-[45px] border border-[#ACB9CB] bg-slate-400 rounded-lg flex justify-center items-center'>
                  <img src={static_images.linkedin_logo} className='w-[37px] h-[37px]' alt='LinkedIn' />
                </div>
              </button>
              <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                <h1 className='text-sm'>Coming Soon</h1>
              </span>
            </div>
            <div className='group flex relative'>
              <button>
                <div className='w-[45px] h-[45px] border border-[#ACB9CB] bg-slate-400 rounded-lg flex justify-center items-center'>
                  <img src={static_images.yahshua_logo} className='w-[27px] h-[27px]' alt='yahshuaOne' />
                </div>
              </button>
              <span className='absolute z-40 w-[120px] bottom-12 scale-0 rounded-lg bg-[#344960] p-2 text-white group-hover:scale-100 flex'>
                <h1 className='text-sm'>Coming Soon</h1>
              </span>
            </div>
          </div>
          <div className='mt-2 px-2'>
            <h1 className='text-center text-stone-700 text-sm font-normal tracking-tight'>
              By selecting Sign In, you agree to our terms and have read and acknowledge our Global Privacy Statement.
            </h1>
          </div>
          <div className='flex flex-col space-y-2 mb-10'>
            <Link
              id='privacy-notice'
              to='/privacy_policy_web/'
              target='_blank'
              className='underline flex justify-center mt-4 text-indigo-dye text-blue-600 text-[15px] font-bold tracking-tight'
              tabIndex={6}
            >
              Privacy Notice
            </Link>
            <Link
              id='privacy-notice'
              to='/terms_of_service/'
              target='_blank'
              className='underline flex justify-center mt-4 text-indigo-dye text-blue-600 text-[15px] font-bold tracking-tight'
              tabIndex={7}
            >
              Terms of Services
            </Link>
          </div>
          <div className='flex flex-row space-x-4 justify-center pt-4'>
            <img src={static_images.eugdpr} alt='GDPR' width={100} height={100} />
            <img src={static_images.iso27001} alt='ISO' width={100} height={100} />
          </div>
        </div>
      </div>
      {openOtpModal && (
        <ConfirmOtpModal
          isOpen={openOtpModal}
          onClose={() => setOpenOtpModal(false)}
          resend={() => login(null, null, true)}
          submit={(otp: string) => login(null, null, false, false, otp)}
        />
      )}
      {openEmailConfirmationModal && (
        <ConfirmOtpModal
          isOpen={openEmailConfirmationModal}
          onClose={() => setOpenEmailConfirmationModal(false)}
          resend={() => login(null, null, true, false, '')}
          submit={(otp) => login(null, null, false, false, otp)}
        />
      )}
      {openForceChangePasswordModal && (
        <ForceChangePasswordModal
          isOpen={openForceChangePasswordModal}
          onClose={() => setOpenForceChangePasswordModal(false)}
          process={process}
          submit={(password, confirmPassword) => forceChangePassword(password, confirmPassword)}
        />
      )}
      {accountModal && (
        <AccountModal
          handleLogin={login}
          response={accounts}
          isOpen={accountModal}
          onClose={() => setAccountModal(false)}
        />
      )}
      {showUSLSPrivacyModal && (
        <USLSPrivacyModal
          isOpen={showUSLSPrivacyModal}
          onClose={() => setShowUSLSPrivacyModal(false)}
          handleLogin={login}
          savedUser={savedUser}
        />
      )}
    </div>
  );
}

export default Login;
