import Lottie from 'lottie-react';
import { FC } from 'react';

import LoadingDuckAnimationData from './loadingDuck.json';

const LoadingDuckAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      className={className}
      alt="loading"
      animationData={LoadingDuckAnimationData}
    />
  );
};

export default LoadingDuckAnimation;
