import {
  FloatingPortal,
  Middleware,
  Placement,
  autoUpdate,
  flip as flipMiddleware,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import cn from 'classnames';
import {
  MutableRefObject,
  ReactNode,
  cloneElement,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ReactComponent as CheckIosSVG } from 'components/SelectList/check_ios.svg';
import Tappable from 'components/Tappable/Tappable';

import { animate } from 'utils/common/spring';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './SelectList.module.scss';
import { ReactComponent as CheckAndroidSVG } from './check_android.svg';

interface Props {
  children: React.ReactElement;
  value: string;
  options: { value: string; label: ReactNode }[];
  onChange: (value: string) => void;
  placement?: Placement;
  flip?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerRef?: MutableRefObject<Element | null>;
  floatingShiftPadding?: number;
  floatingOffset?: number;
  popoverClassName?: string;
  childrenClassNameOnOpen?: string;
  disabled?: boolean;
  'data-testid'?: string;
}

const emptyMiddleware: Middleware = {
  name: 'emptyMiddleware',
  fn(data) {
    return data;
  },
};

const SelectList = forwardRef<HTMLElement, Props>(
  (
    {
      children,
      value,
      options,
      onChange,
      placement: desiredPlacement = 'bottom',
      flip = true,
      open: outerOpen,
      onOpenChange: onOpenOuterChange,
      triggerRef,
      floatingShiftPadding = 0,
      floatingOffset = 0,
      popoverClassName,
      childrenClassNameOnOpen,
      disabled,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const { theme, themeClassName } = useTheme(styles);
    const floatingRef = useRef<HTMLElement | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const [innerOpen, setInnerOpen] = useState(false);

    const open = outerOpen || innerOpen;

    const handleOpenChange = (open: boolean) => {
      if (onOpenOuterChange) {
        onOpenOuterChange(open);
      } else {
        setInnerOpen(open);
      }

      setIsAnimating(true);

      animate({
        duration: 1000,
        draw: ({ progress, isDone }) => {
          if (isDone) {
            setIsAnimating(false);
          }

          if (floatingRef && floatingRef.current) {
            floatingRef.current.style.opacity = open
              ? String(progress)
              : String(1 - progress);
            floatingRef.current.style.transform = open
              ? `scale(${0.3 + 0.7 * progress})`
              : `scale(${0.3 + 0.7 * (1 - progress)})`;
          }
        },
      });
    };

    const { x, y, refs, strategy, context, placement } = useFloating({
      open,
      onOpenChange: handleOpenChange,
      middleware: [
        offset(floatingOffset),
        flip ? flipMiddleware() : emptyMiddleware,
        shift({ padding: floatingShiftPadding }),
      ],
      placement: desiredPlacement,
      whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useClick(context, {
        enabled: !onOpenOuterChange,
      }),
      useDismiss(context, {
        enabled: !onOpenOuterChange,
      }),
    ]);

    const popoverTransformOrigin = useMemo(() => {
      const triggerElLeftPosition =
        context.refs.reference.current?.getBoundingClientRect().left || 0;
      const halfOfScreenWidth = window.innerWidth / 2;
      const isTriggerElLocatedOnRightSideOfScreen =
        triggerElLeftPosition > halfOfScreenWidth;

      const xPlacement = (() => {
        if (placement.includes('end')) {
          return 'right';
        } else if (placement.includes('start')) {
          return 'left';
        } else if (isTriggerElLocatedOnRightSideOfScreen) {
          return 'right';
        } else {
          return 'left';
        }
      })();

      const yPlacement = placement.includes('bottom') ? 'top' : 'bottom';

      return `${yPlacement} ${xPlacement} `;
    }, [placement, context.refs.reference.current]);

    const referenceProps = getReferenceProps({
      className: cn(children.props.className, open && childrenClassNameOnOpen),
      ref: (node) => {
        refs.setReference(node);

        if (triggerRef) {
          triggerRef.current = node;
        }
      },
    });

    return (
      <>
        {cloneElement(children, {
          ...referenceProps,
          onClick: disabled ? undefined : referenceProps.onClick,
        })}
        <FloatingPortal>
          {(open || (!open && isAnimating)) && (
            <div
              {...getFloatingProps({
                ref: (node) => {
                  refs.setFloating(node);
                  floatingRef.current = node;

                  if (typeof ref === 'function') {
                    ref(node);
                  } else if (ref) {
                    ref.current = node;
                  }
                },
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  transformOrigin: popoverTransformOrigin,
                },
              })}
              className={cn(themeClassName('popover'), popoverClassName)}
            >
              {options.map((option, index) => (
                <Tappable
                  key={index}
                  Component="button"
                  onClick={() => {
                    onChange(option.value);
                    handleOpenChange(false);
                  }}
                  data-testid={
                    dataTestId
                      ? `${dataTestId}-${option.value}-option`
                      : undefined
                  }
                  rootClassName={themeClassName('optionContainer')}
                  className={themeClassName('option')}
                >
                  {value === option.value &&
                    (theme === 'apple' ? (
                      <CheckIosSVG className={themeClassName('check')} />
                    ) : (
                      <CheckAndroidSVG className={themeClassName('check')} />
                    ))}
                  <div className={themeClassName('label')}>{option.label}</div>
                </Tappable>
              ))}
            </div>
          )}
        </FloatingPortal>
      </>
    );
  },
);

export default SelectList;
