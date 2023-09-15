import { useBaseRate } from 'query/wallet/rates/useBaseRate';
import { useBuyRate } from 'query/wallet/rates/useBuyRate';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Transactions from 'containers/wallet/Transactions/Transactions';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import { PageCard } from 'components/PageCard/PageCard';

import { logEvent } from 'utils/common/logEvent';

import { useAsset } from 'hooks/common/useAsset';
import { useAssetCurrency } from 'hooks/common/useAssetCurrency';

import styles from './Asset.module.scss';
import { Actions } from './components/Actions/Actions';
import { Balance } from './components/Balance/Balance';
import { DollarsDisclaimer } from './components/DollarsDisclaimer/DollarsDisclaimer';
import { EmptyTransactions } from './components/EmptyTransactions/EmptyTransactions';

const Asset: FC = () => {
  const { t } = useTranslation();
  const assetCurrency = useAssetCurrency();
  const { hasTransactions, balance } = useAsset(assetCurrency);
  useBaseRate(assetCurrency);
  useBuyRate({
    currency: assetCurrency,
  });

  const transactions = hasTransactions ? (
    <Transactions assetCurrency={assetCurrency} />
  ) : (
    <EmptyTransactions />
  );

  useEffect(() => {
    logEvent('Asset screen opened', {
      asset: assetCurrency,
      'available balance': balance,
    });
  }, []);

  return (
    <Page mode="secondary">
      <BackButton />
      <Balance assetCurrency={assetCurrency} />
      <Actions className={styles.actions} assetCurrency={assetCurrency} />
      {(hasTransactions || assetCurrency !== 'USDT') && (
        <PageCard title={t('main.transactions')}>{transactions}</PageCard>
      )}
      {assetCurrency === 'USDT' && (
        <DollarsDisclaimer
          hasIcon={hasTransactions}
          hasLink={!hasTransactions}
        />
      )}
    </Page>
  );
};

export default Asset;
