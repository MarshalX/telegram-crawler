import { FC, SVGProps, forwardRef } from 'react';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ReactComponent as DollarsGrayLogo } from 'components/CurrencyLogo/icons/dollars-gray.svg';
import { ReactComponent as DollarsLogo } from 'components/CurrencyLogo/icons/dollars.svg';

import { ReactComponent as BtcGrayLogo } from './icons/bitcoin-gray.svg';
import { ReactComponent as BtcLogo } from './icons/bitcoin.svg';
import { ReactComponent as TonGrayLogo } from './icons/ton-gray.svg';
import { ReactComponent as TonLogo } from './icons/ton.svg';
import { ReactComponent as UsdtGrayLogo } from './icons/usdt-gray.svg';
import { ReactComponent as UsdtLogo } from './icons/usdt.svg';

const componentsMap: Record<
  FrontendCryptoCurrencyEnum | 'dollars',
  Record<'default' | 'gray', FC<SVGProps<SVGSVGElement>>>
> = {
  [FrontendCryptoCurrencyEnum.Ton]: {
    default: TonLogo,
    gray: TonGrayLogo,
  },
  dollars: {
    default: DollarsLogo,
    gray: DollarsGrayLogo,
  },
  [FrontendCryptoCurrencyEnum.Usdt]: {
    default: UsdtLogo,
    gray: UsdtGrayLogo,
  },
  [FrontendCryptoCurrencyEnum.Btc]: {
    default: BtcLogo,
    gray: BtcGrayLogo,
  },
} as const;

interface CurrencyLogoProps extends React.HTMLAttributes<SVGElement> {
  currency: FrontendCryptoCurrencyEnum;
  color?: 'default' | 'gray';
  variant?: 'simple' | 'complex';
  size?: number;
}

const CurrencyLogo = forwardRef<SVGSVGElement, CurrencyLogoProps>(
  (
    {
      currency,
      className,
      color = 'default',
      variant = 'simple',
      size = 40,
      ...props
    },
    ref,
  ) => {
    const resolvedCurrency =
      currency === 'USDT' && variant === 'simple' ? 'dollars' : currency;
    const Component = componentsMap[resolvedCurrency][color];

    return (
      <Component
        width={size}
        height={size}
        className={className}
        ref={ref}
        {...props}
      />
    );
  },
);

export default CurrencyLogo;
