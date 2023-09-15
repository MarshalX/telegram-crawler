import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import ChooseAsset from 'containers/scw/ChooseAsset';

import { BackButton } from 'components/BackButton/BackButton';

const SendChooseAsset: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <BackButton />
      <ChooseAsset
        title={t('scw.send.choose_token')}
        onChoose={(assetCurrency) => {
          if (assetCurrency === FrontendCryptoCurrencyEnum.Ton) {
            navigate(routePaths.SCW_SEND_TON_OPTIONS);
          } else {
            navigate({
              pathname: routePaths.SCW_RECEIVER_SEARCH,
              search: createSearchParams({
                assetCurrency: assetCurrency,
              }).toString(),
            });
          }
        }}
      />
    </>
  );
};

export default SendChooseAsset;
