import cn from 'classnames';
import { useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { PaymentMethodRestDto, SbpBankRestDto } from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { DEPRECATED_P2P_PAYMENT_METHODS } from 'config';

import { Cell, DetailCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Switch } from 'components/Switch/Switch';

import { logEvent } from 'utils/common/logEvent';
import { getRecipientNumberFromAttributes } from 'utils/p2p/getRecipientNumberFromAttributes';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { useCreateEditOfferPageContext } from '../../CreateEditOffer';
import StepsTitle from '../StepsTitle/StepsTitle';
import styles from './AddPaymentDetails.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

const AddPaymentDetails = () => {
  const {
    setSelectedPaymentMethodToAdd,
    draftOffer,
    isPaymentMethodsLoading,
    isUserPaymentDetailsLoading,
    paymentMethods,
    mode,
    setDraftOffer,
    offerId,
    offerType,
    settings,
  } = useCreateEditOfferPageContext();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const snackbarContext = useContext(SnackbarContext);
  const getPaymentMethodName = useGetPaymentMethodName();

  const maxPaymentDetailsCount = Number(
    settings?.offerSettings?.maxPaymentDetailsQuantityInclusive || 0,
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userPaymentDetails = draftOffer.paymentDetails
    .filter(
      (paymentDetails) =>
        paymentDetails.currency === draftOffer.quoteCurrencyCode,
    )
    .filter((paymentDetails) => {
      return !DEPRECATED_P2P_PAYMENT_METHODS.includes(
        paymentDetails.paymentMethod.code,
      );
    });

  const isAtLeastOnePaymentMethodEnabled = useMemo(() => {
    return userPaymentDetails.some(
      (paymentMethod) =>
        paymentMethod.isEnabled &&
        paymentMethod.currency === draftOffer.quoteCurrencyCode,
    );
  }, [draftOffer.quoteCurrencyCode, userPaymentDetails]);

  const onComplete = useCallback(() => {
    navigate(
      mode === 'create'
        ? routePaths.P2P_OFFER_CREATE_ADD_COMMENT
        : generatePath(routePaths.P2P_OFFER_EDIT_ADD_COMMENT, { id: offerId! }),
    );

    if (mode === 'create') {
      logEvent('Maker. Creation step 2 completed', {
        category: 'p2p.merchant.ad',
        type: offerType === 'SALE' ? 'sell' : 'buy',
      });
    }
  }, [mode, navigate, offerId, offerType]);

  const handleUserPaymentMethodEnableToggle = useCallback(
    ({ id, isEnabled }) => {
      setDraftOffer((offer) => ({
        ...offer,
        paymentDetails: offer.paymentDetails.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isEnabled: isEnabled,
            };
          }

          return item;
        }),
      }));
    },
    [setDraftOffer],
  );

  const handleSelectPaymentClick = ({
    paymentMethod,
  }: {
    paymentMethod: PaymentMethodRestDto;
  }) => {
    setSelectedPaymentMethodToAdd({
      name: getPaymentMethodName(paymentMethod),
      code: paymentMethod.code,
      originNameLocale: paymentMethod.originNameLocale,
      nameEng: paymentMethod.nameEng,
    });

    navigate(
      mode === 'create'
        ? routePaths.P2P_OFFER_CREATE_NEW_PAYMENT_METHOD
        : generatePath(routePaths.P2P_OFFER_EDIT_NEW_PAYMENT_METHOD, {
            id: offerId!,
          }),
    );
  };

  return (
    <div className={themeClassName('root')}>
      <StepsTitle
        title={t('p2p.create_offer_page.add_payment_method')}
        step={2}
        total={4}
      />
      {isPaymentMethodsLoading && (
        <Section separator>
          <DetailCell fetching header after />
          <DetailCell fetching header after />
        </Section>
      )}
      {isUserPaymentDetailsLoading && (
        <Section separator className={themeClassName('secondLoadingSection')}>
          <DetailCell fetching />
          <DetailCell fetching />
        </Section>
      )}
      {!!userPaymentDetails.length && !isUserPaymentDetailsLoading && (
        <Section separator>
          {userPaymentDetails.map((paymentMethod) => (
            <DetailCell
              key={paymentMethod.id}
              before={
                <div
                  className={cn(
                    !paymentMethod.isEnabled &&
                      themeClassName('cellPaymentDetailDisabled'),
                  )}
                >
                  <div className={themeClassName('cellPaymentDetailName')}>
                    {paymentMethod.name}
                  </div>
                  <div className={themeClassName('cellPaymentDetailInfo')}>
                    {getPaymentMethodName(
                      paymentMethod.paymentMethod,
                      paymentMethod.attributes?.values?.find(
                        (value) => value.name === 'BANKS',
                      )?.value as SbpBankRestDto[],
                    )}{' '}
                    Â· {paymentMethod.currency}
                  </div>
                  <div className={themeClassName('cellPaymentDetailInfo')}>
                    {getRecipientNumberFromAttributes(paymentMethod.attributes)}
                  </div>
                </div>
              }
              after={
                <Switch
                  data-testid={`paymentMethodSwitch-${paymentMethod.id}`}
                  className={styles.flexAlignCenter}
                  checked={paymentMethod.isEnabled}
                  onChange={(event) => {
                    const enabledUserPaymentDetailsCount =
                      userPaymentDetails.filter(
                        (item) =>
                          item.isEnabled &&
                          item.currency === draftOffer.quoteCurrencyCode,
                      ).length;

                    if (
                      event.target.checked &&
                      enabledUserPaymentDetailsCount >= maxPaymentDetailsCount
                    ) {
                      snackbarContext.showSnackbar({
                        before: <WarningSVG />,
                        text: t(
                          'p2p.create_offer_page.maximum_amount_of_payment_methods_error',
                          {
                            count: maxPaymentDetailsCount,
                          },
                        ),
                      });
                    } else {
                      handleUserPaymentMethodEnableToggle({
                        id: paymentMethod.id,
                        isEnabled: event.target.checked,
                      });
                    }
                  }}
                />
              }
            />
          ))}
        </Section>
      )}
      {!!paymentMethods.length && !isPaymentMethodsLoading && (
        <Section
          separator
          className={cn(
            userPaymentDetails.length &&
              themeClassName('paymentMethodsSection'),
          )}
        >
          <Cell.List>
            {paymentMethods.map((paymentMethod) => (
              <Cell
                key={paymentMethod.code}
                tappable
                chevron
                onClick={() => {
                  handleSelectPaymentClick({
                    paymentMethod,
                  });
                }}
              >
                <Cell.Text title={getPaymentMethodName(paymentMethod)} />
              </Cell>
            ))}
          </Cell.List>
        </Section>
      )}
      <MainButton
        color={
          isAtLeastOnePaymentMethodEnabled
            ? button_color
            : customPalette[theme][colorScheme].button_disabled_color
        }
        textColor={
          isAtLeastOnePaymentMethodEnabled
            ? button_text_color
            : customPalette[theme][colorScheme].button_disabled_text_color
        }
        disabled={!isAtLeastOnePaymentMethodEnabled}
        onClick={onComplete}
        text={t('p2p.create_offer_page.continue').toLocaleUpperCase()}
        data-testid="tgcrawl"
      />
    </div>
  );
};

export default AddPaymentDetails;
