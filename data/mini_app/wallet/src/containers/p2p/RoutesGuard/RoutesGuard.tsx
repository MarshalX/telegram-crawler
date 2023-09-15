import { useUserPayments } from 'query/p2p/useUserPayments';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Outlet,
  createSearchParams,
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/p2p';

import routePaths from 'routePaths';

import { RootState, useAppSelector } from 'store';

import Page from 'components/Page/Page';

import { useSettings, useSupportedFiatCurrencies } from 'hooks/p2p';
import useABTests from 'hooks/p2p/useABTests';
import { useFetchUser } from 'hooks/p2p/useFetchUser';

import Onboarding from '../Onboarding/Onboarding';

interface GuardContext {
  isLoadingUser: boolean;
}

const RESTRICTED_ROUTES_PATTERNS_FOR_BANNED_USERS = [
  routePaths.P2P_OFFERS,
  routePaths.P2P_OFFER,
];

const RoutesGuard = () => {
  const { userId, canUseP2p, isBanned } = useSelector(
    (state: RootState) => state.p2pUser,
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser } = useFetchUser();

  const [isLoading, setIsLoading] = useState(true);
  const { isP2pOnboardingShown } = useAppSelector((state) => state.p2p);

  // Preload and cache user payments for future usage
  useUserPayments();
  useSupportedFiatCurrencies();
  useSettings();
  useABTests();

  useEffect(() => {
    const redirectToMarketUnavailableToYouPage =
      userId &&
      (!canUseP2p || isBanned) &&
      !!RESTRICTED_ROUTES_PATTERNS_FOR_BANNED_USERS.every(
        (pattern) =>
          !!matchPath(
            {
              path: pattern,
            },
            location.pathname,
          ),
      );

    if (redirectToMarketUnavailableToYouPage) {
      navigate({
        pathname: routePaths.P2P_UNAVAILABLE,
        search: createSearchParams({
          backUrl: generatePath(routePaths.P2P_HOME),
        }).toString(),
      });
    }
  }, [canUseP2p, isBanned, userId, location, navigate]);

  useEffect(() => {
    if (!userId) return;

    const init = async () => {
      setIsLoading(true);

      const user = await fetchUser();

      if (!user) return;

      if (!user.p2pInitialized) {
        await API.User.initializeP2PUser();
        await fetchUser();
      }

      setIsLoading(false);
    };

    init();
  }, [userId]);

  const [searchParams] = useSearchParams();
  const domType = searchParams.get('type') as 'SALE' | 'PURCHASE' | null;

  if (!isP2pOnboardingShown)
    return (
      <Page>
        <Onboarding type={domType || 'PURCHASE'} />
      </Page>
    );

  return (
    <Outlet
      context={{
        isLoadingUser: isLoading,
      }}
    />
  );
};

export function useP2PRoutesGuardContext() {
  return useOutletContext<GuardContext>();
}

export default RoutesGuard;
