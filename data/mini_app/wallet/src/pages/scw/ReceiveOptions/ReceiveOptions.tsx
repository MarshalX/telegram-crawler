import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { CellCard } from 'components/Cells/CellCard/CellCard';
import Page from 'components/Page/Page';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { copyToClipboard } from 'utils/common/common';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WalletSVG } from 'images/wallet.svg';

import styles from './ReceiveOptions.module.scss';

const ReceiveOptions = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const { address } = useAppSelector((state) => state.scw);
  const snackbarContext = useContext(SnackbarContext);
  const navigate = useNavigate();

  const onAddressClick = () => {
    copyToClipboard(address).then(() => {
      snackbarContext.showSnackbar({
        onShow: () =>
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('success'),
        showDuration: 2000,
        snackbarId: 'receive_address_copied',
        text: t('receive.copied'),
      });
    });
  };

  return (
    <Page mode="secondary" expandOnMount>
      <BackButton />
      <Text
        apple={{ variant: 'title1' }}
        material={{ variant: 'headline5' }}
        className={themeClassName('title')}
      >
        {t('scw.receive_options.title')}
      </Text>
      <Text
        className={themeClassName('text')}
        apple={{ variant: 'body', weight: 'regular' }}
        material={{ variant: 'body', weight: 'regular' }}
      >
        <Trans
          i18nKey="scw.receive_options.text"
          t={t}
          components={[
            <Text
              key="text"
              apple={{ variant: 'body', weight: 'medium' }}
              material={{ variant: 'body', weight: 'medium' }}
              Component="span"
            />,
          ]}
        />
      </Text>
      <div className={themeClassName('options')}>
        <div className={themeClassName('address')}>
          <Text
            apple={{
              variant: 'subheadline1',
              weight: 'regular',
              color: 'hint',
            }}
            material={{ variant: 'subtitle1', color: 'hint' }}
            className={themeClassName('addressTitle')}
          >
            {t('scw.address_title', { currency: 'TON' })}
          </Text>
          <Text
            apple={{ variant: 'title1' }}
            material={{ variant: 'headline5' }}
            className={styles.addressValue}
            onClick={onAddressClick}
          >
            {squashAddress(address, { start: 4, end: 4 })}
          </Text>
          <Text
            apple={{
              variant: 'subheadline1',
              weight: 'regular',
              color: 'link',
            }}
            material={{ variant: 'subtitle1', color: 'link' }}
            className={themeClassName('addressCopy')}
            onClick={onAddressClick}
          >
            {t('scw.receive_options.copy_address')}
          </Text>
          <ActionButton
            mode="tertiary"
            size="medium"
            stretched
            onClick={() => navigate(routePaths.SCW_QR)}
          >
            {t('scw.receive_options.show_qr')}
          </ActionButton>
        </div>
        <CellCard
          start={
            <Cell.Part type="roundedIcon">
              <RoundedIcon size={40} backgroundColor="link">
                <WalletSVG />
              </RoundedIcon>
            </Cell.Part>
          }
          chevron
          tappable
          onClick={() =>
            navigate({
              pathname: routePaths.SEND,
              search: createSearchParams({
                address,
                assetCurrency: 'TON',
                back: 'true',
              }).toString(),
            })
          }
        >
          <Cell.Text
            title={t('scw.receive_options.transfer_from_wallet_title')}
            description={t('scw.receive_options.transfer_from_wallet_text')}
          />
        </CellCard>
      </div>
    </Page>
  );
};

export default ReceiveOptions;
