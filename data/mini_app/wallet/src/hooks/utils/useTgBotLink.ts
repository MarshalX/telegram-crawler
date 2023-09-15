import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { generateTelegramLink } from 'utils/common/common';

export const useTgBotLink = () => {
  const botUsername = useSelector(
    (state: RootState) => state.wallet.botUsername,
  );

  return generateTelegramLink(botUsername);
};
