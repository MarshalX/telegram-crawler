import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { Checkmark } from 'components/Checkmark/Checkmark';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import Skeleton from 'components/Skeleton/Skeleton';
import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowRightSVG } from 'images/arrow_right.svg';

import styles from './CallToActionCell.module.scss';

type CallToActionCellProps = {
  title: string;
  description?: ReactNode;
  bold?: boolean;
  before: ReactNode;
  isLoadingDescription?: boolean;
} & (
  | {
      type: 'click';
      onClick?: () => void;
    }
  | {
      type: 'select';
      onClick?: () => void;
      checked?: boolean;
    }
);

export const CallToActionCell: FC<CallToActionCellProps> = ({
  title,
  description,
  bold = true,
  before,
  isLoadingDescription,
  ...props
}) => {
  const { type } = props;

  const { themeClassName, theme } = useTheme(styles);
  return (
    <Tappable
      Component="div"
      className={styles.rootInner}
      rootClassName={classNames(
        themeClassName('root'),
        type === 'select' && props.checked && styles.checked,
      )}
      onClick={props.onClick}
    >
      <div className={styles.before}>
        <RoundedIcon backgroundColor="button">{before}</RoundedIcon>
      </div>
      <div className={styles.content}>
        <div
          className={classNames(themeClassName('title'), bold && styles.bold)}
        >
          {title}
        </div>
        {description && (
          <Skeleton
            skeleton={<div className={themeClassName('descriptionSkeleton')} />}
            skeletonShown={isLoadingDescription}
          >
            <div className={themeClassName('description')}>{description}</div>
          </Skeleton>
        )}
      </div>
      <div className={styles.after}>
        {type === 'click' ? (
          <ArrowRightSVG className={styles.arrow} />
        ) : (
          <Checkmark
            mode={theme === 'apple' ? 'checkbox' : 'radio'}
            checked={props.checked}
          />
        )}
      </div>
    </Tappable>
  );
};
