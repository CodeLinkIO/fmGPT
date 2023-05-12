import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';

import AuthenticationProviderSelect from '@components/Selects/AuthenticationProviderSelect';
import GoogleIcon from '@icon/GoogleIcon';
import useFirebaseStore from '@store/firebase-store';
import { AuthenticationProvider } from '@type/auth';
import { signInWithGoogleProvider } from '@utils/firebase';

const SignInPage = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [authenticationProvider, setAuthenticationProvider] = useState(
    AuthenticationProvider.CodeLink
  );
  const setSync = useFirebaseStore((state) => state.setSync);
  const user = useFirebaseStore((state) => state.user);

  if (user) {
    return <Navigate to='/chat' replace />;
  }

  const handleChange = (authenticationProvider: AuthenticationProvider) => {
    setAuthenticationProvider(authenticationProvider);
  };

  const handleLogin = async () => {
    setSigningIn(true);
    try {
      await signInWithGoogleProvider(authenticationProvider);
      setSync(true);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        !([AuthErrorCodes.POPUP_CLOSED_BY_USER] as string[]).includes(
          error.code
        )
      ) {
        alert(
          `Firebae Authentication error: ${error.code} not handled by developers`
        );
      }
    }
    setSigningIn(false);
  };

  return (
    <div className='overflow-hidden w-full h-full relative flex justify-center items-center'>
      <div className='w-2/5'>
        <AuthenticationProviderSelect
          value={authenticationProvider}
          onChange={handleChange}
        />
        <button
          disabled={signingIn}
          onClick={() => handleLogin()}
          className={`w-full flex items-center justify-center btn btn-primary mt-4 ${
            signingIn && 'cursor-not-allowed opacity-50'
          }`}
        >
          <GoogleIcon />
          <span className='ml-2'>Sign in</span>
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
