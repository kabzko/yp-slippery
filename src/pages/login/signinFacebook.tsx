import { static_images } from '@/initialData';

const SignInWithFacebookButton = () => {
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
    <button onClick={handleSignInWithFacebook}>
      <div className='w-[45px] h-[45px] border border-[#ACB9CB] rounded-lg flex justify-center items-center'>
        <img src={static_images.facebook_logo} className='w-[27px] h-[27px]' alt='FaceBook' />
      </div>
    </button>
  );
};

export default SignInWithFacebookButton;
