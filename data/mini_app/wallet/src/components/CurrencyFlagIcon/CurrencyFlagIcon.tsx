import { Suspense, forwardRef, lazy } from 'react';

import { FiatCurrency } from 'api/wallet/generated';

import styles from './CurrencyFlagIcon.module.scss';

const FlagIcon = lazy(() => import('./FlagIcon'));

const CurrencyFlagIcon = forwardRef<
  SVGSVGElement,
  {
    currency: FiatCurrency;
  }
>((props, ref) => {
  return (
    <Suspense fallback={<div className={styles.flagFallback} />}>
      <FlagIcon ref={ref} {...props} />
    </Suspense>
  );
});

export default CurrencyFlagIcon;
