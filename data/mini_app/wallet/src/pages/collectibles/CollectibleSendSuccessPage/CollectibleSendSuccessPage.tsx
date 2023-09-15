import { Suspense, lazy, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { Placeholder } from 'components/Placeholder/Placeholder';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { copyToClipboard } from 'utils/common/common';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

import styles from './CollectibleSendSuccessPage.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

const CollectibleSendSuccessPage = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const params = useParams();
  const recipientAddress = params.recipientAddress as string;

  const snackbarContext = useContext(SnackbarContext);

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
          snackbarId: 'collectible_sent_address_copied',
          text: t('common.copied_to_clipboard'),
        });
      });
  };

  const navigate = useNavigate();

  const finish = () => {
    // ReactRouter officially support going back with -1, buy TypeScript doesn't
    // eslint-disable-next-line
    // @ts-ignore
    navigate(-3, { replace: true });
  };

  return (
    <Page>
      <BackButton onClick={finish} />
      <div className="container">
        <Placeholder
          media={
            <Suspense fallback={<BoomstickSVG />}>
              <BoomstickAnimation />
            </Suspense>
          }
          title={t(
            'collectibles.collectible_send_success_page.placeholder_title',
          )}
          text={t(
            'collectibles.collectible_send_success_page.placeholder_text',
          )}
        />
      </div>
      <BottomContent className={styles.bottom}>
        <div className={themeClassName('bottomTitle')}>
          <Text
            apple={{
              variant: 'subheadline1',
              weight: 'regular',
              color: 'hint',
            }}
            material={{ variant: 'subtitle1', color: 'hint' }}
          >
            {t('collectibles.collectible_send_success_page.collectible_sent')}
          </Text>
        </div>
        <div className={themeClassName('recipientAddress')}>
          <Text
            className={styles.recipientAddressText}
            onClick={() => copyAddressToClipboard(recipientAddress)}
            apple={{ variant: 'body', weight: 'mono' }}
            material={{ variant: 'body', weight: 'mono' }}
          >
            {recipientAddress.slice(0, recipientAddress.length / 2)}
            <br />
            {recipientAddress.slice(recipientAddress.length / 2)}
          </Text>
        </div>
      </BottomContent>
      <MainButton
        onClick={finish}
        text={t(
          'collectibles.collectible_send_success_page.button_text',
        ).toUpperCase()}
      />
    </Page>
  );
};

export default CollectibleSendSuccessPage;
