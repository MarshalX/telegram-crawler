import { useTranslation } from 'react-i18next';

import { ButtonCell } from 'components/Cells';

export const CancelOrderCellButton = ({
  onClick,
  isCancelling,
}: {
  onClick: () => void;
  isCancelling: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <ButtonCell mode="danger" onClick={onClick} disabled={isCancelling}>
      {isCancelling
        ? t(`p2p.order_detail.canceling_order`)
        : t(`p2p.order_detail.cancel_order`)}
    </ButtonCell>
  );
};
