import { memo, useEffect, useMemo, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import API from 'api/wallet';

import routePaths from 'routePaths';

import { WALLET_TERMS_OF_USE_LINK, WALLET_USER_AGREEMENT_LINK } from 'config';

import { useAppSelector } from 'store';

import { FeaturesList } from 'containers/common/FeaturesList/FeaturesList';

import ActionButton from 'components/ActionButton/ActionButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';

import { generateTelegramLink } from 'utils/common/common';
import { logEvent } from 'utils/common/logEvent';
import { parseStartAttach } from 'utils/common/startattach';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Onboarding.module.scss';

const OnboardingForm = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const { assets } = useAppSelector((state) => state.wallet);
  const { allowsWriteToPm, addedToAttachmentMenu, startParam } = useAppSelector(
    (state) => state.session,
  );
  const { botUsername } = useAppSelector((state) => state.wallet);
  const ref = useRef<HTMLDivElement>(null);

  const hasTransactions = assets.some((asset) => asset.hasTransactions);

  const bottomContentHieght = useMemo(() => {
    return (ref.current && ref.current.clientHeight) || 0;
  }, [ref.current?.clientHeight]);

  useEffect(() => {
    logEvent('Opened welcome screen', {
      ['Opened from']: 'bot',
    });
  }, []);

  return (
    <Page expandOnMount>
      <div
        className={themeClassName('root')}
        style={{ marginBottom: bottomContentHieght }}
      >
        <h1 className={themeClassName('title')}>{t('onboarding.title')}</h1>
        <FeaturesList />
      </div>
      <BottomContent className={themeClassName('bottom')} ref={ref}>
        <ActionButton
          className={styles.button}
          stretched
          size="medium"
          shiny
          onClick={() => {
            if (allowsWriteToPm) {
              API.Users.disableIsNewUserFlag();
              window.Telegram.WebApp.expand();

              if (startParam) {
                const { operation } = parseStartAttach(startParam);

                if (operation === 'scw_onboarding') {
                  navigate(routePaths.SCW_ONBOARDING);
                  return;
                }
              }

              if (!addedToAttachmentMenu) {
                navigate({
                  pathname: routePaths.ATTACHES_PROMO,
                  search: createSearchParams({
                    target: hasTransactions
                      ? routePaths.MAIN
                      : routePaths.FIRST_DEPOSIT,
                  }).toString(),
                });
                return;
              }

              if (hasTransactions) {
                navigate(generatePath(routePaths.MAIN));
              } else {
                navigate(generatePath(routePaths.FIRST_DEPOSIT));
              }
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
          {t('onboarding.button')}
        </ActionButton>
        <div className={themeClassName('agreement')}>
          <Trans
            i18nKey={'onboarding.agreement'}
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
    </Page>
  );
};

export default memo(OnboardingForm);
