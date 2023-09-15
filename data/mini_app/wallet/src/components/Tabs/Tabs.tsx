import cn from 'classnames';
import { FC, useLayoutEffect, useRef, useState } from 'react';

import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import s from './Tabs.module.scss';

interface Props {
  activeTabIndex: number;
  onChange: (index: number) => void;
  tabs: string[];
  disabled?: boolean;
  'data-testid'?: string;
  className?: string;
  selectedItemIndex?: number;
}

export const Tabs: FC<Props> = ({
  activeTabIndex,
  onChange,
  tabs,
  disabled,
  'data-testid': dataTestId,
  className,
  selectedItemIndex,
}) => {
  const { themeClassName } = useTheme(s);

  const activeTabRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const selectedIndex =
    selectedItemIndex === undefined ? activeTabIndex : selectedItemIndex;

  useLayoutEffect(() => {
    const activeTab = activeTabRef.current;
    const tabs = tabsRef.current;

    if (!activeTab || !tabs) {
      return;
    }

    const activeTabLeft = activeTab.getBoundingClientRect().left;
    const tabsLeft = tabs.getBoundingClientRect().left;

    setIndicatorWidth(activeTab.offsetWidth);
    setIndicatorPosition(activeTabLeft - tabsLeft);
  }, [activeTabIndex]);

  return (
    <div
      className={cn(s.tabs, disabled && s.disabled, className)}
      ref={tabsRef}
    >
      {tabs.map((tab, index) => (
        <Tappable
          Component={'button'}
          key={index}
          disabled={disabled}
          onClick={() => !disabled && onChange(index)}
          rootClassName={s.tappable}
          className={s.tappableContainer}
          data-testid={`${dataTestId}-item-${index}`}
          type="button"
        >
          <div
            className={cn(
              themeClassName('tab'),
              selectedIndex === index && s.selectedTab,
            )}
            ref={activeTabIndex === index ? activeTabRef : null}
          >
            {tab}
          </div>
        </Tappable>
      ))}
      <div
        className={s.activeIndicator}
        style={{
          transform: `translateX(${indicatorPosition}px)`,
          width: `${indicatorWidth}px`,
        }}
      ></div>
    </div>
  );
};
