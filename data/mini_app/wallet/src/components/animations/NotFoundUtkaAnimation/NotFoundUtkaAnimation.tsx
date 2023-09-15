import classNames from 'classnames';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { FC, useEffect, useRef } from 'react';

import styles from './NotFoundUtkaAnimation.module.scss';
import animationData from './utka.json';

const NotFoundUtkaAnimation: FC<{ className?: string }> = ({ className }) => {
  const clockRef = useRef<LottieRefCurrentProps>(null);

  const play = () => {
    clockRef.current?.goToAndPlay(0);
  };

  useEffect(() => {
    play();
  }, []);

  return (
    <div className={classNames(styles.root, className)}>
      <Lottie
        lottieRef={clockRef}
        className={styles.svg}
        animationData={animationData}
        autoplay={false}
        loop={false}
      />
    </div>
  );
};

export default NotFoundUtkaAnimation;
