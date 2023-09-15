import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { usePreventContentHideUnderKeyboard } from 'hooks/common/ReceiverSearch/usePreventContentHideUnderKeyboard';

import { AppearanceContext } from '../../../AppearanceProvider';

export const useReceiverSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsAddress = searchParams.get('address') || '';
  const trimmedInputAddress = searchParamsAddress.trim() || '';

  const onChange = (value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('address', value);
    setSearchParams(searchParams, { replace: true });
  };

  const { theme } = useContext(AppearanceContext);

  const avatarSize = theme === 'apple' ? 40 : 46;

  const { contentStyle, onInputBlur } = usePreventContentHideUnderKeyboard();

  return {
    onChange,
    trimmedInputAddress,
    searchParamsAddress,
    avatarSize,
    contentStyle,
    onInputBlur,
    searchParams,
  };
};
