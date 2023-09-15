import { FC, memo } from 'react';

import { AmountSkeleton } from 'containers/common/Amount/AmountSkeleton';

import { Cell, NewDetailCell } from 'components/Cells';
import InitialsAvatarSkeleton from 'components/InitialsAvatar/InitialsAvatarSkeleton';
import Page from 'components/Page/Page';

import { repeat } from 'utils/common/common';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './OrderPayment.module.scss';

export const WPAYOrderPaymentSkeleton: FC = memo(() => {
  const { theme, themeClassName } = useTheme(styles);

  return (
    <Page mode={theme === 'apple' ? 'secondary' : 'primary'}>
      <AmountSkeleton top size={theme === 'apple' ? 'small' : 'medium'} />
      <div className={themeClassName('details')}>
        {repeat(
          (index) => (
            <div className={themeClassName('detail')} key={index}>
              <NewDetailCell
                fetching
                header
                before={
                  <Cell.Part type="avatar">
                    <InitialsAvatarSkeleton size={40} />
                  </Cell.Part>
                }
              />
            </div>
          ),
          3,
        )}
      </div>
    </Page>
  );
});
