import { FC, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Error.module.scss';

const Error: FC<{ header?: ReactNode; text?: ReactNode }> = ({
  text,
  header,
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {header && <h1 className={themeClassName('header')}>{header}</h1>}
        {text && <p className={themeClassName('text')}>{text}</p>}
      </div>
    </div>
  );
};

export default Error;
