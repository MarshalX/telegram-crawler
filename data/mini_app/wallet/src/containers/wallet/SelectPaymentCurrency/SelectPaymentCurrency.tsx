import {
  useAvailableFiatCurrencies,
  useCountryToCurrency,
  useSupportedCurrencies,
} from 'query/wallet/currencies';
import { useLastUsedPaymentCurrencies } from 'query/wallet/user';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate } from 'react-router-dom';

import API from 'api/wallet';
import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { useAppDispatch, useAppSelector } from 'store';

import { setPaymentCurrency } from 'reducers/settings/settingsSlice';

import { Cell } from 'components/Cells';
import { Checkmark } from 'components/Checkmark/Checkmark';
import CurrencyFlagIcon from 'components/CurrencyFlagIcon/CurrencyFlagIcon';
import { MainButton } from 'components/MainButton/MainButton';
import { SearchInput } from 'components/SearchInput/SearchInput';
import Section from 'components/Section/Section';
import NotFoundUtka from 'components/animations/NotFoundUtkaAnimation/NotFoundUtka';

import { logEvent } from 'utils/common/logEvent';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './SelectPaymentCurrency.module.scss';

export const SelectPaymentCurrency = ({
  onChoose,
  cryptoCurrency,
}: {
  onChoose: (currency: FiatCurrency) => void;
  cryptoCurrency?: FrontendCryptoCurrencyEnum;
}) => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: recentlyUsedCurrencies = [],
    refetch: refetchLastUsedPaymentCurrencies,
  } = useLastUsedPaymentCurrencies();
  const { data: currencies = [] } = useSupportedCurrencies();
  const { data: countryToCurrency } = useCountryToCurrency();
  const { data: availableFiatCurrencies } = useAvailableFiatCurrencies();

  const paymentCurrency = useAppSelector(
    (state) => state.settings.paymentCurrency,
  );

  const { userCountryPhoneAlpha2Code, userCountryAlpha2Code } = useAppSelector(
    (state) => state.p2pUser,
  );

  const resolvedCurrencies = useMemo(() => {
    return currencies;
  }, [currencies]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    logEvent('Purchase. Opened fiat selection windows');
  }, []);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const countryAlpha2Code = userCountryPhoneAlpha2Code || userCountryAlpha2Code;

  const currencyBasedOnIp =
    countryAlpha2Code && countryToCurrency
      ? countryToCurrency[countryAlpha2Code]
      : undefined;

  const isRecentlyUsedCurrencies = useMemo(() => {
    return recentlyUsedCurrencies.length > 0;
  }, [recentlyUsedCurrencies.length]);

  const firstSectionCurrencies =
    recentlyUsedCurrencies.length > 0
      ? recentlyUsedCurrencies
      : currencyBasedOnIp
      ? [currencyBasedOnIp]
      : [];

  const searchingCurrencies = resolvedCurrencies.filter(
    (currency) =>
      search &&
      (currency.toLowerCase().includes(search.toLowerCase()) ||
        // eslint-disable-next-line
        // @ts-ignore next-line
        t(`currency.${currency}`).toLowerCase().includes(search.toLowerCase())),
  );

  const otherCurrencies = resolvedCurrencies.filter(
    (currency) => !firstSectionCurrencies.includes(currency),
  );

  const selectedCurrency =
    paymentCurrency || firstSectionCurrencies[0] || currencyBasedOnIp || 'EUR';

  const { featureFlags } = useAppSelector((state) => state.user);
  const isNewPurchaseFlow = featureFlags.rcards;

  const showRestrictionPopup = (currency: FiatCurrency) => {
    const canProcessRuPurchase =
      isNewPurchaseFlow &&
      ((currency === 'RUB' && !availableFiatCurrencies) ||
        (currency === 'RUB' &&
          availableFiatCurrencies?.availability_flags.find((flag) => {
            return flag.currency === 'RUB' && flag.is_available;
          })));

    const title = (() => {
      if (currency === 'UAH') {
        return t('buy.russian_restrictions_popup_title_uah');
      } else if (currency === 'BYN') {
        return t('buy.russian_restrictions_popup_title_by');
      }

      return canProcessRuPurchase
        ? t('buy.ru_cards_popup_title')
        : t('buy.russian_restrictions_popup_title');
    })();

    window.Telegram.WebApp.showPopup(
      {
        message: title,
        buttons: [
          {
            id: 'ru',
            text: canProcessRuPurchase
              ? t('buy.ru_cards_popup_buy')
              : t('buy.russian_restrictions_popup_ru'),
          },
          {
            id: 'other',
            text: t('buy.russian_restrictions_popup_other'),
          },
        ],
      },
      async (id) => {
        if (id === 'ru') {
          if (canProcessRuPurchase && cryptoCurrency) {
            await API.Purchases.createPurchaseWithRuBankCard({
              fiat_currency: currency,
              crypto_currency: cryptoCurrency,
            });

            window.Telegram.WebApp.close();
          } else {
            navigate({
              pathname: routePaths.P2P_HOME,
              search: createSearchParams({
                backTo: 'true',
                type: 'SALE',
              }).toString(),
            });
          }
        }
      },
    );
  };

  const handleChooseCurrency = async (currency: FiatCurrency) => {
    logEvent('Purchase. Fiat chosen', {
      fiat: currency,
    });
    if (currency === 'RUB' || currency === 'BYN') {
      showRestrictionPopup(currency);
      return;
    }
    dispatch(setPaymentCurrency(currency));
    onChoose(currency);

    try {
      await API.Users.setPaymentCurrency(currency);
      await refetchLastUsedPaymentCurrencies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoneClick = () => {
    handleChooseCurrency(selectedCurrency);
  };

  const CurrencyCell = ({ currency }: { currency: FiatCurrency }) => {
    return (
      <Cell
        key={currency}
        tappable
        onClick={() => handleChooseCurrency(currency)}
        start={
          <Cell.Part type="roundedIcon">
            <CurrencyFlagIcon currency={currency} />
          </Cell.Part>
        }
        end={
          <Cell.Part type="radio">
            <Checkmark checked={selectedCurrency === currency} />
          </Cell.Part>
        }
      >
        <Cell.Text
          // eslint-disable-next-line
          // @ts-ignore next-line
          title={t(`currency.${currency}`)}
          description={currency.toLocaleUpperCase()}
        />
      </Cell>
    );
  };

  return (
    <div className={themeClassName('root')}>
      <div className={themeClassName('searchWrapper')}>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder={t('select_currency_page.search_currency')}
          onClear={() => {
            setSearch('');
          }}
          autoComplete="off"
        />
      </div>
      {search.length > 0 ? (
        searchingCurrencies.length > 0 ? (
          <Section separator title=" ">
            <Cell.List>
              {searchingCurrencies.map((currency) => (
                <CurrencyCell currency={currency} key={currency} />
              ))}
            </Cell.List>
          </Section>
        ) : (
          <div className={styles.placeholder}>
            <div className={themeClassName('media')}>
              <NotFoundUtka />
            </div>
            <h1 className={themeClassName('title')}>
              {t('select_currency_page.no_results')}
            </h1>
            <p className={themeClassName('text')}>
              {t('select_currency_page.try_new_search', {
                search,
              })}
            </p>
          </div>
        )
      ) : (
        <>
          {firstSectionCurrencies.length > 0 && (
            <Section
              title={
                theme === 'material'
                  ? t('select_currency_page.choose_currency')
                  : t('select_currency_page.choose_currency').toUpperCase()
              }
              description={
                isRecentlyUsedCurrencies
                  ? t('select_currency_page.recently_used')
                  : t('select_currency_page.based_on')
              }
              separator
            >
              <Cell.List>
                {firstSectionCurrencies.map((currency) => (
                  <CurrencyCell currency={currency} key={currency} />
                ))}
              </Cell.List>
            </Section>
          )}
          {otherCurrencies.length > 0 && (
            <Section separator>
              <Cell.List>
                {otherCurrencies.map((currency) => (
                  <CurrencyCell currency={currency} key={currency} />
                ))}
              </Cell.List>
            </Section>
          )}
        </>
      )}
      <MainButton text={t('common.done')} onClick={handleDoneClick} />
    </div>
  );
};
