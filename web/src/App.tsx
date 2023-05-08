import { BrowserRouter } from 'react-router-dom';

import PrivateRoutes from './routes/private-routes';
import PublicRoutes from './routes/public-routes';
import Layout from '@components/Layout/Layout';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import useFirebaseStore from '@store/firebase-store';

const AppRouter = () => {
  useFirebaseAuth();
  const user = useFirebaseStore((state) => state.user);

  return (
    <BrowserRouter>{user ? <PrivateRoutes /> : <PublicRoutes />}</BrowserRouter>
  );
};

const App = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
