import { FC, Suspense, lazy } from 'react';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ReactComponent as DollarsLogo } from 'components/CurrencyLogo/icons/dollars.svg';

const BtcAppearance = lazy(() => import('./Appearance/BtcAppearance'));
const UsdtAppearance = lazy(() => import('./Appearance/UsdtAppearance'));
const TonAppearance = lazy(() => import('./Appearance/TonAppearance'));

type CurrencyLogoProps = React.ComponentProps<typeof TonAppearance> & {
  currency: FrontendCryptoCurrencyEnum;
  variant?: 'simple' | 'complex';
};

const CurrencyLogoWithAppearance: FC<CurrencyLogoProps> = ({
  currency,
  variant = 'simple',
  ...props
}) => {
  return (
    <>
      {currency === FrontendCryptoCurrencyEnum.Btc && (
        <Suspense fallback={<div className={props.className} />}>
          <BtcAppearance {...props} />
        </Suspense>
      )}
      {currency === FrontendCryptoCurrencyEnum.Usdt && (
        <Suspense
          fallback={
            variant === 'simple' ? (
              <DollarsLogo className={props.className} />
            ) : (
              <div className={props.className} />
            )
          }
        >
          <UsdtAppearance {...props} variant={variant} />
        </Suspense>
      )}
      {currency === FrontendCryptoCurrencyEnum.Ton && (
        <Suspense fallback={<div className={props.className} />}>
          <TonAppearance {...props} />
        </Suspense>
      )}
    </>
  );
};

export default CurrencyLogoWithAppearance;
