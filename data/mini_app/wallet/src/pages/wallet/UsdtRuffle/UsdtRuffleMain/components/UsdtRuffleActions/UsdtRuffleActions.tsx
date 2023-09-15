import { useUsdtRuffleTotalTickets } from 'query/wallet/ruffle/useUsdtRuffleTotalTickets';
import { useTranslation } from 'react-i18next';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';

import API from 'api/usdtRuffle';

import RoutePaths from 'routePaths';

import { useAppDispatch, useAppSelector } from 'store';

import { updatePermissions } from 'reducers/user/userSlice';

import { Cell } from 'components/Cells';
import { CellList } from 'components/Cells/Cell/components/CellList/CellList';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './UsdtRuffleActions.module.scss';

type OptionCellProps = {
  to?: string;
  onClick?: () => void;
  showChevron?: boolean;
};

const OptionCell: React.FC<OptionCellProps> = ({
  children,
  to,
  onClick,
  showChevron = true,
}) => {
  const theme = useTheme();

  return (
    <Cell
      tappable
      Component={onClick ? 'div' : Link}
      to={to}
      onClick={onClick}
      chevron={showChevron && theme === 'apple'}
    >
      <Cell.Text title={children} />
    </Cell>
  );
};

const Links = {
  FAQ: {
    RU: 'https://telegra.ph/Summer-Raffle-20-FAQ-07-11-2',
    EN: 'https://telegra.ph/Summer-Raffle-20-FAQ-07-11',
  },
  Rules: {
    RU: 'https://telegra.ph/Usloviya-i-Polozheniya-07-12',
    EN: 'https://telegra.ph/Terms--Conditions-07-12-2',
  },
};

export const UsdtRuffleActions: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalTickets } = useUsdtRuffleTotalTickets();
  const languageCode = useAppSelector((state) => state.settings.languageCode);

  const handleUnsubscribe = () => {
    window.Telegram.WebApp.showPopup(
      {
        message: t('marketing.unsubscribe.message'),
        buttons: [
          { id: 'confirm', text: t('marketing.unsubscribe.unsubscribe') },
          { id: 'cancel', text: t('marketing.unsubscribe.cancel') },
        ],
      },
      (id: string) => {
        if (id === 'confirm') {
          API.Participation.optOut().then(() => {
            dispatch(updatePermissions({ can_usdt_raffle: false }));
          });
        }
      },
    );
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <CellList>
          {!!totalTickets && (
            <OptionCell
              onClick={() => {
                navigate({
                  pathname: RoutePaths.USDT_RUFFLE_TICKETS,
                  search: createSearchParams({
                    backPathname: RoutePaths.USDT_RUFFLE,
                  }).toString(),
                });
              }}
            >
              {t('marketing.actions.my_tickets')}
            </OptionCell>
          )}
          <OptionCell
            onClick={() =>
              window.Telegram.WebApp.openLink(
                languageCode === 'ru' ? Links.Rules.RU : Links.Rules.EN,
                { try_instant_view: true },
              )
            }
          >
            {t('marketing.actions.contest_rules')}
          </OptionCell>
          <OptionCell
            onClick={() =>
              window.Telegram.WebApp.openLink(
                languageCode === 'ru' ? Links.FAQ.RU : Links.FAQ.EN,
                { try_instant_view: true },
              )
            }
          >
            {t('marketing.actions.faq')}
          </OptionCell>
          <OptionCell onClick={handleUnsubscribe} showChevron={false}>
            <span className={styles.unsubscribe}>
              {t('marketing.actions.unsubscribe_mini')}
            </span>
          </OptionCell>
        </CellList>
      </div>
    </section>
  );
};
