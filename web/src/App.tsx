import {
  RouterProvider,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from 'react-router-dom';

import PrivateRoutes from './routes/private-routes';
import Layout from '@components/Layout';
import Toast from '@components/Toast';
import ChatPage from './pages/chat';
import EmailContentPage from './pages/email-content';
import SignInPage from './pages/sign-in';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { ROUTES } from '@constants/route';

const Root = () => {
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
