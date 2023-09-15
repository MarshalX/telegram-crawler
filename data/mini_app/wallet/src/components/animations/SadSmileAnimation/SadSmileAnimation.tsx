import Lottie from 'lottie-react';
import { FC } from 'react';

import SadSmileAnimationData from './sad.json';

const SadSmileAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      autoplay={true}
      loop={false}
      className={className}
      alt="sad"
      animationData={SadSmileAnimationData}
    />
  );
};

export default SadSmileAnimation;
