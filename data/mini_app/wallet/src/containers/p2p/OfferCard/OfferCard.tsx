import BigNumber from 'bignumber.js';
import cn from 'classnames';
import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { BaseOfferRestDtoTypeEnum } from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import {
  CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM,
  P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
} from 'config';

import { RootState } from 'store';

import { VerifiedMerchantBadge } from 'containers/common/VerifiedMerchantBadge/VerifiedMerchantBadge';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import FitTextRow from 'components/FitTextRow/FitTextRow';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import Tappable from 'components/Tappable/Tappable';

import { copyToClipboard, generateTelegramLink } from 'utils/common/common';
import {
  printCryptoAmount,
  printFiatAmount,
  printNumber,
  roundDownFractionalDigits,
} from 'utils/common/currency';
import { printDuration } from 'utils/common/date';
import { generateStartAttach } from 'utils/common/startattach';

import useABTests from 'hooks/p2p/useABTests';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ShareSVG } from 'images/share.svg';

import styles from './OfferCard.module.scss';

type Props = {
  userId: number;
  username?: string;
  avatarCode?: string;
  id?: string;
  baseCurrencyCode: keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;
  quoteCurrencyCode: string;
  priceType?: 'fixed' | 'floating';
  offerType: BaseOfferRestDtoTypeEnum;
  price?: number;
  amount: BigNumber;
  amountTitle?: string;

  orderAmountLimits: {
    min: number | string;
    max?: number | string;
    currencyCode: string;
    approximate: boolean;
  };
  orderVolumeLimits?: {
    min: number | string;
    max?: number | string;
    currencyCode: string;
    approximate: boolean;
  };

  paymentMethodsNames: string[];

  timeLimit?: string;

  tradesCount?: number;
  successPercent?: number;

  isShareEnabled?: boolean;
  isCardActive?: boolean;
  isUserInfoShown?: boolean;
  isBuySellButtonsShown?: boolean;
  className?: string;
  cardClassName?: string;

  description?: React.ReactNode | string;
  separator?: boolean;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  onBuyClick?: () => void;

  onboardVerifiedMerchant?: boolean;
  isVerifiedMerchant?: boolean;
};

const OfferCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      userId,
      username,
      avatarCode,
      id,
      baseCurrencyCode,
      quoteCurrencyCode,
      priceType = 'fixed',
      offerType = BaseOfferRestDtoTypeEnum.Sale,
      price,
      amount,
      amountTitle,

      orderAmountLimits,
      orderVolumeLimits,
      paymentMethodsNames,
      timeLimit,

      tradesCount = 0,
      successPercent = 0,

      isShareEnabled = true,
      isCardActive = true,
      isUserInfoShown = true,
      isBuySellButtonsShown = true,
      className,
      cardClassName,

      description,
      separator,
      bottom,
      top,

      onBuyClick,

      onboardVerifiedMerchant,
      isVerifiedMerchant,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { themeClassName } = useTheme(styles);
    const { languageCode } = useSelector((state: RootState) => state.settings);
    const { botUsername } = useSelector((state: RootState) => state.wallet);
    const abTests = useABTests();
    const showBadge = abTests.data?.verifiedMerchantBadge;
    const snackbarContext = useContext(SnackbarContext);

    const [isOverflow, setIsOverflow] = useState(false);

    const usernameRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (isOverflow) return;

      const usernameElement = usernameRef.current?.offsetWidth || 0;
      const badgeElement = badgeRef.current?.offsetWidth || 0;

      setIsOverflow(usernameElement + badgeElement >= 100);
    }, [username, onboardVerifiedMerchant, isOverflow]);

    const offerIsSoldOut = orderVolumeLimits
      ? amount.isLessThan(orderVolumeLimits.min)
      : false;

    const handleBuyClick = useCallback(() => {
      if (!id) {
        return;
      }

      onBuyClick && onBuyClick();
    }, [id, onBuyClick]);

    const handleShareClick = useCallback(
      async (event) => {
        event.stopPropagation();

        if (!isShareEnabled) {
          return;
        }

        const offerUrl = generateTelegramLink(botUsername, {
          startattach: generateStartAttach(`offerid_${id}_${userId}`),
        });

        copyToClipboard(offerUrl).then(() => {
          snackbarContext.showSnackbar({
            text: t('p2p.offer_card.link_copied_to_clipboard'),
          });
        });
      },
      [botUsername, id, isShareEnabled, snackbarContext, t, userId],
    );

    const paymentMethodsNamesFormatter = useMemo(() => {
      if (typeof Intl.ListFormat === 'function') {
        return new Intl.ListFormat(languageCode, {
          style: 'long',
          type: 'conjunction',
        });
      } else {
        return {
          format: (list: string[]) => list.join(', '),
        };
      }
    }, [languageCode]);

    const uniqPaymentMethodNames = useMemo(() => {
      return Array.from(new Set(paymentMethodsNames));
    }, [paymentMethodsNames]);

    const isFarsi = languageCode === 'fa';

    return (
      <Section
        className={cn(
          themeClassName('root'),
          isCardActive && styles.activeCard,
          className,
        )}
        separator={separator}
        description={description}
        material={{ descriptionLayout: 'outer' }}
        ref={ref}
        containerClassName={cardClassName}
      >
        {top && (
          <>
            {top}
            <div className={styles.divider}></div>
          </>
        )}
        <div
          className={themeClassName('topContainer')}
          onClick={handleBuyClick}
        >
          <div className={styles.price} data-testid={`offer-${id}-price`}>
            <div className={themeClassName('priceFlexible')}>
              {price ? (
                <FitTextRow>
                  {printFiatAmount({
                    amount: price,
                    currency: quoteCurrencyCode as FiatCurrency,
                    languageCode,
                    currencyDisplay: 'code',
                  })}
                </FitTextRow>
              ) : (
                <div className={themeClassName('priceSkeleton')}></div>
              )}
            </div>
            <div className={themeClassName('priceInfo')}>
              {priceType === 'fixed'
                ? t('p2p.offer_card.price_per_unit', {
                    currency: baseCurrencyCode,
                  })
                : t('p2p.offer_card.floating_price_per_unit', {
                    currency: baseCurrencyCode,
                  })}
            </div>
          </div>

          <div className={styles.actionButtonsContainer}>
            {id && !offerIsSoldOut && (
              <Tappable
                disabled={!isShareEnabled}
                Component="button"
                rootClassName={themeClassName('shareBtn')}
                onClick={handleShareClick}
                data-testid={`offer-${id}-share-btn`}
              >
                <ShareSVG className={themeClassName('shareIcon')} />
              </Tappable>
            )}
            {!isBuySellButtonsShown ? null : isCardActive ? (
              <Tappable
                Component="button"
                rootClassName={cn(
                  themeClassName('buyButton'),
                  !isCardActive && styles.buyButtonDisabled,
                )}
                onClick={handleBuyClick}
                data-testid={`offer-${id}-buy-btn`}
              >
                {/* offerType === 'PURCHASE' -> user want to buy */}
                {offerType === 'PURCHASE'
                  ? t('p2p.offer_card.sell')
                  : t('p2p.offer_card.buy')}
              </Tappable>
            ) : (
              <button
                className={cn(
                  themeClassName('buyButton'),
                  !isCardActive && styles.buyButtonDisabled,
                )}
                disabled={!isCardActive}
                data-testid={`offer-${id}-buy-btn`}
              >
                {offerType === 'PURCHASE'
                  ? t('p2p.offer_card.sell')
                  : t('p2p.offer_card.buy')}
              </button>
            )}
          </div>
        </div>
        <div
          className={cn(
            themeClassName('bottomContainer'),
            !isUserInfoShown && styles.firstRowHidden,
          )}
          onClick={handleBuyClick}
        >
          <div className={styles.userContainer}>
            {userId && username ? (
              <>
                <AliasAvatar
                  className={styles.avatar}
                  id={userId}
                  size={20}
                  avatarCode={avatarCode}
                />
                <div
                  ref={usernameRef}
                  className={themeClassName('username')}
                  data-testid={`offer-${id}-username`}
                >
                  {username}
                </div>
                {isVerifiedMerchant && !isOverflow && showBadge && !isFarsi && (
                  <VerifiedMerchantBadge
                    ref={badgeRef}
                    displayOnRender={onboardVerifiedMerchant}
                    className={cn(styles.badge, styles.inlineBadge)}
                    displayOnClick={false}
                  />
                )}

                {isOverflow && (
                  <div className={styles.usernameFadeContainer}>
                    <div className={styles.usernameFade}></div>
                    {isVerifiedMerchant && showBadge && !isFarsi && (
                      <VerifiedMerchantBadge
                        displayOnRender={onboardVerifiedMerchant}
                        className={styles.badge}
                        displayOnClick={false}
                      />
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={themeClassName('avatarSkeleton')}></div>
                <div className={themeClassName('usernameSkeleton')}></div>
              </>
            )}
          </div>
          <div className={styles.trades}>
            {t('p2p.offer_card.trades', {
              trades_count: printNumber({
                value: tradesCount,
                languageCode,
                options: {
                  maximumFractionDigits: 2,
                },
              }),
              success_rate: printNumber({
                value: successPercent,
                languageCode,
                options: {
                  maximumFractionDigits: 2,
                },
              }),
            })}
          </div>
          <div className={themeClassName('label')}>
            {amountTitle || t('p2p.offer_card.amount')}
          </div>
          <div data-testid={`offer-${id}-available-amount`}>
            {printCryptoAmount({
              amount: roundDownFractionalDigits(
                amount.toString(),
                CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM[baseCurrencyCode],
              ),
              currency: baseCurrencyCode,
              languageCode,
            })}{' '}
            {baseCurrencyCode}
          </div>
          <div className={themeClassName('label')}>
            {t('p2p.offer_card.limits')}
          </div>
          <div data-testid={`offer-${id}-limits`}>
            {orderVolumeLimits && typeof orderVolumeLimits.max !== undefined ? (
              <div>
                {printFiatAmount({
                  amount:
                    Number(orderAmountLimits.max) === 0
                      ? 0
                      : Number(orderAmountLimits.min),
                  currency: orderAmountLimits.currencyCode as FiatCurrency,
                  languageCode,
                  currencyDisplay: false,
                })}{' '}
                {orderAmountLimits.approximate ? '~' : 'â€“'}{' '}
                {printFiatAmount({
                  amount: Number(orderAmountLimits.max),
                  currency: orderAmountLimits.currencyCode as FiatCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })}
              </div>
            ) : (
              <div className={styles.limitsSkeletonContainer}>
                <div className={themeClassName('limitsSkeletonSingle')}></div>
              </div>
            )}
          </div>
          <div
            className={themeClassName('label')}
            data-testid={`offer-${id}-payment-methods`}
          >
            {t('p2p.offer_card.payment_method')}
          </div>
          <div>
            {paymentMethodsNamesFormatter.format(uniqPaymentMethodNames)}
          </div>
          {timeLimit && (
            <>
              <div className={themeClassName('label')}>
                {t('p2p.offer_card.payment_timeout')}
              </div>
              <div>{printDuration(timeLimit)}</div>
            </>
          )}
        </div>
        {bottom && (
          <>
            <div className={styles.bottomDivider}></div>
            {bottom}
          </>
        )}
      </Section>
    );
  },
);

export default memo(OfferCard);
