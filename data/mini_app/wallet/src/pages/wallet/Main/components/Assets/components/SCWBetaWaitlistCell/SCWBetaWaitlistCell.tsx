import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { RootState, useAppSelector } from 'store';

import { Cell } from 'components/Cells';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TonSpaceSVG } from 'images/ton_space_circle.svg';

import { AssetCellCard } from '../AssetCellCard/AssetCellCard';
import styles from './SCWBetaWaitlistCell.module.scss';
import { ReactComponent as ArrowSVG } from './arrow.svg';

export const SCWBetaWaitlistCell = () => {
  const { theme } = useTheme(styles);
  const avatarSize = theme === 'apple' ? 40 : 46;
  const { t } = useTranslation();
  const { featureFlags } = useSelector((state: RootState) => state.user);
  const { canApplyToSCWBetaWaitlist } = useAppSelector(
    (state) => state.session,
  );
  const navigate = useNavigate();

  return (
    <AssetCellCard
      onClick={() => navigate(routePaths.SCW_ONBOARDING)}
      className={classNames(
        styles.root,
        canApplyToSCWBetaWaitlist && styles.emphasize,
      )}
      tappable
      start={
        <Cell.Part type="roundedIcon">
          <TonSpaceSVG width={avatarSize} height={avatarSize} />
        </Cell.Part>
      }
    >
      <Cell.Text
        doubledecker
        bold
        title={
          <>
            {t('common.ton_space')}{' '}
            <span className={styles.beta}>{t('common.beta')}</span>
          </>
        }
        description={
          !featureFlags.scwBetaWaitlist ? (
            <span className={styles.apply}>
              {t('scw.beta_waitlist.apply')}
              <ArrowSVG />
            </span>
          ) : undefined
        }
      />
    </AssetCellCard>
  );
};
