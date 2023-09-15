import { KycPromotionRequiredDetailsPromotionKYCLevelEnum } from 'api/p2p/generated-common';
import { LimitsInfoResponse } from 'api/p2p/generated-userservice';

export const kycLevels: KycPromotionRequiredDetailsPromotionKYCLevelEnum[] = [
  'LEVEL_0',
  'LEVEL_2',
  'LEVEL_3',
];

export const limitsKycLevels: {
  key: keyof LimitsInfoResponse;
  value: KycPromotionRequiredDetailsPromotionKYCLevelEnum;
}[] = [
  {
    key: 'level0',
    value: 'LEVEL_0',
  },
  {
    key: 'level2',
    value: 'LEVEL_2',
  },
  {
    key: 'level3',
    value: 'LEVEL_3',
  },
];
