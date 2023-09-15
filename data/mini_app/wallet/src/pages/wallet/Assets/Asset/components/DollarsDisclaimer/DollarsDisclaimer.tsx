import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DollarsModalTrigger } from 'containers/wallet/DollarsModal/DollarsModalTrigger';

import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { PageCard } from 'components/PageCard/PageCard';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './DollarsDisclaimer.module.scss';

export const DollarsDisclaimer: FC<{
  hasIcon?: boolean;
  hasLink?: boolean;
}> = ({ hasIcon, hasLink }) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();

  return (
    <PageCard>
      <div className={themeClassName('root')}>
        {hasIcon && (
          <CurrencyLogo
            currency="USDT"
            style={{ width: 72, height: 72 }}
            className={styles.logo}
          />
        )}
        <Text
          apple={{ variant: 'body', weight: 'semibold' }}
          material={{ variant: 'headline7' }}
          className={styles.title}
        >
          {t('asset.dollars_disclaimer.title')}
        </Text>
        <Text
          apple={{ variant: 'footnote' }}
          material={{ variant: 'subtitle1' }}
          className={styles.text}
        >
          {t('asset.dollars_disclaimer.text')}
        </Text>
        {hasLink && (
          <DollarsModalTrigger>
            <Text
              apple={{ variant: 'footnote', color: 'link' }}
              material={{ variant: 'subtitle1', color: 'link' }}
            >
              {t('asset.dollars_disclaimer.learn_more')}
            </Text>
          </DollarsModalTrigger>
        )}
      </div>
    </PageCard>
  );
};
