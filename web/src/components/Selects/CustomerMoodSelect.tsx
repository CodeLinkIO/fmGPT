import Select, { SelectOption } from '@components/core/Select';
import { CUSTOMER_PROMPT_MOODS } from '@constants/prompt';
import { CustomerMood } from '@type/prompt';

interface CustomerMoodSelectProps {
  value: CustomerMood;
  onChange: (mood: CustomerMood) => void;
}

const systemMoodOptions: SelectOption[] = Object.entries(
  CUSTOMER_PROMPT_MOODS
).map(([name, value]) => ({
  label: name,
  icon: value.emoji,
  value: value.value,
}));

const CustomerMoodSelect = ({ value, onChange }: CustomerMoodSelectProps) => {
  const handleChangeCustomerMood = (option: SelectOption) => {
    const mood = option.label as CustomerMood;
    onChange(mood);
  };

  const renderOption = (option: SelectOption) => {
    return (
      <>
        {option.icon && <span>{option.icon}</span>}
        <span className='ml-4'>{option.label}</span>
      </>
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
