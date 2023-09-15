import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';

import SectionHeader from 'components/SectionHeader/SectionHeader';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './PageCard.module.scss';

export const PageCard: FC<{
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ title, action, children, className, style }) => {
  const { themeClassName } = useTheme(styles);
  return (
    <section
      className={classNames(themeClassName('root'), className)}
      style={style}
    >
      {title && (
        <SectionHeader action={action} className={themeClassName('title')}>
          {title}
        </SectionHeader>
      )}
      <div>{children}</div>
    </section>
  );
};
