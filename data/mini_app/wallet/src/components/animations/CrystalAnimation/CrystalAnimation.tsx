import Lottie from 'lottie-react';
import { CSSProperties, FC } from 'react';

import CrystalAnimationData from './crystal.json';

const CrystalAnimation: FC<{ className?: string; style?: CSSProperties }> = ({
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      <Lottie loop alt="crystal" animationData={CrystalAnimationData} />
    </div>
  );
};

export default CrystalAnimation;
