import classNames from 'classnames';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import API from 'api/p2p';
import { OrderRestDto } from 'api/p2p/generated-common';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { ButtonCell } from 'components/Cells';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import styles from './CreateAppeal.module.scss';

interface Props {
  order?: OrderRestDto;
  mode?: 'cellButton' | 'link';
  smallFont?: boolean;
}

const CreateAppeal: FC<Props> = ({
  order,
  mode = 'cellButton',
  smallFont = false,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);

  const [openingAppeal, setOpeningAppeal] = useState(false);

  const text = openingAppeal
    ? t(`p2p.order_detail.sending_appeal`)
    : t(`p2p.order_detail.send_an_appeal`);

  const notifyUserThatAppealFailedToOpen = () => {
    snackbarContext.showSnackbar({
      before: <WarningSVG />,
      text: t(`p2p.order_detail.failed_to_open_appeal`),
      action: <a href={WALLET_SUPPORT_BOT_LINK}>{t('common.contact')}</a>,
    });
  };

  const openAppealWarning = () => {
    window.Telegram.WebApp.showPopup(
      {
        title: t(`p2p.order_detail.appeal_popup_title`),
        message: t(`p2p.order_detail.appeal_popup_description`),
        buttons: [
          {
            id: 'cancel',
            text: t(`common.cancel`),
          },
          {
            id: 'confirm',
            text: t(`p2p.order_detail.confirm_appeal`),
          },
        ],
      },
      async (id: string) => {
        if (id !== 'confirm') {
          return;
        }

        if (order) {
          setOpeningAppeal(true);

          try {
            const { data } = await API.Appeal.openAppealV2({
              orderId: order.id,
            });

            if (data.status !== 'SUCCESS') {
              if (data.status === 'ALREADY_APPEALED') {
                snackbarContext.showSnackbar({
                  before: <WarningSVG />,
                  text: t(`p2p.order_detail.appeal_has_been_opened`),
                });
              } else {
                notifyUserThatAppealFailedToOpen();
              }

              setOpeningAppeal(false);

              return;
            }
          } catch (error) {
            console.error(error);

            notifyUserThatAppealFailedToOpen();
            setOpeningAppeal(false);

            return;
          }
        }

        window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK);
      },
    );
  };

  if (mode === 'cellButton') {
    return (
      <ButtonCell onClick={openAppealWarning} disabled={openingAppeal}>
        <div
          className={classNames(
            themeClassName('linkButton'),
            smallFont ? themeClassName('smallFont') : '',
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
        smallFont ? themeClassName('smallFont') : '',
      )}
      onClick={() => {
        if (openingAppeal) {
          return;
        }

        openAppealWarning();
      }}
    >
      {text}
    </div>
  );
};

export default CreateAppeal;
