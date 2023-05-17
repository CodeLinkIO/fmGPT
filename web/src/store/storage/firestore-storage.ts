import { PersistStorage, StorageValue } from 'zustand/middleware';

import {
  deleteUserChats,
  fetchUserChats,
  updateUserChatsDebounce,
} from '@api/firestore-api';
import useFirebaseStore from '@store/firebase-store';
import useStore from '@store/store';

const createFirestoreStorage = <S>(): PersistStorage<S> | undefined => {
  const persistStorage: PersistStorage<S> = {
    getItem: async () => {
      useFirebaseStore.getState().setSyncStatus('syncing');
      const user = useFirebaseStore.getState().user;
      if (!user) {
        return null;
      }
      try {
        const data: StorageValue<S> = await fetchUserChats(user.uid);
        useFirebaseStore.getState().setSyncStatus('synced');
        return data;
      } catch (error) {
        useFirebaseStore.getState().setSyncStatus('unauthenticated');
        useStore.getState().setToastMessage((error as Error).message);
        useStore.getState().setToastShow(true);
        useStore.getState().setToastStatus('error');
        return null;
      }
    },
    setItem: async (name, value): Promise<void> => {
      const user = useFirebaseStore.getState().user;
      if (!user) {
        return;
      }

      if (useFirebaseStore.getState().syncStatus !== 'unauthenticated') {
        useFirebaseStore.getState().setSyncStatus('syncing');

        await updateUserChatsDebounce(user.uid, value);
      }
    },
    removeItem: async () => {
      const user = useFirebaseStore.getState().user;
      if (user) {
        await deleteUserChats(user.uid);
      }
    },
  };

  return persistStorage;
};

export default createFirestoreStorage;
