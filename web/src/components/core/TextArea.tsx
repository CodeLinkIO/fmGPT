import React from 'react';

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
  className?: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
}

const TextArea = ({
  inputRef,
  className = '',
  label = '',
  rows = 6,
  ...restProps
}: TextAreaProps) => {
  return (
    <div className='h-full w-full flex flex-col'>
      {label && <label htmlFor={label}>{label}</label>}
      <textarea
        {...restProps}
        id={label}
        ref={inputRef}
        rows={rows}
        className='h-full w-full p-1 rounded my-1 border-gray-500 border-[1px]'
      />
    </div>
  );
};

export default TextArea;
