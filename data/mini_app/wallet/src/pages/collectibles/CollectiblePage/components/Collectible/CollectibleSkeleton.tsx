import { FC } from 'react';

import ActionButton from 'components/ActionButton/ActionButton';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { Media } from '../../../components/Media/Media';
import { Group } from '../Group/Group';
import styles from './Collectible.module.scss';

const CollectibleSkeleton: FC = () => {
  const { themeClassName } = useTheme(styles);
  return (
    <div className={styles.root}>
      <div className={themeClassName('content')}>
        <Media className={styles.contentMedia} />
      </div>
      <Group skeleton>
        <div className={themeClassName('top')}>
          <div className={themeClassName('topLeft')}>
            <div className={themeClassName('collection')}>
              <div className={themeClassName('collectionLeft')}>
                <Media
                  className={themeClassName('collectionMedia')}
                  onlyPreview
                />
              </div>
              <div className={styles.collectionRight}>
                <Text
                  skeleton
                  skeletonWidth={148}
                  className={styles.collectionNameText}
                  apple={{ variant: 'body', weight: 'regular', color: 'text' }}
                  material={{ variant: 'subtitle1', color: 'text' }}
                />
              </div>
            </div>
            <div className={styles.name}>
              <Text
                skeleton
                skeletonWidth={118}
                apple={{ variant: 'title1', color: 'text' }}
                material={{
                  variant: 'headline5',
                  color: 'text',
                }}
              />
            </div>
          </div>
          <div className={themeClassName('topRight')}></div>
        </div>
        <div className={themeClassName('actions')}>
          <ActionButton icon skeleton stretched layout="horizontal" />
        </div>
      </Group>
      <Group skeleton header>
        <div className={themeClassName('description')}>
          <Text
            skeleton
            skeletonWidth={283}
            apple={{ variant: 'callout', weight: 'regular', color: 'text' }}
            material={{ variant: 'subtitle1', color: 'text' }}
          />
          <Text
            skeleton
            skeletonWidth={178}
            apple={{ variant: 'callout', weight: 'regular', color: 'text' }}
            material={{ variant: 'subtitle1', color: 'text' }}
          />
          <Text
            skeleton
            skeletonWidth={100}
            apple={{ variant: 'callout', weight: 'regular', color: 'text' }}
            material={{ variant: 'subtitle1', color: 'text' }}
          />
        </div>
      </Group>
    </div>
  );
};

export default CollectibleSkeleton;
