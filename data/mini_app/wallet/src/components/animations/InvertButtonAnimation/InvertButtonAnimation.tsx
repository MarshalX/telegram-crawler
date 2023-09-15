import classNames from 'classnames';
import Lottie, { LottieRef } from 'lottie-react';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './InvertButtonAnimation.module.scss';
import InvertButtonAnimationData from './invert_button.json';

interface InvertButtonAnimationProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  lottieRef?: LottieRef;
  'data-testid'?: string;
}

const InvertButtonAnimation: FC<InvertButtonAnimationProps> = ({
  className,
  lottieRef,
  onClick,
  'data-testid': dataTestId,
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.root, className)}
      onClick={onClick}
      data-testid={dataTestId}
    >
      <Lottie
        lottieRef={lottieRef}
        className={styles.lottie}
        loop={false}
        alt="invert"
        animationData={InvertButtonAnimationData}
      />
    </button>
  );
};

export default InvertButtonAnimation;
