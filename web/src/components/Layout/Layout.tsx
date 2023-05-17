import { PropsWithChildren } from 'react';

import Navbar from '@components/Navbar/Navbar';

type LayoutProps = PropsWithChildren & {};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='w-full h-full overflow-hidden bg-slate-100 dark:bg-gray-800'>
      <Navbar />
      <main className='h-[calc(100%-60px)] w-full overflow-auto'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
