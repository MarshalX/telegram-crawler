import Lottie from 'lottie-react';
import { FC } from 'react';

import DuckAnimationData from './duck.json';

const DuckAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      className={className}
      loop
      alt="duck"
      animationData={DuckAnimationData}
    />
  );
};

export default DuckAnimation;
