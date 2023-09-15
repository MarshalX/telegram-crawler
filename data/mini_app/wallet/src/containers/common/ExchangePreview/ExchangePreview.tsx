import { FC, ReactNode } from 'react';

import styles from './ExchangePreview.module.scss';
import { ReactComponent as ArrowSVG } from './arrow.svg';
import { ExchangeDetail } from './components/ExchangeDetail/ExchangeDetail';

export const ExchangePreview: FC<{
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  fromIcon: ReactNode;
  toIcon: ReactNode;
}> = ({ fromCurrency, fromAmount, toCurrency, toAmount, fromIcon, toIcon }) => {
  return (
    <div>
      <ExchangeDetail
        currency={fromCurrency}
        operation="pay"
        amount={fromAmount}
        icon={fromIcon}
      />
      <div className={styles.separator}>
        <div className={styles.arrow}>
          <ArrowSVG />
        </div>
      </div>
      <ExchangeDetail
        currency={toCurrency}
        operation="receive"
        amount={toAmount}
        icon={toIcon}
      />
    </div>
  );
};
