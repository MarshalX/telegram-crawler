import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Mono from 'components/Mono/Mono';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { copyToClipboard } from 'utils/common/common';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Identificator.module.scss';

interface Props {
  number: string | number;
  isLoading?: boolean;
  className?: string;
}

export const Identificator: FC<Props> = ({ number, isLoading, className }) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);

  const handleClick = () => {
    copyToClipboard(String(number)).then(() => {
      snackbarContext.showSnackbar({
        text: t('common.copied_to_clipboard'),
      });
    });
  };

  return (
    <Skeleton
      skeleton={
        <div className={styles.skeleton}>
          <div className={themeClassName('root')} />
        </div>
      }
      skeletonShown={isLoading}
      className={className}
    >
      <Mono className={themeClassName('root')} onClick={handleClick}>
        <span className={styles.numberSign}>#</span>
        {number}
      </Mono>
    </Skeleton>
  );
};
