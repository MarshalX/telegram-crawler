import Lottie from 'lottie-react';
import { FC } from 'react';

import IdCardAnimationData from './idCard.json';

const IdCardAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      loop={false}
      className={className}
      animationData={IdCardAnimationData}
    />
  );
};

export default IdCardAnimation;
