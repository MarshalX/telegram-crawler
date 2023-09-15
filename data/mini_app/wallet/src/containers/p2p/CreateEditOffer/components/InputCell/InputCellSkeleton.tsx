import classNames from 'classnames';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './InputCell.module.scss';

const InputCellSkeleton = () => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={classNames(themeClassName('container'), styles.skeleton)}>
      <div className={themeClassName('content')}>
        <div className={themeClassName('children')} />
      </div>
    </div>
  );
};

export default InputCellSkeleton;
