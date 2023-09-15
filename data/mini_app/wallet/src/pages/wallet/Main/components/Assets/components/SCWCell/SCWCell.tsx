import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { Cell } from 'components/Cells';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TonSpaceSVG } from 'images/ton_space_circle.svg';

import { AssetCellCard } from '../AssetCellCard/AssetCellCard';
import styles from './SCWCell.module.scss';

export const SCWCell: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const iconSize = theme === 'apple' ? 40 : 46;

  return (
    <AssetCellCard
      tappable
      onClick={() => {
        window.Telegram.WebApp.expand();
        navigate(routePaths.SCW_MAIN);
      }}
      start={
        <Cell.Part type="avatar">
          <TonSpaceSVG style={{ width: iconSize, height: iconSize }} />
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
      />
    </AssetCellCard>
  );
};
