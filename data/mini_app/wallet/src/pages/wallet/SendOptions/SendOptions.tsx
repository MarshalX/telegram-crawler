import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { RootState, useAppSelector } from 'store';

import { selectIsReceiverValid } from 'reducers/session/sessionSlice';

import { WhatAreDollars } from 'containers/wallet/WhatAreDollars/WhatAreDollars';

import Avatar from 'components/Avatar/Avatar';
import { BackButton } from 'components/BackButton/BackButton';
import { ButtonCell, Cell } from 'components/Cells';
import { CellCard } from 'components/Cells/CellCard/CellCard';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { Text } from 'components/Text/Text';

import { printFullName } from 'utils/common/common';
import { generateTelegramLink } from 'utils/common/common';
import { getCurrencyName, isTgTransferAllowed } from 'utils/common/currency';
import { generateStartAttach } from 'utils/common/startattach';

import { useAddToAttachesAvailability } from 'hooks/utils/useAddToAttachesAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ExternalWalletSVG } from 'images/external_wallet.svg';
import { ReactComponent as UserCircleOutlineSVG } from 'images/user_circle_outline.svg';

import styles from './SendOptions.module.scss';

export const SendOptions = () => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const receiverValid = useAppSelector((state) => selectIsReceiverValid(state));
  const { botUsername } = useSelector((state: RootState) => state.wallet);
  const { featureFlags } = useSelector((state: RootState) => state.user);
  const { addedToAttachmentMenu } = useSelector(
    (state: RootState) => state.session,
  );
  const receiver = window.Telegram.WebApp.initDataUnsafe.receiver;
  const isAddToAttachesAvailable = useAddToAttachesAvailability();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const assetCurrency = searchParams.get('assetCurrency') as
    | FrontendCryptoCurrencyEnum
    | undefined;
  const currencyName = assetCurrency
    ? getCurrencyName({
        currency: assetCurrency,
        t,
      })
    : undefined;

  const onContactsClick = () => {
    if (addedToAttachmentMenu) {
      window.Telegram.WebApp.openTelegramLink(
        generateTelegramLink(botUsername, {
          startattach: generateStartAttach('send', {
            assetCurrency,
          }),
          choose: 'users',
        }),
      );
    } else if (isAddToAttachesAvailable()) {
      window.Telegram.WebApp.openTelegramLink(
        generateTelegramLink(botUsername, {
          attach: botUsername,
          startattach: generateStartAttach('sendOptions'),
        }),
      );
    }
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <InlineLayout className={themeClassName('header')}>
        <Text
          className={themeClassName('title')}
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
        >
          {assetCurrency === 'USDT'
            ? t('send_options.title_dollars')
            : assetCurrency
            ? t('send_options.title_asset', { currencyName })
            : t('send_options.title')}
        </Text>
        {assetCurrency === 'USDT' && (
          <WhatAreDollars className={styles.whatAreDollars} />
        )}
      </InlineLayout>
      <div className={themeClassName('options')}>
        <InlineLayout>
          {(!assetCurrency ||
            isTgTransferAllowed(assetCurrency, featureFlags)) &&
            (receiverValid && receiver ? (
              <Cell.List mode="card">
                <Cell
                  className={themeClassName('receiverCell')}
                  tappable
                  start={
                    <Cell.Part type="avatar">
                      <Avatar
                        size={theme === 'apple' ? 40 : 46}
                        src={receiver.photo_url}
                      />
                    </Cell.Part>
                  }
                  onClick={() => {
                    navigate({
                      pathname: generatePath(routePaths.SEND),
                      search: assetCurrency
                        ? createSearchParams({
                            assetCurrency,
                          }).toString()
                        : undefined,
                    });
                  }}
                  chevron
                >
                  <Cell.Text
                    bold
                    title={printFullName(
                      receiver.first_name,
                      receiver.last_name,
                    )}
                    description={t('send_options.tg_transfer')}
                  />
                </Cell>
                <ButtonCell
                  className={themeClassName('chooseContactButton')}
                  start={
                    <Cell.Part type="icon">
                      <UserCircleOutlineSVG />
                    </Cell.Part>
                  }
                  onClick={onContactsClick}
                  mode="primary"
                >
                  {t('send_options.change_telegram_contact')}
                </ButtonCell>
              </Cell.List>
            ) : (
              <CellCard
                chevron
                tappable
                onClick={onContactsClick}
                start={
                  <Cell.Part type="roundedIcon">
                    <RoundedIcon
                      size={theme === 'apple' ? 40 : 46}
                      backgroundColor="linear-gradient(180deg, #FFCD6A 0%, #FFA85C 100%)"
                    >
                      <UserCircleOutlineSVG />
                    </RoundedIcon>
                  </Cell.Part>
                }
              >
                <Cell.Text
                  title={t('send_options.your_telegram_contact')}
                  description={t('send_options.tg_transfer')}
                />
              </CellCard>
            ))}
        </InlineLayout>
        <InlineLayout>
          <CellCard
            tappable
            chevron
            start={
              <Cell.Part type="roundedIcon">
                <RoundedIcon
                  size={theme === 'apple' ? 40 : 46}
                  backgroundColor="linear-gradient(180deg, #A7ADB9 0%, #878B96 100%)"
                >
                  <ExternalWalletSVG />
                </RoundedIcon>
              </Cell.Part>
            }
            onClick={() => {
              if (assetCurrency) {
                navigate(
                  generatePath(routePaths.RECEIVER_SEARCH, {
                    assetCurrency,
                  }),
                );
              } else {
                navigate(
                  generatePath(routePaths.CHOOSE_ASSET, { type: 'send' }),
                );
              }
            }}
          >
            <Cell.Text
              bold
              title={t('send_options.external_wallet_title')}
              description={t('send_options.external_wallet_text')}
            />
          </CellCard>
        </InlineLayout>
      </div>
    </Page>
  );
};
