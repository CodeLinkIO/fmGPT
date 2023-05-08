import useStore from '@store/store';

import ClearConversation from './ClearConversation';
import CollapseOptions from './CollapseOptions';
import ImportExportChat from '@components/ImportExportChat';
import SettingsMenu from '@components/SettingsMenu';
import useFirebaseStore from '@store/firebase-store';
import FirestoreSync from '@components/FireStoreSync/FirestoreSync';

const MenuOptions = () => {
  const hideMenuOptions = useStore((state) => state.hideMenuOptions);
  const isDebugEnabled = useStore((state) => state.isDebugEnabled);
  const user = useFirebaseStore((state) => state.user);

  return (
    <>
      <CollapseOptions />
      <div
        className={`${
          hideMenuOptions ? 'max-h-0' : 'max-h-full'
        } overflow-hidden transition-all`}
      >
        {isDebugEnabled ? <>{user && <FirestoreSync />}</> : null}
        <ClearConversation />
        <ImportExportChat />
        <SettingsMenu />
      </div>
    </>
  );
};

export default MenuOptions;
