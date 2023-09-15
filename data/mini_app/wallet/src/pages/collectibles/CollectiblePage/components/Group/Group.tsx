import { FC } from 'react';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Group.module.scss';

interface GroupProps {
  header?: string;
}

interface GroupPropsSkeleton {
  header: boolean;
  skeleton: boolean;
}

type GroupPropsType = GroupProps | GroupPropsSkeleton;

export const Group: FC<GroupPropsType> = (props) => {
  const { header, children } = props;
  const skeleton = 'skeleton' in props && props.skeleton;
  const { theme, themeClassName } = useTheme(styles);
  return (
    <>
      <div>
        {!!header && (
          <div className={themeClassName('header')}>
            <Text
              skeleton={skeleton}
              skeletonWidth={118}
              className={styles.headerText}
              apple={{ variant: 'title3', weight: 'bold', color: 'text' }}
              material={{ variant: 'button1', color: 'link' }}
            >
              {header}
            </Text>
          </div>
        )}
        {children}
      </div>
      {theme === 'material' && <hr className={styles.separator} />}
    </>
  );
};
