import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import cn from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'hooks/utils/useTheme';

import s from './VerifiedMerchantBadge.module.scss';
import { VerifiedSVG } from './VerifiedSVG/VerifiedSVG';

const ARROW_WIDTH = 18;
const ARROW_HEIGHT = 9;

const SIZE = {
  sm: '18px',
  md: '20px',
} as const;

export const VerifiedMerchantBadge = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    displayOnRender?: boolean;
    displayOnClick?: boolean;
    size?: 'sm' | 'md';
  }
>(({ className, displayOnRender, size = 'sm', displayOnClick = true }, ref) => {
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { themeClassName } = useTheme(s);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: 'bottom',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(ARROW_HEIGHT),
      flip({ padding: 5 }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const arrowX = middlewareData.arrow?.x ?? 0;
  const arrowY = middlewareData.arrow?.y ?? 0;
  const transformX = arrowX + ARROW_WIDTH / 2;
  const transformY = arrowY + ARROW_HEIGHT;

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: `translateY(${ARROW_HEIGHT}px)`,
      opacity: 0,
    },
    common: ({ side }) => ({
      transformOrigin: {
        top: `${transformX}px calc(100% + ${ARROW_HEIGHT}px)`,
        bottom: `${transformX}px ${-ARROW_HEIGHT}px`,
        left: `calc(100% + ${ARROW_HEIGHT}px) ${transformY}px`,
        right: `${-ARROW_HEIGHT}px ${transformY}px`,
      }[side],
    }),
  });

  useEffect(() => {
    if (displayOnRender) {
      const id1 = setTimeout(() => {
        setIsOpen(true);
      }, 200);

      const id2 = setTimeout(() => {
        setIsOpen(false);
      }, 3500);

      return () => {
        clearTimeout(id1);
        clearTimeout(id2);
        setIsOpen(false);
      };
    }
  }, [displayOnRender]);

  return (
    <div
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();

        if (displayOnClick) {
          setIsOpen((prev) => !prev);
        }
      }}
      className={cn(className, !displayOnClick && s.clickThrough)}
      {...getReferenceProps()}
    >
      <div ref={refs.setReference}>
        <VerifiedSVG
          className={s.badge}
          width={SIZE[size]}
          height={SIZE[size]}
        />
      </div>
      <FloatingPortal>
        {isMounted && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div className={themeClassName('tooltip')} style={styles}>
              {t('p2p.trusted_merchant')}
              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                radius={4}
                className={themeClassName('tooltipArrow')}
                tipRadius={2}
              />
            </div>
          </div>
        )}
      </FloatingPortal>
    </div>
  );
});
