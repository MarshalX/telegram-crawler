import { useTranslation } from 'react-i18next';

import { ButtonCell } from 'components/Cells';
import Section from 'components/Section/Section';

import { ReactComponent as MessageIcon } from 'images/message_icon.svg';

import { useStartChat } from '../../OrderPage';
import styles from './StartChatSection.module.scss';

export const StartChatSection = () => {
  const { t } = useTranslation();

  const { startChat, isStartingChat } = useStartChat();

  return (
    <Section apple={{ fill: 'secondary' }} separator>
      <ButtonCell onClick={startChat} disabled={isStartingChat}>
        <div className={styles.startChatButton}>
          <MessageIcon className={styles.messageIcon} />{' '}
          {isStartingChat
            ? t(`p2p.order_detail.starting_chat`)
            : t(`p2p.order_detail.start_chat`)}
        </div>
      </ButtonCell>
    </Section>
  );
};
