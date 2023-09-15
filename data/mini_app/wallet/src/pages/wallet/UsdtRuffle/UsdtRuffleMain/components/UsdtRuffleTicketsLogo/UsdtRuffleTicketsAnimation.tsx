import classNames from 'classnames';
import Lottie from 'lottie-react';
import { CSSProperties, FC } from 'react';

import ticketsAnimationData from './tickets.json';

const UsdtRuffleTicketsAnimation: FC<{
  className?: string;
  style?: CSSProperties;
}> = ({ className, style }) => {
  return (
    <div className={classNames(className)} style={style}>
      <Lottie
        loop={false}
        alt="attachments"
        animationData={ticketsAnimationData}
      />
    </div>
  );
};

export default UsdtRuffleTicketsAnimation;
