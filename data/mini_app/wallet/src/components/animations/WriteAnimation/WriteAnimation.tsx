import Lottie from 'lottie-react';
import { CSSProperties, FC } from 'react';

import WriteAnimationData from './write.json';

const WriteAnimation: FC<{ className?: string; style?: CSSProperties }> = ({
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      <Lottie loop alt="write" animationData={WriteAnimationData} />
    </div>
  );
};

export default WriteAnimation;
