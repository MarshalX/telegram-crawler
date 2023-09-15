import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, To } from 'react-router-dom';

import routePaths from 'routePaths';

import { Cell } from 'components/Cells';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SettingsSVG } from './settings.svg';

interface SettingsCellProps {
  to?: To;
}

export const SettingsCell: FC<SettingsCellProps> = ({
  to = routePaths.SETTINGS,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Cell
      tappable
      chevron
      Component={Link}
      to={to}
      start={
        <Cell.Part type="roundedIcon">
          <RoundedIcon
            backgroundColor="button"
            iconSize={theme === 'apple' ? 24 : 28}
            size={theme === 'apple' ? 40 : 46}
          >
            <SettingsSVG />
          </RoundedIcon>
        </Cell.Part>
      }
    >
      <Cell.Text doubledecker bold title={t('common.settings')} />
    </Cell>
  );
};
