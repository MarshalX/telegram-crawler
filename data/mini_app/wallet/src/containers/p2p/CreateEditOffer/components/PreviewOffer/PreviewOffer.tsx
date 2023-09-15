import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { t } from 'i18next';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import API from 'api/p2p';
import {
  BaseOfferRestDtoTypeEnum,
  CreateBuyOfferRestRequest,
  CreateSellOfferRestRequest,
  DetailedRestDataResponseCreateOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum,
  DetailedRestDataResponseEditOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum,
  EditBuyOfferRestRequest,
  EditPriceRequestTypeEnum,
  EditSellOfferRestRequest,
  PriceRestDtoTypeEnum,
} from 'api/p2p/generated-common';
import { CryptoCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { RootState, useAppSelector } from 'store';

import OfferCard from 'containers/p2p/OfferCard/OfferCard';

import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printNumber } from 'utils/common/currency';
import { getLinesCountInElement } from 'utils/common/getLinesCountInElement';
import { logEvent } from 'utils/common/logEvent';
import { divide } from 'utils/common/math';

import { useKycPopup } from 'hooks/common/useKycPopup';
import {
  useActivateOffer,
  useGetPaymentMethodName,
  useUserStats,
} from 'hooks/p2p';
import { useLanguage } from 'hooks/utils/useLanguage';
import { useTgBotLink } from 'hooks/utils/useTgBotLink';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as MessageSVG } from 'images/message_outline.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { useCreateEditOfferPageContext } from '../../CreateEditOffer';
import StepsTitle from '../StepsTitle/StepsTitle';
import styles from './PreviewOffer.module.scss';

const CREATE_OFFER_STATUS_TO_ERROR_MESSAGE: {
  [key in DetailedRestDataResponseCreateOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum]?: (options: {
    maxPaymentDetailsQuantityInclusive: number;
    activeOfferLimit?: number;
  }) => string;
} = {
  ['WRONG_PAYMENT_DETAILS']: () =>
    t('p2p.create_offer_page.wrong_payment_details_error'),
  ['FLOATING_PRICE_OUT_OF_LIMITS']: () =>
    t('p2p.create_offer_page.margin_is_out_of_limits'),
  ['OFFER_VOLUME_IS_OUT_OF_LIMITS']: () =>
    t('p2p.create_offer_page.volume_is_out_of_limits'),
  ['PAYMENT_CONFIRM_TIMEOUT_OUT_OF_LIMITS']: () =>
    t('p2p.create_offer_page.payment_confirmation_is_out_of_limits'),
  ['TOO_MANY_PAYMENTS_DETAILS']: ({ maxPaymentDetailsQuantityInclusive }) =>
    t('p2p.create_offer_page.maximum_amount_of_payment_methods_error', {
      count: maxPaymentDetailsQuantityInclusive,
    }),
  ['TOO_SMALL_MIN_ORDER_AMOUNT']: () =>
    t('p2p.create_offer_page.too_small_min_order_amount'),
  ['ACTIVE_OFFER_COUNT_LIMIT_REACHED']: ({ activeOfferLimit }) =>
    t('p2p.you_reached_max_of_active_ads', {
      count: activeOfferLimit,
    }),
  ACCESS_DENIED: () => t('p2p.please_contact_support_for_details'),
};

const CREATE_OFFER_STATUS_TO_ERROR_TITLE: {
  [key in DetailedRestDataResponseCreateOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum]?: () => string;
} = {
  ACCESS_DENIED: () => t('p2p.operation_unavailable'),
};

const CREATE_OFFER_STATUS_TO_ERROR_ACTION: {
  [key in DetailedRestDataResponseCreateOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum]?: () => React.ReactNode;
} = {
  ['ACCESS_DENIED']: () => (
    <button
      type="button"
      onClick={() =>
        window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK)
      }
    >
      {t('common.contact')}
    </button>
  ),
};

const EDIT_OFFER_STATUS_TO_ERROR_MESSAGE: {
  [key in DetailedRestDataResponseEditOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum]?: (options: {
    maxPaymentDetailsQuantityInclusive: number;
    offerType?: BaseOfferRestDtoTypeEnum;
  }) => string;
} = {
  ['WRONG_PAYMENT_DETAILS']: () =>
    t('p2p.create_offer_page.wrong_payment_details_error'),
  ['FLOATING_PRICE_OUT_OF_LIMITS']: () =>
    t('p2p.create_offer_page.margin_is_out_of_limits'),
  ['OFFER_VOLUME_IS_OUT_OF_LIMITS']: () =>
    t('p2p.create_offer_page.volume_is_out_of_limits'),
  ['PAYMENT_CONFIRM_TIMEOUT_OUT_OF_LIMITS']: () =>
    t('p2p.create_offer_page.payment_confirmation_is_out_of_limits'),
  ['TOO_MANY_PAYMENTS_DETAILS']: ({ maxPaymentDetailsQuantityInclusive }) =>
    t('p2p.create_offer_page.maximum_amount_of_payment_methods_error', {
      count: maxPaymentDetailsQuantityInclusive,
    }),
  ['TOO_SMALL_MIN_ORDER_AMOUNT']: () =>
    t('p2p.create_offer_page.too_small_min_order_amount'),
  ['NEXT_VOLUME_LOWER_THAN_CURRENT']: ({ offerType }) =>
    offerType === 'PURCHASE'
      ? t('p2p.create_offer_page.total_amount_cant_be_reduced_in_purchase_ad')
      : t('p2p.create_offer_page.total_amount_cant_be_reduced_in_sell_ad'),
  ['NOT_ENOUGH_MONEY_FOR_VOLUME_UPDATE']: () =>
    t('p2p.offer_page.insufficient_balance'),
  ['ACCESS_DENIED']: () => t('p2p.please_contact_support_for_details'),
};

const EDIT_OFFER_STATUS_TO_ERROR_TITLE: {
  [key in DetailedRestDataResponseEditOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum]?: () => string;
} = {
  ['ACCESS_DENIED']: CREATE_OFFER_STATUS_TO_ERROR_TITLE['ACCESS_DENIED'],
};

const EDIT_OFFER_STATUS_TO_ERROR_ACTION: {
  [key in DetailedRestDataResponseEditOfferRestStatusUserPrivateBaseOfferRestDtoKycPromotionRequiredDetailsStatusEnum]?: (options: {
    tgBotLink: string;
  }) => React.ReactNode;
} = {
  ['ACCESS_DENIED']: CREATE_OFFER_STATUS_TO_ERROR_ACTION['ACCESS_DENIED'],
};

const PreviewOffer = () => {
  const {
    draftOffer,
    approximateAdPrice,
    mode,
    offerId,
    exchangePricePerUnitOfBaseCurrency,
    cameFrom,
    fieldsUserEdited,
    offerType,
    settings,
  } = useCreateEditOfferPageContext();

  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.p2pUser);
  const showKycPopup = useKycPopup();

  const commentElRef = useRef<HTMLDivElement>(null);
  const [showCommentIconOnTop, setShowCommentIconOnTop] = useState(false);
  const snackbarContext = useContext(SnackbarContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: stats } = useUserStats();
  const tgBotLink = useTgBotLink();
  const languageCode = useLanguage();
  const activateOffer = useActivateOffer();
  const getPaymentMethodName = useGetPaymentMethodName();

  const price =
    draftOffer.priceType === 'fixed' ? draftOffer.price : approximateAdPrice;

  const minOrderVolumeLimit = (() => {
    // If user edited price, floatingPercentage or minOrderAmount fields, we should calculate minOrderVolumeLimit
    if (
      mode === 'edit' &&
      ((draftOffer.priceType === 'fixed' && fieldsUserEdited.price) ||
        (draftOffer.priceType === 'floating' &&
          fieldsUserEdited.floatingPercentage) ||
        fieldsUserEdited.minOrderAmount)
    ) {
      return BigNumber(draftOffer.minOrderAmount).dividedBy(price);
    }

    return (
      draftOffer.minOrderVolumeLimit ||
      BigNumber(draftOffer.minOrderAmount).dividedBy(price)
    );
  })();

  const P2P_SELL_OFFER_FEE = Number(
    settings?.fee?.sellOfferForMakerPercent || 0,
  );

  const P2P_BUY_OFFER_FEE = Number(settings?.fee?.buyOfferForTakerPercent || 0);

  const finalAmount =
    offerType === 'SALE'
      ? draftOffer.amount.multipliedBy(1 - divide(P2P_SELL_OFFER_FEE, 100))
      : draftOffer.amount;

  const maxOrderVolumeLimit = draftOffer.maxOrderVolumeLimit || finalAmount;

  const maxOrderAmountLimit =
    offerType === 'SALE'
      ? draftOffer.amount
          .multipliedBy(price)
          .multipliedBy(1 - divide(P2P_SELL_OFFER_FEE, 100))
      : draftOffer.amount.multipliedBy(price);

  const canShowLimits =
    draftOffer.priceType === 'fixed' ||
    (draftOffer.priceType === 'floating' &&
      !!exchangePricePerUnitOfBaseCurrency);

  const { chosenPaymentMethods } = useAppSelector((state) => state.p2pAdForm);

  const chosenMethods = useMemo(() => {
    return chosenPaymentMethods[draftOffer.quoteCurrencyCode] || [];
  }, [chosenPaymentMethods, draftOffer.quoteCurrencyCode]);

  useEffect(() => {
    const el = commentElRef.current;

    if (!el) return;

    const linesCount = getLinesCountInElement(el);

    setShowCommentIconOnTop(linesCount > 3);
  }, []);

  const createOffer = async () => {
    try {
      setIsSubmitting(true);

      const createOfferBody = {
        type: offerType,
        initVolume: {
          currencyCode: draftOffer.baseCurrencyCode,
          amount: draftOffer.amount.toString(),
        },
        price: {
          type:
            draftOffer.priceType === 'fixed'
              ? PriceRestDtoTypeEnum.Fixed
              : PriceRestDtoTypeEnum.Floating,
          baseCurrencyCode: draftOffer.baseCurrencyCode,
          quoteCurrencyCode: draftOffer.quoteCurrencyCode,
          value:
            draftOffer.priceType === 'fixed'
              ? draftOffer.price.toString()
              : draftOffer.floatingPercentage.toString(),
        },
        orderAmountLimits: {
          min: draftOffer.minOrderAmount.toString(),
        },
        paymentConfirmTimeout: draftOffer.paymentConfirmationTimeout,
        comment: draftOffer.comment,
      };

      const createBuyOfferBody: CreateBuyOfferRestRequest = {
        ...createOfferBody,
        paymentMethodCodes: chosenMethods.map((item) => item.code),
      };

      const createSellOfferBody: CreateSellOfferRestRequest = {
        ...createOfferBody,
        paymentDetailsIds: draftOffer.paymentDetails
          .filter((item) => {
            return (
              item.isEnabled && item.currency === draftOffer.quoteCurrencyCode
            );
          })
          .map((item) => item.id),
      };

      const result = await API.Offer.createOfferV2(
        offerType === 'PURCHASE' ? createBuyOfferBody : createSellOfferBody,
      );

      const offerId = result.data?.data?.id;

      if (result.data.status !== 'SUCCESS') {
        logEvent('Maker. Ad creation failed', {
          category: 'p2p.merchant.ad',
          error_type: result.data.status,
          type: offerType === 'SALE' ? 'sell' : 'buy',
        });
      }

      if (result.data.status === 'SUCCESS' && result.data.data && offerId) {
        const data = await activateOffer({
          offerType,
          offerId,
          baseCurrencyCode: result.data.data.price
            .baseCurrencyCode as CryptoCurrency,
        });

        if (data.status === 'SUCCESS') {
          navigate({
            pathname: generatePath(routePaths.P2P_OFFER_CREATE_EDIT_SUCCESS, {
              id: String(offerId),
            }),
            search: createSearchParams({
              mode: 'create',
              cameFrom,
            }).toString(),
          });

          logEvent('Maker. Creation step 3 completed', {
            category: 'p2p.merchant.ad',
            type: offerType === 'SALE' ? 'sell' : 'buy',
          });
        }
      } else if (result.data.status === 'KYC_PROMOTION_REQUIRED') {
        showKycPopup(result.data.errorDetails?.promotionKYCLevel);
      } else {
        const text = CREATE_OFFER_STATUS_TO_ERROR_MESSAGE[result.data.status]
          ? CREATE_OFFER_STATUS_TO_ERROR_MESSAGE[result.data.status]?.({
              maxPaymentDetailsQuantityInclusive: Number(
                settings?.offerSettings?.maxPaymentDetailsQuantityInclusive ||
                  0,
              ),
              activeOfferLimit:
                settings?.offerSettings?.activeBuyOffersCountLimit,
            })
          : t('p2p.create_offer_page.something_went_wrong');

        const title = CREATE_OFFER_STATUS_TO_ERROR_TITLE[result.data.status]
          ? CREATE_OFFER_STATUS_TO_ERROR_TITLE[result.data.status]?.()
          : null;

        const action = CREATE_OFFER_STATUS_TO_ERROR_ACTION[result.data.status]
          ? CREATE_OFFER_STATUS_TO_ERROR_ACTION[result.data.status]?.()
          : null;

        snackbarContext.showSnackbar({
          icon: 'warning',
          text,
          title,
          action,
          showDuration: 5000,
        });
      }
    } catch (error) {
      console.error(error);

      logEvent('Maker. Ad creation failed', {
        category: 'p2p.merchant.ad',
        error_type: 'INTERNAL_ERROR',
        type: offerType === 'SALE' ? 'sell' : 'buy',
      });

      snackbarContext.showSnackbar({
        before: <WarningSVG />,
        text: t('p2p.create_offer_page.something_went_wrong'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const editOffer = async () => {
    try {
      setIsSubmitting(true);

      const editOfferBody = {
        offerId: Number(offerId),
        paymentConfirmTimeout: draftOffer.paymentConfirmationTimeout,
        type: offerType,
        price: {
          type:
            draftOffer.priceType === 'fixed'
              ? EditPriceRequestTypeEnum.Fixed
              : EditPriceRequestTypeEnum.Floating,
          value:
            draftOffer.priceType === 'fixed'
              ? draftOffer.price.toString()
              : draftOffer.floatingPercentage.toString(),
        },
        orderAmountLimits: {
          min: draftOffer.minOrderAmount.toString(),
        },
        comment: draftOffer.comment,
        volume: draftOffer.amount.toString(),
      };

      const editBuyOfferBody: EditBuyOfferRestRequest = {
        ...editOfferBody,
        paymentMethodCodes: chosenMethods.map((item) => item.code),
      };

      const editSellOfferBody: EditSellOfferRestRequest = {
        ...editOfferBody,
        paymentDetailsIds: draftOffer.paymentDetails
          .filter((item) => {
            return (
              item.isEnabled && item.currency === draftOffer.quoteCurrencyCode
            );
          })
          .map((item) => item.id),
      };

      const result = await API.Offer.editOfferV2(
        offerType === 'PURCHASE' ? editBuyOfferBody : editSellOfferBody,
      );

      if (result.data.status === 'SUCCESS' && result.data.data) {
        const offerId = result.data.data.id;

        navigate({
          pathname: generatePath(routePaths.P2P_OFFER_CREATE_EDIT_SUCCESS, {
            id: String(offerId),
          }),
          search: createSearchParams({
            mode: 'edit',
            cameFrom,
          }).toString(),
        });
      } else if (result.data.status === 'KYC_PROMOTION_REQUIRED') {
        showKycPopup(result.data.errorDetails?.promotionKYCLevel);
      } else {
        const text = EDIT_OFFER_STATUS_TO_ERROR_MESSAGE[result.data.status]
          ? EDIT_OFFER_STATUS_TO_ERROR_MESSAGE[result.data.status]?.({
              maxPaymentDetailsQuantityInclusive: Number(
                settings?.offerSettings?.maxPaymentDetailsQuantityInclusive ||
                  0,
              ),
              offerType,
            })
          : t('p2p.create_offer_page.something_went_wrong');

        const title = EDIT_OFFER_STATUS_TO_ERROR_TITLE[result.data.status]
          ? EDIT_OFFER_STATUS_TO_ERROR_TITLE[result.data.status]?.()
          : null;

        const action = EDIT_OFFER_STATUS_TO_ERROR_ACTION[result.data.status]
          ? EDIT_OFFER_STATUS_TO_ERROR_ACTION[result.data.status]?.({
              tgBotLink,
            })
          : null;

        snackbarContext.showSnackbar({
          icon: 'warning',
          text,
          title,
          action,
          showDuration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      snackbarContext.showSnackbar({
        before: <WarningSVG />,
        text: t('p2p.create_offer_page.something_went_wrong'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteSteps = () => {
    if (mode === 'create') {
      createOffer();
    } else if (mode === 'edit') {
      editOffer();
    }
  };

  const paymentMethodsNames =
    offerType === 'PURCHASE'
      ? chosenMethods.map(({ name }) => name)
      : draftOffer.paymentDetails
          .filter((paymentMethod) => paymentMethod.isEnabled)
          .map((paymentMethod) =>
            getPaymentMethodName(paymentMethod.paymentMethod),
          );

  return (
    <>
      <div className={themeClassName('root')}>
        <StepsTitle
          title={t('p2p.create_offer_page.check_your_ad')}
          step={4}
          total={4}
        />
        <OfferCard
          userId={Number(user.userId)}
          username={user.displayNickname}
          avatarCode={user.avatarCode}
          successPercent={stats.successPercent}
          tradesCount={stats.totalOrdersCount}
          baseCurrencyCode={draftOffer.baseCurrencyCode}
          quoteCurrencyCode={draftOffer.quoteCurrencyCode}
          priceType={draftOffer.priceType}
          price={price}
          amount={
            offerType === 'SALE'
              ? draftOffer.amount.minus(
                  draftOffer.amount.multipliedBy(
                    divide(P2P_SELL_OFFER_FEE, 100),
                  ),
                )
              : draftOffer.amount
          }
          orderAmountLimits={{
            min: draftOffer.minOrderAmount.toString(),
            max: canShowLimits ? maxOrderAmountLimit.toString() : undefined,
            currencyCode: draftOffer.quoteCurrencyCode,
            approximate: false,
          }}
          orderVolumeLimits={
            canShowLimits
              ? {
                  min: minOrderVolumeLimit.toString(),
                  max: maxOrderVolumeLimit.toString(),
                  currencyCode: draftOffer.baseCurrencyCode,
                  approximate: true,
                }
              : undefined
          }
          paymentMethodsNames={paymentMethodsNames}
          timeLimit={draftOffer.paymentConfirmationTimeout}
          isCardActive={false}
          description={
            <span className={styles.description}>
              {offerType === 'SALE'
                ? t('p2p.create_offer_page.we_charge', {
                    percent: printNumber({
                      value: P2P_SELL_OFFER_FEE,
                      languageCode,
                    }),
                  })
                : t('p2p.create_offer_page.we_charge_buy_offers', {
                    percent: printNumber({
                      value: P2P_BUY_OFFER_FEE,
                      languageCode,
                    }),
                  })}
            </span>
          }
          separator
          offerType={offerType}
        />
        {draftOffer.comment && (
          <Section separator>
            <ListItemCell
              icon={
                <ListItemIcon
                  type="icon"
                  className={cn(
                    themeClassName('messageIcon'),
                    showCommentIconOnTop && themeClassName('messageIconOnTop'),
                  )}
                >
                  <MessageSVG className={styles.messageColor} />
                </ListItemIcon>
              }
              header={t('p2p.preview_offer_page.comment')}
              headerTheme="secondary"
              contentClassName={styles.commentContent}
              containerClassName={styles.commentContainer}
            >
              <div
                className={styles.comment}
                ref={commentElRef}
                style={{ whiteSpace: 'pre-line' }}
              >
                {draftOffer.comment}
              </div>
            </ListItemCell>
          </Section>
        )}
      </div>
      <MainButton
        text={
          mode === 'create'
            ? t('p2p.create_offer_page.create_ad').toLocaleUpperCase()
            : t('p2p.create_offer_page.edit_ad').toLocaleUpperCase()
        }
        onClick={handleCompleteSteps}
        progress={isSubmitting}
        data-testid="tgcrawl"
      />
    </>
  );
};

export default PreviewOffer;
