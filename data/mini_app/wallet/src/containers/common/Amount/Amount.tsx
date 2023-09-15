import classNames from 'classnames';
import { CSSProperties, FC, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from 'containers/common/Currency/Currency';

import FitTextRow from 'components/FitTextRow/FitTextRow';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { copyToClipboard } from 'utils/common/common';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Amount.module.scss';

export interface AmountProps {
  top?: ReactNode;
  bottom?: ReactNode;
  after?: ReactNode;
  value?: ReactNode;
  currency?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Small applies only for apple theme
   */
  size?: 'small' | 'medium';
  align?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  appearance?: 'default' | 'success' | 'error' | 'muted' | 'canceled';
  refreshing?: boolean;
  fill?: 'primary' | 'secondary';
  isAmountCopyable?: boolean;
}

export const Amount: FC<AmountProps> = ({
  appearance = 'default',
  top,
  bottom,
  after,
  value,
  currency,
  className,
  style,
  size = 'medium',
  align = 'flex-start',
  refreshing,
  fill,
  isAmountCopyable,
}) => {
  const { themeClassName } = useTheme(styles);

  const snackbarContext = useContext(SnackbarContext);
  const { t } = useTranslation();

  const handleAmountClick = () => {
    if (isAmountCopyable && value) {
      copyToClipboard(value.toString()).then(() => {
        snackbarContext.showSnackbar({
          text: t('common.copied_to_clipboard'),
        });
      });
    }
  };

  return (
    <div
      style={style}
      className={classNames(
        themeClassName('root'),
        styles[size],
        styles[align],
        className,
      )}
    >
      {top && <div className={themeClassName('top')}>{top}</div>}
      <div className={themeClassName('container')}>
        <div
          className={classNames(
            styles.amountWrapper,
            fill && styles[fill],
            refreshing && styles.refreshing,
          )}
        >
          <FitTextRow align={align} className={styles.fitText}>
            <div
              className={classNames(
                themeClassName('amount'),
                styles[appearance],
              )}
              onClick={handleAmountClick}
            >
              {value !== undefined && (
                <div className={themeClassName('value')}>{value}</div>
              )}
              {typeof currency === 'string' ? (
                <Currency className={themeClassName('currency')} size={size}>
                  {currency}
                </Currency>
              ) : (
                currency
              )}
            </div>
          </FitTextRow>
        </div>
        {after && <div className={themeClassName('after')}>{after}</div>}
      </div>
      {bottom && <div className={themeClassName('bottom')}>{bottom}</div>}
    </div>
  );
};
