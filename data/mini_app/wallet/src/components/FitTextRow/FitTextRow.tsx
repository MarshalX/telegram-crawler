import { FC, useLayoutEffect, useRef, useState } from 'react';

import { isRtl } from 'utils/common/common';

import { useLanguage } from 'hooks/utils/useLanguage';

interface FitTextRowProps {
  className?: string;
  align?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
}

const FitTextRow: FC<FitTextRowProps> = ({
  children,
  className,
  align = 'flex-start',
}) => {
  const stretchedRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>();
  const languageCode = useLanguage();

  let transformOrigin;

  switch (align) {
    case 'flex-start':
    case 'space-between':
      transformOrigin = isRtl(languageCode) ? 'right' : 'left';
      break;
    case 'flex-end':
      transformOrigin = isRtl(languageCode) ? 'left' : 'right';
      break;
    case 'center':
      transformOrigin = 'center';
  }

  useLayoutEffect(() => {
    if (stretchedRef?.current && rootRef?.current) {
      const diff =
        rootRef.current.offsetWidth / stretchedRef.current.offsetWidth;
      if (diff <= 1) {
        setScale(diff);
      } else {
        setScale(1);
      }
    }
  }, [children]);

  return (
    <div className={className}>
      <div
        style={{
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          display: 'flex',
          justifyContent: align,
        }}
        ref={rootRef}
      >
        <div
          ref={stretchedRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin,
            flexGrow: align === 'space-between' ? 1 : 'initial',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FitTextRow;
