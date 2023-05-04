import {
  useGoogleLogin,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import useGStore from '@store/cloud-auth-store';
import useStore from '@store/store';
import jwtDecode from 'jwt-decode';
import { UserCredentialData } from '@type/google-api';

type Props = {};

const SignInPage = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setGoogleAccessToken = useGStore((state) => state.setGoogleAccessToken);
  const setCloudSync = useGStore((state) => state.setCloudSync);

  const setToastStatus = useStore((state) => state.setToastStatus);
  const setToastMessage = useStore((state) => state.setToastMessage);
  const setToastShow = useStore((state) => state.setToastShow);

  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleAccessToken(codeResponse.access_token);
      setCloudSync(true);
      setToastStatus('success');
      setToastMessage(t('toast.sync'));
      setToastShow(true);
    },
    onError: (error) => {
      console.log('Login Failed');
      setToastStatus('error');
      setToastMessage(error?.error_description || 'Error in authenticating!');
      setToastShow(true);
    },
    scope: 'https://www.googleapis.com/auth/drive.file',
  });

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      return;
    }
    // TODO: How to store user credential for the next login?
    const userCredential = jwtDecode<UserCredentialData>(
      credentialResponse.credential
    );
    handleLogin();
  };

  const handleError = () => {
    console.log('Login failed');
  };

  return (
    <div className='overflow-hidden w-full h-full relative flex justify-center items-center'>
      <GoogleLogin
        useOneTap
        hosted_domain={import.meta.env.VITE_HOSTED_DOMAIN}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default SignInPage;
