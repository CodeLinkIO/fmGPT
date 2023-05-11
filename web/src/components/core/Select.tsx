import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import DownChevronArrow from '@icon/DownChevronArrow';
import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
  emoji?: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
  renderOption?: (option: SelectOption) => JSX.Element;
}

const Select = ({
  label,
  value,
  options,
  onChange,
  renderOption,
}: SelectProps) => {
  const [dropDown, setDropDown, dropDownRef] = useHideOnOutsideClick();

  const selectedOption = options.find((option) => option.value === value);

  if (!selectedOption) {
    throw new Error('Current option not included in the option list');
  }

  return (
    <div className='prose dark:prose-invert relative'>
      {label && <label>{label}</label>}
      <button
        className='w-full btn btn-neutral btn-small flex gap-1'
        type='button'
        onClick={() => setDropDown((prev) => !prev)}
      >
        {selectedOption.label}
        <DownChevronArrow />
      </button>
      <div
        ref={dropDownRef}
        id='dropdown'
        className={`${
          dropDown ? '' : 'hidden'
        } w-full absolute top-100 bottom-100 z-10 bg-white rounded-lg shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90`}
      >
        <ul
          className='text-sm text-gray-700 dark:text-gray-200 p-0 m-0'
          aria-labelledby='dropdownDefaultButton'
        >
          {options.map((option) => (
            <li
              key={option.value}
              className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
              onClick={() => onChange(option)}
            >
              {renderOption ? renderOption(option) : option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
