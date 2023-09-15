import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as NotebookSVG } from 'images/notebook.svg';

import styles from './Confirmation.module.scss';

const NotebookAnimation = lazy(
  () => import('components/animations/NotebookAnimation/NotebookAnimation'),
);

const Confirmation = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const nextLevel = useAppSelector((state) => state.kyc.nextLevel);
  const { featureFlags } = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();

  const backPath = searchParams.get('backPath');

  const handleClick = () => {
    navigate(routePaths.KYC_SUMSUB);
  };

  return (
    <Page>
      <BackButton
        onClick={() => {
          if (!featureFlags.kyc) {
            navigate(routePaths.MAIN);
            return;
          }

          if (backPath) {
            navigate({
              pathname: backPath,
              search: createSearchParams({
                backPath: routePaths.MAIN,
              }).toString(),
            });
          } else {
            window.history.back();
          }
        }}
      />
      <div className={styles.root}>
        <Suspense
          fallback={<NotebookSVG className={themeClassName('media')} />}
        >
          <NotebookAnimation className={themeClassName('media')} />
        </Suspense>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          align="center"
        >
          {t(`kyc.verification.${nextLevel}.title`)}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular' }}
          align="center"
        >
          {t(`kyc.verification.${nextLevel}.description`)}
        </Text>

        <Text
          apple={{ variant: 'body', color: 'hint', weight: 'regular' }}
          material={{ variant: 'body', color: 'hint', weight: 'regular' }}
          align="center"
        >
          {t(`kyc.verification.${nextLevel}.sub_description`)}
        </Text>
      </div>

      <MainButton text={t('kyc.verification.button')} onClick={handleClick} />
    </Page>
  );
};

export default Confirmation;
