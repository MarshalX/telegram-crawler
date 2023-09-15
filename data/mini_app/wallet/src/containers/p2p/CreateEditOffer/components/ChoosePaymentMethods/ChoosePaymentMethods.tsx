import { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import { PaymentMethodRestDto } from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { useAppSelector } from 'store';

import { setChosenPaymentMethods } from 'reducers/p2p/adFormSlice';

import { Cell, DetailCell, SelectionCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { logEvent } from 'utils/common/logEvent';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { useCreateEditOfferPageContext } from '../../CreateEditOffer';
import StepsTitle from '../StepsTitle/StepsTitle';
import styles from './ChoosePaymentMethods.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

const ChoosePaymentMethods = () => {
  const {
    draftOffer,
    isPaymentMethodsLoading,
    paymentMethods,
    mode,
    offerId,
    settings,
    offerType,
  } = useCreateEditOfferPageContext();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);

  const { chosenPaymentMethods } = useAppSelector((state) => state.p2pAdForm);

  const chosenMethods =
    chosenPaymentMethods[draftOffer.quoteCurrencyCode] || [];

  const maxPaymentDetailsCount = Number(
    settings?.offerSettings?.maxPaymentDetailsQuantityInclusive || 0,
  );

  const [sortedPaymentMethods, setSortedPaymentMethods] =
    useState(paymentMethods);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (chosenMethods && chosenMethods.length) {
      const sortedPaymentMethods = [...paymentMethods].sort((a, b) => {
        const aIndex = chosenMethods.findIndex((item) => item.code === a.code);

        const bIndex = chosenMethods.findIndex((item) => item.code === b.code);

        if (aIndex === -1 && bIndex === -1) {
          return 0;
        } else if (aIndex === -1) {
          return 1;
        } else if (bIndex === -1) {
          return -1;
        }

        return aIndex - bIndex;
      });

      setSortedPaymentMethods(sortedPaymentMethods);
    }
  }, []);

  const onComplete = useCallback(() => {
    navigate(
      mode === 'create'
        ? routePaths.P2P_OFFER_CREATE_ADD_COMMENT
        : generatePath(routePaths.P2P_OFFER_EDIT_ADD_COMMENT, {
            id: String(offerId),
          }),
    );

    if (mode === 'create') {
      logEvent('Maker. Creation step 2 completed', {
        category: 'p2p.merchant.ad',
        type: offerType === 'SALE' ? 'sell' : 'buy',
      });
    }
  }, [mode, navigate, offerId, offerType]);

  const handlePaymentMethodClick = (paymentMethod: PaymentMethodRestDto) => {
    if (chosenMethods.find(({ code }) => code === paymentMethod.code)) {
      dispatch(
        setChosenPaymentMethods({
          currency: draftOffer.quoteCurrencyCode,
          paymentMethods: chosenMethods.filter(
            ({ code }) => code !== paymentMethod.code,
          ),
        }),
      );

      return;
    }

    if (chosenMethods.length >= maxPaymentDetailsCount) {
      snackbarContext.showSnackbar({
        before: <WarningSVG />,
        text: t(
          'p2p.create_offer_page.maximum_amount_of_payment_methods_error',
          {
            count: maxPaymentDetailsCount,
          },
        ),
      });

      return;
    }

    dispatch(
      setChosenPaymentMethods({
        currency: draftOffer.quoteCurrencyCode,
        paymentMethods: [...chosenMethods, paymentMethod],
      }),
    );
  };

  const handleClearAllClick = useCallback(() => {
    dispatch(
      setChosenPaymentMethods({
        currency: draftOffer.quoteCurrencyCode,
        paymentMethods: [],
      }),
    );
  }, [dispatch, draftOffer.quoteCurrencyCode]);

  const isAtLeastOnePaymentMethodChosen = chosenMethods.length > 0;

  return (
    <div>
      <StepsTitle
        title={t('p2p.create_offer_page.choose_payment_method')}
        step={2}
        total={4}
      />
      {isPaymentMethodsLoading && (
        <Section separator>
          <DetailCell fetching header after />
          <DetailCell fetching header after />
        </Section>
      )}
      {!!sortedPaymentMethods.length && !isPaymentMethodsLoading && (
        <Section separator>
          <DetailCell onClick={handleClearAllClick}>
            <div className={themeClassName('clearAll')}>
              {t('p2p.offers_list_page.clear_all')}
            </div>
          </DetailCell>
          <Cell.List>
            {sortedPaymentMethods.map((option) => (
              <SelectionCell
                data-testid={`paymentMethod-${option.code}`}
                key={option.code}
                onChange={() => handlePaymentMethodClick(option)}
                value={option.code}
                checked={
                  !!chosenMethods.find(({ code }) => code === option.code)
                }
                name="payment-methods"
                mode="checkbox"
              >
                {option.name}
              </SelectionCell>
            ))}
          </Cell.List>
        </Section>
      )}
      <MainButton
        color={
          isAtLeastOnePaymentMethodChosen
            ? button_color
            : customPalette[theme][colorScheme].button_disabled_color
        }
        textColor={
          isAtLeastOnePaymentMethodChosen
            ? button_text_color
            : customPalette[theme][colorScheme].button_disabled_text_color
        }
        disabled={!isAtLeastOnePaymentMethodChosen}
        onClick={onComplete}
        text={t('p2p.create_offer_page.continue').toLocaleUpperCase()}
        data-testid="tgcrawl"
      />
    </div>
  );
};

export default ChoosePaymentMethods;
