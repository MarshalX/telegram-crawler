import { FC, Fragment, useEffect } from 'react';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

interface PageProps {
  mode?: 'primary' | 'secondary';
  expandOnMount?: boolean;
  headerColor?: string;
}

const {
  setHeaderColor,
  setBackgroundColor,
  themeParams,
  isVersionAtLeast,
  platform,
} = window.Telegram.WebApp;

const Page: FC<PageProps> = ({
  children,
  mode = 'primary',
  expandOnMount = false,
  headerColor,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (expandOnMount) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  useEffect(() => {
    const backgroundColor =
      mode === 'primary'
        ? themeParams.bg_color
        : themeParams.secondary_bg_color || '#efefef'; // TODO Хак для клиента на Windows, в который пока не завезли secondary-bg-color. Выпилить, когда завезут
    try {
      setBackgroundColor(backgroundColor);
      if (isVersionAtLeast('6.9') && platform === 'ios') {
        setHeaderColor(
          headerColor
            ? headerColor
            : theme === 'material' || mode === 'primary'
            ? 'bg_color'
            : 'secondary_bg_color',
        );
      } else {
        setHeaderColor(
          theme === 'material' ? themeParams.bg_color : backgroundColor,
        );
      }
    } catch (e) {
      console.error(e);
    }

    document.documentElement.style.setProperty('background', backgroundColor);
  }, [mode, colorScheme, theme]);

  return <Fragment>{children}</Fragment>;
};

export default Page;
