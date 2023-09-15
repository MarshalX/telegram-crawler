import { useAccountJettons, useDeployAccount } from 'query/scw/account';
import { NO_SCW_ADDRESSES, useSCWAddresses } from 'query/scw/address';
import { useEffect } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import routePaths from 'routePaths';

import { RootState, useAppSelector } from 'store';

interface GuardContext {
  isLoadingWallet: boolean;
}

const RoutesGuard = () => {
  const { address, setupComplete } = useAppSelector(
    (state: RootState) => state.scw,
  );
  const { isLoading } = useAccountJettons(address);
  const { data: addressData } = useSCWAddresses();
  const { actives, backups } = addressData ? addressData : NO_SCW_ADDRESSES;

  const { deploy } = useDeployAccount();

  useEffect(() => {
    deploy();
  }, [deploy]);

  if (!address) {
    if (actives.length > 0 || backups.length > 0) {
      return <Navigate to={routePaths.SCW_IMPORT_EXISTING} replace />;
    } else {
      return <Navigate to={routePaths.SCW_ONBOARDING} replace />;
    }
  }

  // Extra condition so early-beta users do not need to setup
  // an address they already are using
  if (!setupComplete && setupComplete === false) {
    return <Navigate to={routePaths.SCW_BACKUP_CHOOSE_METHOD} replace />;
  }

  return (
    <Outlet
      context={{
        isLoadingWallet: isLoading,
      }}
    />
  );
};

export function useScwRoutesGuardContext() {
  return useOutletContext<GuardContext>();
}

export default RoutesGuard;
