import classNames from 'classnames';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';

import routePaths from 'routePaths';

import { Attaches } from 'pages/wallet/AttachPromo/components/Attaches/Attaches';
import { SideMenu } from 'pages/wallet/AttachPromo/components/SideMenu/SideMenu';

import { AddToAttachesButton } from 'containers/wallet/AddToAttachesButton/AddToAttachesButton';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';

import { isClientSupportsSideMenu } from 'utils/common/common';
import { logEvent } from 'utils/common/logEvent';
import { generateStartAttach } from 'utils/common/startattach';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './AttachPromo.module.scss';

export const AttachPromo = memo(() => {
  const { themeClassName } = useTheme(styles);
  const [searchParams] = useSearchParams();
  const target = searchParams.get('target');
  const assetCurrency = searchParams.get('assetCurrency');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const supportedSideMenu = isClientSupportsSideMenu();

  const showSideMenu =
    supportedSideMenu &&
    target !== routePaths.RECEIVER_SEARCH &&
    target !== routePaths.CHOOSE_ASSET;

  const bottomContentHieght = useMemo(() => {
    return (ref.current && ref.current.clientHeight) || 0;
  }, [ref.current?.clientHeight]);

  const getStartattach = () => {
    switch (target) {
      case routePaths.FIRST_DEPOSIT:
        return generateStartAttach('firstDeposit');
      case routePaths.RECEIVER_SEARCH:
      case routePaths.CHOOSE_ASSET:
        if (assetCurrency) {
          return generateStartAttach('receiverSearch', { assetCurrency });
        }
        return generateStartAttach('sendOptions');
      default:
        return '';
    }
  };
  const onLaterClick = () => {
    logEvent('Clicked later (add to attach)');

    switch (target) {
      case routePaths.FIRST_DEPOSIT:
        navigate(routePaths.FIRST_DEPOSIT);
        break;
      case routePaths.RECEIVER_SEARCH:
      case routePaths.CHOOSE_ASSET:
        if (assetCurrency) {
          navigate(generatePath(routePaths.RECEIVER_SEARCH, { assetCurrency }));
        } else {
          navigate(generatePath(routePaths.CHOOSE_ASSET, { type: 'send' }));
        }
        break;
      default:
        navigate(routePaths.MAIN);
    }
  };

  useEffect(() => {
    window.Telegram.WebApp.expand();
    // reset scroll position after render
    window.scrollTo(0, 0);
    logEvent('Opened Add to attach screen');
  }, []);

  return (
    <Page>
      <BackButton />
      <div style={{ marginBottom: bottomContentHieght }}>
        {showSideMenu ? <SideMenu /> : <Attaches />}
      </div>
      <BottomContent
        className={classNames(
          themeClassName('bottom'),
          showSideMenu && themeClassName('supportedSideMenu'),
        )}
        ref={ref}
      >
        <AddToAttachesButton startattach={getStartattach()} from="main" />
        <ActionButton
          mode="transparent"
          size="medium"
          stretched
          onClick={onLaterClick}
        >
          {t('common.later')}
        </ActionButton>
      </BottomContent>
    </Page>
  );
});
