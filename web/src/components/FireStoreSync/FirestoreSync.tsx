import DatabaseIcon from '@icon/DatabaseIcon';
import RefreshIcon from '@icon/RefreshIcon';
import TickIcon from '@icon/TickIcon';
import useFirebaseStore from '@store/firebase-store';
import { SyncStatus } from '@type/google-api';

const FirestoreSync = () => {
  const sync = useFirebaseStore((state) => state.sync);
  const syncStatus = useFirebaseStore((state) => state.syncStatus);

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
