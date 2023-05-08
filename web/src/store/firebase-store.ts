import { create, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  createFirebaseAuthSlice,
  FirebaseAuthSlice,
} from './firebase-auth-slice';
import {
  createFirestoreSlice,
  FirestoreSlice,
} from './firebase-firestore-slice';

export type FirebaseStoreState = FirebaseAuthSlice & FirestoreSlice;

export type FirebaseStoreSlice<T> = (
  set: StoreApi<FirebaseStoreState>['setState'],
  get: StoreApi<FirebaseStoreState>['getState']
) => T;

const useFirebaseStore = create<FirebaseStoreState>()(
  persist(
    (set, get) => ({
      ...createFirebaseAuthSlice(set, get),
      ...createFirestoreSlice(set, get),
    }),
    {
      name: 'firebase-store',
      version: 1,
      partialize: (state) => ({
        sync: state.sync,
      }),
    }
  )
);

export default useFirebaseStore;
