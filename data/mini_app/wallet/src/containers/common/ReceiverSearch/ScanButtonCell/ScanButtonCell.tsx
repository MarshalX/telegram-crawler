import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ParsedAddress,
  parseAddress,
} from 'containers/common/ReceiverSearch/SearchInput/parseAddress';

import { ButtonCell, Cell } from 'components/Cells';

import { ReactComponent as ScanSVG } from 'images/scan.svg';

interface ScanButtonCellProps {
  onSuccessScan: (address: ParsedAddress) => void;
}

export const ScanButtonCell: FC<ScanButtonCellProps> = ({ onSuccessScan }) => {
  const { platform, isVersionAtLeast } = window.Telegram.WebApp;
  const canScan =
    (platform === 'ios' || platform === 'android') && isVersionAtLeast('6.4');
  const { t } = useTranslation();

  if (!canScan) {
    return null;
  }
  return (
    <ButtonCell
      start={
        <Cell.Part type="icon">
          <ScanSVG />
        </Cell.Part>
      }
      onClick={() => {
        window.Telegram.WebApp.showScanQrPopup(
          {
            text: t('receiver_search.scan_qr_text'),
          },
          (text) => {
            onSuccessScan(parseAddress(text));
          },
        );
      }}
      mode="primary"
    >
      {t('receiver_search.scan_qr')}
    </ButtonCell>
  );
};
