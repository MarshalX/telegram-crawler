import classNames from 'classnames';
import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Currency.module.scss';
import { ReactComponent as CurrencyChevronSVG } from './chevron.svg';

type CurrencyProps = {
  children?: ReactNode;
  size?: 'small' | 'medium';
  className?: string;
  style?: CSSProperties;
  chevron?: boolean;
};

export const Currency: FC<CurrencyProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  size = 'medium',
  className,
  style,
  chevron,
  ...restProps
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div
      className={classNames(
        themeClassName('root'),
        styles[size],
        className,
        chevron && styles.hasChevron,
      )}
      style={style}
      {...restProps}
    >
      {children}
      {chevron && <CurrencyChevronSVG className={themeClassName('arrow')} />}
    </div>
  );
};
