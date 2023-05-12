import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import DownChevronArrow from '@icon/DownChevronArrow';
import UpChevronArrow from '@icon/UpChevronArrow';
import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
  icon?: JSX.Element | string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
  hideToggleIcon?: boolean;
  label?: string;
  renderOption?: (option: SelectOption) => JSX.Element;
}

const Select = ({
  label,
  value,
  options,
  onChange,
  renderOption,
  hideToggleIcon = false,
}: SelectProps) => {
  const [dropDown, setDropDown, dropDownRef] = useHideOnOutsideClick();

  const selectedOption = options.find((option) => option.value === value);

  if (!selectedOption) {
    throw new Error('Current option not included in the option list');
  }

  const isOptionSelected = (value: string) => selectedOption.value === value;

  const handleChange = (option: SelectOption) => {
    setDropDown(false);
    onChange(option);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDropDown((prevDropdown) => !prevDropdown);
  };

  return (
    <div className='w-full dark:text-white dark:prose-invert'>
      {label && <label className='text-xl'>{label}</label>}
      <div ref={dropDownRef} className='mt-2 relative'>
        <button
          className='w-full min-h-[50px] relative btn btn-neutral btn-small flex px-4'
          onClick={handleClick}
        >
          {renderOption ? renderOption(selectedOption) : selectedOption.label}
          <div className='absolute right-4'>
            {!hideToggleIcon ? (
              <>{dropDown ? <UpChevronArrow /> : <DownChevronArrow />}</>
            ) : null}
          </div>
        </button>
        <div
          id='dropdown'
          className={`${
            dropDown ? '' : 'hidden'
          } w-full absolute top-[60px] z-10 bg-white rounded shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800`}
        >
          <ul
            className='text-sm text-gray-700 dark:text-gray-200 p-0 m-0'
            aria-labelledby='dropdownDefaultButton'
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 first:hover:rounded-t last:hover:rounded-b hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer ${
                  isOptionSelected(option.value) &&
                  'bg-gray-100 dark:bg-gray-500'
                }`}
                onClick={() => handleChange(option)}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
