import Select, { SelectOption } from '@components/core/Select';
import CodeLinkIcon from '@icon/CodeLinkIcon';
import FMGIcon from '@icon/FMGIcon';
import { AuthenticationProvider } from '@type/auth';

interface AuthenticationProviderSelectProps {
  value: AuthenticationProvider;
  onChange: (authenticationProvider: AuthenticationProvider) => void;
}

const authenticationProviderOptions: SelectOption[] = [
  {
    label: 'CodeLink (@codelink.io)',
    value: AuthenticationProvider.CodeLink,
    icon: (
      <div className='w-8 h-8 rounded bg-white flex items-center justify-center'>
        <CodeLinkIcon />
      </div>
    ),
  },
  {
    label: 'FMG (@fmgsuite.com)',
    value: AuthenticationProvider.FMG,
    icon: (
      <div className='w-8 h-8 rounded bg-black flex items-center justify-center'>
        <FMGIcon />
      </div>
    ),
  },
  {
    label: 'Agency Revolution (@agencyrevolution.com)',
    value: AuthenticationProvider.AgencyRevolution,
    icon: (
      <div className='w-8 h-8 rounded bg-black flex items-center justify-center'>
        <FMGIcon />
      </div>
    ),
  },
];

const AuthenticationProviderSelect = ({
  value,
  onChange,
}: AuthenticationProviderSelectProps) => {
  const handleChange = (option: SelectOption) => {
    onChange(option.value as AuthenticationProvider);
  };

  const renderOption = (option: SelectOption) => (
    <div className='flex items-center'>
      {option.icon}
      <span className='ml-2 font-bold'>{option.label}</span>
    </div>
  );

  return (
    <Select
      hideToggleIcon
      value={value}
      onChange={handleChange}
      options={authenticationProviderOptions}
      renderOption={renderOption}
    />
  );
};

export default AuthenticationProviderSelect;
