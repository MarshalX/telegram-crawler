export const debounceRequest = <T>(
  fn: () => Promise<T>,
  signal: AbortSignal | undefined,
  timeout = 0,
) => {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      fn().then(resolve).catch(reject);
    }, timeout);
    if (signal) {
      signal.onabort = () => clearTimeout(timeoutId);
    }
  });
};

export function debounceFunc<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number,
) {
  let timer: NodeJS.Timeout;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}
