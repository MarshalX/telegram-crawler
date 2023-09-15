import cn from 'classnames';
import { FC, Suspense, lazy, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { MainButton } from 'components/MainButton/MainButton';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';
import { ReactComponent as MoneySVG } from 'images/money.svg';
import { ReactComponent as SadSVG } from 'images/sad.svg';

import { OrderPageContext } from '../../OrderPage';
import ContactSupport from '../ContactSupport/ContactSupport';
import CreateAppeal from '../CreateAppeal/CreateAppeal';
import styles from './OrderStatus.module.scss';
import { ReactComponent as SandClockSVG } from './sand_clock_placeholder.svg';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);
const MoneyAnimation = lazy(
  () => import('components/animations/MoneyAnimation/MoneyAnimation'),
);
const SandClockAnimation = lazy(
  () => import('components/animations/SandClockAnimation/SandClockAnimation'),
);
const SadAnimation = lazy(
  () => import('components/animations/SadSmileAnimation/SadSmileAnimation'),
);

interface Props {
  icon: 'boomstick' | 'money' | 'sandclock' | 'sad';
  title: string;
  subTitle?: string;
  isSendAppeal?: boolean;
  bottom?: React.ReactNode;
  isCanContactSupport?: boolean;
}

export const OrderStatus: FC<Props> = ({
  icon,
  title,
  subTitle,
  isSendAppeal,
  bottom,
  isCanContactSupport = true,
}) => {
  const { t } = useTranslation();
  const { order } = useContext(OrderPageContext);
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();

  if (!order) {
    return null;
  }
  const redirectToMainPage = () => {
    navigate(generatePath(routePaths.P2P_HOME));
  };

  return (
    <div className={themeClassName('root')}>
      <div className={styles.animationWrapper}>
        {icon === 'money' && (
          <Suspense
            fallback={
              <MoneySVG className={cn(themeClassName('media'), styles.money)} />
            }
          >
            <MoneyAnimation
              className={cn(themeClassName('media'), styles.money)}
            />
          </Suspense>
        )}
        {icon === 'sandclock' && (
          <Suspense
            fallback={
              <SandClockSVG
                className={cn(themeClassName('media'), styles.sandClock)}
              />
            }
          >
            <SandClockAnimation
              className={cn(themeClassName('media'), styles.sandClock)}
            />
          </Suspense>
        )}
        {icon === 'boomstick' && (
          <Suspense
            fallback={
              <BoomstickSVG
                className={cn(themeClassName('media'), styles.boomstick)}
              />
            }
          >
            <BoomstickAnimation
              className={cn(themeClassName('media'), styles.boomstick)}
            />
          </Suspense>
        )}
        {icon === 'sad' && (
          <Suspense
            fallback={
              <SadSVG className={cn(themeClassName('media'), styles.sad)} />
            }
          >
            <SadAnimation className={cn(themeClassName('media'), styles.sad)} />
          </Suspense>
        )}
      </div>
      <div className={themeClassName('title')}>{title}</div>
      <div className={themeClassName('subtitleContainer')}>
        {subTitle && <div className={styles.subtitle}>{subTitle}</div>}
        {isCanContactSupport && (
          <div className={styles.supportLink}>
            {isSendAppeal ? (
              <CreateAppeal order={order} mode="link" />
            ) : (
              <ContactSupport mode="link" />
            )}
          </div>
        )}
      </div>
      {bottom}
      <MainButton
        onClick={redirectToMainPage}
        text={t(`p2p.order_detail.open_market`).toLocaleUpperCase()}
      />
    </div>
  );
};
