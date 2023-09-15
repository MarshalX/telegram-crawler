export async function retryAsync<T>(
  fn: () => Promise<T>,
  {
    retries: maxRetries = 3,
    delay = 1000,
  }: { retries?: number; delay?: number } = {},
) {
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      return await fn();

      // eslint-disable-next-line
    } catch (error: any) {
      // if requested aborted, don't retry
      if (error.message === 'canceled') {
        throw error;
      }

      console.error(`Attempt ${retries + 1} failed: ${error}`);

      retries++;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Function failed after ${maxRetries} retries`);
}
