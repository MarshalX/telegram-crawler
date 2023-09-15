import { FC } from 'react';

import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './OrderSkeleton.module.scss';

interface Props {
  isShown: boolean;
}

export const OrderSkeleton: FC<Props> = ({ isShown, children }) => {
  const { themeClassName, theme } = useTheme(styles);

  return (
    <Skeleton
      skeleton={
        <div className={themeClassName('skeleton')}>
          <Section separator>
            <div className={themeClassName('flexiblePrice')}>
              <div className={styles.top}>
                <div className={themeClassName('avatar')}></div>
                <div className={themeClassName('sellingTo')}></div>
              </div>
              <div className={themeClassName('price')}></div>
              <div className={themeClassName('id')}></div>
            </div>
          </Section>
          <Section separator skeleton>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
            >
              <div className={themeClassName('sectionContent')}></div>
            </ListItemCell>
          </Section>
          <Section separator skeleton>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
              header={<div className={themeClassName('sectionHeader')}></div>}
            >
              <div className={themeClassName('sectionLongContent')}></div>
            </ListItemCell>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
              header={<div className={themeClassName('sectionHeader')}></div>}
            >
              <div className={themeClassName('sectionLongContent')}></div>
            </ListItemCell>
          </Section>
          <Section separator skeleton>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
            >
              <div className={themeClassName('sectionContent')}></div>
            </ListItemCell>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
            >
              <div className={themeClassName('sectionContent')}></div>
            </ListItemCell>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
            >
              <div className={themeClassName('sectionContent')}></div>
            </ListItemCell>
            <ListItemCell
              icon={
                <ListItemIcon
                  minWidth={24}
                  type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                >
                  <div className={themeClassName('sectionIcon')}></div>
                </ListItemIcon>
              }
            >
              <div className={themeClassName('sectionContent')}></div>
            </ListItemCell>
          </Section>
        </div>
      }
      skeletonShown={isShown}
    >
      {children}
    </Skeleton>
  );
};
