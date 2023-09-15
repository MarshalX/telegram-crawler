import classNames from 'classnames';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { FC, useEffect, useRef } from 'react';

import styles from './BoomstickAnimation.module.scss';
import BoomstickAnimationData from './boomstick.json';
import ConfettiAnimationData from './confetti.json';

const BoomstickAnimation: FC<{ className?: string }> = ({ className }) => {
  const confettiRef = useRef<LottieRefCurrentProps>(null);
  const boomstickRef = useRef<LottieRefCurrentProps>(null);
  const confettiDelay = 1200;

  useEffect(() => {
    play();
  }, []);

  const play = () => {
    boomstickRef.current?.goToAndPlay(0);
    setTimeout(() => {
      confettiRef.current?.goToAndPlay(0);
    }, confettiDelay);
  };

  return (
    <div
      className={classNames(styles.root, className)}
      onClick={() => {
        play();
      }}
    >
      <Lottie
        lottieRef={confettiRef}
        className={styles.confetti}
        animationData={ConfettiAnimationData}
        autoplay={false}
        loop={false}
      />
      <Lottie
        autoplay={false}
        loop={false}
        lottieRef={boomstickRef}
        alt="boomstick"
        className={styles.boomstick}
        animationData={BoomstickAnimationData}
      />
    </div>
  );
};

export default BoomstickAnimation;
