import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CellText.module.scss';

type CellTextBaseProps = {
  className?: string;
  titleClassName?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  align?: 'start' | 'end';
  /**
   * Use this prop if you need to render Cell with only title,
   * but with height of Cell with title and description
   */
  doubledecker?: boolean;
  // TODO: audit codebase for the places with overflowing descriptions
  // and add opposite prop in https://wallet-bot.atlassian.net/browse/WAL-1191
  multilineDescription?: boolean;
};

type CellTextProps =
  | (CellTextBaseProps & {
      title: ReactNode;
      description?: ReactNode;
      descriptionAppearance?: 'default' | 'success' | 'danger' | 'disabled';
      inverted?: boolean;
      bold?: boolean;
      titleAppearance?:
        | 'default'
        | 'success'
        | 'primary'
        | 'danger'
        | 'muted'
        | 'disabled';
    })
  | (CellTextBaseProps & {
      skeleton?: boolean;
      description?: boolean;
      inverted?: boolean;
    });

export const CellText: FC<CellTextProps> = ({
  className,
  titleClassName,
  style,
  align = 'start',
  doubledecker,
  multilineDescription = false,
  ...props
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div
      className={classNames(
        themeClassName('root'),
        'inverted' in props && props.inverted && styles.inverted,
        doubledecker && styles.doubledecker,
        'skeleton' in props && props.skeleton && styles.skeleton,
        styles[align],
        className,
      )}
      data-testid={props['data-testid']}
      style={style}
    >
      <div
        className={classNames(
          themeClassName('title'),
          'bold' in props && props.bold && styles.bold,
          'titleAppearance' in props &&
            styles[props.titleAppearance || 'default'],
          titleClassName,
        )}
      >
        {'title' in props && props.title}
      </div>
      {props.description && (
        <div
          className={classNames(
            themeClassName('description'),
            'descriptionAppearance' in props &&
              styles[props.descriptionAppearance || 'default'],
            multilineDescription && styles.multilineDescription,
          )}
        >
          {props.description}
        </div>
      )}
    </div>
  );
};
