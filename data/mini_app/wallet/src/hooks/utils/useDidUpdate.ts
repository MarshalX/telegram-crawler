import { useEffect, useRef } from 'react';

export const useDidUpdate = (cb: VoidFunction, deps: unknown[]) => {
  const mounted = useRef(false);
  const cbRef = useRef<VoidFunction>(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    if (mounted.current) {
      cbRef.current();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line
  }, deps);
};
