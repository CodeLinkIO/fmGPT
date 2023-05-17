import { User } from 'firebase/auth';
import { FirebaseStoreSlice } from './firebase-store';

export interface FirebaseAuthSlice {
  loading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const createFirebaseAuthSlice: FirebaseStoreSlice<FirebaseAuthSlice> = (
  set,
  get
) => ({
  loading: false,
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
});
