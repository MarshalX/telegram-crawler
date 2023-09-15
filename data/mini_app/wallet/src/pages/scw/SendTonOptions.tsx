import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, createSearchParams } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { CellCard } from 'components/Cells/CellCard/CellCard';
import { PageWithOptions } from 'components/PageWithOptions/PageWithOptions';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';

import { useAsset } from 'hooks/common/useAsset';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ExternalWalletSVG } from 'images/external_wallet.svg';
import { ReactComponent as WalletSVG } from 'images/wallet.svg';

const SendTonOptions: FC = () => {
  const theme = useTheme();
  const { address: custodialTONAddress } = useAsset('TON');
  const { t } = useTranslation();

  return (
    <PageWithOptions
      title={t('scw.send_options.title')}
      backButton={<BackButton />}
    >
      <CellCard
        Component={Link}
        to={routePaths.SCW_RECEIVER_SEARCH}
        chevron
        tappable
        start={
          <Cell.Part type="roundedIcon">
            <RoundedIcon
              size={theme === 'apple' ? 40 : 46}
              backgroundColor="linear-gradient(180deg, #A7ADB9 0%, #878B96 100%)"
            >
              <ExternalWalletSVG />
            </RoundedIcon>
          </Cell.Part>
        }
      >
        <Cell.Text
          bold
          title={t('scw.send_options.external_wallet_title')}
          description={t('scw.send_options.external_wallet_text')}
        />
      </CellCard>
      {custodialTONAddress && (
        <CellCard
          Component={Link}
          to={{
            pathname: routePaths.SCW_SEND,
            search: createSearchParams({
              address: custodialTONAddress,
            }).toString(),
          }}
          chevron
          tappable
          start={
            <Cell.Part type="roundedIcon">
              <RoundedIcon
                size={theme === 'apple' ? 40 : 46}
                backgroundColor="button"
              >
                <WalletSVG />
              </RoundedIcon>
            </Cell.Part>
          }
        >
          <Cell.Text
            bold
            title={t('scw.send_options.your_wallet_title')}
            description={t('scw.send_options.your_wallet_text')}
          />
        </CellCard>
      )}
    </PageWithOptions>
  );
};

export default SendTonOptions;
