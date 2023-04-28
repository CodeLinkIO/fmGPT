import React, { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren & {};

const Layout = ({ children }: LayoutProps) => {
  return <div className='w-full h-full'>{children}</div>;
};

export default Layout;
