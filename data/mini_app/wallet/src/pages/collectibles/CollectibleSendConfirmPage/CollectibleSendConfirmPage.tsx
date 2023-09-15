import * as Sentry from '@sentry/react';
import { queryClient } from 'query/client';
import { useCollectible } from 'query/getGems/collectibles/collectible';
import { useTransferCollectible } from 'query/getGems/collectibles/transferCollectible';
import { queryKeys } from 'query/queryKeys';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  Collectible as CollectiblePayload,
  CollectibleResponse,
  TonTx,
} from 'api/getGems/generated';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM } from 'config';

import { useAppSelector } from 'store';

import { addPendingTransaction } from 'reducers/scw/scwSlice';

import { Media } from 'pages/collectibles/components/Media/Media';
import { PageError } from 'pages/collectibles/components/PageError/PageError';

import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import {
  printCryptoAmount,
  roundDownFractionalDigits,
} from 'utils/common/currency';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CollectibleSendConfirmPage.module.scss';

interface CollectibleSendConfirmTopProps {
  collectibleAddress: string;
  recipientAddress: string;
}

const CollectibleSendConfirmTop: FC<CollectibleSendConfirmTopProps> = ({
  collectibleAddress,
  recipientAddress,
}) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const { data } = useCollectible(collectibleAddress);
  const collectible = data?.collectible;
  return (
    <>
      <div className={themeClassName('sendTo')}>
        <OperationInfo
          avatar={<OperationIcon gateway="wpay_payout" type="withdraw" />}
          operation={t('collectibles.collectible_send_confirm_page.send_to')}
          merchant={squashAddress(recipientAddress)}
        />
      </div>
      <Media
        className={themeClassName('contentMedia')}
        payload={collectible?.content}
      />
    </>
  );
};

const usePerformTransfer = () => {
  const snackbarContext = useContext(SnackbarContext);
  const [isTransferring, setIsTransferring] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const senderAddress = useAppSelector((state) => state.scw.address);

  const transfer = async (tx: TonTx, balanceAfter: number) => {
    const onError = (text?: string) => {
      snackbarContext.showSnackbar({
        snackbarId: 'scw',
        icon: 'warning',
        text: text || t('scw.failed_to_send_transaction'),
      });
      return false;
    };

    if (balanceAfter < 0) {
      return onError(t('scw.insufficient_balance'));
    }

    if (!tx || !tx.messages.length) {
      return onError(t('scw.invalid_transaction'));
    }

    try {
      setIsTransferring(true);
      const { emulateTransaction, sendTransaction } = await import(
        'utils/scw/ton'
      );
      const transactionParams = {
        source: tx.source || senderAddress,
        valid_until: tx.validUntil,
        messages: tx.messages,
      };
      const emulatedResult = await emulateTransaction(transactionParams);
      const result = await sendTransaction(transactionParams);
      if (!result) {
        const message = 'Empty sendTransaction result on collectible transfer';
        console.error(message);
        Sentry.captureException(message, { tags: { source: 'collectibles' } });
        return onError();
      }
      dispatch(addPendingTransaction(emulatedResult.event));
      return true;
    } catch (e) {
      console.error(e);
      Sentry.captureException(e, { tags: { source: 'collectibles' } });
      return onError();
    } finally {
      setIsTransferring(false);
    }
  };

  return { transfer, isTransferring };
};

const updateCollectibleCache = (collectibleAfter: CollectiblePayload) => {
  queryClient.setQueryData(
    queryKeys.getGems.collectible(collectibleAfter.address),
    (cache): { collectible: CollectiblePayload } | unknown => {
      const collectible = cache as CollectibleResponse | undefined;
      if (!collectible) {
        return cache;
      }
      return {
        ...collectible,
        collectible: collectibleAfter,
      };
    },
  );
};

const CollectibleSendConfirmPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const recipientAddress = params.recipientAddress as string;
  const collectibleAddress = params.address as string;
  const { theme } = useTheme(styles);
  const squashedAddress = squashAddress(recipientAddress);
  const { data, isError, refetch } = useTransferCollectible(
    collectibleAddress,
    recipientAddress,
  );
  const navigate = useNavigate();
  const { languageCode } = useAppSelector((state) => state.settings);
  const isSkeletonShown = !data;

  const { transfer, isTransferring } = usePerformTransfer();

  if (isError && !data) {
    return <PageError refetch={refetch} />;
  }

  const onConfirmClick = async () => {
    if (!data) {
      return;
    }
    const isTransferred = await transfer(data.tx, data.balanceAfter);
    if (!isTransferred) {
      return;
    }
    updateCollectibleCache(data.collectibleAfter);
    navigate(
      generatePath(routePaths.COLLECTIBLE_SEND_SUCCESS, {
        address: collectibleAddress,
        recipientAddress: recipientAddress,
      }),
    );
  };

  const performPrintCryptoAmount = (amount?: number) => {
    if (!amount) {
      return null;
    }
    return printCryptoAmount({
      amount: roundDownFractionalDigits(
        amount.toFixed(10),
        CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM[FrontendCryptoCurrencyEnum.Ton],
      ),
      currency: FrontendCryptoCurrencyEnum.Ton,
      languageCode,
      currencyDisplay: 'code',
    });
  };

  return (
    <Page mode="secondary">
      <BackButton />
      {theme === 'material' ? (
        <Section separator>
          <CollectibleSendConfirmTop
            collectibleAddress={collectibleAddress}
            recipientAddress={recipientAddress}
          />
        </Section>
      ) : (
        <CollectibleSendConfirmTop
          collectibleAddress={collectibleAddress}
          recipientAddress={recipientAddress}
        />
      )}
      <Section separator>
        <Cell.List>
          <Cell separator>
            <Cell.Text
              inverted
              description={t(
                'collectibles.collectible_send_confirm_page.recipient_address',
              )}
              title={squashedAddress}
            />
          </Cell>
          <Cell>
            {!isSkeletonShown && (
              <Cell.Text
                inverted
                description={t(
                  'collectibles.collectible_send_confirm_page.fee',
                )}
                title={'≈ ' + performPrintCryptoAmount(data.fee)}
              />
            )}
            {isSkeletonShown && (
              <Cell.Text skeleton inverted title description />
            )}
          </Cell>
        </Cell.List>
      </Section>
      <Section separator>
        <Cell.List>
          <Cell>
            {!isSkeletonShown && (
              <Cell.Text
                inverted
                description={t(
                  'collectibles.collectible_send_confirm_page.current_balance',
                )}
                title={performPrintCryptoAmount(data.balanceBefore)}
              />
            )}
            {isSkeletonShown && (
              <Cell.Text skeleton inverted title description />
            )}
          </Cell>
        </Cell.List>
      </Section>
      <MainButton
        progress={isTransferring}
        disabled={isSkeletonShown}
        onClick={onConfirmClick}
        text={t(
          'collectibles.collectible_send_confirm_page.confirm',
        ).toUpperCase()}
      />
    </Page>
  );
};

export default CollectibleSendConfirmPage;
