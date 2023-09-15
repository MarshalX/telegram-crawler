import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';
import { useCallback } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { filter, pipe, uniqBy } from 'remeda';
import TonWeb from 'tonweb';

import API from 'api/tonapi';
import { TonTransferAction } from 'api/tonapi/generated';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ValidationError } from 'types/receiverSearch';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

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

import { getFriendlyAddress } from 'utils/scw/ton';

import { useReceiverSearch } from 'hooks/common/ReceiverSearch/useReceiverSearch';
import { useReceiverSearchState } from 'hooks/common/ReceiverSearch/useReceiverSearchState';
import { useValidateWalletAddress } from 'hooks/common/ReceiverSearch/useValidateWalletAddress';

const validate = (address: string, abortController: AbortController) => {
  // eslint-disable-next-line
  const catchFn = (error: any) => {
    if (error.message === 'canceled') {
      return {
        typename: 'canceled' as const,
      };
    }
    return {
      typename: 'error' as const,
      error: 'invalid_address' as ValidationError,
    };
  };

  const lowerAddress = address.toLowerCase();

  if (lowerAddress.endsWith('.ton') || lowerAddress.endsWith('.t.me')) {
    return API.DNS.dnsResolve(lowerAddress, {
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.data.wallet?.address) {
          return {
            typename: 'success' as const,
            address: getFriendlyAddress(res.data.wallet?.address),
          };
        } else {
          return {
            typename: 'error' as const,
            error: 'invalid_address' as ValidationError,
          };
        }
      })
      .catch((error) => {
        return catchFn(error);
      });
  }

  return API.Accounts.getAccount(address, {
    signal: abortController.signal,
  })
    .then((res) => {
      if (res.data.address) {
        return {
          typename: 'success' as const,
          address: address,
        };
      } else {
        return {
          typename: 'error' as const,
          error: 'invalid_address' as ValidationError,
        };
      }
    })
    .catch((error) => {
      return catchFn(error);
    });
};

const useRecentReceivers = (address: string) => {
  const { data: recentReceivers, ...rest } = useQuery({
    queryKey: queryKeys.scw.events(address),
    queryFn: async () => {
      const { data } = await API.Accounts.getEventsByAccount(address, 10);

      return pipe(
        data.events,
        filter((event) => {
          if (
            !!event.actions[0] &&
            event.actions[0].type === 'TonTransfer' &&
            event.actions[0].TonTransfer !== undefined
          ) {
            const TonTransfer = event.actions[0]
              .TonTransfer as TonTransferAction;
            const senderAddress = new TonWeb.utils.Address(
              TonTransfer.sender.address,
            );

            return senderAddress.toString(true, true, true) === address;
          } else {
            return false;
          }
        }),
        uniqBy((event) => {
          const TonTransfer = event.actions[0].TonTransfer as TonTransferAction;
          return TonTransfer.recipient.address;
        }),
      ).map((event) => {
        const TonTransfer = event.actions[0].TonTransfer as TonTransferAction;

        return {
          walletAddress: new TonWeb.utils.Address(
            TonTransfer.recipient.address,
          ).toString(true, true, true),
          createdAt: new Date(event.timestamp * 1000).toString(),
          currency: FrontendCryptoCurrencyEnum.Ton,
          id: event.lt,
        };
      });
    },
  });

  return { recentReceivers, ...rest };
};

const ReceiverSearch = () => {
  const { address } = useAppSelector((state) => state.scw);
  const [searchParams] = useSearchParams();

  const {
    onChange,
    searchParamsAddress,
    trimmedInputAddress,
    avatarSize,
    contentStyle,
    onInputBlur,
  } = useReceiverSearch();

  const onPaste = (value: ParsedAddress) => {
    window.Telegram.WebApp.expand();
    onChange(value.address);
    window.Telegram.WebApp.closeScanQrPopup();
  };

  const assetCurrency =
    searchParams.get('assetCurrency') || FrontendCryptoCurrencyEnum.Ton;
  const { validation, error, validAddressRef } = useValidateWalletAddress({
    currentUserAddress: address,
    address: trimmedInputAddress,
    validateFunction: validate,
  });

  const navigate = useNavigate();

  const navigateToConfirm = useCallback(
    (address: string) => {
      navigate({
        pathname: routePaths.SCW_SEND,
        search: createSearchParams({
          address,
          assetCurrency,
          from: 'receiverSearch',
        }).toString(),
      });
    },
    [navigate, assetCurrency],
  );

  const onSubmit = useCallback(() => {
    if (trimmedInputAddress && validation === 'success') {
      navigateToConfirm(validAddressRef.current);
    }
  }, [trimmedInputAddress, validation, navigateToConfirm, validAddressRef]);

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

  const { recentReceivers } = useRecentReceivers(address);

  return (
    <Page>
      <BackButton />
      <div style={contentStyle}>
        <SearchInput
          value={searchParamsAddress}
          onChange={onChange}
          onSubmit={onSubmit}
          onPaste={onPaste}
          onBlur={onInputBlur}
          assetCurrency={FrontendCryptoCurrencyEnum.Ton}
        />
        <ContentWrap>
          {displayControls && (
            <>
              <ScanButtonCell onSuccessScan={onPaste} />
              <RecentResults
                avatarSize={avatarSize}
                onClick={navigateToConfirm}
                recentReceivers={recentReceivers}
              />
            </>
          )}
          {displayValidContact && (
            <ValidContactCell
              onSubmit={onSubmit}
              avatarSize={avatarSize}
              assetCurrency={FrontendCryptoCurrencyEnum.Ton}
              trimmedInputAddress={trimmedInputAddress}
              validAddress={validAddressRef.current}
            />
          )}
          <Errors
            error={error}
            assetCurrency={FrontendCryptoCurrencyEnum.Ton}
          />
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

export default ReceiverSearch;
