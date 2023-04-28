import React, { Suspense, useEffect, useState } from 'react';
import useStore from '@store/store';
import i18n from './i18n';

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import { ChatInterface } from '@type/chat';
import { Theme } from '@type/theme';
import ApiPopup from '@components/ApiPopup';
import Toast from '@components/Toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import SignInPage from './pages/sign-in';
import ChatPage from './pages/chat';
import PrivateRoutes from './routes/private-routes';
import PublicRoutes from './routes/public-routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useGStore from '@store/cloud-auth-store';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || undefined;
console.log({ googleClientId });

const AppRouter = () => {
  const googleAccessToken = useGStore((state) => state.googleAccessToken);

  return (
    <BrowserRouter>
      {googleAccessToken ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Layout>
        <AppRouter />
      </Layout>
    </GoogleOAuthProvider>
  );
};

export default App;
