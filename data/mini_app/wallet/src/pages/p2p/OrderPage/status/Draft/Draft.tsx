import BigNumber from 'bignumber.js';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { CryptoCurrency } from 'api/wallet/generated';

import customPalette from 'customPalette';

import { DetailCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';

import { printCryptoAmount } from 'utils/common/currency';
import { parseDuration } from 'utils/common/date';

import { useSettings } from 'hooks/p2p';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { Comment } from '../../components/Comment/Comment';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import TimeTicker from '../../components/TimeTicker/TimeTicker';
import styles from './Draft.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

export const Draft = () => {
  const {
    order,
    offer,
    isUserSeller,
    onCreateOrder,
    isOneOfTheUsersBlocked,
    isConfirmingOrder,
  } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const languageCode = useLanguage();
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const handleMainButtonClick = () => {
    onCreateOrder();
  };
  const { data: settings } = useSettings();

  if (!order || !offer || !settings) return null;

  const isCreatingOrder =
    order?.status === 'CONFIRMING_ORDER' || isConfirmingOrder;

  const mainButtonText = isCreatingOrder
    ? 'p2p.order_detail.confirming_order'
    : 'p2p.order_detail.confirm_order_button';

  const isMainButtonDisabled = !isOneOfTheUsersBlocked && isCreatingOrder;

  const isBuyOffer = offer.type === 'PURCHASE';

  return (
    <>
      <AmountSection />

      <StatusSection
        description={
          <span className={styles.grayText}>
            {
              <TimeTicker
                start={order.createDateTime}
                timeout={settings.orderSettings.orderConfirmationTimeout}
                getDescription={(time) =>
                  t(`p2p.complete_order_within`, {
                    time,
                  })
                }
              />
            }
          </span>
        }
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'clock',
            content: t(`p2p.order_detail.confirming_order`),
          },
          {
            header: t(`p2p.order_detail.important_title`),
            icon: 'warning',
            content: isBuyOffer
              ? t(`p2p.order_detail.buyer_must_confirm_within_x_minutes`, {
                  count: parseDuration(offer.orderAcceptTimeout).minutes,
                })
              : t(`p2p.order_detail.seller_must_confirm_within_x_minutes`, {
                  count: parseDuration(offer.orderAcceptTimeout).minutes,
                }),
          },
        ]}
      />

      {isUserSeller && (
        <Section apple={{ fill: 'secondary' }} separator>
          <DetailCell
            header=""
            before={t('p2p.order_detail.service_fee')}
            after={printCryptoAmount({
              amount: order.feeVolume.amount,
              currency: order.feeVolume.currencyCode as CryptoCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}
          />
          <DetailCell
            header=""
            before={
              <span className={styles.mediumWeight}>
                {t('p2p.order_detail.total_will_be_hold')}
              </span>
            }
            after={
              <span className={styles.mediumWeight}>
                {printCryptoAmount({
                  amount: BigNumber(order.volume.amount)
                    .plus(order.feeVolume.amount)
                    .toString(),
                  currency: order.feeVolume.currencyCode as CryptoCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })}
              </span>
            }
          />
        </Section>
      )}

      <OrderDetailsSection
        timeLimit={order.paymentConfirmTimeout}
        separator={theme === 'material' || !!order.offerComment}
      />

      <Comment separator={theme === 'material'} />

      <CounterpartyInfoSection />

      <div data-testid="tgcrawl" />

      <MainButton
        progress={isCreatingOrder}
        text={t(mainButtonText).toLocaleUpperCase()}
        disabled={isMainButtonDisabled}
        onClick={handleMainButtonClick}
        color={
          isMainButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : button_color
        }
        textColor={
          isMainButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : button_text_color
        }
        data-testid="tgcrawl"
      />
    </>
  );
};
