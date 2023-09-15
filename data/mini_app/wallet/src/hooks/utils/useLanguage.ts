import { useSelector } from 'react-redux';

import { RootState } from 'store';

export const useLanguage = () => {
  const { languageCode } = useSelector((state: RootState) => state.settings);

  return languageCode;
};
