import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CollectibleBagdeEnum } from 'api/getGems/generated';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CollectibleBadge.module.scss';

interface CollectibleBadgeProps {
  payload: CollectibleBagdeEnum;
  className?: string;
}

const CollectibleBadge: FC<CollectibleBadgeProps> = ({
  payload,
  className,
}) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  switch (payload) {
    case 'OnSale':
      return (
        <div
          className={classNames(
            themeClassName('root'),
            styles.onSale,
            className,
          )}
        >
          <Text
            apple={{
              variant: 'subheadline1',
              weight: 'semibold',
              rounded: true,
            }}
            material={{ variant: 'subtitle2', weight: 'medium' }}
          >
            {t('collectibles.collectible_page.badge_on_sale').toUpperCase()}
          </Text>
        </div>
      );
    default:
      return ((x: never) => {
        console.warn('Unexpected Collectible badge', x);
        return null;
      })(payload);
  }
};

export default CollectibleBadge;
