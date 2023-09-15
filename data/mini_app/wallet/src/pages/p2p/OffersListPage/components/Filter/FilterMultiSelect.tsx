import cn from 'classnames';
import * as React from 'react';

import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowsSVG } from 'images/arrows_vertical.svg';

import styles from './Filter.module.scss';

interface Props {
  label: string;
  value: string;
  onClick: () => void;
  className?: string;
}

const FilterMultiSelect: React.FC<Props> = ({
  label,
  value,
  onClick,
  className,
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <Tappable
      onClick={onClick}
      Component="button"
      rootClassName={cn(styles.root, className)}
      className={styles.rootContent}
    >
      <div>
        <div className={themeClassName('label')}>{label}</div>
        <div className={themeClassName('value')}>{value}</div>
      </div>
      <ArrowsSVG className={themeClassName('arrows')} />
    </Tappable>
  );
};

export default FilterMultiSelect;
