import GoogleIcon from '@icon/GoogleIcon';
import useFirebaseStore from '@store/firebase-store';
import { signInWithGoogleProvider } from '@utils/firebase';

const SignInPage = () => {
  const setSync = useFirebaseStore((state) => state.setSync);

  const handleLogin = async () => {
    try {
      await signInWithGoogleProvider();
      setSync(true);
    } catch (error) {
      alert('Cannot sign in with this email');
    }
  };

  return (
    <div className='overflow-hidden w-full h-full relative flex justify-center items-center'>
      <button onClick={() => handleLogin()} className='btn btn-primary'>
        <GoogleIcon />
        <span className='ml-2'>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignInPage;
