import classNames from 'classnames';
import { CSSProperties } from 'react';

import styles from './PageControl.module.scss';

export type TPageControl = {
  activeIndex?: number;
  count?: number;
  platter?: boolean;
  type?: 'regular' | 'progress';
  durationTime?: number;
};

export const PageControl: React.FC<TPageControl> = ({
  activeIndex,
  count = 0,
  type = 'regular',
  platter = false,
  durationTime = 2000,
}) => {
  return (
    <>
      {count && (
        <div
          className={classNames(styles.root, platter && styles.platter)}
          style={
            {
              ['--page-control-duration-time']: `${durationTime + 1000}ms`,
            } as CSSProperties
          }
        >
          {[...Array(count)].map((_, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  styles.container,
                  activeIndex === index && type === 'progress' && styles.active,
                )}
              >
                <div className={styles.back} />
                <div
                  className={classNames(
                    styles.dot,
                    styles[type],
                    activeIndex === index && styles.active,
                  )}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
