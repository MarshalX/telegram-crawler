import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './HomePage.module.scss';
import { ReactComponent as MoneySkeletonSVG } from './market_icon_skeleton.svg';

const HomePageSkeleton = () => {
  const { theme, themeClassName } = useTheme(styles);

  return (
    <div className={styles.skeleton} data-testid="tgcrawl">
      <MoneySkeletonSVG className={styles.media} />
      <div className={themeClassName('pageTitle')} />
      <div className={themeClassName('pageDescriptionOne')} />
      <div className={styles.pageDescriptionTwo} />
      <div className={themeClassName('actionWrapper')}>
        <div className={themeClassName('buyBtn')}>
          <div className={styles.buyBtnText} />
        </div>

        <div className={themeClassName('buyBtn')}>
          <div className={styles.buyBtnText} />
        </div>
      </div>
      <Section separator>
        <ListItemCell
          icon={
            <ListItemIcon type={theme === 'apple' ? 'iconWithBg' : 'icon'}>
              <div className={styles.listIcon}></div>
            </ListItemIcon>
          }
          header={<div className={styles.listMerchantProfileTitle}></div>}
        >
          <div className={styles.listMerchantProfileDescription}></div>
        </ListItemCell>
        <ListItemCell
          icon={
            <ListItemIcon type={theme === 'apple' ? 'iconWithBg' : 'icon'}>
              <div className={styles.listIcon}></div>
            </ListItemIcon>
          }
        >
          <div className={styles.listTitle}></div>
        </ListItemCell>
      </Section>
      <Section separator className={themeClassName('linksGroup')}>
        <ListItemCell
          icon={
            <ListItemIcon type={theme === 'apple' ? 'iconWithBg' : 'icon'}>
              <div className={styles.listIcon}></div>
            </ListItemIcon>
          }
        >
          <div className={styles.listTitle}></div>
        </ListItemCell>
        <ListItemCell
          icon={
            <ListItemIcon type={theme === 'apple' ? 'iconWithBg' : 'icon'}>
              <div className={styles.listIcon}></div>
            </ListItemIcon>
          }
        >
          <div className={styles.listTitle}></div>
        </ListItemCell>
      </Section>
    </div>
  );
};

export { HomePageSkeleton };
