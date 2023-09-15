import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { RootState, useAppDispatch } from 'store';

import { updateSession } from 'reducers/session/sessionSlice';

import { DollarsModalTrigger } from 'containers/wallet/DollarsModal/DollarsModalTrigger';

import CurrencyLogoWithAppearance from 'components/CurrencyLogo/CurrencyLogoWithAppearance';
import FitTextRow from 'components/FitTextRow/FitTextRow';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { scaleAnimation } from 'utils/common/animations';
import {
  getCurrencyName,
  printCryptoAmount,
  printFiatAmount,
} from 'utils/common/currency';

import { useAsset } from 'hooks/common/useAsset';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as QuestionMarkSVG } from 'images/question_mark.svg';
import { ReactComponent as TonSVG } from 'images/ton.svg';

import styles from './Balance.module.scss';

export const Balance: FC<{ assetCurrency: FrontendCryptoCurrencyEnum }> = ({
  assetCurrency,
}) => {
  const { themeClassName } = useTheme(styles);
  const asset = useAsset(assetCurrency);
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { featureFlags } = useSelector((state: RootState) => state.user);
  const { displaySCW } = useSelector(
    (state: RootState) => state.warningsVisibility,
  );
  const { t } = useTranslation();
  const logoRef = useRef<HTMLDivElement>(null);
  const [numberOfTaps, setNumberOfTaps] = useState(0);
  const dispatch = useAppDispatch();
  const { showSnackbar, hideSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (numberOfTaps >= 5) {
      dispatch(
        updateSession({
          canApplyToSCWBetaWaitlist: true,
        }),
      );
      showSnackbar({
        before: <TonSVG />,
        text: t('scw.beta_waitlist.entry_point_available_text'),
        action: (
          <Link
            to={routePaths.MAIN}
            replace
            onClick={() => hideSnackbar('ton_space')}
          >
            {t('scw.beta_waitlist.entry_point_available_button')}
          </Link>
        ),
        actionPosition: 'bottom',
        snackbarId: 'ton_space',
      });
    }
  }, [numberOfTaps, dispatch]);

  return (
    <div className={themeClassName('root')}>
      <div
        ref={logoRef}
        onPointerDown={() => {
          if (
            !featureFlags.scw &&
            !displaySCW &&
            !featureFlags.scwBetaWaitlist &&
            assetCurrency === 'TON' &&
            logoRef.current
          ) {
            setNumberOfTaps((prevState) => prevState + 1);
            logoRef.current.animate(scaleAnimation, 370);
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
          }
        }}
      >
        <CurrencyLogoWithAppearance
          currency={assetCurrency}
          className={styles.logo}
        />
      </div>
      <Text
        apple={{ variant: 'body', weight: 'regular' }}
        material={{ variant: 'subtitle1' }}
        className={styles.name}
      >
        {assetCurrency === 'USDT' ? (
          <DollarsModalTrigger>
            <div className={styles.dollarsModalTrigger}>
              {t('asset.balance_dollars')}
              <QuestionMarkSVG />
            </div>
          </DollarsModalTrigger>
        ) : (
          t('asset.balance', {
            currencyName: getCurrencyName({
              currency: assetCurrency,
              t,
            }),
          })
        )}
      </Text>
      <FitTextRow align="center">
        <Text
          apple={{ variant: 'title1', rounded: true }}
          material={{ variant: 'headline5' }}
          className={styles.fiat}
        >
          {printFiatAmount({
            languageCode,
            amount: asset.fiatBalance,
            currency: asset.fiatCurrency,
          })}
        </Text>
      </FitTextRow>
      <Text
        apple={{ variant: 'body', weight: 'regular', color: 'hint' }}
        material={{ variant: 'subtitle1', color: 'hint' }}
        className={styles.crypto}
      >
        {printCryptoAmount({
          languageCode,
          amount: asset.balance,
          currency: assetCurrency,
          currencyDisplay: 'code',
        })}
      </Text>
    </div>
  );
};
