import classNames from 'classnames';
import { useEffect } from 'react';

import styles from './BackgroundBlur.module.scss';

type BackgroundBlurProps = {
  active?: boolean;
  timeout?: number;
};

export const BackgroundBlur: React.FC<BackgroundBlurProps> = ({
  active,
  timeout = 0,
}) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--blur-animation-duration',
      `${timeout}ms`,
    );
  }, [timeout]);

  return (
    <div
      className={classNames(styles.backgroundBlur, active && styles.active)}
      style={{ background: document.documentElement.style.background }}
    />
  );
};
