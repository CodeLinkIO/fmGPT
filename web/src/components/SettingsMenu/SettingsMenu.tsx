import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import PopupModal from '@components/PopupModal';
import SettingIcon from '@icon/SettingIcon';
import ThemeSwitcher from '@components/Menu/MenuOptions/ThemeSwitcher';
import LanguageSelector from '@components/LanguageSelector';
import AdvancedModeToggle from './AdvencedModeToggle';
import InlineLatexToggle from './InlineLatexToggle';

import PromptLibraryMenu from '@components/PromptLibraryMenu';
import ChatConfigMenu from '@components/ChatConfigMenu';
import { signOut } from '@utils/firebase';
import useFirebaseStore from '@store/firebase-store';
import { createJSONStorage } from 'zustand/middleware';

const SettingsMenu = () => {
  const { t } = useTranslation();
  const setSync = useFirebaseStore((state) => state.setSync);
  const setUser = useFirebaseStore((state) => state.setUser);
  const setSyncStatus = useFirebaseStore((state) => state.setSyncStatus);

  const theme = useStore.getState().theme;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickSignOut = () => {
    setSync(false);
    setUser(null);
    setSyncStatus('unauthenticated');
    signOut();
    useStore.persist.setOptions({
      storage: createJSONStorage(() => localStorage),
    });
    useStore.persist.rehydrate();
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  return (
    <>
      <a
        className='flex py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <SettingIcon className='w-4 h-4' /> {t('setting') as string}
      </a>
      {isModalOpen && (
        <PopupModal
          setIsModalOpen={setIsModalOpen}
          title={t('setting') as string}
          cancelButton={false}
        >
          <div className='p-6 border-b border-gray-200 dark:border-gray-600 flex flex-col items-center gap-4'>
            <LanguageSelector />
            <ThemeSwitcher />
            <div className='flex flex-col gap-3'>
              <InlineLatexToggle />
              <AdvancedModeToggle />
            </div>
            <PromptLibraryMenu />
            <ChatConfigMenu />
            <button className='btn btn-neutral' onClick={handleClickSignOut}>
              Sign out
            </button>
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default SettingsMenu;
