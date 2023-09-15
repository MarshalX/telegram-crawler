import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ClearResultsButton.module.scss';
import { ReactComponent as ClearMaterialSVG } from './clear_material.svg';

interface ClearResultsButtonProps {
  onClick?: VoidFunction;
}

export const ClearResultsButton: FC<ClearResultsButtonProps> = ({
  onClick,
}) => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  return (
    <button className={themeClassName('root')} onClick={onClick}>
      {theme === 'apple' ? t('receiver_search.clear') : <ClearMaterialSVG />}
    </button>
  );
};
