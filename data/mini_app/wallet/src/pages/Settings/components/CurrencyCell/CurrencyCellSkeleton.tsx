import classNames from 'classnames';
import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CurrencyCell.module.scss';

const CurrencyCellSkeleton: FC = () => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={classNames(themeClassName('root'), styles.skeleton)}>
      <div className={themeClassName('container')} />
    </div>
  );
};

export default CurrencyCellSkeleton;
