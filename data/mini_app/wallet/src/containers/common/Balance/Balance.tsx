import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { RootState } from 'store';

import FitTextRow from 'components/FitTextRow/FitTextRow';
import { Text } from 'components/Text/Text';

import {
  doesBrowserSupportNarrowSymbol,
  resolveLanguageCode,
} from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Balance.module.scss';
import { ReactComponent as BuySVG } from './buy.svg';

export const Balance: FC<{
  amount: number;
  currency: FiatCurrency;
  mute?: boolean;
  className?: string;
}> = ({ amount, currency, mute, className }) => {
  const { themeClassName } = useTheme(styles);
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const amountByParts = Intl.NumberFormat(resolveLanguageCode(languageCode), {
    style: 'currency',
    currencyDisplay: doesBrowserSupportNarrowSymbol()
      ? 'narrowSymbol'
      : 'symbol',
    currency,
  }).formatToParts(amount);

  return (
    <div className={classNames(mute && styles.mute, className)}>
      <Text
        apple={{ variant: 'body', weight: 'regular' }}
        material={{ variant: 'subtitle1' }}
        className={themeClassName('title')}
      >
        {t('main.balance_text_fiat')}
      </Text>
      <FitTextRow align="center">
        <div className={styles.balance}>
          <div className={themeClassName('amount')}>
            {amountByParts.map((amountPart, index) => {
              return (
                <span key={index} className={styles[amountPart.type]}>
                  {amountPart.value}
                </span>
              );
            })}
          </div>
          {!mute && (
            <button
              className={styles.topUp}
              onClick={() => {
                logEvent('Clicked plus button');
                navigate(routePaths.PURCHASE_OPTIONS);
              }}
            >
              <BuySVG />
            </button>
          )}
        </div>
      </FitTextRow>
    </div>
  );
};
