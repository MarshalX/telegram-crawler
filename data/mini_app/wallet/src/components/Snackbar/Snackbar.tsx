import classNames from 'classnames';
import {
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TonSVG } from 'images/ton_white.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import styles from './Snackbar.module.scss';

const ICON_TO_COMPONENT = {
  warning: <WarningSVG />,
  ton: <TonSVG />,
} as const;

export type SnackRefCurrentProps = {
  shake: () => void;
};

type SnackbarRef = MutableRefObject<SnackRefCurrentProps | null>;

export interface SnackbarProps {
  before?: ReactNode;
  showDuration?: number;
  onShow?: VoidFunction;
  onHide?: VoidFunction;
  snackbarRef?: SnackbarRef;
  text?: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
  actionPosition?: 'bottom' | 'right';
  shakeOnShow?: boolean;
  icon?: keyof typeof ICON_TO_COMPONENT;
}

const Snackbar: FC<SnackbarProps> = ({
  text,
  title,
  before,
  snackbarRef,
  showDuration = 3000,
  onShow,
  onHide,
  action,
  actionPosition = 'right',
  shakeOnShow,
  icon,
}) => {
  const { themeClassName } = useTheme(styles);

  const [shown, setShown] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [doShake, setDoShake] = useState(false);
  const hideTimeoutRef = useRef<number>();
  const requestAnimationFrameRef = useRef<number>();
  const hidingTimeoutRef = useRef<number>();

  const shake = () => {
    setDoShake(true);
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
  };

  useEffect(() => {
    typeof onShow === 'function' && onShow();

    if (shakeOnShow) {
      shake();
    }
  }, []);

  useEffect(() => {
    clearTimeout(hideTimeoutRef.current);

    if (showDuration || doShake) {
      hideTimeoutRef.current = window.setTimeout(() => {
        setShown(false);

        requestAnimationFrameRef.current = requestAnimationFrame(() => {
          setHiding(true);

          hidingTimeoutRef.current = window.setTimeout(() => {
            setShown(false);
            setHiding(false);
            typeof onHide === 'function' && onHide();
          }, 300);
        });
      }, showDuration);
    }

    return () => {
      clearTimeout(hideTimeoutRef.current);
      clearTimeout(hidingTimeoutRef.current);

      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [showDuration, onHide, doShake]);

  useEffect(() => {
    if (snackbarRef) {
      snackbarRef.current = {
        shake,
      };
    }
    return () => {
      if (snackbarRef) {
        snackbarRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [snackbarRef]);

  if (shown) {
    return (
      <div
        className={classNames(themeClassName('root'), hiding && styles.hiding)}
      >
        <div
          className={classNames(
            themeClassName('container'),
            doShake && styles.shake,
          )}
          onAnimationEnd={() => setDoShake(false)}
        >
          {(before || icon) && (
            <div className={themeClassName('before')}>
              {before || (icon && ICON_TO_COMPONENT[icon])}
            </div>
          )}
          <div className={themeClassName('main')}>
            {title && <div className={themeClassName('title')}>{title}</div>}
            {text && <div className={themeClassName('text')}>{text}</div>}
            {action && actionPosition === 'bottom' && (
              <div
                className={classNames(themeClassName('action'), styles.bottom)}
              >
                {action}
              </div>
            )}
          </div>
          {action && actionPosition === 'right' && (
            <div className={classNames(themeClassName('action'), styles.right)}>
              {action}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Snackbar;
