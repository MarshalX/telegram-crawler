import classNames from 'classnames';
import { CSSProperties, ReactElement, ReactNode, createElement } from 'react';

import { TextColorsType } from 'types/text';
import { EmptyObject } from 'types/utility';

import tStyles from '../Text.module.scss';
import styles from './MaterialText.module.scss';

export type MaterialVariants =
  | 'headline5'
  | 'headline6'
  | 'headline7'
  | 'body'
  | 'subtitle1'
  | 'button1'
  | 'subtitle2'
  | 'button2'
  | 'caption1'
  | 'caption2';

export type MaterialVariantAttributes = {
  headline5: EmptyObject;
  headline6: EmptyObject;
  headline7: EmptyObject;
  body: { weight: 'regular' | 'medium' | 'mono' };
  subtitle1: EmptyObject;
  button1: EmptyObject;
  subtitle2: { weight: 'regular' | 'medium' };
  button2: EmptyObject;
  caption1: EmptyObject;
  caption2: { weight: 'regular' | 'medium' };
};

export function MaterialText<
  C extends keyof JSX.IntrinsicElements,
  V extends MaterialVariants = MaterialVariants,
>({
  Component,
  skeleton,
  skeletonWidth,
  style,
  children,
  ...props
}: { variant: V } & MaterialVariantAttributes[V] & {
    children?: ReactNode;
    Component?: C;
    color?: TextColorsType;
    skeleton?: boolean;
    skeletonWidth?: CSSProperties['width'];
    align?: CSSProperties['textAlign'];
  } & Omit<JSX.IntrinsicElements[C], 'color'>): ReactElement | null {
  return createElement(
    Component || 'div',
    {
      ...props,
      style: skeletonWidth ? { ...style, width: skeletonWidth } : style,
      className: classNames(
        styles.root,
        styles[props.variant],
        'weight' in props && styles[props.weight as string],
        props.color && tStyles[props.color],
        'rounded' in props && styles.rounded,
        'align' in props && tStyles[props.align as string],
        props.className,
      ),
    },
    skeleton ? <div className={tStyles.skeleton} /> : children,
  );
}
