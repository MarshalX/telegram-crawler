import cn from 'classnames';
import { FC, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppSelector } from 'store';

import { Balance } from 'containers/common/Balance/Balance';

import Page from 'components/Page/Page';
import { Placeholder } from 'components/Placeholder/Placeholder';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Error.module.scss';
import { ReactComponent as LoadingDuckSVG } from './LoadingDuckAnimation/loadingDuck.svg';

const LoadingDuckAnimation = lazy(
  () => import('./LoadingDuckAnimation/LoadingDuckAnimation'),
);

const Error: FC = () => {
  const { t } = useTranslation();

  const wallet = useAppSelector((state) => state.wallet);
  const { themeClassName } = useTheme(styles);
  const hasTotalFiatAmount = !!wallet.totalFiatAmount;

  return (
    <Page mode="secondary">
      <div
        className={cn(
          themeClassName('root'),
          hasTotalFiatAmount && styles.withBalance,
        )}
      >
        {hasTotalFiatAmount && (
          <div className={themeClassName('balance')}>
            <Balance
              currency={wallet.totalFiatCurrency}
              amount={wallet.totalFiatAmount}
              mute
            />
            <Text
              apple={{ variant: 'body', weight: 'regular', color: 'hint' }}
              material={{ variant: 'body', weight: 'regular', color: 'hint' }}
              className={themeClassName('description')}
            >
              {t('error.as_of_your_last_login')}
            </Text>
          </div>
        )}
        <div className={themeClassName('message')}>
          <Placeholder
            title={t('error.some_technical_issue')}
            text={t('error.no_worries')}
            bottom={
              <Text
                apple={{ variant: 'body', weight: 'regular', color: 'link' }}
                material={{ variant: 'body', weight: 'regular', color: 'link' }}
                onClick={() =>
                  window.Telegram.WebApp.openTelegramLink(
                    WALLET_SUPPORT_BOT_LINK,
                  )
                }
              >
                {t('common.contact_support')}
              </Text>
            }
            media={
              !hasTotalFiatAmount && (
                <Suspense
                  fallback={<LoadingDuckSVG className={styles.media} />}
                >
                  <LoadingDuckAnimation className={styles.media} />
                </Suspense>
              )
            }
          />
        </div>
      </div>
    </Page>
  );
};

export default Error;
