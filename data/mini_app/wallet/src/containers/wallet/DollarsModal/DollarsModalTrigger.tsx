import { FC, useContext, useEffect } from 'react';

import { useAppSelector } from 'store';

import { DollarsModalContext } from 'containers/wallet/DollarsModal/DollarsModalProvider';

export const DollarsModalTrigger: FC<{ className?: string }> = ({
  children,
  className,
}) => {
  const { show } = useContext(DollarsModalContext);

  const { whatAreDollars } = useAppSelector(
    (state) => state.warningsVisibility,
  );

  useEffect(() => {
    if (whatAreDollars) {
      show();
    }
  }, [whatAreDollars, show]);

  return (
    <div className={className}>
      <div onClick={show}>{children}</div>
    </div>
  );
};
