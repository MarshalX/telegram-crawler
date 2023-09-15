import classNames from 'classnames';
import { FC, Suspense, lazy, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import routePaths from 'routePaths';

import { RootState } from 'store';

import { cleanPurchase } from 'reducers/purchase/purchaseSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';

import { getCurrencyName, printCryptoAmount } from 'utils/common/currency';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';
import { ReactComponent as MoneySVG } from 'images/money.svg';
import { ReactComponent as SadSVG } from 'images/sad.svg';

import styles from './PurchaseStatus.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);
const MoneyAnimation = lazy(
  () => import('components/animations/MoneyAnimation/MoneyAnimation'),
);
const SadAnimation = lazy(
  () => import('components/animations/SadSmileAnimation/SadSmileAnimation'),
);

const PurchaseStatus: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const purchase = useSelector((state: RootState) => state.purchase);

  const onDone = () => {
    if (purchase.status === 'success' || purchase.status === 'fail') {
      dispatch(cleanPurchase());
    }
    navigate(purchase.returnPath || routePaths.MAIN);
  };

  const onBack = () => {
    if (purchase.status === 'success') {
      dispatch(cleanPurchase);
    }
    navigate(purchase.returnPath || routePaths.MAIN);
  };

  useEffect(() => {
    switch (purchase.status) {
      case 'success':
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        break;
      case 'fail':
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        break;
    }
  }, [purchase.status]);

  if (
    purchase &&
    purchase.status &&
    purchase.amount &&
    purchase.created_at &&
    purchase.pay_amount &&
    purchase.method &&
    purchase.assetCurrency
  ) {
    return (
      <Page>
        <div className={themeClassName('root')}>
          <BackButton onClick={onBack} />
          <CSSTransition
            in={purchase.status === 'pending'}
            addEndListener={(node: HTMLElement, done: VoidFunction) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames={{
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
            }}
            unmountOnExit
          >
            <div className="container">
              <Suspense
                fallback={
                  <MoneySVG
                    className={classNames(
                      themeClassName('media'),
                      styles.money,
                    )}
                  />
                }
              >
                <MoneyAnimation
                  className={classNames(themeClassName('media'), styles.money)}
                />
              </Suspense>
              <h1 className={themeClassName('title')}>
                {t('purchase_status.pending_title')}
              </h1>
              <p className={themeClassName('text')}>
                {t('purchase_status.pending_text', {
                  currency: getCurrencyName({
                    currency: purchase.assetCurrency,
                    t,
                  }),
                })}
              </p>
            </div>
          </CSSTransition>
          <CSSTransition
            in={purchase.status === 'success'}
            addEndListener={(node: HTMLElement, done: VoidFunction) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
            }}
            unmountOnExit
          >
            <div className="container">
              <Suspense
                fallback={
                  <BoomstickSVG
                    className={classNames(
                      themeClassName('media'),
                      styles.boomstick,
                    )}
                  />
                }
              >
                <BoomstickAnimation
                  className={classNames(
                    themeClassName('media'),
                    styles.boomstick,
                  )}
                />
              </Suspense>
              <h1 className={themeClassName('title')}>
                {t('purchase_status.success_title')}
              </h1>
              <p className={themeClassName('text')}>
                <Trans
                  values={{
                    value: `${printCryptoAmount({
                      amount: purchase.amount,
                      currency: purchase.assetCurrency,
                      languageCode,
                    })} ${getCurrencyName({
                      currency: purchase.assetCurrency,
                      t,
                    })}`,
                  }}
                  i18nKey="purchase_status.success_text"
                  t={t}
                  components={[<b />]}
                />
              </p>
            </div>
          </CSSTransition>
          <CSSTransition
            in={purchase.status === 'fail'}
            addEndListener={(node: HTMLElement, done: VoidFunction) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
            }}
            unmountOnExit
          >
            <div className="container">
              <Suspense
                fallback={
                  <SadSVG
                    className={classNames(themeClassName('media'), styles.sad)}
                  />
                }
              >
                <SadAnimation
                  className={classNames(themeClassName('media'), styles.sad)}
                />
              </Suspense>
              <h1 className={themeClassName('title')}>
                {t('purchase_status.fail_title')}
              </h1>
            </div>
          </CSSTransition>
          <MainButton
            onClick={onDone}
            text={
              purchase.status === 'fail'
                ? t('purchase_status.fail_button')
                : purchase.status === 'success'
                ? t('purchase_status.success_button')
                : t('purchase_status.pending_button')
            }
          />
        </div>
      </Page>
    );
  } else {
    return null;
  }
};

export default PurchaseStatus;
