import { useAccountJettons, useAccountTonAsset } from 'query/scw/account';
import { useBaseRate } from 'query/wallet/rates/useBaseRate';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { CRYPTO_FRACTION, DEFAULT_CRYPTO_FRACTION } from 'config';

import { RootState, useAppSelector } from 'store';

import Form, { FormRefCurrentProps } from 'containers/common/Form/Form';
import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import Avatar from 'components/Avatar/Avatar';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { Cell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { debounceFunc } from 'utils/common/debounce';
import { getHttpImageUrl } from 'utils/common/image';
import { divide, multiply, plus } from 'utils/common/math';
import {
  AVERAGE_JETTON_TRANSFER_FEE,
  AVERAGE_TON_TRANSFER_FEE,
  convertFromDecimal,
} from 'utils/scw/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useLocaleStrToNumFormatter } from 'hooks/utils/useLocaleStrToNumFormatter';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowDownMaterialSVG } from 'images/arrow_down_material.svg';
import { ReactComponent as ArrowVerticalSVG } from 'images/arrows_vertical.svg';

import styles from './Send.module.scss';

const Send: FC = () => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const [searchParams] = useSearchParams();
  const { languageCode, fiatCurrency } = useAppSelector(
    (state: RootState) => state.settings,
  );
  const { address: scwAddress } = useAppSelector((state) => state.scw);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<FormRefCurrentProps>(null);

  const assetCurrency =
    searchParams.get('assetCurrency') || FrontendCryptoCurrencyEnum.Ton;
  const receiverAddress = searchParams.get('address');
  const from = searchParams.get('from');

  const { data: assets, isLoading: isJettonsLoading } = useAccountJettons();
  const { data: tonAsset, isLoading: isTonLoading } = useAccountTonAsset();

  const isTon = assetCurrency === 'TON';
  const isJetton = !isTon;

  const asset = isTon
    ? tonAsset
    : assets?.find((item) => item.currency === assetCurrency);

  const { baseRate = 0 } = useBaseRate(FrontendCryptoCurrencyEnum.Ton);

  const [stringAmount, setStringAmount] = useState('');
  const [numberAmount, setNumberAmount] = useState(0);
  const [error, setError] = useState<
    'max_limit' | 'insufficient_ton_for_fee' | false
  >(false);
  const formatStrToNum = useLocaleStrToNumFormatter(stringAmount);

  const assetBalance = asset?.balance;
  const tonAssetBalance = tonAsset?.balance;

  const canSend =
    receiverAddress &&
    scwAddress &&
    numberAmount > 0 &&
    assetBalance &&
    assetBalance >= numberAmount;
  const isSendButtonDisabled =
    !canSend || isJettonsLoading || isTonLoading || !!error;

  const validateInputNumber = useCallback(
    debounceFunc((num: number) => {
      if (assetBalance && num > assetBalance) {
        setError('max_limit');
      } else if (
        !isJetton &&
        tonAssetBalance !== undefined &&
        plus(num, AVERAGE_TON_TRANSFER_FEE) >= tonAssetBalance
      ) {
        setError('insufficient_ton_for_fee');
      } else if (
        isJetton &&
        tonAssetBalance !== undefined &&
        tonAssetBalance <= AVERAGE_JETTON_TRANSFER_FEE
      ) {
        setError('insufficient_ton_for_fee');
      }
    }, 500),
    [assetBalance, tonAssetBalance, isJetton],
  );

  useEffect(() => {
    if (error && formRef.current) {
      formRef.current.shake();
    }
  }, [error]);

  const onInputChange = (value: string) => {
    setError(false);
    const [strNum, num] = formatStrToNum(value, {
      locale: languageCode,
      isAllowed: (value: number) => value <= 999_999.999999999 && value >= 0,
      maximumFractionDigits: !isJetton
        ? CRYPTO_FRACTION[FrontendCryptoCurrencyEnum.Ton]
        : asset?.decimals ?? DEFAULT_CRYPTO_FRACTION,
    });

    if (strNum === null || num === null) return;

    setStringAmount(strNum);
    setNumberAmount(num);

    validateInputNumber(num);
  };

  const onSendClick = async () => {
    if (asset && receiverAddress) {
      isJetton
        ? navigate({
            pathname: routePaths.SCW_SEND_JETTON_CONFIRMATION,
            search: createSearchParams({
              address: receiverAddress,
              amount: convertFromDecimal(
                numberAmount,
                asset.decimals,
              ).toString(),
              decimals: asset.decimals.toString(),
              jettonSymbol: assetCurrency,
              senderJettonAddress: asset.walletAddress,
            }).toString(),
          })
        : navigate({
            pathname: routePaths.SCW_SEND_TON_CONFIRMATION,
            search: createSearchParams({
              address: receiverAddress,
              amount: convertFromDecimal(numberAmount).toString(),
            }).toString(),
          });
    }
  };

  const bottom = useMemo(() => {
    if (error) {
      switch (error) {
        case 'max_limit':
          return t('send.invalid_max');
        case 'insufficient_ton_for_fee':
          return t('scw.send.insufficient_ton_for_fee', {
            feeAmount: printCryptoAmount({
              amount: isJetton
                ? AVERAGE_JETTON_TRANSFER_FEE
                : AVERAGE_TON_TRANSFER_FEE,
              currency: FrontendCryptoCurrencyEnum.Ton,
              languageCode,
              currencyDisplay: 'code',
            }),
          });
        default:
          return error;
      }
    } else if (baseRate) {
      const assetToTonRate = asset?.tonBalance
        ? divide(asset?.tonBalance, asset?.balance)
        : 0;

      const assetToFiatRate = assetToTonRate
        ? multiply(assetToTonRate, baseRate)
        : 0;

      const fiat = printFiatAmount({
        languageCode,
        currencyDisplay: 'narrowSymbol',
        amount: numberAmount
          ? multiply(assetToFiatRate, numberAmount)
          : assetToFiatRate,
        currency: fiatCurrency,
      });

      if (!numberAmount) {
        return (
          <>
            <span>
              {printCryptoAmount({
                languageCode,
                currencyDisplay: 'code',
                amount: 1,
                currency: assetCurrency,
              })}
            </span>
            &nbsp;â‰ˆ&nbsp;
            <span>{fiat}</span>
          </>
        );
      } else {
        return fiat;
      }
    } else {
      return <>&nbsp;</>;
    }
  }, [
    error,
    baseRate,
    t,
    asset?.tonBalance,
    asset?.balance,
    languageCode,
    numberAmount,
    fiatCurrency,
    assetCurrency,
  ]);

  if (!receiverAddress) {
    return null; // TODO decide what to do in this case
  }

  return (
    <Page>
      <BackButton />
      <Form
        autoFocus
        onChange={onInputChange}
        bottom={bottom}
        value={stringAmount}
        ref={inputRef}
        hasError={!!error}
        formRef={formRef}
        currency={assetCurrency}
        top={
          <div
            onClick={() => {
              if (from === 'receiverSearch') {
                navigate(-1);
              } else {
                navigate({
                  pathname: routePaths.SCW_RECEIVER_SEARCH,
                  search: createSearchParams({
                    assetCurrency,
                  }).toString(),
                });
              }
            }}
            className={themeClassName('formTop')}
          >
            <OperationInfo
              operation={t('send.operation')}
              merchant={squashAddress(receiverAddress)}
              avatar={
                <OperationIcon
                  size={theme === 'apple' ? 32 : 24}
                  gateway="withdraw_onchain"
                />
              }
            />
            {theme === 'apple' && <ArrowVerticalSVG />}
            {theme === 'material' && (
              <ArrowDownMaterialSVG className={styles.arrowDown} />
            )}
          </div>
        }
      />
      {asset && assetBalance && (
        <BottomContent>
          <div className={themeClassName('bottom')}>
            <Cell
              start={
                <Cell.Part type="avatar">
                  <Avatar
                    size={theme === 'apple' ? 40 : 46}
                    src={getHttpImageUrl(asset.image)}
                  />
                </Cell.Part>
              }
            >
              <Cell.Text
                inverted
                bold
                description={t('scw.send.from', {
                  assetName:
                    assetCurrency === FrontendCryptoCurrencyEnum.Ton
                      ? t('common.ton_space')
                      : asset.name ?? assetCurrency,
                })}
                title={printCryptoAmount({
                  languageCode,
                  amount: assetBalance,
                  currency: assetCurrency,
                  currencyDisplay: 'code',
                })}
              />
            </Cell>
          </div>
        </BottomContent>
      )}
      <MainButton
        progress={isJettonsLoading || isTonLoading}
        disabled={isSendButtonDisabled}
        color={
          isSendButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : window.Telegram.WebApp.themeParams.button_color
        }
        textColor={
          isSendButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : window.Telegram.WebApp.themeParams.button_text_color
        }
        onClick={onSendClick}
        text={
          stringAmount
            ? t('send.button', {
                value: printCryptoAmount({
                  languageCode,
                  amount: numberAmount,
                  currencyDisplay: 'code',
                  currency: assetCurrency,
                }),
              })
            : t('send.button_empty', { currency: assetCurrency })
        }
      />
    </Page>
  );
};

export default Send;
