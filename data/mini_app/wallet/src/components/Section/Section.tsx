import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';

import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import SectionDescription from 'components/SectionDescription/SectionDescription';

import { useTheme } from 'hooks/utils/useTheme';

import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Section.module.scss';

interface SectionProps {
  className?: string;
  containerClassName?: string;
  separator?: boolean;
  apple?: {
    fill: 'secondary' | 'primary' | 'quaternary';
  };
  material?: {
    descriptionLayout: 'inner' | 'outer';
  };
  title?: ReactNode;
  action?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  skeleton?: boolean;
  'data-testid'?: string;
}

type Props<P = React.AllHTMLAttributes<HTMLElement>> = SectionProps &
  P & {
    Component?: React.ComponentType<P> | keyof JSX.IntrinsicElements;
  };

const Section = forwardRef<HTMLElement, Props>(
  (
    {
      children,
      Component,
      className,
      containerClassName,
      separator,
      apple = { fill: 'primary' },
      material = { descriptionLayout: 'inner' },
      title,
      description,
      'data-testid': testId,
      skeleton,
      action,
    },
    ref,
  ) => {
    const { themeClassName, theme } = useTheme(styles);

    const fill = theme === 'apple' ? apple.fill : undefined;
    const descriptionLayout =
      theme === 'material' ? material.descriptionLayout : undefined;

    const ContentWrapper =
      Component ?? (theme === 'apple' ? InlineLayout : 'div');

    return (
      <section
        className={classNames(
          themeClassName('root'),
          descriptionLayout && styles[descriptionLayout],
          className,
        )}
        ref={ref}
        data-testid={testId}
      >
        <ContentWrapper>
          {title && (
            <SectionHeader className={themeClassName('title')} action={action}>
              {title}
            </SectionHeader>
          )}
          <div
            className={classNames(
              themeClassName('container'),
              fill && styles[fill],
              skeleton && styles.skeleton,
              containerClassName,
            )}
          >
            {children}
          </div>
          {description && (
            <SectionDescription className={themeClassName('description')}>
              {description}
            </SectionDescription>
          )}
        </ContentWrapper>
        {separator && <hr className={themeClassName('separator')} />}
      </section>
    );
  },
);

export default Section;
