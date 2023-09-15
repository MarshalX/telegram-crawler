import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './HomePage.module.scss';
import { HomePageSkeleton } from './HomePageSkeleton';

const HomePageFallback = () => {
  const { themeClassName } = useTheme(styles);
  return (
    <Page mode="secondary">
      <BackButton />
      <div className={themeClassName('root')}>
        <HomePageSkeleton />
      </div>
    </Page>
  );
};

export { HomePageFallback };
