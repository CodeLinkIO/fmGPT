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
    <div
      className={`flex-1 flex flex-col bg-white dark:text-white dark:bg-transparent rounded ${className}`}
    >
      {label && (
        <label htmlFor={label} className='text-xl'>
          {label}
        </label>
      )}
      <textarea
        {...restProps}
        id={label}
        ref={inputRef}
        rows={rows}
        className='mt-2 flex-1 px-2 py-2 rounded border border-black/10 bg-transparent resize-none focus:ring-0 focus-visible:ring-0 leading-7 placeholder:text-gray-500/40 dark:bg-gray-700 dark:prose-invert'
      />
    </div>
  );
};

export default TextArea;
