import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';

import routePaths from 'routePaths';

import { RootState } from 'store';

import { isPageReloaded } from 'utils/common/common';

const routePathsValues = Object.values(routePaths);

export const useIsPageReloaded = () => {
  const location = useLocation();
  const {
    lastPathBeforeUserExit,
    isUserNavigatedThroughPagesDuringCurrentSession,
  } = useSelector((state: RootState) => state.location);

  const isReloaded = useRef(
    (
      pathname: string,
      isUserNavigatedThroughPagesDuringCurrentSession: boolean,
    ) => {
      if (
        isUserNavigatedThroughPagesDuringCurrentSession ||
        !lastPathBeforeUserExit
      )
        return false;

      const lastPathnamePattern = routePathsValues.find((pattern) => {
        return !!matchPath(
          {
            path: pattern,
          },
          lastPathBeforeUserExit,
        );
      });

      if (!lastPathnamePattern) return false;

      const isCurrentPathSameAsLastPath = !!matchPath(
        {
          path: lastPathnamePattern,
        },
        pathname,
      );

      return isCurrentPathSameAsLastPath && isPageReloaded();
    },
  );

  return isReloaded.current(
    location.pathname,
    isUserNavigatedThroughPagesDuringCurrentSession,
  );
};
