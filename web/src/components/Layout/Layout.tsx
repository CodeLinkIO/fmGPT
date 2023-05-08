import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren & {};

const Layout = ({ children }: LayoutProps) => {
  return <div className='w-full h-full bg-gray-650'>{children}</div>;
};

export default Layout;
