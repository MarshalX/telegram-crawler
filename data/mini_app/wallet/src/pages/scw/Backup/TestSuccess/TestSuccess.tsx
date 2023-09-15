import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import SCWProfileDisplay from 'containers/scw/ProfileDisplay/ProfileDisplay';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './TestSuccess.module.scss';

const TestSuccess = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();

  return (
    <Page>
      <BackButton
        onClick={() => {
          navigate(routePaths.MAIN, { replace: true });
        }}
      />
      <>
        <div className={themeClassName('root')}>
          <SCWProfileDisplay />
          <div className={themeClassName('content')}>
            <Text
              style={{ marginInline: 32 }}
              apple={{ variant: 'title1' }}
              material={{ variant: 'headline5' }}
            >
              {t('scw.backup.test_success.title')}
            </Text>
            <Text
              style={{ marginInline: 32, marginBlock: 12 }}
              apple={{ variant: 'body', weight: 'regular' }}
              material={{ variant: 'body', weight: 'regular' }}
            >
              {t('scw.backup.test_success.description')}
            </Text>
          </div>
        </div>
        <BottomContent className={themeClassName('bottom')}>
          <ActionButton
            data-testid="tgcrawl"
            stretched
            size="medium"
            shiny
            onClick={() => {
              navigate(routePaths.SCW_MAIN);
            }}
            className={styles.button}
          >
            {t('scw.open_ton_space')}
          </ActionButton>
        </BottomContent>
      </>
    </Page>
  );
};

export default memo(TestSuccess);
