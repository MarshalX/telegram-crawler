import classNames from 'classnames';
import {
  AllHTMLAttributes,
  ComponentType,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Tappable.module.scss';
import { useTapHighlight } from './useTapHighlight';

interface TappableProps {
  rootClassName?: string;
  className?: string;
  children?: ReactNode;
  mode?: 'overlay' | 'opacity';
  // Padding in px or array of paddings in px for outer tap area
  tapAreaSpace?: number | number[];
  'data-testid'?: string;
}

type Props<P = AllHTMLAttributes<HTMLElement>> = TappableProps &
  P & {
    Component: ComponentType<P> | keyof JSX.IntrinsicElements;
  };

const Tappable = forwardRef<JSX.Element, Props>(
  (
    {
      children,
      Component,
      className,
      rootClassName,
      mode = 'overlay',
      disabled,
      tapAreaSpace = 0,
      ...restProps
    },
    ref,
  ): JSX.Element => {
    const { theme, themeClassName } = useTheme(styles);

    const [tapped, tappedHandlers, tappedClassNames] = useTapHighlight({
      mode,
      disabled,
      onTap: ({ target, clientX, clientY }) => {
        if (theme === 'material' && target) {
          const { x, y, width, height } = target.getBoundingClientRect();
          const size = Math.max(width * 2, height * 2);
          setRipples({
            ...ripples,
            [`${Number(new Date())}`]: [
              clientX - x - size / 2,
              clientY - y - size / 2,
              size,
            ],
          });
        }
      },
    });

    const tapAreaPaddings = useMemo(
      () => ({
        paddingInline: Array.isArray(tapAreaSpace)
          ? tapAreaSpace[0]
          : tapAreaSpace,
        paddingBlock: Array.isArray(tapAreaSpace)
          ? tapAreaSpace[1]
          : tapAreaSpace,
      }),
      [tapAreaSpace],
    );

    const [ripples, setRipples] = useState<
      Record<string, [number, number, number]>
    >({});

    return (
      // eslint-disable-next-line
      // @ts-ignore
      <Component
        // eslint-disable-next-line
        // @ts-ignore
        {...restProps}
        {...tappedHandlers}
        disabled={disabled}
        className={classNames(
          themeClassName('root'),
          rootClassName,
          !tapAreaSpace && mode === 'opacity' && tappedClassNames,
        )}
        ref={ref}
      >
        <div className={classNames(themeClassName('container'), className)}>
          {children}
        </div>
        {tapAreaSpace !== 0 && (
          <div className={themeClassName('tapArea')} style={tapAreaPaddings} />
        )}
        {theme === 'apple' && mode === 'overlay' && (
          <div
            className={classNames(themeClassName('fade'), tappedClassNames)}
          />
        )}
        {theme === 'material' && (
          <div className={styles.ripples}>
            {Object.entries(ripples).map(([id, value]) => {
              return (
                <span
                  onAnimationEnd={() => {
                    if (!tapped) {
                      const ripplesCopy = { ...ripples };
                      delete ripplesCopy[id];
                      setRipples(ripplesCopy);
                    }
                  }}
                  key={id}
                  className={classNames(styles.ripple, tapped && styles.tapped)}
                  style={{
                    left: value[0],
                    top: value[1],
                    width: value[2],
                    height: value[2],
                  }}
                />
              );
            })}
          </div>
        )}
      </Component>
    );
  },
);

export default Tappable;
