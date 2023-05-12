import { Navigate, Outlet } from 'react-router-dom';

import useFirebaseStore from '@store/firebase-store';

const PrivateRoutes = () => {
  const user = useFirebaseStore((state) => state.user);

  if (!user) {
    return <Navigate to='/sign-in' replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
