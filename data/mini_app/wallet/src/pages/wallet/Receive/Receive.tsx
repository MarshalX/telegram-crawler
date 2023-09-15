import classNames from 'classnames';
import { FC, Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import API from 'api/wallet';
import {
  CryptoCurrency,
  FrontendCryptoCurrencyEnum,
} from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { updateWalletAsset } from 'reducers/wallet/walletSlice';

import { AddressWithQR } from 'containers/common/AddressWithQR/AddressWithQR';
import { DollarsModalTrigger } from 'containers/wallet/DollarsModal/DollarsModalTrigger';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { Gallery } from 'components/Gallery/Gallery';
import Page from 'components/Page/Page';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { copyToClipboard, isWindows } from 'utils/common/common';
import { getCurrencyName } from 'utils/common/currency';
import { getNetworkTicker } from 'utils/common/network';

import { useExpanded } from 'hooks/utils/useExpanded';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CrystalSVG } from 'images/crystal.svg';
import { ReactComponent as QuestionMarkSVG } from 'images/question_mark.svg';

import styles from './Receive.module.scss';
import { ReactComponent as CopySVG } from './copy.svg';
import { ReactComponent as ShareSVG } from './share.svg';

const CrystalAnimation = lazy(
  () => import('components/animations/CrystalAnimation/CrystalAnimation'),
);
const platform = window.Telegram.WebApp.platform;

const compactHeight = window.innerHeight < 540;

export const Receive: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { theme, themeClassName } = useTheme(styles);
  const initialActiveAssetCurrency =
    searchParams.get('assetCurrency') || FrontendCryptoCurrencyEnum.Ton;
  const assets = useAppSelector((state) => state.wallet.assets);
  const snackbarContext = useContext(SnackbarContext);
  const isExpanded = useExpanded();
  const [activeGallerySlide, setActiveGallerySlide] = useState(
    assets.findIndex((asset) => asset.currency === initialActiveAssetCurrency),
  );

  const freezeGallery = !!searchParams.get('freeze');

  const isShareAPIEnabled =
    !isWindows() && typeof window.navigator.share === 'function'; // На Windows всплывает ошибка, описанная тут https://bugs.chromium.org/p/chromium/issues/detail?id=1377823

  useEffect(() => {
    if (platform !== 'android' || isExpanded) {
      assets.forEach((asset) => {
        API.Users.getOrCreateWallet(asset.currency).then((response) => {
          dispatch(
            updateWalletAsset({
              currency: asset.currency,
              address: response.data.address,
            }),
          );
        });
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  const copyAddressToClipboard = (address: string) => {
    const selection = document.getSelection();

    selection?.type !== 'Range' &&
      copyToClipboard(address).then(() => {
        snackbarContext.showSnackbar({
          onShow: () =>
            window.Telegram.WebApp.HapticFeedback.notificationOccurred(
              'success',
            ),
          showDuration: 2000,
          snackbarId: 'receive_address_copied',
          text: t('receive.copied'),
        });
      });
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <div className={styles.root}>
        <div
          className={classNames(
            styles.content,
            compactHeight && 'container',
            compactHeight && styles.center,
          )}
        >
          <Gallery
            freeze={freezeGallery}
            className={styles.gallery}
            initialSlideIndex={activeGallerySlide}
            onChange={(slideIndex) => {
              setActiveGallerySlide(slideIndex);
            }}
            renderPageControl={(props) => (
              <Gallery.PageControl platter={theme === 'apple'} {...props} />
            )}
          >
            {assets.map(({ address, currency, network }) => {
              return (
                <div key={currency} className={themeClassName('slide')}>
                  {!compactHeight && (
                    <h1
                      className={themeClassName('title')}
                      data-testid="tgcrawl"
                    >
                      {currency === 'USDT' ? (
                        <DollarsModalTrigger>
                          <div className={styles.whatAreDollars}>
                            {t('receive.title_dollars')}
                            <QuestionMarkSVG />
                          </div>
                        </DollarsModalTrigger>
                      ) : (
                        t('receive.title', {
                          currencyName: getCurrencyName({
                            currency,
                            t,
                          }),
                        })
                      )}
                    </h1>
                  )}
                  <AddressWithQR
                    className={styles.qr}
                    logo={
                      currency === CryptoCurrency.Ton ? (
                        <Suspense fallback={<CrystalSVG />}>
                          <CrystalAnimation />
                        </Suspense>
                      ) : (
                        <CurrencyLogo
                          variant="complex"
                          style={{ padding: 4 }}
                          currency={currency}
                        />
                      )
                    }
                    currency={currency}
                    address={address}
                  />
                  <p
                    className={themeClassName('text')}
                    data-testid="tgcrawl"
                  >
                    <Trans
                      i18nKey="receive.text"
                      t={t}
                      components={[<b key="highlight" />]}
                      values={{
                        currency:
                          currency === FrontendCryptoCurrencyEnum.Usdt
                            ? `${currency} ${getNetworkTicker(network)}`
                            : `${getCurrencyName({
                                currency,
                                t,
                              })} (${currency})`,
                      }}
                    />
                  </p>
                </div>
              );
            })}
          </Gallery>
        </div>
        {(platform !== 'android' || isExpanded) && (
          <section className={themeClassName('actions')}>
            <ActionButton
              className={styles.action}
              mode="primary"
              layout="horizontal"
              icon={<CopySVG />}
              data-testid="tgcrawl"
              onClick={() => {
                const activeAsset = assets[activeGallerySlide];

                if (activeAsset && activeAsset.address) {
                  copyAddressToClipboard(activeAsset.address);
                }
              }}
            >
              {isShareAPIEnabled ? t('receive.copy') : t('receive.copy_full')}
            </ActionButton>
            {isShareAPIEnabled && (
              <ActionButton
                className={styles.action}
                mode="secondary"
                layout="horizontal"
                icon={<ShareSVG />}
                onClick={() => {
                  const activeAsset = assets[activeGallerySlide];

                  if (activeAsset && activeAsset.address) {
                    window.navigator.share({
                      text: activeAsset.address,
                      title: activeAsset.address,
                    });
                  }
                }}
              >
                {t('receive.share')}
              </ActionButton>
            )}
          </section>
        )}
      </div>
    </Page>
  );
};
