import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

import { Placeholder } from 'components/Placeholder/Placeholder';

import styles from './EmptyTransactions.module.scss';
import { ReactComponent as DuckSVG } from './components/Duck/duck.svg';

const Duck = lazy(() => import('./components/Duck/Duck'));

export const EmptyTransactions = () => {
  const { t } = useTranslation();

  return (
    <Placeholder
      title={t('main.no_history_title')}
      text={t('main.no_history_text')}
      media={
        <Suspense fallback={<DuckSVG width="112" height="112" />}>
          <Duck />
        </Suspense>
      }
      className={styles.root}
    />
  );
};
