import classNames from 'classnames';
import { LottieRefCurrentProps } from 'lottie-react';
import { useBaseRate } from 'query/wallet/rates/useBaseRate';
import { useValidateAmount } from 'query/wallet/withdrawals/useValidateAmount';
import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import API from 'api/wallet';
import {
  FiatCurrency,
  FrontendCryptoCurrencyEnum,
  ValidateAmountStatusEnum,
} from 'api/wallet/generated';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import {
  CRYPTO_FRACTION,
  DEFAULT_FIAT_FRACTION,
  WALLET_SUPPORT_BOT_LINK,
} from 'config';

import { useAppSelector } from 'store';

import { create as createSendRequest } from 'reducers/sendRequest/sendRequestSlice';
import {
  updatePreferFiat,
  updatePreferredAsset,
} from 'reducers/settings/settingsSlice';

import AssetCell from 'containers/common/AssetCell/AssetCell';
import Form, { FormRefCurrentProps } from 'containers/common/Form/Form';
import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import Avatar from 'components/Avatar/Avatar';
import { BackButton } from 'components/BackButton/BackButton';
import { BackgroundBlur } from 'components/BackgroundBlur/BackgroundBlur';
import { Cell } from 'components/Cells';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import PasscodeVerify from 'components/PasscodeVerify/PasscodeVerify';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printFullName } from 'utils/common/common';
import {
  isFiat,
  isTgTransferAllowed,
  printCryptoAmount,
  printFiatAmount,
  printNumber,
} from 'utils/common/currency';
import { Langs } from 'utils/common/lang';
import { logEvent } from 'utils/common/logEvent';
import { divide, floor, multiply } from 'utils/common/math';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useAsset } from 'hooks/common/useAsset';
import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useLocaleStrToNumFormatter } from 'hooks/utils/useLocaleStrToNumFormatter';
import useOnClickOutside from 'hooks/utils/useOnClickOutside';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowDownMaterialSVG } from 'images/arrow_down_material.svg';
import { ReactComponent as ArrowVerticalSVG } from 'images/arrows_vertical.svg';
import { ReactComponent as TONSpaceSVG } from 'images/ton_space_circle.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import styles from './Send.module.scss';

const InvertButtonAnimation = lazy(
  () =>
    import('components/animations/InvertButtonAnimation/InvertButtonAnimation'),
);

const printCurrency = ({
  amount,
  currency,
  languageCode,
}: {
  amount: string | number;
  currency: FrontendCryptoCurrencyEnum | FiatCurrency;
  languageCode: Langs;
}) => {
  const isFiatCurrency = isFiat(currency);

  if (isFiatCurrency) {
    return printFiatAmount({
      amount,
      currency: currency,
      languageCode,
      currencyDisplay: 'code',
    });
  }

  return printCryptoAmount({
    amount,
    currency: currency,
    languageCode,
    currencyDisplay: 'code',
    maximumFractionDigits: CRYPTO_FRACTION[currency],
  });
};

const ANIMATION_DURATION = 300;

const Send: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const snackbarContext = useContext(SnackbarContext);
  const address = searchParams.get('address') || undefined;
  const hasToGoBack = searchParams.get('back');
  const { preferFiat, preferredAsset } = useAppSelector(
    (state) => state.settings,
  );
  const scw = useAppSelector((state) => state.scw);
  const { featureFlags } = useAppSelector((state) => state.user);

  const assetCurrencyFromSearch = searchParams.get('assetCurrency') as
    | FrontendCryptoCurrencyEnum
    | undefined;
  let assetCurrency: FrontendCryptoCurrencyEnum =
    FrontendCryptoCurrencyEnum.Ton;
  if (
    assetCurrencyFromSearch &&
    (address || isTgTransferAllowed(assetCurrencyFromSearch, featureFlags))
  ) {
    assetCurrency = assetCurrencyFromSearch;
  } else if (
    preferredAsset &&
    (address || isTgTransferAllowed(preferredAsset, featureFlags))
  ) {
    assetCurrency = preferredAsset;
  }

  const availableAssets = useAppSelector((state) =>
    [...state.wallet.assets]
      .filter(({ currency }) => isTgTransferAllowed(currency, featureFlags))
      .sort(
        (assetPrev, assetNext) => assetNext.fiatBalance - assetPrev.fiatBalance,
      ),
  );

  const { receiver } = useAppSelector((state) => state.session);

  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const { balance = 0 } = useAsset(assetCurrency);
  const { baseRate = 0 } = useBaseRate(assetCurrency);
  const { fiatCurrency, languageCode } = useAppSelector(
    (state) => state.settings,
  );
  const { passcodeType, requiredOnOpen, openUnlocked } = useAppSelector(
    (state) => state.passcode,
  );
  const enteringOpenPasscode = passcodeType && requiredOnOpen && !openUnlocked;
  const [enterPasscode, setEnterPasscode] = useState(false);
  const passcodeOpen = enterPasscode || enteringOpenPasscode;

  const [inputCurrency, setInputCurrency] = useState<
    FrontendCryptoCurrencyEnum | FiatCurrency
  >(
    (searchParams.get('currency') as
      | FiatCurrency
      | FrontendCryptoCurrencyEnum) ||
      (!address ? (preferFiat ? fiatCurrency : assetCurrency) : assetCurrency),
  );

  const isCrypto = inputCurrency === assetCurrency;

  const equivalentCurrency = isCrypto ? fiatCurrency : assetCurrency;
  const toggleInputCurrency = () => {
    if (!address) {
      dispatch(updatePreferFiat(!isFiat(inputCurrency)));
    }
    setInputCurrency((currency) =>
      isFiat(currency) ? assetCurrency : fiatCurrency,
    );
  };

  const [amountInput, setAmountInput] = useState(
    (Number(searchParams.get('value')) > 0 && searchParams.get('value')) || '',
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<FormRefCurrentProps>(null);
  const selectCurrencyRef = useRef<HTMLDivElement>(null);
  const balanceRef = useRef<HTMLDivElement>(null);
  const canSelectAsset = !address && availableAssets.length > 1;
  const [selectCurrency, setSelectCurrency] = useState(
    canSelectAsset && !assetCurrencyFromSearch,
  );
  const firstTimeShowSelect = useRef(!assetCurrencyFromSearch);

  const changeSelectCurrencyAppearance = (value: boolean) => {
    if (!passcodeOpen) {
      inputRef.current?.focus();
    }
    setSelectCurrency(value);
  };

  const canChangeReceiver = address && address !== scw.address;

  useOnClickOutside(
    selectCurrencyRef,
    () => {
      changeSelectCurrencyAppearance(false);
    },
    !firstTimeShowSelect.current,
  );

  const invertButton = useRef<LottieRefCurrentProps>(null);

  const [sending, setSending] = useState(false);
  const formatStrToNum = useLocaleStrToNumFormatter(amountInput);

  const [error, setError] = useState<ReactNode>(false);

  const isPurchaseAvailable = usePurchaseAvailability();

  const handleCurrencyChange = (currency: FrontendCryptoCurrencyEnum) => {
    setInputCurrency(currency);

    changeSelectCurrencyAppearance(false);
    dispatch(updatePreferredAsset(currency));
    setSearchParams(
      (prev) => {
        prev.set('assetCurrency', currency);
        return prev;
      },
      { replace: true },
    );
    inputRef.current?.focus();
  };

  const parseNum = (value: string) => {
    return (
      formatStrToNum(value, {
        locale: languageCode,
        isAllowed: (value: number) => value <= 999_999.999999999 && value >= 0,
        maximumFractionDigits: !isFiat(inputCurrency)
          ? CRYPTO_FRACTION[assetCurrency]
          : DEFAULT_FIAT_FRACTION,
      })[1] || 0
    );
  };

  const cryptoAmount = isCrypto
    ? parseNum(amountInput)
    : floor(
        divide(parseNum(amountInput), baseRate, CRYPTO_FRACTION[assetCurrency]),
        CRYPTO_FRACTION[assetCurrency],
      );

  const fullName = printFullName(receiver?.first_name, receiver?.last_name);
  const buttonDisabled = !!error || cryptoAmount === 0;

  const { isFetching: validating } = useValidateAmount(
    {
      cryptoAmount: cryptoAmount,
      assetCurrency,
      address: address,
      receiverId: !address ? receiver?.id : undefined,
    },
    {
      timeout: 500,
      onError: (error) => {
        if (
          error.status === ValidateAmountStatusEnum.MinLimitExceeded &&
          error.min_limit
        ) {
          setError(
            t('send.invalid_min', {
              value: printCryptoAmount({
                amount: error.min_limit,
                currency: assetCurrency,
                languageCode,
                currencyDisplay: 'code',
                maximumFractionDigits: CRYPTO_FRACTION[assetCurrency],
              }),
            }),
          );
        }
        if (
          error.status === ValidateAmountStatusEnum.InsufficientFunds &&
          error.need_to_buy
        ) {
          setError(
            <>
              {t('send.invalid_max')}{' '}
              <div
                className={styles.link}
                onClick={(e) => {
                  if (!isPurchaseAvailable()) {
                    e.preventDefault();
                  }

                  const value = error.need_to_buy
                    ? error.need_to_buy.toString()
                    : '';

                  navigate({
                    pathname: generatePath(routePaths.PURCHASE, {
                      assetCurrency,
                    }),
                    search: createSearchParams({
                      value,
                    }).toString(),
                  });
                }}
              >
                {t('send.buy')}
              </div>
            </>,
          );
        }
        if (error.status === ValidateAmountStatusEnum.InvalidAmount) {
          const fixedAmount = error.fixed_amount;
          setError(
            <>
              {t('send.insufficient_balance', {
                amount: error.fee,
                currency: assetCurrency,
              })}{' '}
              {fixedAmount && (
                <a
                  className={styles.link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    let value: string;
                    if (isCrypto) {
                      value = printCryptoAmount({
                        amount: fixedAmount,
                        currency: assetCurrency,
                        languageCode,
                        maximumFractionDigits: CRYPTO_FRACTION[assetCurrency],
                      });
                    } else {
                      value = printNumber({
                        value: floor(
                          multiply(
                            baseRate,
                            fixedAmount,
                            DEFAULT_FIAT_FRACTION,
                          ),
                          DEFAULT_FIAT_FRACTION,
                        ),
                        languageCode,
                        options: {
                          maximumFractionDigits: DEFAULT_FIAT_FRACTION,
                        },
                      });
                    }
                    onInputChange(value);

                    inputRef.current?.style.setProperty('width', '99%');
                    // Hack to fix bug with visual jumping of input on IOS
                    // https://wallet-bot.atlassian.net/browse/WAL-56
                    setTimeout(() => {
                      inputRef.current?.style.setProperty('width', '100%');
                    }, 0);
                  }}
                >
                  {t('send.fix')}
                </a>
              )}
            </>,
          );
        }
      },
      onSuccess: () => {
        // TODO NEED TO CATCH balance
        setError(false);
      },
    },
  );

  const handleSendClick = async () => {
    if (passcodeType) {
      setEnterPasscode(true);
    } else {
      handleSend();
    }
  };

  const handleSend = async () => {
    setEnterPasscode(false);
    if (!error) {
      setSending(true);
      let promise;
      if (address) {
        // TODO: Add passcode to request, and handle failure scenario
        promise = API.Withdrawals.createWithdrawRequest(
          cryptoAmount,
          assetCurrency,
          parseNum(amountInput) === balance,
          address,
        ).then(({ data }) => {
          dispatch(createSendRequest(data));
          navigate(
            generatePath(routePaths.SEND_REQUEST_CONFIRMATION, {
              assetCurrency: assetCurrency,
            }),
          );
        });
      } else {
        promise = API.Transfers.createTransferRequest({
          amount: cryptoAmount,
          currency: assetCurrency,
        }).then((response) => {
          API.Transfers.processRequest(response.data.transfer_request_id);
        });
      }
      promise
        .then(() => {
          if (!address) {
            window.Telegram.WebApp.close(); // Closing wallet after successful tg transfer
          }
        })
        .catch((error) => {
          setSending(false);
          if (error.response.data.code === 'withdraw_forbidden') {
            snackbarContext.showSnackbar({
              before: <WarningSVG />,
              text: t('send.recipient_is_forbidden'),
              action: (
                <a href={WALLET_SUPPORT_BOT_LINK}>
                  {t('common.contact_support')}
                </a>
              ),
              actionPosition: 'bottom',
            });
          }
        });
    }
  };

  const printBottom = () => {
    if (error) {
      return <span>{error}</span>;
    } else if (parseNum(amountInput) > 0) {
      return (
        <div className={styles.estimate}>
          ≈&nbsp;
          <span>
            {printCurrency({
              amount: isFiat(inputCurrency)
                ? floor(
                    divide(
                      parseNum(amountInput),
                      baseRate,
                      CRYPTO_FRACTION[assetCurrency],
                    ),
                    CRYPTO_FRACTION[assetCurrency],
                  )
                : baseRate * parseNum(amountInput),
              currency: equivalentCurrency,
              languageCode,
            })}
          </span>
        </div>
      );
    } else {
      return (
        <div className={styles.estimate}>
          <span>
            {printCurrency({
              amount: 1,
              currency: inputCurrency,
              languageCode,
            })}
          </span>
          &nbsp;≈&nbsp;
          <span>
            {printCurrency({
              amount: isFiat(equivalentCurrency)
                ? baseRate
                : floor(divide(1, baseRate, CRYPTO_FRACTION[assetCurrency])),
              currency: equivalentCurrency,
              languageCode,
            })}
          </span>
        </div>
      );
    }
  };
  useDidUpdate(() => {
    if (error) {
      formRef.current?.shake();
    }
  }, [!!error]);

  const onInputChange = (value: string) => {
    const [strNum, num] = formatStrToNum(value, {
      locale: languageCode,
      isAllowed: (value: number) => value <= 999_999.999999999 && value >= 0,
      maximumFractionDigits: !isFiat(inputCurrency)
        ? CRYPTO_FRACTION[assetCurrency]
        : DEFAULT_FIAT_FRACTION,
    });

    if (strNum === null || num === null) return;

    changeSelectCurrencyAppearance(false);
    setAmountInput(strNum);
    setSearchParams(
      (prev) => {
        prev.set('value', num.toString());
        return prev;
      },
      {
        replace: true,
      },
    );
  };

  let formTop;

  useEffect(() => {
    const isExternal = !!address;

    logEvent('Input receiver', {
      withdraw_type: isExternal ? 'external' : 'internal',
    });
  }, []);

  useEffect(() => {
    if (inputRef.current && passcodeOpen) {
      inputRef.current?.blur();
    }
  }, [inputRef, passcodeOpen]);

  if (address && address === scw.address) {
    formTop = (
      <OperationInfo
        merchant={t('send.your_ton_space')}
        operation={t('send.operation')}
        avatar={
          <TONSpaceSVG
            width={theme === 'apple' ? 32 : 24}
            height={theme === 'apple' ? 32 : 24}
          />
        }
      ></OperationInfo>
    );
  } else if (address) {
    formTop = (
      <OperationInfo
        operation={t('send.operation')}
        merchant={
          isTONDomain(address) || isWeb3Domain(address)
            ? address
            : squashAddress(address)
        }
        avatar={
          <OperationIcon
            size={theme === 'apple' ? 32 : 24}
            gateway="withdraw_onchain"
          />
        }
      />
    );
  } else {
    formTop = (
      <OperationInfo
        operation={t('send.operation')}
        merchant={fullName}
        avatar={
          <Avatar
            size={theme === 'apple' ? 32 : 24}
            src={receiver?.photo_url}
          />
        }
      />
    );
  }

  return (
    <Page>
      <BackButton
        onClick={() => {
          if (enterPasscode) {
            setEnterPasscode(false);
          } else {
            hasToGoBack ? navigate(-1) : navigate(routePaths.MAIN);
          }
        }}
      />
      <BackgroundBlur
        active={selectCurrency && !firstTimeShowSelect.current}
        timeout={ANIMATION_DURATION}
      />
      <div className={themeClassName('root')}>
        <div className={classNames(themeClassName('content'))}>
          <Form
            formRef={formRef}
            currency={inputCurrency}
            hasError={!!error}
            ref={inputRef}
            top={
              canChangeReceiver ? (
                <Link
                  className={themeClassName('formTop')}
                  to={{
                    pathname: generatePath(routePaths.RECEIVER_SEARCH, {
                      assetCurrency,
                    }),
                  }}
                >
                  {formTop}
                  {theme === 'apple' && <ArrowVerticalSVG />}
                  {theme === 'material' && (
                    <ArrowDownMaterialSVG className={styles.arrowDown} />
                  )}
                </Link>
              ) : (
                formTop
              )
            }
            onChange={onInputChange}
            autoFocus={passcodeOpen ? undefined : true}
            value={amountInput}
            after={
              <Suspense fallback={<div style={{ width: 40, height: 40 }} />}>
                <InvertButtonAnimation
                  lottieRef={invertButton}
                  onClick={() => {
                    invertButton.current?.goToAndPlay(0);
                    inputRef.current?.focus();
                    toggleInputCurrency();
                  }}
                />
              </Suspense>
            }
            bottom={printBottom()}
            onSubmit={handleSend}
            isDisabled={buttonDisabled || sending || validating}
          />
        </div>

        <CSSTransition
          in={selectCurrency}
          nodeRef={selectCurrencyRef}
          timeout={ANIMATION_DURATION}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exitActive,
            exitActive: styles.exitActive,
          }}
          unmountOnExit
          mountOnEnter
          onExited={() => {
            firstTimeShowSelect.current = false;
          }}
        >
          <section
            ref={selectCurrencyRef}
            className={classNames(styles.balanceContainer, styles.open)}
          >
            {!firstTimeShowSelect.current && (
              <SectionHeader className={themeClassName('chooseAssetsTitle')}>
                {t('send.choose_asset')}
              </SectionHeader>
            )}
            <div className={themeClassName('assets')}>
              <Cell.List separator={theme === 'material'}>
                {availableAssets.map((asset) => (
                  <AssetCell
                    key={asset.address}
                    type="select"
                    currency={asset.currency}
                    balance={asset.balance}
                    checked={asset.currency === assetCurrency}
                    onClick={() => handleCurrencyChange(asset.currency)}
                    iconSize={40}
                    inverted
                    bold
                    isRoundAssetsBalance={false}
                  />
                ))}
              </Cell.List>
            </div>
          </section>
        </CSSTransition>
        <CSSTransition
          in={!selectCurrency}
          nodeRef={balanceRef}
          timeout={ANIMATION_DURATION}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exitActive,
            exitActive: styles.exitActive,
          }}
          unmountOnExit
          mountOnEnter
        >
          <div
            className={classNames(
              styles.balanceContainer,
              canSelectAsset && styles.tappable,
            )}
            ref={balanceRef}
          >
            <Cell
              onClick={
                canSelectAsset
                  ? () => {
                      changeSelectCurrencyAppearance(true);
                    }
                  : undefined
              }
              start={
                <Cell.Part type="avatar">
                  <CurrencyLogo
                    variant={address ? 'complex' : 'simple'}
                    currency={assetCurrency}
                  />
                </Cell.Part>
              }
              tappable={canSelectAsset}
              chevron={canSelectAsset}
            >
              <Cell.Text
                title={printCryptoAmount({
                  amount: balance,
                  currency: assetCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                  maximumFractionDigits: CRYPTO_FRACTION[assetCurrency],
                })}
                description={t('send.balance')}
                bold
                inverted
              />
            </Cell>
          </div>
        </CSSTransition>
        {!passcodeOpen && (
          <MainButton
            disabled={buttonDisabled}
            color={
              buttonDisabled
                ? customPalette[theme][colorScheme].button_disabled_color
                : window.Telegram.WebApp.themeParams.button_color
            }
            textColor={
              buttonDisabled
                ? customPalette[theme][colorScheme].button_disabled_text_color
                : window.Telegram.WebApp.themeParams.button_text_color
            }
            onClick={handleSendClick}
            text={
              parseNum(amountInput) > 0
                ? t('send.button', {
                    value: printCryptoAmount({
                      amount: cryptoAmount,
                      currency: assetCurrency,
                      languageCode,
                      currencyDisplay: 'code',
                      maximumFractionDigits: CRYPTO_FRACTION[assetCurrency],
                    }),
                  })
                : t('send.button_empty', {
                    currency: assetCurrency,
                  })
            }
            progress={sending || validating}
          />
        )}
      </div>
      {enterPasscode && <PasscodeVerify onSuccess={handleSend} />}
    </Page>
  );
};

export default memo(Send);
