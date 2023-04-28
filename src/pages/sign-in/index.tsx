import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import useGStore from '@store/cloud-auth-store';
import useStore from '@store/store';
import jwtDecode from 'jwt-decode';

type Props = {};

type DataCredential = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

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
      console.log({ codeResponse });
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

  return (
    <div className='overflow-hidden w-full h-full relative flex justify-center items-center'>
      <GoogleLogin
        useOneTap
        hosted_domain={import.meta.env.VITE_HOSTED_DOMAIN}
        onSuccess={(credentialResponse) => {
          console.log({ credentialResponse });
          if (credentialResponse.credential) {
            const userCredential = jwtDecode<DataCredential>(
              credentialResponse.credential
            );
            console.log({ userCredential });
            handleLogin();
          }
        }}
        onError={() => {
          console.log('Login failed');
        }}
      />
    </div>
  );
};

export default SignInPage;
