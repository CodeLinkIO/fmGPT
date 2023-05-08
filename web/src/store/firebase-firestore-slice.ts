import { SyncStatus } from '@type/google-api';
import { FirebaseStoreSlice } from './firebase-store';

export interface FirestoreSlice {
  sync: boolean;
  syncStatus: SyncStatus;
  setSync: (sync: boolean) => void;
  setSyncStatus: (syncStatus: SyncStatus) => void;
}

export const createFirestoreSlice: FirebaseStoreSlice<FirestoreSlice> = (
  set,
  get
) => ({
  sync: false,
  syncStatus: 'unauthenticated',
  setSync: (sync: boolean) => set(() => ({ sync })),
  setSyncStatus: (syncStatus: SyncStatus) => {
    set((state: FirestoreSlice) => ({
      ...state,
      syncStatus: syncStatus,
    }));
  },
});
