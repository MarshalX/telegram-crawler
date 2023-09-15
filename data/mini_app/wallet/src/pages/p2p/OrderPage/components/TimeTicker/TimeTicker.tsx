import classNames from 'classnames';
import intervalToDuration from 'date-fns/intervalToDuration';
import { parse, toSeconds } from 'iso8601-duration';
import { FC, useEffect, useRef, useState } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './TimeTicker.module.scss';

interface TimeNumbers {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  // ISO 8601 duration
  timeout: string;
  getDescription: (time: string) => string;
  // Date in string format
  start?: string;
  onExpire?: () => void;
}

function convertTimeToNumbers(endDate: Date): TimeNumbers {
  const startDate = new Date();

  if (startDate.getTime() > endDate.getTime()) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const duration = intervalToDuration({ start: new Date(), end: endDate });

  return {
    hours: duration.hours || 0,
    minutes: duration.minutes || 0,
    seconds: duration.seconds || 0,
  };
}

function convertTimeNumbersToString(numbers: TimeNumbers) {
  const { hours, minutes, seconds } = numbers;
  return `${hours === 0 ? '' : hours + ':'}${minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
}

const TimeTicker: FC<Props> = ({
  start,
  timeout,
  getDescription,
  onExpire,
}) => {
  const { themeClassName } = useTheme(styles);
  const [hurryUp, setHurryUp] = useState(false);
  const [hide, setHide] = useState(false);

  const maxTimeout = Math.ceil(toSeconds(parse(timeout)));
  const interval = useRef<NodeJS.Timer | null>(null);

  const [timerValue, setTimerValue] = useState(() => {
    if (!start) return '00:00';

    const nowDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(+startDate + maxTimeout * 1000);

    if (+endDate < +nowDate) return '00:00';

    return convertTimeNumbersToString(convertTimeToNumbers(endDate));
  });

  const finishTicker = () => {
    if (interval.current) clearInterval(interval.current);
  };

  const startTicker = () => {
    if (!start) {
      setHide(true);
      return;
    }

    const nowDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(+startDate + maxTimeout * 1000);

    if (+endDate < +nowDate) {
      setHide(true);
      if (onExpire) onExpire();
      return;
    }

    interval.current = setInterval(() => {
      const timeNumbers = convertTimeToNumbers(endDate);
      setTimerValue(convertTimeNumbersToString(timeNumbers));

      const { hours, minutes, seconds } = timeNumbers;
      setHurryUp(hours === 0 && minutes === 0);

      if (hours === 0 && minutes === 0 && seconds === 0) {
        finishTicker();
        if (onExpire) onExpire();
      }
    }, 1000);
  };

  useEffect(() => {
    startTicker();

    return () => {
      finishTicker();
    };
  }, [start, timeout]);

  return (
    <div
      className={classNames(
        themeClassName('root'),
        hurryUp && styles.hurryUp,
        hide && styles.hide,
      )}
    >
      {getDescription(timerValue)}
    </div>
  );
};

export default TimeTicker;
