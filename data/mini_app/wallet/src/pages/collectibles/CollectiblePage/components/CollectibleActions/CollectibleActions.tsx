import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { ActionElement, SendAction } from 'api/getGems/generated';

import routePaths from 'routePaths';

import ActionButton from 'components/ActionButton/ActionButton';

import { ReactComponent as Fragment } from 'images/fragment.svg';
import { ReactComponent as Game } from 'images/game.svg';
import { ReactComponent as Send } from 'images/send.svg';
import { ReactComponent as TonSpace } from 'images/ton_space_circle.svg';

import styles from './CollectibleActions.module.scss';

interface CollectibleActionsProps {
  actions: Array<ActionElement>;
  address: string;
}

const CollectibleActions: FC<CollectibleActionsProps> = ({
  actions,
  address,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSendClick = (action: SendAction) => {
    if (action.rejectReason === 'OnSale') {
      window.Telegram.WebApp.showPopup({
        message: t('collectibles.collectible_page.send_reject_on_sale'),
        buttons: [
          {
            id: 'cancel',
            text: t('common.ok'),
          },
        ],
      });
      return;
    }
    navigate(
      generatePath(routePaths.COLLECTIBLE_RECEIVER_SEARCH, {
        address,
      }),
    );
  };

  return (
    <>
      {actions.map((action, key) => {
        const typename = action.typename;
        switch (typename) {
          case 'LinkAction':
            return (
              <ActionButton
                href={action.url}
                rel="noreferrer noopener"
                target="_blank"
                Component="a"
                key={key}
                className={styles.button}
                layout="horizontal"
                mode="primary"
                stretched
              >
                {action.text}
              </ActionButton>
            );
          case 'PlayGameAction':
            return (
              <ActionButton
                href={action.url}
                rel="noreferrer noopener"
                target="_blank"
                Component="a"
                key={key}
                className={styles.button}
                icon={<Game />}
                layout="horizontal"
                mode="primary"
                stretched
              >
                {t('collectibles.collectible_page.to_game')}
              </ActionButton>
            );
          case 'ToFragmentAction':
            return (
              <ActionButton
                href={action.url}
                rel="noreferrer noopener"
                target="_blank"
                Component="a"
                key={key}
                className={styles.button}
                icon={<Fragment />}
                layout="horizontal"
                mode="primary"
                stretched
              >
                {t('collectibles.collectible_page.to_fragment')}
              </ActionButton>
            );
          case 'ToTonDnsAction':
            return (
              <ActionButton
                href={action.url}
                rel="noreferrer noopener"
                target="_blank"
                Component="a"
                key={key}
                className={styles.button}
                layout="horizontal"
                mode="primary"
                stretched
                icon={<TonSpace />}
              >
                {t('collectibles.collectible_page.to_ton_dns')}
              </ActionButton>
            );
          case 'SendAction':
            return (
              <ActionButton
                onClick={() => onSendClick(action)}
                key={key}
                className={styles.button}
                icon={<Send />}
                layout="horizontal"
                mode="secondary"
                stretched
              >
                {t('collectibles.collectible_page.send_collectible')}
              </ActionButton>
            );
          default:
            return ((x: never) => {
              console.warn('Unexpected Collectible action typename', x);
              return null;
            })(typename);
        }
      })}
    </>
  );
};

export default CollectibleActions;
