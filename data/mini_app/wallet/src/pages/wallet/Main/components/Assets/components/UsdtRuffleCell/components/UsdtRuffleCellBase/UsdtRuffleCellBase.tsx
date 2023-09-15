import classNames from 'classnames';

import { Cell } from 'components/Cells';
import InitialsAvatarSkeleton from 'components/InitialsAvatar/InitialsAvatarSkeleton';

import { useTheme } from 'hooks/utils/useTheme';

import { AssetCellCard } from '../../../AssetCellCard/AssetCellCard';
import { UsdtRuffleCellText } from '../UsdtRuffleCellText/UsdtRuffleCellText';
import styles from './UsdtRuffleCellBase.module.scss';
import { ReactComponent as UsdtRuffleLogo } from './UsdtRuffleLogo.svg';

export interface UsdtRuffleCellBaseProps {
  header?: React.ReactNode;
  buttonText?: string;
  onClick?: React.MouseEventHandler;
  className?: string;
  'data-testid'?: string;
}

export const UsdtRuffleCellBaseSkeleton: React.FC = () => {
  const { themeClassName, theme } = useTheme(styles);

  return (
    <AssetCellCard
      className={styles.root}
      start={
        <Cell.Part type="avatar">
          <InitialsAvatarSkeleton size={theme === 'apple' ? 40 : 46} />
        </Cell.Part>
      }
      end={
        <div className={classNames(themeClassName('after'), styles.skeleton)}>
          <button className={themeClassName('button')}>
            <span className={themeClassName('buttonText')}></span>
          </button>
        </div>
      }
    >
      <UsdtRuffleCellText skeleton description />
    </AssetCellCard>
  );
};

export const UsdtRuffleCellBase: React.FC<
  React.PropsWithChildren<UsdtRuffleCellBaseProps>
> = ({ onClick, header, children, buttonText }) => {
  const { themeClassName, theme } = useTheme(styles);
  const iconSize = theme === 'apple' ? 40 : 46;

  return (
    <AssetCellCard
      className={styles.root}
      onClick={onClick}
      start={
        <Cell.Part type="avatar">
          <UsdtRuffleLogo style={{ width: iconSize, height: iconSize }} />
        </Cell.Part>
      }
      end={
        buttonText && (
          <div className={themeClassName('after')}>
            <button className={themeClassName('button')}>
              <span className={themeClassName('buttonText')}>{buttonText}</span>
            </button>
          </div>
        )
      }
    >
      <UsdtRuffleCellText title={header} description={children} bold />
    </AssetCellCard>
  );
};
