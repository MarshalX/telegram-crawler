import classNames from 'classnames';
import { FC, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { RestResponseProceedPaymentStatusStatusEnum } from 'api/wpay/generated';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './PaymentStatus.module.scss';
import { ReactComponent as PaymentStatusFailedSVG } from './payment_status_failed.svg';
import { ReactComponent as PaymentStatusProgressSVG } from './payment_status_progress.svg';
import { ReactComponent as PaymentStatusSuccessSVG } from './payment_status_success.svg';

export const PaymentStatus: FC<{
  status: RestResponseProceedPaymentStatusStatusEnum;
  className?: string;
}> = ({ status, className }) => {
  const containerNodeRef = useRef<HTMLDivElement>(null);

  const { themeClassName } = useTheme(styles);
  return (
    <div className={classNames(themeClassName('root'), className)}>
      <SwitchTransition>
        <CSSTransition
          timeout={350}
          key={status}
          nodeRef={containerNodeRef}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exit,
            exitActive: styles.exitActive,
          }}
        >
          <div ref={containerNodeRef} className={styles.container}>
            {status === 'UNKNOWN' && (
              <PaymentStatusProgressSVG
                className={themeClassName('progress')}
              />
            )}
            {status === 'SUCCESS' && (
              <PaymentStatusSuccessSVG className={styles.success} />
            )}
            {status === 'FAILED' && (
              <PaymentStatusFailedSVG className={styles.failed} />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
