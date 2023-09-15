import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/p2p';

import { useAppSelector } from 'store';

export const getKycStatus = () => {
  return API.User.getKyc().then(({ data }) => data.data);
};

export const useKycStatus = () => {
  const { id: userId } = useAppSelector((state) => state.user);

  const { data, ...rest } = useQuery({
    queryKey: queryKeys.kyc.status(userId),
    queryFn: () => getKycStatus(),
  });

  //Return default level if the user is blocked
  if (data && data.kycStatus.status === 'BLOCKED') {
    return {
      kycStatus: {
        level: 'LEVEL_0',
        status: data.kycStatus.status,
      },
      ...rest,
    };
  }

  return { kycStatus: data?.kycStatus, ...rest };
};
