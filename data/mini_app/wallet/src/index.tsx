import * as Sentry from '@sentry/react';
import { reactRouterV6Instrumentation } from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import BigNumber from 'bignumber.js';
import { queryClient, queryPersister } from 'query/client';
import { StrictMode, Suspense, lazy, useEffect } from 'react';
import { render } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchPath,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { AccessToken } from 'api/wallet/generated';

import { Amplitude } from 'types/amplitude';
import { WebApp, WebView } from 'types/webApp';

import routePaths from 'routePaths';

import { setSession } from 'reducers/session/sessionSlice';
import { setUser } from 'reducers/user/userSlice';

import { isPageReloaded } from 'utils/common/common';
import { Langs, setLanguage } from 'utils/common/lang';

import App from './App';
import { AMPLITUDE_NEW_PROJECT_INSTANCE_NAME, config } from './config';
import i18n from './i18n';
import './index.module.scss';
import Error from './pages/Error/Error';
import { queryKeys } from './query/queryKeys';
import store from './store';
import { InitDataUnsafe } from './types/initDataUnsafe';

// Almost never return exponential notation
// Will avoid such situations: new BigNumber(0.000000123) -> '1.23e-7'
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

declare global {
  interface Window {
    WalletAuthPromise: Promise<AccessToken>;
    WalletLangpackPromise: Promise<{
      langpack: Record<string, unknown>;
      language: Langs;
    } | null>;
    Telegram: {
      WebApp: WebApp;
      WebView: WebView;
    };
    amplitude: Amplitude;
  }
}

if (process.env.NODE_ENV !== 'development') {
  window.amplitude
    .getInstance(AMPLITUDE_NEW_PROJECT_INSTANCE_NAME)
    .init('5995e7a68fdefac74b401439a7adddee');
}

const PRODUCTION_SENTRY_DSN =
  'https://544a92e441a24f17aa6b08e34e728ed2@sentry.walletbot.me/38';
const STAGING_SENTRY_DSN =
  'https://1536cd1e1acf4806a562237570aec419@sentry.walletbot.me/35';

if (window.location.hostname) {
  Sentry.init({
    dsn:
      window.location.hostname === config.productionHost
        ? PRODUCTION_SENTRY_DSN
        : STAGING_SENTRY_DSN,
    tracesSampleRate: 1,
    enabled: process.env.NODE_ENV !== 'development',
    integrations: [
      new BrowserTracing({
        beforeNavigate(context) {
          // converting /store/238428947/TON into /store/:id/:currency

          const foundPattern = Object.entries(routePaths).find(
            ([, pattern]) => {
              const isMatch = !!matchPath(
                {
                  path: pattern,
                },
                window.location.pathname,
              );

              return isMatch;
            },
          );

          return {
            ...context,
            name: foundPattern?.[1] ?? context.name,
          };
        },
        routingInstrumentation: reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
    ],
  });

  Sentry.setTag('tg.sdk', window.Telegram.WebApp.version);
  Sentry.setTag('tg.platform', window.Telegram.WebApp.platform);
  Sentry.setTag(
    'tg.language',
    window.Telegram.WebApp.initDataUnsafe.user?.language_code,
  );
}

const LOCAL_STORAGE_QUERY_DEVTOOLS = 'wallet:query-devtools';
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

const persistor = persistStore(store, {}, () => {
  if (isPageReloaded()) {
    const langpack = sessionStorage.getItem('wallet-langpack');
    const languageCode = store.getState().settings.languageCode;

    if (langpack) {
      try {
        i18n.addResourceBundle(
          languageCode,
          'translation',
          JSON.parse(langpack),
        );
        setLanguage(i18n, languageCode);
      } catch (e) {
        Sentry.captureException('Langpack was not loaded');
      }
    }
  }

  const webApp = window.Telegram.WebApp;
  const {
    receiver,
    user,
    start_param: startParam,
  }: InitDataUnsafe = webApp.initDataUnsafe;

  const searchParams = new URLSearchParams(window.location.search);
  const walletStartParam = searchParams.get('walletStartParam');

  store.dispatch(
    setSession({
      receiver,
      startParam: startParam || walletStartParam || undefined,
      isBot: receiver?.is_bot,
      isYourSelf: receiver?.id === user?.id,
      addedToAttachmentMenu: user?.added_to_attachment_menu,
      allowsWriteToPm: user?.allows_write_to_pm,
    }),
  );
  store.dispatch(setUser(user));

  render(
    <StrictMode>
      <Provider store={store}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: queryPersister,
            buster: process.env.HASH,
            maxAge: 60 * 60 * 24,
            dehydrateOptions: {
              shouldDehydrateQuery: (query) => {
                return (
                  query.queryKey[0] !== queryKeys.transactions.all[0] &&
                  query.queryKey[0] !== queryKeys.getGems.base[0]
                );
              },
            },
          }}
        >
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <ErrorBoundary FallbackComponent={Error}>
                <App />
              </ErrorBoundary>
            </BrowserRouter>
          </PersistGate>
          {process.env.DEV &&
            !!localStorage.getItem(LOCAL_STORAGE_QUERY_DEVTOOLS) && (
              <Suspense fallback={null}>
                <ReactQueryDevtools />
              </Suspense>
            )}
        </PersistQueryClientProvider>
      </Provider>
    </StrictMode>,
    document.getElementById('root'),
  );
});
