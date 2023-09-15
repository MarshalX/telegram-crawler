import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { FC, memo, useRef, useState } from 'react';

import simpleAnimationData from './dollars_logo.json';
import complexAnimationData from './usdt_logo.json';

const UsdtAppearance: FC<{
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  variant?: 'simple' | 'complex';
}> = ({ className, onComplete, variant = 'simple', loop = false }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [fragment, setFragment] = useState<[number, number]>([30, 55]);
  const [animating, setAnimating] = useState(false);

  return (
    <div
      onClick={() => {
        if (variant === 'simple' && !animating && lottieRef.current && !loop) {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
          lottieRef.current.playSegments(fragment, true);
        }
      }}
    >
      <Lottie
        className={className}
        loop={loop}
        autoplay={variant !== 'simple' || loop}
        alt="logo"
        lottieRef={lottieRef}
        onSegmentStart={() => {
          variant === 'simple' && setAnimating(true);
        }}
        onComplete={() => {
          if (variant === 'simple') {
            if (fragment[0] === 30) {
              setFragment([90, 115]);
            } else {
              setFragment([30, 55]);
            }
            setAnimating(false);
          }
          onComplete && onComplete();
        }}
        animationData={
          variant === 'simple' ? simpleAnimationData : complexAnimationData
        }
      />
    </div>
  );
};

export default memo(UsdtAppearance);
