import classNames from 'classnames';
import { FC, ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store';

import FitTextRow from 'components/FitTextRow/FitTextRow';

import { printCryptoAmount } from 'utils/common/currency';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ExchangeDetail.module.scss';

type ExchangeDetailProps = {
  currency: string;
  amount: number;
  icon: ReactNode;
  operation: 'pay' | 'receive';
};

export const ExchangeDetail: FC<ExchangeDetailProps> = memo(
  ({ currency, amount, icon, operation }) => {
    const { themeClassName } = useTheme(styles);
    const { t } = useTranslation();
    const { languageCode } = useAppSelector((state) => state.settings);

    return (
      <div className={classNames(styles.root, styles[operation])}>
        <div className={themeClassName('icon')}>{icon}</div>
        <div className={themeClassName('content')}>
          <div className={themeClassName('label')}>
            {t(`exchange.you_${operation}`)}
          </div>
          <div className={themeClassName('amount')}>
            <FitTextRow>
              {printCryptoAmount({
                amount,
                currency,
                currencyDisplay: 'code',
                languageCode,
              })}
            </FitTextRow>
          </div>
        </div>
      </div>
    );
  },
);
