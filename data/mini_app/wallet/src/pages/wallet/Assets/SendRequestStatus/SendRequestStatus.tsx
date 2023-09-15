import { FC, Suspense, lazy, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { RootState } from 'store';

import {
  SendRequestSlice,
  reset as resetSendRequest,
} from 'reducers/sendRequest/sendRequestSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Mono from 'components/Mono/Mono';
import Page from 'components/Page/Page';

import { printCryptoAmount } from 'utils/common/currency';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';

import { useAssetCurrency } from 'hooks/common/useAssetCurrency';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

import styles from './SendRequestStatus.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

export const SendRequestStatus: FC = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const scw = useSelector((state: RootState) => state.scw);
  const sendRequestState = useSelector((state: RootState) => state.sendRequest);
  const assetCurrency = useAssetCurrency();
  const sendRequest = useRef<SendRequestSlice>(sendRequestState);
  const address = sendRequest.current?.address;

  useEffect(() => {
    dispatch(resetSendRequest());
  }, [dispatch]);

  return (
    <Page>
      <BackButton />
      {sendRequest.current ? (
        <>
          <div className="container">
            <Suspense
              fallback={<BoomstickSVG className={themeClassName('media')} />}
            >
              <BoomstickAnimation className={themeClassName('media')} />
            </Suspense>
            <h1 className={themeClassName('title')}>
              {t('send_status.success_title', {
                currency: assetCurrency,
              })}
            </h1>
            <p className={themeClassName('text')}>
              {t('send_status.success_text')}
            </p>
          </div>
          <div className={themeClassName('footer')}>
            <span className={themeClassName('meta')}>
              <Trans
                values={{
                  currencyName: assetCurrency,
                  amount: printCryptoAmount({
                    amount: sendRequest.current.recipientAmount.amount,
                    currency: assetCurrency,
                    languageCode,
                  }),
                  count: sendRequest.current.recipientAmount.amount,
                }}
                i18nKey="send_status.success_meta"
                t={t}
                components={[<b key="b" />]}
              />
            </span>
            {address && (
              <>
                {isTONDomain(address) || isWeb3Domain(address) ? (
                  <Mono className={themeClassName('address')}>
                    {sendRequest.current.address}
                  </Mono>
                ) : (
                  <Mono className={themeClassName('address')}>
                    {address.slice(0, address.length / 2)}
                    <br />
                    {address.slice(address.length / 2)}
                  </Mono>
                )}
              </>
            )}
          </div>
          <MainButton
            onClick={() => {
              if (sendRequest.current?.address === scw.address) {
                navigate(routePaths.SCW_MAIN, { replace: true });
              } else {
                navigate(routePaths.MAIN, { replace: true });
              }
            }}
            text={t('send_status.done').toLocaleUpperCase()}
          />
        </>
      ) : (
        <Navigate to={routePaths.MAIN} replace />
      )}
    </Page>
  );
};
