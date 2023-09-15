import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';

import { AmountProps } from 'containers/common/Amount/Amount';

import FitTextRow from 'components/FitTextRow/FitTextRow';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Amount.module.scss';

interface AmountSkeletonProps {
  top?: ReactNode | boolean;
  bottom?: ReactNode | boolean;
  className?: string;
  style?: CSSProperties;
  size?: AmountProps['size'];
  align?: AmountProps['align'];
}

export const AmountSkeleton: FC<AmountSkeletonProps> = ({
  top,
  bottom,
  className,
  style,
  size = 'medium',
  align = 'flex-start',
}) => {
  const { themeClassName } = useTheme(styles);

  const Top = top === true ? <div className={themeClassName('top')} /> : top;
  const Bottom =
    bottom === true ? <div className={themeClassName('bottom')} /> : bottom;

  return (
    <div
      style={style}
      className={classNames(
        themeClassName('root'),
        className,
        styles[size],
        styles.skeleton,
      )}
    >
      {Top}
      <div className={themeClassName('container')}>
        <FitTextRow align={align} className={styles.fitText}>
          <div className={classNames(themeClassName('amount'))} />
        </FitTextRow>
      </div>
      {Bottom}
    </div>
  );
};
