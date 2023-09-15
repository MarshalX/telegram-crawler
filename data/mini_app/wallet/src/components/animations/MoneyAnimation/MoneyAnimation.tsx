import Lottie from 'lottie-react';
import { FC } from 'react';

import MoneyAnimationData from './money.json';

const MoneyAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      className={className}
      alt="money"
      animationData={MoneyAnimationData}
    />
  );
};

export default MoneyAnimation;
