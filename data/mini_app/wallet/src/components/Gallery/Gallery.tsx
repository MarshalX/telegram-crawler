import classNames from 'classnames';
import {
  Children,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  PageControl,
  TPageControl,
} from 'components/Gallery/components/PageControl/PageControl';

import { useTimeout } from 'hooks/utils/useTimeout';

import styles from './Gallery.module.scss';

type GalleryProps = {
  initialSlideIndex?: number;
  onChange?: (slideIndex: number) => void;
  className?: string;
  renderPageControl?: (props: TPageControl) => ReactElement<TPageControl>;
  autoplay?: boolean;
  autoplayDuration?: number;
  freeze?: boolean;
};

export const Gallery: FC<GalleryProps> & {
  PageControl: typeof PageControl;
} = ({
  children,
  onChange,
  initialSlideIndex = 0,
  className,
  renderPageControl,
  autoplay = false,
  autoplayDuration = 2000,
  freeze,
}) => {
  const slidesRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [ready, setReady] = useState(initialSlideIndex === 0);
  const [setScrollHandler] = useTimeout();

  const slidesCount = Children.count(children);

  const slideTo = useCallback(
    (slideIndex: number, behavior: ScrollBehavior = 'auto') => {
      if (
        slidesRef.current &&
        slideIndex >= 0 &&
        slideIndex < slidesCount &&
        slideIndex !== activeSlideIndex
      ) {
        slidesRef.current.scrollTo({
          left: slidesRef.current.offsetWidth * slideIndex,
          behavior,
        });
      }
    },
    [activeSlideIndex, slidesCount],
  );

  const nextSlide = useCallback(() => {
    if (activeSlideIndex === slidesCount - 1) {
      slideTo(0, 'smooth');
      return;
    }

    slideTo(activeSlideIndex + 1, 'smooth');
  }, [activeSlideIndex, slideTo, slidesCount]);

  const scrollHandler = () => {
    if (slidesRef.current) {
      const arrOfLefts = Array.from(slidesRef.current.children).map((item) =>
        Math.abs(item.getBoundingClientRect().left),
      );
      const activeSlideIndex = arrOfLefts.indexOf(Math.min(...arrOfLefts));
      onChange && onChange(activeSlideIndex);
      setActiveSlideIndex(activeSlideIndex);
    }
  };

  const debouncedScrollHandler = useCallback(
    () => setScrollHandler(scrollHandler, 50),
    [onChange],
  );

  useEffect(() => {
    slideTo(initialSlideIndex);
    requestAnimationFrame(() => setReady(true));
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (autoplay) {
      intervalRef.current = setInterval(nextSlide, autoplayDuration);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoplay, autoplayDuration, nextSlide]);

  return (
    <>
      <div
        className={classNames(
          styles.root,
          ready && styles.ready,
          freeze && styles.freeze,
          className,
        )}
      >
        <div
          className={styles.slides}
          onScroll={debouncedScrollHandler}
          ref={slidesRef}
        >
          {Children.map(children, (child, index) => {
            return (
              <div key={index} className={styles.slide}>
                {child}
              </div>
            );
          })}
        </div>
      </div>
      {renderPageControl &&
        !freeze &&
        renderPageControl({
          activeIndex: activeSlideIndex,
          count: slidesCount,
          type: autoplay ? 'progress' : 'regular',
          durationTime: autoplayDuration,
        })}
    </>
  );
};

Gallery.PageControl = PageControl;
