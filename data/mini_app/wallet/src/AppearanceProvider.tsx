import { FC, createContext, useEffect, useMemo, useState } from 'react';

import { hexToRgb } from 'utils/common/color';
import { isIOS, isLinux, isMacos, isWindows } from 'utils/common/common';
import { setCSSVariable } from 'utils/common/css';

const WebApp = window.Telegram.WebApp;

let resolvedTheme: 'apple' | 'material';

if (WebApp.platform) {
  resolvedTheme =
    WebApp.platform === 'macos' || WebApp.platform === 'ios'
      ? 'apple'
      : 'material';
} else if (isIOS() || isMacos()) {
  resolvedTheme = 'apple';
} else {
  resolvedTheme = 'material';
}

function setOwnCssVariables() {
  if (WebApp.themeParams.button_color) {
    setCSSVariable(
      document.documentElement,
      'second-button-color',
      hexToRgb({
        hex: WebApp.themeParams.button_color,
        opacity: 0.1,
      }) as string,
    );
  }

  if (WebApp.themeParams.text_color) {
    setCSSVariable(
      document.documentElement,
      'monochrome-overlay-color',
      hexToRgb({
        hex: WebApp.themeParams.text_color,
        opacity: 0.12,
      }) as string,
    );
  }

  if (WebApp.themeParams.hint_color) {
    setCSSVariable(
      document.documentElement,
      'skeleton-color',
      hexToRgb({
        hex: WebApp.themeParams.hint_color,
        opacity: 0.16,
      }) as string,
    );
  }

  if (WebApp.themeParams.bg_color) {
    setCSSVariable(
      document.documentElement,
      'tg-theme-bg-color-rgb',
      hexToRgb({
        hex: WebApp.themeParams.bg_color,
        asArray: true,
      }) as string,
    );
  }
}

setOwnCssVariables();

export const AppearanceContext = createContext<{
  theme: 'apple' | 'material';
  colorScheme: 'light' | 'dark';
}>({
  colorScheme: WebApp.colorScheme,
  theme: resolvedTheme,
});

export const AppearanceProvider: FC<{ theme?: 'apple' | 'material' }> = ({
  children,
  theme = resolvedTheme,
}) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    WebApp.colorScheme,
  );

  useEffect(() => {
    document.body.classList.add(theme);
    if (isMacos() || isWindows() || isLinux()) {
      document.body.classList.add('desktop');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    WebApp.onEvent('themeChanged', () => {
      setOwnCssVariables();
      setColorScheme(WebApp.colorScheme);
    });
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  const value = useMemo(() => {
    return {
      theme,
      colorScheme,
    };
  }, [colorScheme, theme]);

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
};
