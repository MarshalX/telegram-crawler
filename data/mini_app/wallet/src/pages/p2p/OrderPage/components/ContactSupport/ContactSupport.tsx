import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { ButtonCell } from 'components/Cells';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ContactSupport.module.scss';

interface Props {
  mode?: 'cellButton' | 'link';
  smallFont?: boolean;
}

const ContactSupport: FC<Props> = ({
  mode = 'cellButton',
  smallFont = false,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);

  const text = (() => {
    return t(`p2p.order_detail.contact_support`);
  })();

  const contactSupport = () => {
    window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK);
  };

  if (mode === 'cellButton') {
    return (
      <ButtonCell onClick={contactSupport}>
        <div
          className={classNames(
            themeClassName('linkButton'),
            smallFont && themeClassName('smallFont'),
          )}
        >
          {text}
        </div>
      </ButtonCell>
    );
  }

  return (
    <div
      className={classNames(
        themeClassName('linkString'),
        smallFont && themeClassName('smallFont'),
      )}
      onClick={contactSupport}
    >
      {text}
    </div>
  );
};

export default ContactSupport;
