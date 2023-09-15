import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Placeholder.module.scss';

export type PlaceholderProps = {
  title: ReactNode;
  text?: ReactNode;
  bottom?: ReactNode;
  media?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const Placeholder: FC<PlaceholderProps> = ({
  title,
  text,
  bottom,
  media,
  className,
  style,
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div
      className={classNames(themeClassName('root'), className)}
      style={style}
    >
      {media && <div className={themeClassName('media')}>{media}</div>}
      <Text
        Component="h1"
        apple={{ variant: 'title2', weight: 'semibold' }}
        material={{ variant: 'headline6' }}
        className={styles.title}
      >
        {title}
      </Text>
      {text && (
        <Text
          Component="p"
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular' }}
          className={themeClassName('text')}
        >
          {text}
        </Text>
      )}
      {bottom && (
        <Text
          Component="div"
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular' }}
          className={themeClassName('bottom')}
        >
          {bottom}
        </Text>
      )}
    </div>
  );
};
