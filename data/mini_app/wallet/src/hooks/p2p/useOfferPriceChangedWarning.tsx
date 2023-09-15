import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { FiatCurrency } from 'api/wallet/generated';

import { RootState } from 'store';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printFiatAmount } from 'utils/common/currency';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

// 3% delta
const CHANGE_PERCENT = 0.03;
const SNACKBAR_ID = 'priceChanged';
const KEYBOARD_SHOWING_ANIMATION_DURATION = 150;

const useOfferPriceChangedWarning = () => {
  const { t } = useTranslation();
  const { languageCode } = useSelector((state: RootState) => state.settings);

  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    return () => {
      snackbarContext.hideSnackbar(SNACKBAR_ID);
    };
  }, []);

  const checkPriceChangeAndShowWarning = ({
    previousPrice,
    currentPrice,
    currency,
    onOkClick,
  }: {
    previousPrice: number;
    currentPrice: number;
    currency: FiatCurrency;
    onOkClick?: () => void;
  }) => {
    const isPriceIncreased =
      previousPrice &&
      currentPrice &&
      previousPrice !== currentPrice &&
      previousPrice * (1 + CHANGE_PERCENT) <= currentPrice;

    const isPriceDecreased =
      previousPrice &&
      currentPrice &&
      previousPrice !== currentPrice &&
      previousPrice * (1 - CHANGE_PERCENT) >= currentPrice;

    if (isPriceIncreased || isPriceDecreased) {
      const text = isPriceIncreased
        ? 'p2p.price_increased_from_to'
        : 'p2p.price_decreased_from_to';

      setTimeout(() => {
        snackbarContext.showSnackbar({
          snackbarId: SNACKBAR_ID,
          before: <WarningSVG />,
          text: t(text, {
            from: currency
              ? printFiatAmount({
                  amount: previousPrice,
                  currency,
                  languageCode,
                  currencyDisplay: 'code',
                })
              : previousPrice,
            to: currency
              ? printFiatAmount({
                  amount: currentPrice,
                  currency,
                  languageCode,
                  currencyDisplay: 'code',
                })
              : currentPrice,
          }),
          shakeOnShow: true,
          action: (
            <button
              onClick={() => {
                snackbarContext.hideSnackbar(SNACKBAR_ID);
                onOkClick && onOkClick();
              }}
            >
              {t('common.ok')}
            </button>
          ),
          showDuration: 10000,
        });
      }, KEYBOARD_SHOWING_ANIMATION_DURATION);
    }
  };

  return {
    checkPriceChangeAndShowWarning,
  };
};

export default useOfferPriceChangedWarning;
