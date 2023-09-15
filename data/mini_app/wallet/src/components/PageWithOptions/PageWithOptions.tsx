import { FC, ReactNode } from 'react';

import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './PageWithOptions.module.scss';

export const PageWithOptions: FC<{
  backButton?: ReactNode;
  title: ReactNode;
}> = ({ backButton, title, children }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <Page expandOnMount mode="secondary">
      {backButton}
      <Text
        apple={{ variant: 'title1' }}
        material={{ variant: 'headline5' }}
        align="center"
        className={themeClassName('title')}
      >
        {title}
      </Text>
      <div className={themeClassName('options')}>{children}</div>
    </Page>
  );
};
