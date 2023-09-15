import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ContentWrap.module.scss';

export const ContentWrap: FC = ({ children }) => {
  const { themeClassName } = useTheme(styles);
  return <section className={themeClassName('root')}>{children}</section>;
};
