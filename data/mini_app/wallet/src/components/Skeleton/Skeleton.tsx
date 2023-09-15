import classNames from 'classnames';
import { ReactNode, forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
  skeleton: ReactNode;
  skeletonShown?: boolean;
  className?: string;
  skeletonClassName?: string;
  children: ReactNode;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { className, skeletonClassName, children, skeletonShown, skeleton },
    ref,
  ) => {
    const skeletonRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
      <div className={classNames(styles.root, className)} ref={ref}>
        <CSSTransition
          timeout={600}
          in={skeletonShown}
          classNames={{
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
          nodeRef={skeletonRef}
          unmountOnExit
        >
          <div
            ref={skeletonRef}
            className={classNames(styles.skeleton, skeletonClassName)}
          >
            {skeleton}
          </div>
        </CSSTransition>
        <CSSTransition
          timeout={600}
          in={!skeletonShown}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
          }}
          nodeRef={contentRef}
          unmountOnExit
        >
          <div ref={contentRef}>{children}</div>
        </CSSTransition>
      </div>
    );
  },
);

export default Skeleton;
