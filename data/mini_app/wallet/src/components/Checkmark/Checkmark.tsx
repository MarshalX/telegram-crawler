import { Suspense, lazy } from 'react';

import CheckmarkFallback from './CheckmarkFallback';

const CheckmarkLottie = lazy(() => import('./CheckmarkLottie'));

export const Checkmark = ({
  checked,
  mode = 'radio',
}: {
  checked?: boolean;
  mode?: 'radio' | 'checkbox';
}) => {
  return (
    <Suspense fallback={<CheckmarkFallback checked={checked} mode={mode} />}>
      <CheckmarkLottie checked={checked} mode={mode} />
    </Suspense>
  );
};
