import { useEffect } from 'react';

import { createUserChats, isUserExisting } from '@api/firestore-api';
import DatabaseIcon from '@icon/DatabaseIcon';
import RefreshIcon from '@icon/RefreshIcon';
import TickIcon from '@icon/TickIcon';
import useFirebaseStore from '@store/firebase-store';
import createFirestoreStorage from '@store/storage/firestore-storage';
import useStore, { createPartializedState } from '@store/store';
import { SyncStatus } from '@type/google-api';

const FirestoreSync = () => {
  const user = useFirebaseStore((state) => state.user);
  const sync = useFirebaseStore((state) => state.sync);
  const syncStatus = useFirebaseStore((state) => state.syncStatus);
  const setSyncStatus = useFirebaseStore((state) => state.setSyncStatus);

  const initialiseState = async () => {
    if (!user) {
      setSyncStatus('unauthenticated');
      return;
    }

    try {
      const hasUser = await isUserExisting(user.uid);
      const partializedState = createPartializedState(useStore.getState());
      if (!hasUser) {
        await createUserChats(user.uid, partializedState);
      }
      useStore.persist.setOptions({
        storage: createFirestoreStorage(),
      });
      useStore.persist.rehydrate();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (user) {
      setSyncStatus('syncing');
      initialiseState();
    }
  }, [user]);

  return (
    <>
      <div className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white text-sm'>
        <DatabaseIcon className='w-4 h-4' />
        Firestore
        {sync && <SyncIcon status={syncStatus} />}
      </div>
    </>
  );
};

const SyncIcon = ({ status }: { status: SyncStatus }) => {
  const statusToIcon = {
    unauthenticated: (
      <div className='bg-red-600/80 rounded-full w-4 h-4 text-xs flex justify-center items-center'>
        !
      </div>
    ),
    syncing: (
      <div className='bg-gray-600/80 rounded-full p-1 animate-spin'>
        <RefreshIcon className='h-2 w-2' />
      </div>
    ),
    synced: (
      <div className='bg-gray-600/80 rounded-full p-1'>
        <TickIcon className='h-2 w-2' />
      </div>
    ),
  };
  return statusToIcon[status] || null;
};

export default FirestoreSync;
