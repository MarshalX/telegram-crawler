import { CSSProperties, useCallback, useEffect, useState } from 'react';

export const usePreventContentHideUnderKeyboard = () => {
  const [pageHeight, setPageHeight] = useState<number>();

  const visualViewportResizeHandler = useCallback(() => {
    if (window.visualViewport) {
      setPageHeight(window.visualViewport.height);
    }
  }, []);

  useEffect(() => {
    // Prevent content from being hidden underneath the Virtual Keyboard
    // Similar problem details: https://www.bram.us/2021/09/13/prevent-items-from-being-hidden-underneath-the-virtual-keyboard-by-means-of-the-virtualkeyboard-api/
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        'resize',
        visualViewportResizeHandler,
      );

      return () => {
        window.visualViewport?.removeEventListener(
          'resize',
          visualViewportResizeHandler,
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    contentStyle: {
      height: pageHeight ? `${pageHeight}px` : 'initial',
      overflowY: 'auto',
    } as CSSProperties,
    onInputBlur: () => {
      requestAnimationFrame(() => {
        setPageHeight(undefined);
      });
    },
  };
};
