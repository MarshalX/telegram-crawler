import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'store';

import { hideBanner } from 'reducers/collectibles/collectibleBannerSlice';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CloseIcon } from 'images/clear_apple.svg';

import styles from './Banner.module.scss';

export const Banner = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const [isHiding, setIsHiding] = useState(false);
  const dispatch = useDispatch();

  const isHidden = useAppSelector((state) => state.collectibleBanner.isHidden);

  const onTransitionEnd = () => {
    setIsHiding(false);
  };

  if (isHidden && !isHiding) {
    return null;
  }

  const onHide = () => {
    setIsHiding(true);
    dispatch(hideBanner());
  };

  return (
    <div
      className={classNames(styles.root, isHiding && styles.hidden)}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={themeClassName('wrapper')}>
        <div className={styles.title}>
          <Text
            apple={{ variant: 'subheadline2', weight: 'semibold' }}
            material={{ variant: 'subtitle2', weight: 'medium' }}
          >
            {t('collectibles.collectible_page.banner_title')}
          </Text>
        </div>
        <div className={styles.description}>
          <Text
            apple={{ variant: 'subheadline2', weight: 'regular' }}
            material={{ variant: 'subtitle2', weight: 'regular' }}
          >
            {t('collectibles.collectible_page.banner_description')}
          </Text>
        </div>
        {/*todo add link when we will know which link must be here*/}
        {/*<div>
          <a
            className={styles.link}
            target="_blank"
            href={''}
            rel="noreferrer noopener"
          >
            <Text
              apple={{
                variant: 'subheadline2',
                weight: 'regular',
                color: 'link',
              }}
              material={{
                variant: 'subtitle2',
                weight: 'medium',
                color: 'link',
              }}
            >
              {t('collectibles.collectible_page.banner_action')}
            </Text>
          </a>
        </div>*/}
        <button onClick={onHide} className={themeClassName('close')}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
