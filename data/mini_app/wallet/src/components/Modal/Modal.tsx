import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Modal.module.scss';
import { ReactComponent as CloseSVG } from './close.svg';

const containerAnimationFrames = [
  {
    transform: 'translateY(100%)',
  },
  {
    transform: 'translateY(0)',
  },
];

const overlayAnimationFrames = [
  {
    opacity: 0,
  },
  {
    opacity: 0.5,
  },
];

const animationOptions: KeyframeAnimationOptions = {
  duration: 350,
  fill: 'forwards',
  easing: 'ease',
};

interface Props {
  onClose: VoidFunction;
  title?: string;
  mode?: 'primary' | 'secondary';
}

export const Modal: FC<Props> = ({
  children,
  onClose: onCloseCallback,
  title,
  mode = 'primary',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { themeClassName } = useTheme(styles);

  const onClose = () => {
    if (containerRef.current && overlayRef.current) {
      const containerAnimation = containerRef.current.animate(
        [...containerAnimationFrames].reverse(),
        animationOptions,
      );

      overlayRef.current
        .animate([...overlayAnimationFrames].reverse(), animationOptions)
        .play();

      containerAnimation.addEventListener('finish', onCloseCallback);
      containerAnimation.play();
    }
  };

  useEffect(() => {
    if (containerRef.current && overlayRef.current) {
      containerRef.current
        .animate(containerAnimationFrames, animationOptions)
        .play();

      overlayRef.current
        .animate(overlayAnimationFrames, animationOptions)
        .play();
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onClose} ref={overlayRef} />
      <div
        className={cn(styles.container, title && styles.containerWithTitle, {
          [styles.bgPrimary]: mode === 'primary',
          [styles.bgSecondary]: mode === 'secondary',
        })}
        ref={containerRef}
      >
        {title && (
          <Text
            apple={{
              variant: 'title3',
              weight: 'bold',
            }}
            material={{
              variant: 'headline6',
            }}
            className={themeClassName('title')}
          >
            {title}
          </Text>
        )}
        <button className={styles.close} onClick={onClose}>
          <CloseSVG />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
