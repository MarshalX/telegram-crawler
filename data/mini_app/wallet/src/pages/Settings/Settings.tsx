import { useLanguages } from 'query/useLanguages';
import { useCurrencies } from 'query/wallet/currencies';
import { useKycStatus } from 'query/wallet/kyc/useKycStatus';
import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { FiatCurrency } from 'api/wallet/generated';
import API from 'api/wallet/index';

import routePaths from 'routePaths';

import {
  WALLET_SUPPORT_BOT_LINK,
  WALLET_TERMS_OF_USE_LINK,
  WALLET_USER_AGREEMENT_LINK,
} from 'config';

import { useAppSelector } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';
import { updateFiatCurrency } from 'reducers/settings/settingsSlice';
import { updateWarningsVisibility } from 'reducers/warningsVisibility/warningsVisibilitySlice';

import { BackButton } from 'components/BackButton/BackButton';
import { ButtonCell, Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import PasscodeVerify from 'components/PasscodeVerify/PasscodeVerify';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';
import { Switch } from 'components/Switch/Switch';

import { repeat } from 'utils/common/common';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as IdentificationLevelSVG } from 'images/levels.svg';
import { ReactComponent as PrivacyIcon } from 'images/privacy.svg';
import { ReactComponent as TonSpaceSVG } from 'images/ton_space_rounded.svg';

import styles from './Settings.module.scss';
import CurrencyCell from './components/CurrencyCell/CurrencyCell';
import CurrencyCellSkeleton from './components/CurrencyCell/CurrencyCellSkeleton';

const Settings = () => {
  const { t } = useTranslation();
  const { kycStatus, isLoading } = useKycStatus();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, themeClassName } = useTheme(styles);
  const { fiatCurrency } = useAppSelector((state) => state.settings);
  const { featureFlags } = useAppSelector((state) => state.user);
  const { displaySCW } = useAppSelector((state) => state.warningsVisibility);
  const { address: scwAddress } = useAppSelector((state) => state.scw);
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const { paymentCurrency, languageCode } = useAppSelector(
    (state) => state.settings,
  );
  const { expandCryptocurrency } = useAppSelector(
    (state) => state.warningsVisibility,
  );

  const [currency, setCurrency] = useState<FiatCurrency>(fiatCurrency);
  const { data: languages = [] } = useLanguages();

  const { passcodeType } = useAppSelector((state) => state.passcode);

  const [enterPasscode, setEnterPasscode] = useState(false);

  const handlePasscodeSuccess = (passcode: string) => {
    setEnterPasscode(false);
    dispatch(updatePasscode({ enteredPasscode: passcode }));
    navigate(routePaths.SETTINGS_PASSCODE);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page mode="secondary">
      <BackButton
        onClick={() => {
          if (enterPasscode) {
            setEnterPasscode(false);
          } else {
            window.history.back();
          }
        }}
      />
      <div className={themeClassName('root')}>
        <Section separator>
          <Cell.List>
            <Cell
              Component={scwAddress ? Link : undefined}
              chevron={!!scwAddress}
              tappable={!!scwAddress}
              to={scwAddress ? routePaths.SCW_SETTINGS : undefined}
              start={
                <Cell.Part type="avatar">
                  <TonSpaceSVG style={{ width: 30, height: 30 }} />
                </Cell.Part>
              }
              end={
                !scwAddress && (
                  <Cell.Part type="switch">
                    <Switch
                      checked={displaySCW}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(
                          updateWarningsVisibility({
                            displaySCW: e.target.checked,
                          }),
                        );
                        API.WVSettings.setUserWvSettings({
                          display_scw: e.target.checked,
                        });
                      }}
                    />
                  </Cell.Part>
                )
              }
            >
              <Cell.Text
                title={
                  <>
                    {t(
                      scwAddress
                        ? 'common.ton_space'
                        : 'settings.show_ton_space',
                    )}{' '}
                    <span className={styles.beta}>{t('common.beta')}</span>
                  </>
                }
              />
            </Cell>
          </Cell.List>
        </Section>
        {(featureFlags.passcode || passcodeType) && (
          <Section separator>
            <Cell.List>
              <Cell
                onClick={() => {
                  if (passcodeType) {
                    setEnterPasscode(true);
                  } else {
                    navigate(routePaths.PASSCODE_TURN_ON);
                  }
                }}
                tappable
                chevron
                start={
                  <Cell.Part type="roundedIcon">
                    <PrivacyIcon style={{ width: 30, height: 30 }} />
                  </Cell.Part>
                }
                end={
                  <Cell.Text
                    titleAppearance="muted"
                    title={passcodeType ? t('passcode.on') : t('passcode.off')}
                  />
                }
              >
                <Cell.Text title={t('passcode.passcode')} />
              </Cell>
            </Cell.List>
          </Section>
        )}
        {featureFlags.kyc && (
          <Section separator>
            <Cell.List>
              <Skeleton
                skeletonShown={isLoading}
                skeleton={
                  <Cell
                    chevron
                    start={
                      <Cell.Part type="avatar">
                        <IdentificationLevelSVG
                          style={{ width: 30, height: 30 }}
                        />
                      </Cell.Part>
                    }
                    end={
                      <Cell.Text
                        titleClassName={styles.titleClassName}
                        align="end"
                        skeleton
                        title
                      />
                    }
                  >
                    <Cell.Text title={t('kyc.settings.identification_level')} />
                  </Cell>
                }
              >
                <Cell
                  Component={Link}
                  chevron
                  tappable
                  to={routePaths.KYC_SETTINGS}
                  start={
                    <Cell.Part type="avatar">
                      <IdentificationLevelSVG
                        style={{ width: 30, height: 30 }}
                      />
                    </Cell.Part>
                  }
                  end={
                    <Cell.Text
                      titleAppearance="muted"
                      title={t(`kyc.settings.${kycStatus?.level}`)}
                    />
                  }
                >
                  <Cell.Text title={t('kyc.settings.identification_level')} />
                </Cell>
              </Skeleton>
            </Cell.List>
          </Section>
        )}
        <Section separator>
          <Cell.List>
            <Cell
              Component={Link}
              chevron
              tappable
              to={routePaths.SETTINGS_LANGUAGE}
              end={
                <Cell.Text
                  titleAppearance="muted"
                  title={
                    languages.find(
                      (item) => item.language_code === languageCode,
                    )?.translation
                  }
                />
              }
            >
              <Cell.Text title={t('settings.language_title')} />
            </Cell>

            {featureFlags.multicurrency && (
              <Cell
                Component={Link}
                to={routePaths.SETTINGS_SELECT_PAYMENT_CURRENCY}
                tappable
                chevron
                end={
                  paymentCurrency && (
                    <Cell.Text
                      titleAppearance="muted"
                      title={paymentCurrency}
                    />
                  )
                }
              >
                <Cell.Text title={t('settings.payment_currency')} />
              </Cell>
            )}

            <Cell
              end={
                <Cell.Part type="switch">
                  <Switch
                    checked={expandCryptocurrency}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        updateWarningsVisibility({
                          expandCryptocurrency: e.target.checked,
                        }),
                      );
                      API.WVSettings.setUserWvSettings({
                        expand_cryptocurrency: e.target.checked,
                      });
                    }}
                  />
                </Cell.Part>
              }
            >
              <Cell.Text title={t('settings.always_expand_crypto')} />
            </Cell>
          </Cell.List>
        </Section>
        <Section separator={theme === 'material'}>
          <ButtonCell
            onClick={() => {
              window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK);
            }}
          >
            {t('common.contact_support')}
          </ButtonCell>
        </Section>
        <Section
          apple={{ fill: 'secondary' }}
          title={t('settings.fiat_title')}
          description={t('settings.fiat_description')}
          separator
        >
          <Skeleton
            skeleton={
              <div className={themeClassName('currency')}>
                {repeat((i) => {
                  return <CurrencyCellSkeleton key={i} />;
                }, 11)}
              </div>
            }
            skeletonShown={isCurrenciesLoading}
          >
            <div className={themeClassName('currency')}>
              {currencies &&
                currencies.map((item) => {
                  return (
                    <CurrencyCell
                      value={item}
                      key={item}
                      name="currency"
                      onChange={(currency) => {
                        setCurrency(currency);
                        API.Currency.setUserCurrency({ currency }).then(() => {
                          dispatch(updateFiatCurrency(currency));
                        });
                      }}
                      checked={item === currency}
                    >
                      {item}
                    </CurrencyCell>
                  );
                })}
            </div>
          </Skeleton>
        </Section>
        <a
          className={themeClassName('privacyLink')}
          href="#"
          onClick={() => {
            window.Telegram.WebApp.openLink(WALLET_TERMS_OF_USE_LINK);
          }}
        >
          {t('settings.terms_of_use_link')}
        </a>
        <a
          className={themeClassName('privacyLink')}
          href="#"
          onClick={() => {
            window.Telegram.WebApp.openLink(WALLET_USER_AGREEMENT_LINK);
          }}
        >
          {t('settings.user_agreement_link')}
        </a>
      </div>
      {enterPasscode && <PasscodeVerify onSuccess={handlePasscodeSuccess} />}
    </Page>
  );
};

export default memo(Settings);
