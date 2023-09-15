import { AppearanceContext } from 'AppearanceProvider';
import classNames from 'classnames';
import { useContext } from 'react';

export function useTheme(): 'apple' | 'material';
export function useTheme<S extends Record<string, string>>(
  styles: S,
): {
  theme: 'apple' | 'material';
  themeClassName: (className: keyof S) => string;
};

export function useTheme<S extends Record<string, string>>(
  styles?: S,
):
  | 'apple'
  | 'material'
  | {
      theme: 'apple' | 'material';
      themeClassName: (className: keyof S) => string;
    } {
  const { theme } = useContext(AppearanceContext);

  if (!styles) {
    return theme;
  }

  return {
    theme,
    themeClassName: function (className: keyof S) {
      return classNames(
        styles[className],
        styles[`${className as string}__${theme}`],
      );
    },
  };
}
