import { useTransaction } from 'query/wallet/transactions/useTransaction';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Skeleton from 'components/Skeleton/Skeleton';

import { Transaction, TransactionSkeleton } from './components/Transaction';

const TransactionPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from'); // direct_messages, exchange

  const { data: transaction, isFetching } = useTransaction(
    searchParams.get('correspondingTransactionId')
      ? {
          correspondingTransactionId: Number(
            searchParams.get('correspondingTransactionId'),
          ),
        }
      : {
          transactionId: Number(searchParams.get('transactionId')),
        },
  );

  return (
    <Page mode="secondary">
      {from !== 'direct_messages' && (
        <BackButton
          onClick={() => {
            if (from === 'exchange') {
              navigate(routePaths.MAIN, { replace: true });
            } else {
              navigate(-1);
            }
          }}
        />
      )}
      <Skeleton skeletonShown={isFetching} skeleton={<TransactionSkeleton />}>
        {transaction && <Transaction {...transaction} />}
      </Skeleton>
      {from === 'direct_messages' && (
        <MainButton
          text={t('transaction.open_wallet')}
          onClick={() => navigate(routePaths.MAIN)}
        />
      )}
    </Page>
  );
};

export default TransactionPage;
