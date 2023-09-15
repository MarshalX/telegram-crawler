import type { Selector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const select = <
  Result = unknown,
  Params extends never | readonly unknown[] = unknown[],
>(
  selector: Selector<RootState, Result, Params>,
) => {
  return selector;
};
