import classNames from 'classnames';

import Mono from 'components/Mono/Mono';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './UsdtRuffleTicket.module.scss';
import { ReactComponent as TicketSVG } from './ticket.svg';

type Props = {
  number: number;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

const formatNumber = (number: number) => {
  return number.toString().padStart(9, '0');
};

export const UsdtRuffleTicket: React.FC<Props> = ({ number, className }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={classNames(styles.ticket, className)}>
      <TicketSVG className={styles.svg} />
      <Mono className={themeClassName('number')}>{formatNumber(number)}</Mono>
    </div>
  );
};
