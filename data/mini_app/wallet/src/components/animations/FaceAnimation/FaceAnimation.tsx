import Lottie from 'lottie-react';
import { FC } from 'react';

import FaceAnimationData from './face.json';

const FaceAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      className={className}
      alt="face"
      animationData={FaceAnimationData}
    />
  );
};

export default FaceAnimation;
