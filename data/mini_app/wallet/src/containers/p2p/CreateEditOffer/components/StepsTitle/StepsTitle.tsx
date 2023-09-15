import cn from 'classnames';
import { FC } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Skeleton from 'components/Skeleton/Skeleton';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './StepsTitle.module.scss';

const StepsTitle: FC<{
  step?: number;
  title: React.ReactElement | string;
  total?: number;
  className?: string;
  isLoading?: boolean;
}> = ({ step, title, total, className, isLoading }) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);

  return (
    <div className={cn(themeClassName('titleContainer'), className)}>
      <Skeleton
        skeletonShown={isLoading}
        skeleton={
          <div className={styles.skeletonContainer}>
            <div className={cn(themeClassName('title'), styles.hideText)}>
              Title
            </div>
            <div className={themeClassName('skeleton')}></div>
          </div>
        }
      >
        <div className={themeClassName('title')}>{title}</div>
      </Skeleton>
      {typeof step === 'number' && typeof total === 'number' && (
        <div className={themeClassName('progress')}>
          {t('p2p.create_offer_page.steps_progress', {
            step,
            total,
          })}
        </div>
      )}
    </div>
  );
};

export default StepsTitle;
