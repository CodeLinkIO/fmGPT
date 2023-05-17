import { useEffect } from 'react';

import useFirebaseStore from '@store/firebase-store';
import { auth } from '@utils/firebase';

export const useFirebaseAuth = () => {
  const setUser = useFirebaseStore((state) => state.setUser);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        setUser(null);
        return;
      }

      setUser(userAuth);
    });

    return () => {
      unsubcribe();
    };
  }, []);
};
