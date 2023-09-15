import Lottie from 'lottie-react';
import { FC } from 'react';

import styles from './FeaturesAnimation.module.scss';
import bunny from './bunny.json';
import shield from './shield.json';
import stars from './stars.json';
import { FeaturesAnimationFeature } from './types';

const ANIMATION_DATA: {
  // Comment any to avoid typescript errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in FeaturesAnimationFeature]: any;
} = {
  transactions: bunny,
  crypto: stars,
  security: shield,
  // TODO: add animation for it https://wallet-bot.atlassian.net/browse/WAL-1103
  flexibility: null,
};

const FeaturesAnimation: FC<{
  feature: FeaturesAnimationFeature;
}> = ({ feature }) => {
  if (!ANIMATION_DATA[feature]) return null;

  return (
    <Lottie
      className={styles.root}
      autoplay
      animationData={ANIMATION_DATA[feature]}
      loop={false}
    />
  );
};

export default FeaturesAnimation;
