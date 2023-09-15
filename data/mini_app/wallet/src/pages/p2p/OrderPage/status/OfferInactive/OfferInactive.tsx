import classNames from 'classnames';
import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import { BaseOfferRestDtoTypeEnum } from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SadSVG } from 'images/sad.svg';

import styles from './OfferInactive.module.scss';

const SadAnimation = lazy(
  () => import('components/animations/SadSmileAnimation/SadSmileAnimation'),
);

type Props = {
  offerType: BaseOfferRestDtoTypeEnum;
};

const OfferInactive = ({ offerType }: Props) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFindOtherAdsClick = () => {
    navigate({
      pathname: generatePath(routePaths.P2P_OFFERS, {
        type: offerType,
        '*': '',
      }),
      search: createSearchParams({
        isRestorePrevFilters: String(true),
      }).toString(),
    });
  };

  return (
    <div className={themeClassName('root')}>
      <div className={styles.animationWrapper}>
        <Suspense
          fallback={
            <SadSVG
              className={classNames(themeClassName('media'), styles.sad)}
            />
          }
        >
          <SadAnimation
            className={classNames(themeClassName('media'), styles.sad)}
          />
        </Suspense>
      </div>
      <div className={themeClassName('title')}>{t(`p2p.ad_was_deleted`)}</div>

      <div
        className={themeClassName('findAds')}
        onClick={handleFindOtherAdsClick}
      >
        {t(`p2p.find_other_ads`)}
      </div>
    </div>
  );
};

export default OfferInactive;
