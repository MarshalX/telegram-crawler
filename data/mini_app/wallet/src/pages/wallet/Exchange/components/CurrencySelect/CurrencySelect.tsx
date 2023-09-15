import classNames from 'classnames';
import { FC } from 'react';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { Currency } from 'containers/common/Currency/Currency';

import { SelectList } from 'components/SelectList';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CurrencySelect.module.scss';

type CurrencySelectProps = {
  value: FrontendCryptoCurrencyEnum;
  onChange: (currency: FrontendCryptoCurrencyEnum) => void;
  className?: string;
};

export const CurrencySelect: FC<CurrencySelectProps> = ({
  value,
  onChange,
  className,
}) => {
  const { themeClassName } = useTheme(styles);
  const { assets } = useAppSelector((state) => state.wallet);

  return (
    <div className={classNames(themeClassName('root'), className)}>
      <SelectList
        value={value}
        options={assets.map(({ currency }) => ({
          label: currency,
          value: currency,
        }))}
        onChange={(value) => onChange(value as FrontendCryptoCurrencyEnum)}
        placement="bottom-end"
        flip={false}
      >
        <div>
          <Currency chevron>{value}</Currency>
        </div>
      </SelectList>
    </div>
  );
};
