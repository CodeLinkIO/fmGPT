import {
  RouterProvider,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from 'react-router-dom';

import PrivateRoutes from './routes/private-routes';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import Layout from '@components/Layout';
import Toast from '@components/Toast';
import ChatPage from './pages/chat';
import EmailContentPage from './pages/email-content';
import SignInPage from './pages/sign-in';

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
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/email-content' element={<EmailContentPage />} />
        <Route path='*' element={<Navigate to='chat' replace />} />
      </Route>
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='*' element={<Navigate to='/sign-in' replace />} />
    </Route>
  )
);

const App = () => {
  useFirebaseAuth();

  return <RouterProvider router={router} />;
};

export default App;
