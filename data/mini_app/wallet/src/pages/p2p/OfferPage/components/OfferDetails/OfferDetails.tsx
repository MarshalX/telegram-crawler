import classNames from 'classnames';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import { CryptoCurrency, FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { RootState } from 'store';

import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { BackButton } from 'components/BackButton/BackButton';
import { DetailCell } from 'components/Cells';
import { CroppingText } from 'components/CroppingText/CroppingText';
import FitTextRow from 'components/FitTextRow/FitTextRow';
import { Identificator } from 'components/Identificator/Identificator';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { repeat } from 'utils/common/common';
import {
  printCryptoAmount,
  printFiatAmount,
  printNumber,
} from 'utils/common/currency';
import { printDuration } from 'utils/common/date';
import { getLinesCountInElement } from 'utils/common/getLinesCountInElement';

import { useGetPaymentMethodName } from 'hooks/p2p';
import useABTests from 'hooks/p2p/useABTests';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as MessageSVG } from 'images/message_outline.svg';

import { useOfferPageContext } from '../../OfferPage';
import styles from './OfferDetails.module.scss';

const OfferDetails: FC = () => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const commentElRef = useRef<HTMLDivElement>(null);
  const [showCommentIconOnTop, setShowCommentIconOnTop] = useState(false);
  const getPaymentMethodName = useGetPaymentMethodName();
  const { offer, isLoading, selectedPayment } = useOfferPageContext();

  const {
    baseCurrencyCode: cryptoCurrency,
    quoteCurrencyCode: fiatCurrency,
    estimated: baseRate,
  } = (offer && offer.price) || {
    estimated: '0',
    baseCurrencyCode: 'TON',
    quoteCurrencyCode: 'EUR',
  };

  const totalOrdersCount =
    (offer && offer?.user.statistics.totalOrdersCount) || 0;
  const successTradesPercents =
    (offer && offer?.user.statistics.successPercent) || 0;

  const { max: fiatMaxLimit, min: fiatMinLimit } = (offer &&
    offer?.orderAmountLimits) ?? { min: 0, max: 0 };

  const offerId = offer && offer.id;

  useEffect(() => {
    const el = commentElRef.current;

    if (!el) return;

    const linesCount = getLinesCountInElement(el);

    setShowCommentIconOnTop(linesCount > 3);
  }, []);

  const handleBackButtonClick = () => {
    const nextSearchParams: {
      [key: string]: string;
    } = {
      previousPrice: offer?.price?.estimated ? offer.price.estimated : '',
      isRestorePrevStateOnOffersPage: 'true',
    };

    navigate({
      pathname: generatePath(routePaths.P2P_OFFER, {
        id: String(offerId),
      }),
      search: createSearchParams(nextSearchParams).toString(),
    });
  };

  const operationText = useMemo(() => {
    if (offer?.type === 'SALE') {
      return t('p2p.offer_page.you_buying_from');
    } else {
      return t('p2p.offer_page.you_selling_to');
    }
  }, [offer?.type, t]);

  const paymentOptionsForBuyOffer: { value: string; label: string }[] =
    useMemo(() => {
      return offer && 'paymentDetails' in offer
        ? offer.paymentDetails.map((detail) => {
            const { paymentMethod, id } = detail;

            return {
              value: String(id),
              label: getPaymentMethodName(paymentMethod),
            };
          })
        : [];
    }, [getPaymentMethodName, offer]);

  const abTests = useABTests();

  return (
    <div className={themeClassName('root')}>
      <BackButton onClick={handleBackButtonClick} />
      <div className={styles.header}>
        <OperationInfo
          operation={operationText}
          merchant={offer?.user.nickname}
          avatar={
            <AliasAvatar
              size={theme === 'apple' ? 32 : 24}
              id={offer ? offer?.user.userId : 0}
              avatarCode={offer?.user.avatarCode}
              loading={isLoading}
            />
          }
          isVerifiedMerchant={
            abTests.data?.verifiedMerchantBadge && offer?.user.isVerified
          }
        />
        <Identificator isLoading={isLoading} number={offer?.number || 0} />
      </div>
      <Section
        className={classNames(
          themeClassName('text'),
          themeClassName('mainInfo'),
        )}
        separator={
          !!offer?.comment || (!offer?.comment && theme === 'material')
        }
        apple={{ fill: 'secondary' }}
      >
        <Skeleton
          skeleton={
            <div>
              {repeat((i) => {
                return <DetailCell key={i} fetching after />;
              }, 4)}
            </div>
          }
          skeletonShown={isLoading}
        >
          <>
            <DetailCell
              before={t('p2p.offer_details_page.form_estimate', {
                baseCurrencyCode: cryptoCurrency,
              })}
              header=""
              after={printFiatAmount({
                amount: Number(baseRate),
                currency: fiatCurrency as FiatCurrency,
                languageCode,
                currencyDisplay: 'code',
              })}
            />

            <DetailCell
              before={t('p2p.offer_details_page.available')}
              header=""
              after={printCryptoAmount({
                amount: Number(offer?.availableVolume.amount),
                currency: String(
                  offer?.availableVolume.currencyCode,
                ) as CryptoCurrency,
                languageCode,
                currencyDisplay: 'code',
              })}
            />
            <DetailCell
              before={t('p2p.offer_details_page.limits')}
              header=""
              containerClassName={styles.limitsContainer}
              afterClassName={styles.limitsValueContainer}
              after={
                <FitTextRow>
                  {printFiatAmount({
                    amount: Number(fiatMinLimit),
                    currency: fiatCurrency as FiatCurrency,
                    languageCode,
                    currencyDisplay: false,
                  })}{' '}
                  ~{' '}
                  {printFiatAmount({
                    amount: Number(fiatMaxLimit),
                    currency: fiatCurrency as FiatCurrency,
                    languageCode,
                    currencyDisplay: 'code',
                  })}
                </FitTextRow>
              }
            />
            {offer?.type === 'SALE' ? (
              <DetailCell
                before={t('p2p.offer_page.payment_methods')}
                header=""
                after={
                  paymentOptionsForBuyOffer.length > 0 ? (
                    <div className={styles.paymentMethods}>
                      {paymentOptionsForBuyOffer.map(({ value, label }) => (
                        <CroppingText
                          languageCode={languageCode}
                          key={value}
                          value={label}
                        />
                      ))}
                    </div>
                  ) : null
                }
              />
            ) : selectedPayment?.name ? (
              <DetailCell
                before={t('p2p.offer_page.payment_method')}
                header=""
                after={
                  <CroppingText
                    languageCode={languageCode}
                    value={selectedPayment.name}
                  />
                }
              />
            ) : null}
            <DetailCell
              before={t('p2p.offer_card.payment_timeout')}
              header=""
              after={
                offer?.paymentConfirmTimeout
                  ? printDuration(offer.paymentConfirmTimeout, {
                      printInMinutes: true,
                    })
                  : ''
              }
            />
          </>
        </Skeleton>
      </Section>

      {offer?.comment && (
        <Section
          apple={{ fill: 'secondary' }}
          separator={theme === 'material'}
          description={t('p2p.offer_details_page.comment_caution')}
        >
          <Skeleton
            skeleton={<DetailCell fetching header />}
            skeletonShown={isLoading}
          >
            <DetailCell
              beforeClassName={classNames(
                showCommentIconOnTop && styles.alignSelfStart,
              )}
              before={<MessageSVG />}
              header={t('p2p.offer_details_page.comment')}
            >
              <div ref={commentElRef} className={styles.comment}>
                {offer?.comment}
              </div>
            </DetailCell>
          </Skeleton>
        </Section>
      )}
      <Section
        className={themeClassName('text')}
        title={t(
          offer?.type === 'PURCHASE'
            ? 'p2p.offer_details_page.buyer_info'
            : 'p2p.offer_details_page.seller_info',
        ).toLocaleUpperCase()}
        apple={{ fill: 'secondary' }}
        separator
      >
        <Skeleton
          skeleton={
            <div>
              <DetailCell fetching after />
              <DetailCell fetching after />
            </div>
          }
          skeletonShown={isLoading}
        >
          <DetailCell
            before={t(
              offer?.type === 'PURCHASE'
                ? 'p2p.offer_details_page.buyer_name'
                : 'p2p.offer_details_page.seller_name',
            )}
            header=""
            after={offer?.user.nickname}
          />
          <DetailCell
            before={t('p2p.offer_details_page.trade_stats')}
            header=""
            after={t('p2p.offer_details_page.trade_stats_value', {
              count: totalOrdersCount,
              percent: printNumber({
                value: successTradesPercents,
                languageCode,
                options: {
                  maximumFractionDigits: 2,
                },
              }),
            })}
          />
        </Skeleton>
      </Section>

      <MainButton
        text={t('p2p.offer_details_page.back').toLocaleUpperCase()}
        onClick={handleBackButtonClick}
      />
    </div>
  );
};

export default OfferDetails;
