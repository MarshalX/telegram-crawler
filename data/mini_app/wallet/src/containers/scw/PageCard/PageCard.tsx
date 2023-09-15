import { FC, ReactNode } from 'react';

import { PageCard as PageCardComponent } from 'components/PageCard/PageCard';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './PageCard.module.scss';

export const PageCard: FC<{
  title?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}> = ({ title, aside, children }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <PageCardComponent>
      {title && (
        <div className={themeClassName('header')}>
          <Text
            material={{ variant: 'headline6', color: 'text' }}
            apple={{ variant: 'title3', weight: 'bold', color: 'text' }}
          >
            {title}
          </Text>
          {aside}
        </div>
      )}
      {children}
    </PageCardComponent>
  );
};
