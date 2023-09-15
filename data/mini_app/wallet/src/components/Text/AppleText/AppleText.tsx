import classNames from 'classnames';
import { CSSProperties, ReactElement, ReactNode, createElement } from 'react';

import { TextColorsType } from 'types/text';
import { EmptyObject } from 'types/utility';

import tStyles from '../Text.module.scss';
import styles from './AppleText.module.scss';

export type AppleVariants =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subheadline1'
  | 'subheadline2'
  | 'footnote'
  | 'caption1'
  | 'caption2';

export type AppleVariantAttributes = {
  title1: { rounded?: boolean };
  title2: { weight: 'regular' | 'semibold' };
  title3: { weight: 'regular' | 'bold'; rounded?: boolean };
  headline: { weight: 'semibold' };
  body: { weight: 'regular' | 'medium' | 'semibold' | 'mono' };
  callout: { weight: 'regular' | 'medium' | 'semibold' };
  subheadline1: { weight: 'regular' | 'semibold'; rounded?: boolean };
  subheadline2: { weight: 'regular' | 'semibold'; rounded?: boolean };
  footnote: { caps?: boolean };
  caption1: EmptyObject;
  caption2: { weight: 'regular' | 'medium' };
};

export function AppleText<
  C extends keyof JSX.IntrinsicElements,
  V extends AppleVariants = AppleVariants,
>({
  Component,
  style,
  skeletonWidth,
  skeleton,
  children,
  ...props
}: { variant: V } & AppleVariantAttributes[V] & {
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
        'caps' in props && styles.caps,
        'rounded' in props && styles.rounded,
        'align' in props && tStyles[props.align as string],
        props.className,
      ),
    },
    skeleton ? <div className={tStyles.skeleton} /> : children,
  );
}
