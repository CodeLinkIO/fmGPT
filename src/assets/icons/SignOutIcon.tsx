import React from 'react';

const SignOutIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      stroke-width='1.5'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
      />
    </svg>
  );
};

export default SignOutIcon;
