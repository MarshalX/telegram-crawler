import Lottie from 'lottie-react';
import { FC } from 'react';

import LockAnimationData from './lock.json';

const LockAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      autoplay={true}
      loop={false}
      className={className}
      animationData={LockAnimationData}
    />
  );
};

export default LockAnimation;
