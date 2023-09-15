import { FC } from 'react';

import { TransactionGateway, TransactionTypeEnum } from 'api/wallet/generated';

import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CreditCardSVG } from 'images/credit_card.svg';
import { ReactComponent as ExchangeSVG } from 'images/exchange.svg';
import { ReactComponent as ReceiveSVG } from 'images/receive.svg';
import { ReactComponent as SendSVG } from 'images/send.svg';

import { ReactComponent as BonusSVG } from './bonus.svg';
import { ReactComponent as CampaignSVG } from './campaign.svg';
import { ReactComponent as ChequesSVG } from './cheques.svg';

interface OperationIconProps {
  size?: number;
  iconSize?: number;
  gateway: TransactionGateway;
  type?: TransactionTypeEnum;
  className?: string;
}

function getIcon(gateway: TransactionGateway, type?: TransactionTypeEnum) {
  let Icon;

  switch (gateway) {
    case 'bonus_any':
    case 'bonus':
      Icon = BonusSVG;
      break;
    case 'card':
      Icon = CreditCardSVG;
      break;
    case 'crypto_exchange':
      Icon = ExchangeSVG;
      break;
    case 'top_up':
    case 'manual':
    case 'p2p_order':
    case 'wpay_payout':
      if (type === 'withdraw') {
        Icon = SendSVG;
      } else {
        Icon = ReceiveSVG;
      }
      break;
    case 'p2p_refund':
      Icon = ReceiveSVG;
      break;
    case 'payouts':
    case 'withdraw_onchain':
      Icon = SendSVG;
      break;
    case 'multi_use':
    case 'single_use':
    case 'part_multi_use':
      Icon = ChequesSVG;
      break;
    case 'campaign':
      Icon = CampaignSVG;
      break;
    case 'p2p_offer':
      if (type === 'withdraw') {
        Icon = SendSVG;
      } else {
        Icon = ReceiveSVG;
      }
      break;
    default:
      Icon = 'div';
      break;
  }
  return <Icon />;
}

const OperationIcon: FC<OperationIconProps> = ({
  size,
  iconSize,
  gateway,
  className,
  type,
}) => {
  const theme = useTheme();
  return (
    <RoundedIcon
      className={className}
      size={size}
      iconSize={iconSize}
      backgroundColor={
        theme === 'material'
          ? 'button'
          : 'linear-gradient(156.88deg, #00e7ff 14.96%, #007aff 85.04%)'
      }
    >
      {getIcon(gateway, type)}
    </RoundedIcon>
  );
};

export default OperationIcon;
