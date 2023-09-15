import { FC, Suspense, lazy } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { CRYPTO_FRACTION } from 'config';

import { RootState } from 'store';

import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { MainButton } from 'components/MainButton/MainButton';
import Mono from 'components/Mono/Mono';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import { Text } from 'components/Text/Text';

import { printCryptoAmount } from 'utils/common/currency';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { convertToDecimal } from 'utils/scw/ton';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

import styles from './SendSuccess.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

const SendSuccess: FC = () => {
  const [searchParams] = useSearchParams();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const assetCurrency = searchParams.get('assetCurrency');
  const receiverAddress = searchParams.get('address');
  const amount = Number(searchParams.get('amount'));
  const decimals =
    assetCurrency === FrontendCryptoCurrencyEnum.Ton
      ? CRYPTO_FRACTION[FrontendCryptoCurrencyEnum.Ton]
      : Number(searchParams.get('decimals'));

  const decimalAmount = convertToDecimal(amount, decimals);

  if (assetCurrency && receiverAddress) {
    return (
      <Page expandOnMount>
        <BackButton />
        <PagePlaceholder
          media={
            <Suspense fallback={<BoomstickSVG />}>
              <BoomstickAnimation />
            </Suspense>
          }
          title={t('send_status.success_title', {
            currency: assetCurrency,
          })}
          text={t('send_status.success_text')}
        />
        <BottomContent className={themeClassName('bottom')}>
          <Text
            apple={{
              variant: 'subheadline1',
              weight: 'regular',
              color: 'hint',
            }}
            material={{
              variant: 'subtitle1',
              color: 'hint',
            }}
            className={themeClassName('text')}
          >
            <Trans
              values={{
                currencyName: assetCurrency,
                amount: printCryptoAmount({
                  amount: decimalAmount,
                  currency: assetCurrency,
                  languageCode,
                }),
                count: decimalAmount,
              }}
              i18nKey="send_status.success_meta"
              t={t}
              components={[
                <Text
                  Component="span"
                  apple={{
                    variant: 'subheadline1',
                    weight: 'semibold',
                  }}
                  material={{
                    variant: 'button1',
                  }}
                  key="b"
                />,
              ]}
            />
          </Text>
          <Text
            apple={{ variant: 'body', weight: 'mono' }}
            material={{ variant: 'body', weight: 'mono' }}
          >
            {isTONDomain(receiverAddress) || isWeb3Domain(receiverAddress) ? (
              <Mono className={themeClassName('address')}>
                {receiverAddress}
              </Mono>
            ) : (
              <Mono className={themeClassName('address')}>
                {receiverAddress.slice(0, receiverAddress.length / 2)}
                <br />
                {receiverAddress.slice(receiverAddress.length / 2)}
              </Mono>
            )}
          </Text>
        </BottomContent>
        <MainButton
          onClick={() => {
            navigate(routePaths.SCW_MAIN, { replace: true });
          }}
          text={t('send_status.done').toLocaleUpperCase()}
        />
      </Page>
    );
  } else {
    return <Navigate to={routePaths.SCW_MAIN} replace />;
  }
};

export default SendSuccess;
