import classNames from 'classnames';
import { AllHTMLAttributes, ReactNode, forwardRef } from 'react';

import Tappable from 'components/Tappable/Tappable';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ActionButton.module.scss';

export interface ActionButtonProps
  extends Omit<AllHTMLAttributes<HTMLElement>, 'size'> {
  mode?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'overlay'
    | 'transparent';
  layout?: 'vertical' | 'horizontal';
  alternative?: boolean;
  size?: 'small' | 'medium';
  stretched?: boolean;
  icon?: ReactNode;
  Component?: keyof JSX.IntrinsicElements;
  shiny?: boolean;
  skeleton?: boolean;
}

const ActionButton = forwardRef<JSX.Element, ActionButtonProps>(
  (
    {
      Component = 'button',
      children,
      mode = 'primary',
      size = 'small',
      icon,
      layout = 'vertical',
      stretched = false,
      shiny = false,
      alternative = false,
      className,
      skeleton = false,
      ...restProps
    },
    ref,
  ) => {
    const { theme, themeClassName } = useTheme(styles);

    return (
      <Tappable
        mode={theme === 'apple' ? 'opacity' : 'overlay'}
        Component={Component}
        rootClassName={classNames(
          themeClassName('root'),
          styles[mode],
          styles[layout],
          styles[size],
          alternative && styles.alternative,
          stretched && styles.stretched,
          shiny && styles.shiny,
          skeleton && styles.skeleton,
          className,
        )}
        className={styles.inner}
        ref={ref}
        {...restProps}
      >
        <div className={classNames(themeClassName('container'))}>
          {icon && <span className={themeClassName('icon')}>{icon}</span>}
          {layout === 'vertical' && (
            <Text
              apple={
                alternative
                  ? {
                      variant: 'subheadline2',
                      rounded: true,
                      weight: 'semibold',
                    }
                  : size === 'medium'
                  ? { variant: 'body', weight: 'semibold' }
                  : { variant: 'caption2', weight: 'medium' }
              }
              material={
                alternative
                  ? { variant: 'subtitle2', weight: 'medium' }
                  : size === 'medium'
                  ? { variant: 'button1' }
                  : { variant: 'caption2', weight: 'medium' }
              }
              className={themeClassName('text')}
              skeleton={skeleton}
            >
              {children}
            </Text>
          )}
          {layout === 'horizontal' && (
            <Text
              apple={{ variant: 'body', weight: 'semibold' }}
              material={{ variant: 'button1' }}
              skeleton={skeleton}
              className={themeClassName('text')}
            >
              {children}
            </Text>
          )}
        </div>
      </Tappable>
    );
  },
);

export default ActionButton;
