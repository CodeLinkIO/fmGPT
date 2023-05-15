import { Navigate, Outlet } from 'react-router-dom';

import useFirebaseStore from '@store/firebase-store';
import { ROUTES } from '@constants/route';

const PrivateRoutes = () => {
  const user = useFirebaseStore((state) => state.user);

  if (!user) {
    return <Navigate to={ROUTES.signIn} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
