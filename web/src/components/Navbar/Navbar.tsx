import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createJSONStorage } from 'zustand/middleware';

import useClickOutside from '@hooks/useClickOuside';
import ArrowRightOnRectangleIcon from '@icon/ArrowRightOnRectangleIcon';
import DownChevronArrow from '@icon/DownChevronArrow';
import UpChevronArrow from '@icon/UpChevronArrow';
import useFirebaseStore from '@store/firebase-store';
import useStore from '@store/store';
import { signOut } from '@utils/firebase';
import { ROUTES } from '@constants/route';

const Navbar = () => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [activeRoute, setActiveRoute] = useState(ROUTES.supportAssistant);
  const [showUserMenu, setShowUserMenu] = useState(false);
  useClickOutside(ref, () => setShowUserMenu(false));
  const user = useFirebaseStore((state) => state.user);
  const setSync = useFirebaseStore((state) => state.setSync);
  const setUser = useFirebaseStore((state) => state.setUser);
  const setSyncStatus = useFirebaseStore((state) => state.setSyncStatus);

  const handleToggleUserMenu = () =>
    setShowUserMenu((prevShowUserMenu) => !prevShowUserMenu);

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
    setActiveRoute(location.pathname);
  }, [location]);

  const renderUserMenu = () => {
    return (
      <div className='absolute min-w-[180px] top-[120%] right-0 bg-slate-50 rounded z-10 py-2 shadow-md'>
        <div
          onClick={handleClickSignOut}
          className='flex items-center cursor-pointer px-1 py-3 hover:bg-gray-200'
        >
          <ArrowRightOnRectangleIcon className='w-[24px] h-[24px]' />
          <span className='ml-2'>Sign out</span>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full h-[60px] flex items-center py-1 px-4 bg-black'>
      <img
        src={'/FMG_Logo_RGB_Large_White.png'}
        alt='FMG logo'
        className='h-full'
      />
      {user && (
        <>
          <div className='flex-1 flex justify-center items-center gap-x-4'>
            {[
              { label: 'Support Assistant', value: ROUTES.supportAssistant },
              { label: 'Chat', value: ROUTES.chat },
            ].map((route) => (
              <Link
                key={route.value}
                to={route.value}
                className={`text-white ${
                  route.value === activeRoute && 'underline underline-offset-8'
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div
            ref={ref}
            onClick={handleToggleUserMenu}
            className='relative cursor-pointer flex items-center justify-center'
          >
            {user.photoURL && (
              <>
                <img
                  referrerPolicy='no-referrer'
                  alt={'photo'}
                  src={user.photoURL}
                  className='w-[36x] h-[36px] rounded-full'
                />
                <p className='ml-3 text-white'>{user.displayName}</p>
              </>
            )}
            {showUserMenu ? (
              <UpChevronArrow className='fill-white w-[24px] h-[24px]' />
            ) : (
              <DownChevronArrow className='fill-white w-[24px] h-[24px]' />
            )}
            {showUserMenu && renderUserMenu()}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
