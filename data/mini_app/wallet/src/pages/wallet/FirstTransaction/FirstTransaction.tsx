import { useTransaction } from 'query/wallet/transactions/useTransaction';
import { FC, memo, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';

import API from 'api/wallet';

import routePaths from 'routePaths';

import { WALLET_TERMS_OF_USE_LINK, WALLET_USER_AGREEMENT_LINK } from 'config';

import { useAppSelector } from 'store';

import { FeaturesList } from 'containers/common/FeaturesList/FeaturesList';
import TransactionCard, {
  TransactionCardSkeleton,
} from 'containers/wallet/TransactionCard/TransactionCard';

import ActionButton from 'components/ActionButton/ActionButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { generateTelegramLink } from 'utils/common/common';
import { printCryptoAmount } from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';
import { resolveStatus } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './FirstTransaction.module.scss';

export const FirstTransaction: FC = memo(() => {
  const [searchParams] = useSearchParams();
  const { data: transaction } = useTransaction({
    correspondingTransactionId: Number(
      searchParams.get('correspondingTransactionId'),
    ),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { languageCode } = useAppSelector((state) => state.settings);
  const { allowsWriteToPm } = useAppSelector((state) => state.session);
  const { botUsername } = useAppSelector((state) => state.wallet);

  const { theme, themeClassName } = useTheme(styles);
  const transactionCard = (
    <Skeleton
      skeleton={<TransactionCardSkeleton />}
      skeletonShown={!transaction}
    >
      {transaction && (
        <TransactionCard
          date={transaction?.created_at}
          amount={transaction.crypto_amount}
          currency={transaction.crypto_currency}
          type={transaction.type}
          gateway={transaction.gateway}
          status={resolveStatus(transaction.status)}
          name={transaction.username}
          userId={transaction.tg_id}
          photoUrl={transaction.photo_url}
        />
      )}
    </Skeleton>
  );

  useEffect(() => {
    logEvent('Opened welcome screen', {
      ['Opened from']: 'pm',
    });
  }, []);

  return (
    <Page mode="secondary">
      <div className={styles.root}>
        {theme === 'apple' ? (
          transactionCard
        ) : (
          <Section separator>{transactionCard}</Section>
        )}
        {theme === 'apple' && (
          <>
            <InlineLayout>
              <div className={styles.separator} />
            </InlineLayout>
            <h1 className={styles.title}>
              <InlineLayout>{t('first_transaction.title')}</InlineLayout>
            </h1>
          </>
        )}
        <Section
          title={
            theme === 'material' ? t('first_transaction.title') : undefined
          }
          separator={theme === 'material'}
        >
          <InlineLayout>
            <FeaturesList className={themeClassName('featuresList')} />
          </InlineLayout>
        </Section>
        {transaction && (
          <BottomContent className={themeClassName('bottom')}>
            <ActionButton
              shiny
              size="medium"
              stretched
              className={themeClassName('button')}
              onClick={() => {
                if (allowsWriteToPm) {
                  API.Users.disableIsNewUserFlag();
                  window.Telegram.WebApp.expand();
                  navigate(generatePath(routePaths.MAIN));
                } else {
                  window.Telegram.WebApp.showPopup(
                    {
                      message: t('first_transaction.start_bot_text'),
                      buttons: [
                        {
                          id: 'cancel',
                          text: t('common.cancel'),
                        },
                        {
                          id: 'ok',
                          text: t('first_transaction.start_bot_button'),
                        },
                      ],
                    },
                    (id) => {
                      if (id === 'ok') {
                        window.Telegram.WebApp.openTelegramLink(
                          generateTelegramLink(botUsername),
                        );
                      }
                    },
                  );
                }
              }}
            >
              {t('first_transaction.button', {
                amount: printCryptoAmount({
                  amount: transaction.crypto_amount,
                  currency: transaction.crypto_currency,
                  currencyDisplay: 'code',
                  languageCode,
                }),
              })}
            </ActionButton>
            <div className={themeClassName('agreement')}>
              <Trans
                i18nKey="first_transaction.agreement"
                values={{
                  amount: printCryptoAmount({
                    amount: transaction.crypto_amount,
                    currency: transaction.crypto_currency,
                    currencyDisplay: 'code',
                    languageCode,
                  }),
                }}
                t={t}
                components={[
                  <a
                    key="1"
                    target="_blank"
                    rel="noreferrer"
                    href={WALLET_TERMS_OF_USE_LINK}
                    onClick={(e) => {
                      e.preventDefault();
                      window.Telegram.WebApp.openLink(e.currentTarget.href, {
                        try_instant_view: true,
                      });
                    }}
                  />,
                  <a
                    key="2"
                    target="_blank"
                    rel="noreferrer"
                    href={WALLET_USER_AGREEMENT_LINK}
                    onClick={(e) => {
                      e.preventDefault();
                      window.Telegram.WebApp.openLink(e.currentTarget.href, {
                        try_instant_view: true,
                      });
                    }}
                  />,
                ]}
              />
            </div>
          </BottomContent>
        )}
      </div>
    </Page>
  );
});
