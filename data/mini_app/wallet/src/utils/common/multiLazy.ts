import { ComponentType, lazy } from 'react';

/**
 * Takes an array of module loaders and returns an array of lazy-loaded React components.
 * Suspense will await of all chunks to be loaded before showing any of them.
 *
 * @example
 *
 *  const [
 *    Page1,
 *    Page2,
 *  ] = multiLazy([
 *    () => import('pages/page1'),
 *    () => import('pages/page2')
 *  ])
 */

export const multiLazy = (
  moduleLoaderArray: Array<() => Promise<{ default: ComponentType<unknown> }>>,
) => {
  const promises = Promise.all(moduleLoaderArray.map((loader) => loader()));

  return moduleLoaderArray.map((_, index) =>
    lazy(() => promises.then((results) => results[index])),
  );
};
