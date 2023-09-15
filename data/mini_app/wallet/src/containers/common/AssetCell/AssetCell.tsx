import { ComponentProps, FC, MouseEventHandler, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM } from 'config';

import { useAppSelector } from 'store';

import { Cell } from 'components/Cells';
import { Checkmark } from 'components/Checkmark/Checkmark';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { Switch } from 'components/Switch/Switch';

import {
  getCurrencyName,
  printCryptoAmount,
  printFiatAmount,
  roundDownFractionalDigits,
} from 'utils/common/currency';

import { useTheme } from 'hooks/utils/useTheme';

interface AssetCellBaseProps {
  header?: ReactNode;
  after?: ReactNode;
  onClick?: MouseEventHandler;
  icon?: ReactNode;
  className?: string;
  headerTheme?: 'primary' | 'secondary';
  'data-testid'?: string;
  bold?: boolean;
  inverted?: boolean;
}

const AssetCellBase: FC<AssetCellBaseProps> = ({
  onClick,
  header,
  children,
  after,
  icon,
  className,
  'data-testid': dataTestId,
  bold,
  inverted,
}) => {
  return (
    <Cell
      tappable={!!onClick}
      onClick={onClick}
      start={icon}
      end={after}
      data-testid={dataTestId}
      className={className}
    >
      <Cell.Text
        inverted={inverted}
        bold={bold}
        title={header}
        description={children}
      />
    </Cell>
  );
};

type AssetCellProps = {
  currency: FrontendCryptoCurrencyEnum;
  simplified?: boolean;
  blockchain?: string;
  balance?: number;
  iconSize?: number;
  inverted?: boolean;
  bold?: boolean;
  isRoundAssetsBalance?: boolean;
  variant?: 'complex' | 'simple';
} & (
  | ({ type: 'switch' } & ComponentProps<typeof Switch>)
  | ({ type: 'select' } & { checked?: boolean; onClick?: () => void })
  | {
      type: 'fiat';
      onClick?: () => void;
      fiatBalance: number;
      fiatCurrency: FiatCurrency;
    }
);

const AssetCell: FC<AssetCellProps> = ({
  currency,
  balance = 0,
  blockchain,
  iconSize,
  inverted,
  bold,
  isRoundAssetsBalance = true,
  variant = 'simple',
  ...props
}) => {
  const { type, ...restProps } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { languageCode } = useAppSelector((state) => state.settings);

  const currencyIconSize = iconSize ?? theme === 'apple' ? 40 : 46;

  const amount = printCryptoAmount({
    amount: isRoundAssetsBalance
      ? roundDownFractionalDigits(
          balance.toFixed(10),
          CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM[currency],
        )
      : balance,
    currency: currency,
    languageCode,
    currencyDisplay: 'code',
  });

  const name = (
    <>
      {getCurrencyName({ currency, variant, t })}
      {blockchain && (
        <span style={{ color: 'var(--tg-theme-hint-color)' }}>
          {' '}
          {blockchain}
        </span>
      )}
    </>
  );

  return (
    <AssetCellBase
      onClick={type !== 'switch' ? props.onClick : undefined}
      bold={bold}
      header={inverted ? amount : name}
      inverted={inverted}
      icon={
        <Cell.Part type="avatar">
          <CurrencyLogo
            variant={variant}
            currency={currency}
            style={{ width: currencyIconSize, height: currencyIconSize }}
          />
        </Cell.Part>
      }
      after={
        <>
          {type === 'fiat' && (
            <Cell.Text
              title={printFiatAmount({
                amount: props.fiatBalance,
                currency: props.fiatCurrency,
                languageCode,
                currencyDisplay: 'narrowSymbol',
              })}
            />
          )}
          {type === 'switch' && (
            <Cell.Part type="switch">
              <Switch {...restProps} />
            </Cell.Part>
          )}
          {type === 'select' && (
            <Cell.Part type="radio">
              <Checkmark checked={props.checked} mode="radio" />
            </Cell.Part>
          )}
        </>
      }
    >
      {inverted ? name : amount}
    </AssetCellBase>
  );
};

export default AssetCell;
