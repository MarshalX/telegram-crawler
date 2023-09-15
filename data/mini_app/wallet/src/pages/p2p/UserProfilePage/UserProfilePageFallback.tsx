import cn from 'classnames';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { BackButton } from 'components/BackButton/BackButton';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './UserProfilePage.module.scss';

function UserProfilePageFallback() {
  const { theme, themeClassName } = useTheme(styles);

  const header = (
    <div className={themeClassName('header')}>
      <AliasAvatar size={92} id={0} loading />
      <h1 className={themeClassName('pageTitle')}></h1>
      <p className={themeClassName('pageDescriptionOne')}></p>
      <p className={themeClassName('pageDescriptionTwo')}></p>
    </div>
  );

  const statisic = (
    <div className={themeClassName('statistic')}>
      <div className={themeClassName('card')}>
        <p className={themeClassName('titleSkeleton')}></p>
        <p className={themeClassName('descriptionSkeleton')}></p>
      </div>
      <div className={themeClassName('card')}>
        <p className={themeClassName('titleSkeleton')}></p>
        <p className={themeClassName('descriptionSkeleton')}></p>
      </div>
    </div>
  );

  return (
    <Page mode="secondary">
      <BackButton />
      <div className={cn(themeClassName('root'), styles.skeleton)}>
        {theme === 'apple' ? header : <Section separator>{header}</Section>}
        {theme === 'apple' ? (
          <InlineLayout className={styles.statisticContainer}>
            {statisic}
          </InlineLayout>
        ) : (
          <Section separator>{statisic}</Section>
        )}
        <Section separator={theme === 'material'}>
          <ListItemCell
            icon={
              <ListItemIcon type={theme === 'apple' ? 'iconWithBg' : 'icon'}>
                <div className={themeClassName('listIcon')}></div>
              </ListItemIcon>
            }
          >
            <div className={themeClassName('listTitle')}></div>
          </ListItemCell>
          <ListItemCell
            icon={
              <ListItemIcon type={theme === 'apple' ? 'iconWithBg' : 'icon'}>
                <div className={themeClassName('listIcon')}></div>
              </ListItemIcon>
            }
          >
            <div className={themeClassName('listTitle')}></div>
          </ListItemCell>
        </Section>
      </div>
    </Page>
  );
}

export { UserProfilePageFallback };
