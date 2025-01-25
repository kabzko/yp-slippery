import { static_images } from '@/initialData';

const SignInWithGoogle = () => {
    
  function signInWithGoogle() {
    const left = (window.innerWidth - 600) / 2;
    const top = (window.innerHeight - 400) / 2;
    const popup: any = window.open(
      `/sso/login/google-oauth`,
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
    <>
      <button onClick={signInWithGoogle}>
        <div className='w-[45px] h-[45px] border border-[#ACB9CB] rounded-lg flex justify-center items-center'>
          <img src={static_images.google_logo} className='w-[24px] h-[24px]' alt='google' />
        </div>
      </button>
    </>
  );
};

export default SignInWithGoogle;
