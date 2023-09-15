import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TelegramSVG } from 'images/telegram.svg';

import styles from './Update.module.scss';

const TELEGRAM_UPDATE_URL = 'https://telegram.org/update';

const Update = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);

  return (
    <Page>
      <BackButton />
      <div className={themeClassName('root')}>
        <RoundedIcon
          size={100}
          iconSize={70}
          backgroundColor="linear-gradient(180deg, #2AABEE 0%, #229ED9 100%)"
          className={themeClassName('media')}
        >
          <TelegramSVG />
        </RoundedIcon>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.update.update_telegram')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular', color: 'hint' }}
        >
          {t('scw.update.please_update_for_ton_space')}
        </Text>
      </div>
      <MainButton
        data-testid="tgcrawl"
        onClick={() => {
          window.Telegram.WebApp.openLink(TELEGRAM_UPDATE_URL);
        }}
        text={t('common.update')}
      />
    </Page>
  );
};

export default memo(Update);
