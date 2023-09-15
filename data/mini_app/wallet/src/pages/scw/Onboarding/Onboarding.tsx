import classNames from 'classnames';
import { useSCWAddresses } from 'query/scw/address';
import { memo, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { WALLET_TERMS_OF_USE_TON_SPACE_LINK } from 'config';

import { RootState } from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { Gallery } from 'components/Gallery/Gallery';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { logEvent } from 'utils/common/logEvent';
import { createWallet } from 'utils/scw/ton';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Onboarding.module.scss';

const Onboarding = () => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { featureFlags, id } = useSelector((state: RootState) => state.user);
  const { displaySCW } = useSelector(
    (state: RootState) => state.warningsVisibility,
  );
  const { data: scwAddress, isLoading: isLoadingSCWAddress } =
    useSCWAddresses();

  const [activeGallerySlide, setActiveGallerySlide] = useState(0);
  const hasScwAddress = scwAddress && scwAddress.actives.length > 0;
  const hasBackup = scwAddress && scwAddress.backups.length > 0;

  // TODO: Add types for translations when using returnObjects: true.
  const steps: { description?: string; title: string; sub_title: string }[] = t(
    'scw.onboarding.steps',
    {
      returnObjects: true,
    },
  );

  useEffect(() => {
    logEvent('Opened onboarding scw screen');
  }, []);

  const showHasScwAddressAlert = () => {
    window.Telegram.WebApp.showPopup({
      message: t('scw.onboarding.multiple_ton_space_text'),
      buttons: [
        {
          type: 'ok',
        },
      ],
    });
  };

  const handleCreateWallet = async () => {
    if (hasScwAddress) {
      showHasScwAddressAlert();
    } else {
      const wallet = await createWallet();

      dispatch(
        updateSCW({
          ...wallet,
          setupComplete: false,
          recoveryComplete: false,
        }),
      );

      navigate(routePaths.SCW_BACKUP_CHOOSE_METHOD, { replace: true });
    }
  };

  // TODO: Improve to have loader until addresses are loaded
  // or wait until addresses are complete
  useEffect(() => {
    if (hasScwAddress || hasBackup) {
      navigate(routePaths.SCW_IMPORT_EXISTING, { replace: true });
    }
  }, [hasScwAddress, hasBackup]);

  return (
    <Page expandOnMount headerColor="#1c1c1e">
      <BackButton />
      <>
        <div className={themeClassName('root')}>
          <div className={styles.imagesContainer}>
            <div className={styles.images}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={classNames(
                    styles[`step${index}`],
                    activeGallerySlide === index && styles.activeImage,
                    themeClassName('image'),
                  )}
                ></div>
              ))}
            </div>
          </div>
          <div className={themeClassName('content')}>
            <Gallery
              className={styles.gallery}
              initialSlideIndex={activeGallerySlide}
              onChange={(slideIndex) => {
                setActiveGallerySlide(slideIndex);
              }}
              autoplay
              autoplayDuration={5000}
              renderPageControl={(props) => <Gallery.PageControl {...props} />}
            >
              {steps.map((step) => (
                <div key={step.title} className={styles.slide}>
                  <Text
                    style={{ marginInline: 32 }}
                    apple={{ variant: 'title1' }}
                    material={{ variant: 'headline5' }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={{ marginInline: 32, marginBlock: 12 }}
                    apple={{ variant: 'body', weight: 'regular' }}
                    material={{ variant: 'body', weight: 'regular' }}
                  >
                    {step.sub_title}
                  </Text>
                  {'description' in step && (
                    <Text
                      style={{ marginInline: 32 }}
                      apple={{ variant: 'footnote', color: 'hint' }}
                      material={{ variant: 'caption1', color: 'hint' }}
                      className={themeClassName('description')}
                    >
                      {step.description}
                    </Text>
                  )}
                </div>
              ))}
            </Gallery>
          </div>
        </div>
        {featureFlags.scw || displaySCW ? (
          <BottomContent className={themeClassName('bottom')}>
            <ActionButton
              data-testid="tgcrawl"
              stretched
              size="medium"
              shiny
              onClick={handleCreateWallet}
              className={styles.button}
              disabled={isLoadingSCWAddress}
            >
              {t('scw.onboarding.main_button')}
            </ActionButton>
            <ActionButton
              data-testid="tgcrawl"
              size="medium"
              stretched
              mode="transparent"
              onClick={() => {
                navigate(routePaths.SCW_IMPORT_CHOOSE_METHOD);
              }}
              className={styles.button}
              disabled={isLoadingSCWAddress}
            >
              {t('scw.onboarding.secondary_button')}
            </ActionButton>
            <Text
              style={{ marginInline: 32 }}
              apple={{ variant: 'footnote', color: 'hint' }}
              material={{ variant: 'caption1', color: 'hint' }}
              align="center"
            >
              <Trans
                i18nKey="scw.onboarding.terms_of_use"
                t={t}
                components={[
                  <a
                    key="1"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.termsLink}
                    href={WALLET_TERMS_OF_USE_TON_SPACE_LINK}
                    onClick={(e) => {
                      e.preventDefault();
                      window.Telegram.WebApp.openLink(e.currentTarget.href, {
                        try_instant_view: true,
                      });
                    }}
                  />,
                ]}
              />
            </Text>
          </BottomContent>
        ) : (
          <MainButton
            disabled={featureFlags.scwBetaWaitlist}
            color={
              featureFlags.scwBetaWaitlist
                ? customPalette[theme][colorScheme].button_disabled_color
                : window.Telegram.WebApp.themeParams.button_color
            }
            textColor={
              featureFlags.scwBetaWaitlist
                ? customPalette[theme][colorScheme].button_disabled_text_color
                : window.Telegram.WebApp.themeParams.button_text_color
            }
            text={
              featureFlags.scwBetaWaitlist
                ? t('scw.beta_waitlist.already_joined')
                : t('scw.beta_waitlist.join')
            }
            onClick={() => {
              window.Telegram.WebApp.openLink(
                `https://wallettg.typeform.com/tonspace${
                  id ? `#tg_id=${id}` : ''
                }`,
              );
              window.Telegram.WebApp.close();
            }}
          />
        )}
      </>
    </Page>
  );
};

export default memo(Onboarding);
