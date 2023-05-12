const SquareIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      stroke='currentColor'
      fill='none'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      strokeLinecap='round'
      strokeLinejoin='round'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      className={`h-3 w-3 ${className}`}
    >
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
    </svg>
  );
};

export default SquareIcon;
