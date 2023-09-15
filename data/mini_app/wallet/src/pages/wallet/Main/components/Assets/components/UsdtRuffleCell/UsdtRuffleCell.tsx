import { useUsdtRuffleTotalTickets } from 'query/wallet/ruffle/useUsdtRuffleTotalTickets';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import RoutePaths from 'routePaths';

import Skeleton from 'components/Skeleton/Skeleton';

import {
  UsdtRuffleCellBase,
  UsdtRuffleCellBaseSkeleton,
} from './components/UsdtRuffleCellBase/UsdtRuffleCellBase';

export const UsdtRuffleCell: React.FC = () => {
  const { t } = useTranslation();
  const { totalTickets, isLoading: loadingTotalTickets } =
    useUsdtRuffleTotalTickets();
  const navigate = useNavigate();

  const handleOpenMaketing = () => {
    navigate(generatePath(RoutePaths.USDT_RUFFLE));
  };

  return (
    <Skeleton
      skeleton={<UsdtRuffleCellBaseSkeleton />}
      skeletonShown={loadingTotalTickets}
    >
      {totalTickets ? (
        <UsdtRuffleCellBase
          onClick={handleOpenMaketing}
          buttonText={t('marketing.widget.button')}
          header={t('marketing.widget.title')}
        >
          {t('marketing.widget.xx_tickets', { count: totalTickets })}
        </UsdtRuffleCellBase>
      ) : (
        <UsdtRuffleCellBase
          onClick={handleOpenMaketing}
          buttonText={t('marketing.widget.button_zerostate')}
          header={t('marketing.widget.title_zerostate')}
        />
      )}
    </Skeleton>
  );
};
