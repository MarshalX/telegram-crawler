import Lottie from 'lottie-react';
import { forwardRef, memo } from 'react';

import animationData from './btc_logo.json';

const BtcAppearance = forwardRef<
  HTMLDivElement,
  { className?: string; onComplete?: () => void }
>(({ className, onComplete }, ref) => {
  return (
    <div ref={ref}>
      <Lottie
        className={className}
        loop={false}
        alt="logo"
        onComplete={onComplete}
        animationData={animationData}
      />
    </div>
  );
});

export default memo(BtcAppearance);
