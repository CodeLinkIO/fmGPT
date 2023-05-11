import Select, { SelectOption } from '@components/core/Select';
import { CUSTOMER_PROMPT_MOODS } from '@constants/prompt';
import { CustomerMood } from '@type/prompt';
import React, { useState } from 'react';

interface CustomerMoodSelectProps {
  value: CustomerMood;
  onChange: (mood: CustomerMood) => void;
}

const systemMoodOptions = Object.entries(CUSTOMER_PROMPT_MOODS).map(
  ([name, value]) => ({ ...value, label: name })
);

const CustomerMoodSelect = ({ value, onChange }: CustomerMoodSelectProps) => {
  const handleChangeCustomerMood = (option: SelectOption) => {
    const mood = option.label as CustomerMood;
    onChange(mood);
  };

  const renderOption = (option: SelectOption) => {
    return (
      <div className='flex'>
        {option.emoji && <p>{option.emoji}</p>}
        <p className='ml-2'>{option.label}</p>
      </div>
    );
  };

  return (
    <Select
      label="Choose customer's mood"
      value={CUSTOMER_PROMPT_MOODS[value].value}
      onChange={handleChangeCustomerMood}
      options={systemMoodOptions}
      renderOption={renderOption}
    />
  );
};

export default CustomerMoodSelect;
