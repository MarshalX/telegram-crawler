import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { WalletAsset } from 'reducers/wallet/walletSlice';
import { setPaymentCurrency } from 'reducers/wpay/wpaySlice';

import AssetCell from 'containers/common/AssetCell/AssetCell';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';

const ChoosePaymentAsset: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const availableAssets = useAppSelector((state) => state.wallet.assets);
  const { paymentCurrency, entity: orderPayment } = useAppSelector(
    (state) => state.wpay,
  );

  const handleContinue = (assetCurrency: FrontendCryptoCurrencyEnum) => {
    dispatch(setPaymentCurrency(assetCurrency));
    navigate(-1);
  };

  if (!orderPayment || !orderPayment.currentPayment) {
    return null;
  }

  return (
    <Page mode="secondary">
      <BackButton />
      <Section title={t('wpay.choose_asset')} separator>
        <Cell.List>
          {orderPayment.currentPayment.paymentOptions.map((paymentOption) => {
            const asset = availableAssets.find(
              (asset) => asset.currency === paymentOption.amount.currencyCode,
            ) as WalletAsset;
            return (
              <AssetCell
                key={paymentOption.amount.currencyCode}
                type="select"
                currency={
                  paymentOption.amount
                    .currencyCode as FrontendCryptoCurrencyEnum
                }
                balance={asset.balance}
                checked={paymentOption.amount.currencyCode === paymentCurrency}
                onClick={() =>
                  handleContinue(
                    paymentOption.amount
                      .currencyCode as FrontendCryptoCurrencyEnum,
                  )
                }
              />
            );
          })}
        </Cell.List>
      </Section>
      <MainButton
        text={t('wpay.done')}
        onClick={() => handleContinue(paymentCurrency)}
      />
    </Page>
  );
};

export default ChoosePaymentAsset;
