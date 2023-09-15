import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ClearResultsButton } from 'containers/common/ReceiverSearch/ClearResultsButton/ClearResultsButton';
import { ContactCell } from 'containers/common/ReceiverSearch/ContactCell/ContactCell';

import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import Skeleton from 'components/Skeleton/Skeleton';

import { printDate } from 'utils/common/date';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { RootState } from '../../../../store';
import styles from './RecentResults.module.scss';

interface RecentReceiver {
  id: string | number;
  walletAddress?: string;
  createdAt: string;
  currency: FrontendCryptoCurrencyEnum;
}

interface RecentResultsProps {
  onClick: (
    walletAddress: string,
    currency: FrontendCryptoCurrencyEnum,
  ) => void;
  avatarSize: number;
  recentReceivers?: Array<RecentReceiver>;
  onClear?: VoidFunction;
}

export const RecentResults: FC<RecentResultsProps> = (props) => {
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { onClick, onClear, avatarSize, recentReceivers } = props;
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  if (!recentReceivers) {
    return null;
  }
  return (
    <Skeleton skeletonShown={!recentReceivers.length} skeleton={<></>}>
      <section>
        <SectionHeader
          className={themeClassName('recentTitle')}
          action={!!onClear && <ClearResultsButton onClick={onClear} />}
        >
          {t('receiver_search.recent')}
        </SectionHeader>
        {recentReceivers &&
          recentReceivers.map((recentReceiver, index) => {
            const { id, walletAddress, currency, createdAt } = recentReceiver;

            if (walletAddress) {
              return (
                <ContactCell
                  key={id}
                  onClick={() => onClick(walletAddress, currency)}
                  before={
                    <CurrencyLogo
                      variant="complex"
                      currency={currency}
                      size={avatarSize}
                    />
                  }
                  top={
                    isTONDomain(walletAddress) || isWeb3Domain(walletAddress)
                      ? walletAddress
                      : squashAddress(walletAddress, {
                          start: 4,
                          end: 4,
                        })
                  }
                  bottom={printDate({
                    value: new Date(createdAt),
                    t,
                    languageCode,
                  })}
                  separator={recentReceivers.length - 1 > index}
                />
              );
            }
          })}
      </section>
    </Skeleton>
  );
};
