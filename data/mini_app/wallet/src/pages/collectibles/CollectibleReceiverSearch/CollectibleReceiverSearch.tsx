import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import API from 'api/getGems';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ValidationError } from 'types/receiverSearch';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import {
  selectClearDate,
  setRecentWithdrawsClearDate,
} from 'reducers/receiverSearch/collectibleReceiverSearchSlice';

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

const validate = (address: string, abortController: AbortController) => {
  return API.Collectibles.validateAddress(address, {
    signal: abortController.signal,
  })
    .then((res) => {
      const { resolvedAddress, valid, errorCode } = res.data;
      if (resolvedAddress && valid) {
        return {
          typename: 'success' as const,
          address: resolvedAddress,
        };
      } else {
        let error: ValidationError;
        switch (errorCode) {
          case 'invalid_domain':
            error = 'invalid_domain';
            break;
          case 'invalid_number_of_characters':
            error = 'invalid_length';
            break;
          case 'withdraw_to_yourself_is_forbidden':
            error = 'yourself';
            break;
          case 'address_forbidden':
            error = 'address_forbidden';
            break;
          default:
            error = 'invalid_address';
        }
        return {
          typename: 'error' as const,
          error: error,
        };
      }
    })
    .catch((error) => {
      if (error.message === 'canceled') {
        return {
          typename: 'canceled' as const,
        };
      }
      return {
        typename: 'error' as const,
        error: 'invalid_address' as ValidationError,
      };
    });
};

const useRecentReceivers = (userAddress: string) => {
  const recentWithdrawsClearDate = useAppSelector(selectClearDate);
  const { data: recentReceivers } = useQuery({
    queryKey: queryKeys.getGems.collectibleRecentReceivers(
      userAddress,
      recentWithdrawsClearDate,
    ),
    queryFn: async () => {
      const { data } = await API.Collectibles.suggestNftTransferAddress(
        userAddress,
        5,
      );

      return data
        .filter(
          (entry) =>
            new Date(entry.date).getTime() > (recentWithdrawsClearDate || 0),
        )
        .map((recentReceiver) => {
          return {
            id: recentReceiver.address,
            walletAddress: recentReceiver.address,
            currency: FrontendCryptoCurrencyEnum.Ton,
            createdAt: recentReceiver.date,
          };
        });
    },
  });

  return { recentReceivers };
};

const CollectibleReceiverSearch = () => {
  const { address } = useAppSelector((state) => state.scw);

  const {
    onChange,
    searchParamsAddress,
    trimmedInputAddress,
    avatarSize,
    contentStyle,
    onInputBlur,
  } = useReceiverSearch();

  const collectibleAddress = useParams().address as string;

  const onPaste = (value: ParsedAddress) => {
    window.Telegram.WebApp.expand();
    onChange(value.address);
    window.Telegram.WebApp.closeScanQrPopup();
  };

  const assetCurrency = FrontendCryptoCurrencyEnum.Ton;
  const { validation, error, validAddressRef } = useValidateWalletAddress({
    currentUserAddress: address,
    address: trimmedInputAddress,
    validateFunction: validate,
  });

  const navigate = useNavigate();

  const navigateToConfirm = useCallback(
    (recipientAddress: string) => {
      navigate(
        generatePath(routePaths.COLLECTIBLE_SEND_CONFIRM, {
          address: collectibleAddress,
          recipientAddress,
        }),
      );
    },
    [collectibleAddress, navigate],
  );

  const onSubmit = useCallback(() => {
    if (trimmedInputAddress && validation === 'success') {
      navigateToConfirm(validAddressRef.current);
    }
  }, [trimmedInputAddress, validation, navigateToConfirm, validAddressRef]);

  const { recentReceivers } = useRecentReceivers(address);

  const dispatch = useDispatch();
  const onRecentResultsClear = () => {
    dispatch(setRecentWithdrawsClearDate());
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
      <BackButton />
      <div style={contentStyle}>
        <SearchInput
          value={searchParamsAddress}
          onChange={onChange}
          onSubmit={onSubmit}
          onPaste={onPaste}
          onBlur={onInputBlur}
          assetCurrency={assetCurrency}
        />
        <ContentWrap>
          {displayControls && (
            <>
              <ScanButtonCell onSuccessScan={onPaste} />
              <RecentResults
                onClear={onRecentResultsClear}
                avatarSize={avatarSize}
                onClick={(walletAddress) => {
                  navigateToConfirm(walletAddress);
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

export default CollectibleReceiverSearch;
