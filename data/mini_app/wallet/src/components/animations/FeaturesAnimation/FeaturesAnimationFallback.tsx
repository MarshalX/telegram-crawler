import { FC } from 'react';

import styles from './FeaturesAnimation.module.scss';
import { ReactComponent as BunnyV2SVG } from './bunny2.svg';
import { ReactComponent as BunnySVG } from './bunny.svg';
import { ReactComponent as CardV2SVG } from './card2.svg';
import { ReactComponent as CardSVG } from './card.svg';
import { ReactComponent as ShieldV2SVG } from './shield2.svg';
import { ReactComponent as ShieldSVG } from './shield.svg';
import { ReactComponent as StarsSVG } from './stars.svg';
import { FeaturesAnimationFeature } from './types';

const ICONS: {
  [key in FeaturesAnimationFeature]: FC;
} = {
  transactions: BunnySVG,
  crypto: StarsSVG,
  security: ShieldSVG,
  flexibility: CardSVG,
};

const ICONS_V2: {
  [key in FeaturesAnimationFeature]: FC;
} = {
  transactions: BunnyV2SVG,
  crypto: StarsSVG,
  security: ShieldV2SVG,
  flexibility: CardV2SVG,
};

export const FeaturesAnimationFallback: FC<{
  feature: FeaturesAnimationFeature;
  // TODO: temp solution, remove after animation will be added by Design Team
  v2?: boolean;
}> = ({ feature, v2 }) => {
  const Icon = v2 ? ICONS_V2[feature] : ICONS[feature];

  return (
    <div className={styles.root}>
      <Icon />
    </div>
  );
};
