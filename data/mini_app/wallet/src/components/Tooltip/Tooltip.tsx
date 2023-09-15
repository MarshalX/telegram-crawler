import {
  FloatingArrow,
  FloatingPortal,
  arrow as arrowFunc,
  autoUpdate,
  flip,
  offset as offsetFunc,
  shift,
  useDelayGroup,
  useDelayGroupContext,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useId,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import classNames from 'classnames';
import * as React from 'react';
import { useRef } from 'react';

import s from './Tooltip.module.scss';

const ARROW_WIDTH = 18;
const ARROW_HEIGHT = 9;
const DEFAULT_OFFSET = 7;

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean;
  offset?: number;
}

export function useTooltip({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  arrow = false,
  offset,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const arrowRef = useRef(null);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const { delay } = useDelayGroupContext();
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetFunc((offset ? offset : arrow ? ARROW_HEIGHT : 0) + DEFAULT_OFFSET),
      flip(),
      shift(),
      arrow &&
        arrowFunc({
          element: arrowRef,
        }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
    delay,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
      showArrow: arrow,
    }),
    [open, setOpen, interactions, data, arrowRef, arrow],
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipState = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

export function Tooltip({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const state = useTooltipState();

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const childrenRef = children && (children as any).ref;
  const ref = useMergeRefs([state.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': state.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <button
      ref={ref}
      data-state={state.open ? 'open' : 'closed'}
      {...state.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const state = useTooltipState();
  const id = useId();
  const { isInstantPhase, currentId } = useDelayGroupContext();
  const ref = useMergeRefs([state.refs.setFloating, propRef]);

  useDelayGroup(state.context, { id });

  const instantDuration = 0;
  const duration = 250;

  const { isMounted, styles } = useTransitionStyles(state.context, {
    duration: isInstantPhase
      ? {
          open: instantDuration,
          close: currentId === id ? duration : instantDuration,
        }
      : duration,
    initial: {
      opacity: 0,
    },
  });

  if (!isMounted) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...state.floatingStyles,
          ...props.style,
          ...styles,
        }}
        {...state.getFloatingProps(props)}
        className={classNames(s.tooltip, props.className)}
      >
        {props.children}
        {state.showArrow && props.children && (
          <FloatingArrow
            ref={state.arrowRef}
            context={state.context}
            width={ARROW_WIDTH}
            height={ARROW_HEIGHT}
            className={s.arrow}
            fill="var(--tooltip-background)"
            style={{ ...styles }}
          />
        )}
      </div>
    </FloatingPortal>
  );
});

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
