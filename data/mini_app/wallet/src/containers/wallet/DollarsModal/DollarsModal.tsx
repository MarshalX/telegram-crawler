import { FC, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { MainButton } from 'components/MainButton/MainButton';
import { Modal } from 'components/Modal/Modal';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BuySVG } from 'images/buy.svg';
import { ReactComponent as ConnectedPeopleSVG } from 'images/connected_people.svg';
import { ReactComponent as DollarsSVG } from 'images/dollars.svg';

import styles from './DollarsModal.module.scss';

const UsdtAppearance = lazy(
  () => import('components/CurrencyLogo/Appearance/UsdtAppearance'),
);

export const DollarsModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <Suspense
        fallback={
          <CurrencyLogo
            className={styles.logo}
            currency="USDT"
            variant="simple"
          />
        }
      >
        <UsdtAppearance loop variant="simple" className={styles.logo} />
      </Suspense>
      <Text
        apple={{ variant: 'body', weight: 'semibold' }}
        material={{ variant: 'headline7' }}
        className={styles.title}
      >
        {t('dollars_modal.title')}
      </Text>
      <Text
        apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
        material={{ variant: 'subtitle1', color: 'hint' }}
        className={styles.text}
      >
        {t('dollars_modal.text')}
      </Text>
      <div className={themeClassName('bullets')}>
        <div className={styles.bullet}>
          <DollarsSVG className={styles.icon} />
          <div className={styles.bulletContent}>
            <Text
              apple={{ variant: 'callout', weight: 'semibold' }}
              material={{ variant: 'button1' }}
            >
              {t('dollars_modal.stable_title')}
            </Text>
            <Text
              apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
              material={{ variant: 'subtitle1', color: 'hint' }}
            >
              {t('dollars_modal.stable_text')}
            </Text>
          </div>
        </div>
        <div className={styles.bullet}>
          <BuySVG className={styles.icon} />
          <div className={styles.bulletContent}>
            <Text
              apple={{ variant: 'callout', weight: 'semibold' }}
              material={{ variant: 'button1' }}
            >
              {t('dollars_modal.easy_top_up_title')}
            </Text>
            <Text
              apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
              material={{ variant: 'subtitle1', color: 'hint' }}
            >
              {t('dollars_modal.easy_top_up_text')}
            </Text>
          </div>
        </div>
        <div className={styles.bullet}>
          <ConnectedPeopleSVG className={styles.icon} />
          <div className={styles.bulletContent}>
            <Text
              apple={{ variant: 'callout', weight: 'semibold' }}
              material={{ variant: 'button1' }}
            >
              {t('dollars_modal.universal_title')}
            </Text>
            <Text
              apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
              material={{ variant: 'subtitle1', color: 'hint' }}
            >
              {t('dollars_modal.universal_text')}
            </Text>
          </div>
        </div>
      </div>
      <MainButton onClick={onClose} text={t('dollars_modal.got_it')} />
    </Modal>
  );
};
