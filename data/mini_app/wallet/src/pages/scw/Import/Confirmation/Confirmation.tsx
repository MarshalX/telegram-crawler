import cn from 'classnames';
import { useActiveSCWAddress } from 'query/scw/address';
import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import AddressDisplay from 'containers/scw/AddressDisplay/AddressDisplay';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { getFriendlyAddress } from 'utils/scw/ton';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WriteSVG } from 'images/write.svg';

import styles from './Confirmation.module.scss';

const WriteAnimation = lazy(
  () => import('components/animations/WriteAnimation/WriteAnimation'),
);

const Confirmation = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();

  const scwAddress = useActiveSCWAddress();
  const friendlyAddress = scwAddress
    ? getFriendlyAddress(scwAddress)
    : undefined;

  return (
    <Page>
      <BackButton />
      <div className={themeClassName('root')}>
        <Suspense
          fallback={<WriteSVG className={cn(themeClassName('media'))} />}
        >
          <WriteAnimation className={cn(themeClassName('media'))} />
        </Suspense>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.import.choose_method.manually_title')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular', color: 'hint' }}
        >
          {t('scw.import.wallet.description')}
        </Text>
        {!!friendlyAddress && <AddressDisplay address={friendlyAddress} />}
      </div>
      <BottomContent className={themeClassName('bottom')}>
        <ActionButton
          data-testid="tgcrawl"
          stretched
          size="medium"
          onClick={() =>
            navigate(routePaths.SWC_IMPORT_MNEMONIC, { replace: true })
          }
          className={styles.button}
        >
          {t('scw.import.wallet.main_button')}
        </ActionButton>
        <ActionButton
          data-testid="tgcrawl"
          size="medium"
          stretched
          mode="transparent"
          onClick={() =>
            navigate(routePaths.SWC_IMPORT_FAILED, { replace: true })
          }
          className={styles.button}
        >
          {t('scw.import.wallet.secondary_button')}
        </ActionButton>
      </BottomContent>
    </Page>
  );
};

export default memo(Confirmation);
