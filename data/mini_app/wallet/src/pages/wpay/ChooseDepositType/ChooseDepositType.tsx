import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import routePaths from 'routePaths';

import { CallToActionCell } from 'containers/wallet/CallToActionCell/CallToActionCell';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';

import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useReceiveAvailability } from 'hooks/common/useReceiveAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CardSVG } from 'images/buy.svg';
import { ReactComponent as DepositSVG } from 'images/receive.svg';

import styles from './ChooseDepositType.module.scss';

const ChooseDepositType = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const isPurchaseAvailable = usePurchaseAvailability();
  const isReceiveAvailable = useReceiveAvailability();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [depositType, setDepositType] = useState<'purchase' | 'receive'>(
    'purchase',
  );

  const assetCurrency = searchParams.get('assetCurrency') as string;

  const handleContinue = (depositType: 'purchase' | 'receive') => {
    if (depositType === 'purchase' && isPurchaseAvailable()) {
      const value = searchParams.get('amount') || '';

      navigate({
        pathname: generatePath(routePaths.PURCHASE, {
          assetCurrency,
        }),
        search: createSearchParams({
          returnPath: searchParams.get('returnPath') || '',
          value,
        }).toString(),
      });
    } else if (depositType === 'receive') {
      isReceiveAvailable() &&
        navigate({
          pathname: routePaths.RECEIVE,
          search: createSearchParams({
            assetCurrency: searchParams.get('assetCurrency') as string,
            freeze: 'true',
          }).toString(),
        });
    }
  };

  return (
    <Page>
      <BackButton />
      <div className={themeClassName('root')}>
        <h1 className={themeClassName('title')}>{t('wpay.deposit.title')}</h1>
        <p className={themeClassName('text')}>{t('wpay.deposit.text')}</p>
        <div className={styles.callToActions}>
          <CallToActionCell
            type="select"
            title={t('wpay.deposit.buy_with_card')}
            description={
              <div className={themeClassName('popular')}>
                {t('wpay.deposit.buy_with_card_text')}
              </div>
            }
            before={<CardSVG />}
            checked={depositType === 'purchase'}
            onClick={() => {
              setDepositType('purchase');
              handleContinue('purchase');
            }}
          />
          <CallToActionCell
            type="select"
            title={t('wpay.deposit.receive')}
            before={<DepositSVG />}
            checked={depositType === 'receive'}
            onClick={() => {
              setDepositType('receive');
              handleContinue('receive');
            }}
          />
        </div>
        <MainButton
          text={t('common.continue')}
          onClick={() => handleContinue(depositType)}
        />
      </div>
    </Page>
  );
};

export default ChooseDepositType;
