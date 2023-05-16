import {
  RouterProvider,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from 'react-router-dom';

import useStore, { createPartializedState } from '@store/store';
import PrivateRoutes from './routes/private-routes';
import Layout from '@components/Layout';
import Toast from '@components/Toast';
import ChatPage from './pages/chat';
import EmailContentPage from './pages/email-content';
import SignInPage from './pages/sign-in';
import useFirebaseStore from '@store/firebase-store';
import createFirestoreStorage from '@store/storage/firestore-storage';
import i18n from './i18n';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { ROUTES } from '@constants/route';
import { useEffect } from 'react';
import { createUserChats, isUserExisting } from '@api/firestore-api';

const Root = () => {
  const theme = useStore((state) => state.theme);
  const user = useFirebaseStore((state) => state.user);
  const setSyncStatus = useFirebaseStore((state) => state.setSyncStatus);

  const initialiseState = async () => {
    if (!user) {
      setSyncStatus('unauthenticated');
      return;
    }

    try {
      const hasUser = await isUserExisting(user.uid);
      if (!hasUser) {
        const partializedState = createPartializedState(useStore.getState());
        await createUserChats(user.uid, partializedState);
      }
      useStore.persist.setOptions({
        storage: createFirestoreStorage(),
      });
      useStore.persist.rehydrate();
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    if (user) {
      setSyncStatus('syncing');
      initialiseState();
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }, []);

  return (
    <Layout>
      <Outlet />
      <Toast />
    </Layout>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route element={<PrivateRoutes />}>
        <Route path={ROUTES.supportAssistant} element={<EmailContentPage />} />
        <Route path={ROUTES.chat} element={<ChatPage />} />
        <Route
          path='*'
          element={<Navigate to={ROUTES.supportAssistant} replace />}
        />
      </Route>
      <Route path={ROUTES.signIn} element={<SignInPage />} />
      <Route path='*' element={<Navigate to={ROUTES.signIn} replace />} />
    </Route>
  )
);

const App = () => {
  useFirebaseAuth();

  return <RouterProvider router={router} />;
};

export default App;
