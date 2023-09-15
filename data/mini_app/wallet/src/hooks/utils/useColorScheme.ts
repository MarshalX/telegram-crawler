import { useContext } from 'react';

import { AppearanceContext } from '../../AppearanceProvider';

export const useColorScheme = () => {
  const { colorScheme } = useContext(AppearanceContext);

  return colorScheme;
};
