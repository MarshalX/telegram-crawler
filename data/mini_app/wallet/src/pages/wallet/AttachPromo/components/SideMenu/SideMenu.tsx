import { useTranslation } from 'react-i18next';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './SideMenu.module.scss';
import { ReactComponent as AppleSVG } from './apple.svg';
import { ReactComponent as MaterialSVG } from './material.svg';

export const SideMenu = () => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);

  return (
    <>
      <div className={styles.imageContainer}>
        {theme === 'apple' ? (
          <AppleSVG className={themeClassName('image')} />
        ) : (
          <MaterialSVG className={themeClassName('image')} />
        )}
      </div>
      <div className={themeClassName('content')}>
        <Text
          align="center"
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
        >
          {t(`attaches_promo.side_menu_title_${theme}`)}
        </Text>

        <Text
          align="center"
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular', color: 'hint' }}
        >
          {t('attaches_promo.side_menu_text')}
        </Text>
      </div>
    </>
  );
};
