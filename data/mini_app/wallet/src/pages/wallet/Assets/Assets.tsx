import { FC } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

const AssetIndex: FC = () => {
  const { assetCurrency } = useParams();
  const { assets } = useAppSelector((state) => state.wallet);

  if (
    assetCurrency &&
    assets.find(({ currency }) => assetCurrency === currency)
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={routePaths.MAIN} replace />;
  }
};

export default AssetIndex;
