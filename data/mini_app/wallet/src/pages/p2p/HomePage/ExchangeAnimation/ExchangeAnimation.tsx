import Lottie from 'lottie-react';
import { FC } from 'react';

import ExchangeAnimationData from './market.json';

const ExchangeAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      className={className}
      alt="market"
      animationData={ExchangeAnimationData}
    />
  );
};

export default ExchangeAnimation;
