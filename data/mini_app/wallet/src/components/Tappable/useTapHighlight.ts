import {
  MouseEvent,
  PointerEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './useTapHighlight.module.scss';

type Handlers =
  | {
      onTouchStart: (e: TouchEvent) => void;
      onTouchEnd: VoidFunction;
      onPointerMove: (e: PointerEvent) => void;
      onTouchCancel: VoidFunction;
    }
  | {
      onMouseDown: (e: MouseEvent) => void;
      onMouseUp: () => void;
      onMouseLeave: () => void;
      onContextMenu: () => void;
    };

export const supportsTouch = 'ontouchstart' in window;

interface Options {
  onTap?: (data: { target: Element; clientX: number; clientY: number }) => void;
  onTapOut?: () => void;
  mode?: 'overlay' | 'opacity';
  disabled?: boolean;
}

// Мы не можем использовать pointer events, потому что на Android часто не срабатывает onPointerUp, вызывая баги
// с подсчечиванием не того элемента и залипаниями
export function useTapHighlight({
  onTap,
  onTapOut,
  mode = 'overlay',
  disabled,
}: Options): [boolean, Handlers, string[]] {
  const commonStyle = styles[mode];
  const [tapped, setTapped] = useState(false);
  const [tappedClassNames, setTappedClassNames] = useState<string[]>([
    commonStyle,
  ]);
  const timeoutRef = useRef<number>();

  const fadeOut = () => {
    setTapped(false);
    setTappedClassNames([commonStyle, styles.out]);
    onTapOut && onTapOut();
    timeoutRef.current = window.setTimeout(() => {
      setTappedClassNames([commonStyle]);
    }, 400);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  const fadeIn = (data: {
    target: Element;
    clientX: number;
    clientY: number;
  }) => {
    clearTimeout(timeoutRef.current);
    setTapped(true);
    setTappedClassNames([commonStyle, styles.in]);
    onTap && onTap(data);
  };

  const handlers = supportsTouch
    ? {
        onTouchStart: (e: TouchEvent) => {
          if (disabled) {
            return;
          }

          e.touches.length === 1
            ? fadeIn({
                target: e.currentTarget,
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
              })
            : fadeOut();
        },
        onTouchEnd: () => {
          if (disabled) {
            return;
          }

          tapped && fadeOut();
        },
        onPointerMove: (e: PointerEvent) => {
          if (
            tapped &&
            e.pointerType === 'touch' &&
            (e.movementY !== 0 || e.movementX !== 0)
          ) {
            fadeOut();
          }
        },
        onTouchCancel: () => {
          tapped && fadeOut();
        },
      }
    : {
        onMouseLeave: () => {
          tapped && fadeOut();
        },
        onMouseDown: (e: MouseEvent) => {
          if (disabled) {
            return;
          }

          fadeIn({
            target: e.currentTarget,
            clientX: e.clientX,
            clientY: e.clientY,
          });
        },
        onMouseUp: () => {
          if (disabled) {
            return;
          }

          tapped && fadeOut();
        },
        onContextMenu: () => {
          tapped && fadeOut();
        },
      };

  return [tapped, handlers, tappedClassNames];
}
