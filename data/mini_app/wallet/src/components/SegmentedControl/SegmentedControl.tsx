import cn from 'classnames';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './SegmentedControl.module.scss';

interface Props {
  items: Array<string>;
  onChange: (index: number) => void;
  activeItemIndex: number;
  disabled?: boolean;
  'data-testid'?: string;
  className?: string;
  selectedItemIndex?: number;
}

const ROOT_PADDING = 2;

const SegmentedControl = ({
  items,
  onChange,
  activeItemIndex,
  disabled = false,
  'data-testid': dataTestId,
  className,
  selectedItemIndex,
}: Props) => {
  const { themeClassName } = useTheme(styles);
  const { languageCode } = useSelector((state: RootState) => state.settings);

  const [isMounted, setIsMounted] = useState(false);

  const [itemWidth, setItemWidth] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (index: number) => {
    onChange(index);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      // We use rounded width to prevent selected item background from having subpixel width
      const roundedWidth = Math.round(ref.current.offsetWidth);

      setRootWidth(roundedWidth);
      setItemWidth((roundedWidth - 2 * ROOT_PADDING) / items.length);

      ref.current.style.width = `${roundedWidth}px`;
    }
  }, [ref, items]);

  const selectedBackgroundTranslateX = useMemo(() => {
    const isRTL = languageCode === 'fa';

    return (isRTL ? -1 : 1) * itemWidth * activeItemIndex;
  }, [itemWidth, languageCode, activeItemIndex]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // We need to wait for the first render to finish before we can start the transition
      // Otherwise we will see the transition on the first render if selectedItemIndex is not 0
      setIsMounted(true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const rootStyle = useMemo(() => {
    if (rootWidth) {
      return {
        width: rootWidth,
      };
    }

    return {};
  }, [rootWidth]);

  return (
    <div
      className={cn(styles.root, disabled && styles.disabled, className)}
      ref={ref}
      style={rootStyle}
    >
      <div
        className={cn(
          styles.selectedItemBackground,
          isMounted && styles.selectedItemBackgroundTransition,
        )}
        style={{
          transform: `translateX(${selectedBackgroundTranslateX}px)`,
          width: itemWidth,
        }}
      />
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(themeClassName('item'), {
            [themeClassName('selectedItem')]: activeItemIndex === index,
          })}
          onClick={() => handleChange(index)}
          data-testid={`${dataTestId}-item-${index}`}
        >
          <div className={themeClassName('itemContent')}>{item}</div>
          {/* Used to prevent component from jumping when font weight changes */}
          <div className={themeClassName('invisibleItemContent')}>
            {item}
            {selectedItemIndex === index && <div className={styles.dot}></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
