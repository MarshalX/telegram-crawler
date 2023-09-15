import cn from 'classnames';
import { FC, memo } from 'react';

import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './OfferCard.module.scss';

interface Props {
  className?: string;
  isBuySellButtonsShown?: boolean;
}

const OfferCardSkeleton: FC<Props> = ({
  className,
  isBuySellButtonsShown = true,
}) => {
  const { theme, themeClassName } = useTheme(styles);

  return (
    <Section
      className={cn(themeClassName('root'), styles.skeleton, className)}
      separator={theme === 'material'}
    >
      <div className={themeClassName('topContainer')}>
        <div>
          <div className={themeClassName('priceSkeleton')}></div>
          <div className={themeClassName('priceInfoSkeleton')}></div>
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={themeClassName('shareBtnSkeleton')}></div>
          {isBuySellButtonsShown && (
            <div className={themeClassName('buyBtnSkeleton')}></div>
          )}
        </div>
      </div>
      <div className={cn(themeClassName('bottomContainer'))}>
        <div className={styles.userContainer}>
          <div className={themeClassName('avatarSkeleton')}></div>
          <div className={themeClassName('usernameSkeleton')}></div>
        </div>
        <div className={themeClassName('tradesSkeletonContainer')}>
          <div className={themeClassName('tradesSkeleton')}></div>
        </div>
        <div className={themeClassName('amountSkeleton')}></div>
        <div className={themeClassName('amountValueSkeleton')}></div>
        <div className={themeClassName('limitsSkeleton')}></div>
        <div>
          <div className={themeClassName('limitsValueSkeletonOne')}></div>
        </div>
        <div className={themeClassName('paymentMethodsSkeleton')}></div>
        <div className={themeClassName('paymentMethodsValueSkeleton')}></div>
      </div>
    </Section>
  );
};

export default memo(OfferCardSkeleton);
