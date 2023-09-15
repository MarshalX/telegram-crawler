import { CSSProperties, ReactElement, ReactNode, createElement } from 'react';

import { TextColorsType } from 'types/text';

import { useTheme } from 'hooks/utils/useTheme';

import {
  AppleText,
  AppleVariantAttributes,
  AppleVariants,
} from './AppleText/AppleText';
import {
  MaterialText,
  MaterialVariantAttributes,
  MaterialVariants,
} from './MaterialText/MaterialText';

export function Text<
  C extends keyof JSX.IntrinsicElements,
  AV extends AppleVariants = AppleVariants,
  MV extends MaterialVariants = MaterialVariants,
>({
  Component,
  apple,
  material,
  children,
  ...restProps
}: {
  Component?: C;
  apple: { variant: AV } & AppleVariantAttributes[AV] & {
      color?: TextColorsType;
    };
  material: { variant: MV } & MaterialVariantAttributes[MV] & {
      color?: TextColorsType;
    };
  children?: ReactNode;
  skeleton?: boolean;
  skeletonWidth?: CSSProperties['width'];
  align?: CSSProperties['textAlign'];
} & Omit<JSX.IntrinsicElements[C], 'color'>): ReactElement {
  const theme = useTheme();
  const content = restProps.skeleton ? '' : children;

  switch (theme) {
    case 'apple':
      return createElement(
        AppleText,
        { Component, ...apple, ...restProps },
        content,
      );
    case 'material':
      return createElement(
        MaterialText,
        { Component, ...material, ...restProps },
        content,
      );
  }
}
