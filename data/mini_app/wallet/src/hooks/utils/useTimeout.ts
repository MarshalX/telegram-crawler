import { useEffect, useRef } from 'react';

type UseTimeout = () => [
  (cb: VoidFunction, time: number) => void,
  number | undefined,
];

export const useTimeout: UseTimeout = () => {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return [
    (cb, time) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(cb, time);
    },
    timeoutRef.current,
  ];
};
