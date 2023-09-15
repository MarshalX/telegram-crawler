import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import MnemonicDisplay from 'containers/scw/MnemonicDisplay/MnemonicDisplay';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WriteSVG } from 'images/write.svg';

import styles from './Manual.module.scss';

const WriteAnimation = lazy(
  () => import('components/animations/WriteAnimation/WriteAnimation'),
);

const BackupManual = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();

  const { mnemonic } = useAppSelector((state) => state.scw);

  return (
    <Page>
      <BackButton />
      <div className={themeClassName('root')}>
        <Suspense fallback={<WriteSVG className={themeClassName('media')} />}>
          <WriteAnimation className={themeClassName('media')} />
        </Suspense>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.backup.manual.your_recovery_phrase')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular', color: 'hint' }}
        >
          {t('scw.backup.manual.write_down_words')}
        </Text>
        <MnemonicDisplay mnemonic={mnemonic} />
      </div>
      <MainButton
        data-testid="tgcrawl"
        onClick={() => {
          navigate(routePaths.SCW_BACKUP_TEST, { replace: true });
        }}
        text={t('common.continue')}
      />
    </Page>
  );
};

export default memo(BackupManual);
