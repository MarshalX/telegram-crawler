import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';
import { filter, pipe, sortBy, uniqBy } from 'remeda';

import API from 'api/wallet';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ValidationError } from 'types/receiverSearch';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import {
  selectClearDateByCurrency,
  setRecentWithdrawsClearDate,
} from 'reducers/receiverSearch/receiverSearchSlice';
import { create as createSendRequest } from 'reducers/sendRequest/sendRequestSlice';

import { ContentWrap } from 'containers/common/ReceiverSearch/ContentWrap/ContentWrap';
import { ContinueButton } from 'containers/common/ReceiverSearch/ContinueButton/ContinueButton';
import { Errors } from 'containers/common/ReceiverSearch/Errors/Errors';
import { RecentResults } from 'containers/common/ReceiverSearch/RecentResults/RecentResults';
import { ScanButtonCell } from 'containers/common/ReceiverSearch/ScanButtonCell/ScanButtonCell';
import { SearchInput } from 'containers/common/ReceiverSearch/SearchInput/SearchInput';
import { ParsedAddress } from 'containers/common/ReceiverSearch/SearchInput/parseAddress';
import { ValidContactCell } from 'containers/common/ReceiverSearch/ValidContactCell/ValidContactCell';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useReceiverSearch } from 'hooks/common/ReceiverSearch/useReceiverSearch';
import { useReceiverSearchState } from 'hooks/common/ReceiverSearch/useReceiverSearchState';
import { useValidateWalletAddress } from 'hooks/common/ReceiverSearch/useValidateWalletAddress';
import { useAsset } from 'hooks/common/useAsset';
import { useAssetCurrency } from 'hooks/common/useAssetCurrency';

const validate = (address: string, abortController: AbortController) => {
  return API.Wallets.validateWalletAddress(address, {
    signal: abortController.signal,
  })
    .then((res) => {
      return {
        typename: 'success' as const,
        address: res.data.address,
        currency: res.data.currency,
      };
    })
    .catch((error) => {
      if (error.message !== 'canceled') {
        let resultError: ValidationError;
        switch (error.response.data.code) {
          case 'invalid_domain':
            resultError = 'invalid_domain';
            break;
          case 'invalid_number_of_characters':
            resultError = 'invalid_length';
            break;
          case 'withdraw_to_yourself_is_forbidden':
            resultError = 'yourself';
            break;
          case 'address_forbidden':
            resultError = 'address_forbidden';
            break;
          case 'invalid_domain_tonwebaddress3.0':
            resultError = 'invalid_web3_domain';
            break;
          default:
            resultError = 'invalid_address';
        }
        return {
          typename: 'error' as const,
          error: resultError,
        };
      } else {
        return {
          typename: 'canceled' as const,
        };
      }
    });
};

const useRecentReceivers = (
  currency: FrontendCryptoCurrencyEnum,
  filterDate = 0,
) => {
  const { data: recentReceivers, ...rest } = useQuery({
    queryKey: queryKeys.recentReceivers.byCurrency(currency, filterDate),
    queryFn: async () => {
      const { data } = await API.Transactions.getTransactions(
        currency,
        0,
        5,
        undefined,
        'withdraw',
        ['withdraw_onchain'],
      );

      return pipe(
        data.transactions,
        uniqBy((entry) => entry.recipient_wallet_address?.toLowerCase()),
        sortBy((entry) => new Date(entry.created_at).getTime()),
        filter((entry) => new Date(entry.created_at).getTime() > filterDate),
      ).map((recentReceiver) => {
        return {
          id: recentReceiver.id,
          walletAddress: recentReceiver.recipient_wallet_address,
          currency: recentReceiver.currency as FrontendCryptoCurrencyEnum,
          createdAt: recentReceiver.created_at,
        };
      });
    },
  });

  return { recentReceivers, ...rest };
};

export const ReceiverSearch = () => {
  const {
    onChange,
    searchParamsAddress,
    trimmedInputAddress,
    avatarSize,
    contentStyle,
    onInputBlur,
    searchParams,
  } = useReceiverSearch();

  const navigate = useNavigate();

  const backPath = searchParams.get('backPath');

  const assetCurrencyFromParams = useAssetCurrency();
  const { address } = useAsset(assetCurrencyFromParams);
  const dispatch = useDispatch();
  const onRecentResultsClear = () => {
    dispatch(setRecentWithdrawsClearDate(assetCurrencyFromParams));
  };
  const { balance } = useAsset(assetCurrencyFromParams);

  const { validation, error, validAddressRef, assetCurrency } =
    useValidateWalletAddress({
      currentUserAddress: address,
      validateFunction: validate,
      address: trimmedInputAddress,
    });

  const recentWithdrawsClearDate = useAppSelector((state) =>
    selectClearDateByCurrency(state, assetCurrencyFromParams),
  );
  const { recentReceivers } = useRecentReceivers(
    assetCurrencyFromParams,
    recentWithdrawsClearDate,
  );

  const onSubmit = useCallback(() => {
    if (trimmedInputAddress && validation === 'success') {
      navigate({
        pathname: routePaths.SEND,
        search: createSearchParams({
          assetCurrency,
          address: trimmedInputAddress,
        }).toString(),
      });
    }
  }, [navigate, trimmedInputAddress, validation, assetCurrency]);

  const onPaste = async (value: ParsedAddress) => {
    window.Telegram.WebApp.expand();
    if (value.amount && balance >= value.amount) {
      try {
        const { data } = await API.Withdrawals.createWithdrawRequest(
          value.amount,
          assetCurrencyFromParams,
          value.amount === balance,
          value.address,
        );
        dispatch(createSendRequest(data));
        navigate(
          generatePath(routePaths.SEND_REQUEST_CONFIRMATION, {
            assetCurrency: assetCurrencyFromParams,
          }),
        );
      } catch (e) {
        onChange(value.address);
      } finally {
        window.Telegram.WebApp.closeScanQrPopup();
      }
    } else {
      onChange(value.address);
      window.Telegram.WebApp.closeScanQrPopup();
    }
  };

  const {
    displayControls,
    displayValidContact,
    buttonProgress,
    buttonDisabled,
    displayButton,
  } = useReceiverSearchState(
    validAddressRef.current,
    validation,
    error,
    trimmedInputAddress,
  );

  return (
    <Page>
      <BackButton
        onClick={() => {
          if (backPath) {
            navigate(backPath);
          } else {
            window.history.back();
          }
        }}
      />
      <div style={contentStyle}>
        <SearchInput
          assetCurrency={assetCurrencyFromParams}
          value={searchParamsAddress}
          onChange={onChange}
          onSubmit={onSubmit}
          onPaste={onPaste}
          onBlur={onInputBlur}
        />
        <ContentWrap>
          {displayControls && (
            <>
              <ScanButtonCell onSuccessScan={onPaste} />
              <RecentResults
                onClear={onRecentResultsClear}
                avatarSize={avatarSize}
                onClick={(walletAddress, currency) => {
                  navigate({
                    pathname: routePaths.SEND,
                    search: createSearchParams({
                      assetCurrency: currency,
                      address: walletAddress,
                    }).toString(),
                  });
                }}
                recentReceivers={recentReceivers}
              />
            </>
          )}
          {displayValidContact && (
            <ValidContactCell
              onSubmit={onSubmit}
              avatarSize={avatarSize}
              assetCurrency={assetCurrency}
              trimmedInputAddress={trimmedInputAddress}
              validAddress={validAddressRef.current}
            />
          )}
          <Errors error={error} assetCurrency={assetCurrency} />
        </ContentWrap>
        {displayButton && (
          <ContinueButton
            progress={buttonProgress}
            disabled={buttonDisabled}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </Page>
  );
};
