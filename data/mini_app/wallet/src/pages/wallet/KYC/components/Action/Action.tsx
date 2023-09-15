import { useKycStatus } from 'query/wallet/kyc/useKycStatus';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KycPromotionRequiredDetailsPromotionKYCLevelEnum } from 'api/p2p/generated-common';
import { KycStatusPublicDtoLevelEnum } from 'api/p2p/generated-userservice';

import routePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppDispatch } from 'store';

import { updateKyc } from 'reducers/kyc/kycSlice';

import { ButtonCell } from 'components/Cells';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { Text } from 'components/Text/Text';

import { ReactComponent as WarningCircleSVG } from 'images/warning_cirlce.svg';

import styles from './Action.module.scss';

type Props = {
  nextLevel: KycStatusPublicDtoLevelEnum;
};

export const Action: FC<Props> = ({ nextLevel }) => {
  const { t } = useTranslation();
  const { kycStatus } = useKycStatus();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <ListItemCell
        contentClassName={styles.content}
        containerClassName={styles.container}
        header={
          <div className={styles.header}>
            <WarningCircleSVG
              height={28}
              width={28}
              className={styles.warning}
            />
            <Text
              apple={{ variant: 'body', weight: 'semibold' }}
              material={{ variant: 'body', weight: 'medium' }}
            >
              {t('transaction.get_verified')}
            </Text>
          </div>
        }
      >
        <Text
          apple={{ variant: 'callout', weight: 'regular' }}
          material={{ variant: 'subtitle1' }}
        >
          <Trans
            i18nKey="transaction.get_verified_description"
            t={t}
            components={[<a href={WALLET_SUPPORT_BOT_LINK} />]}
          />
        </Text>
      </ListItemCell>
      <ButtonCell
        onClick={() => {
          dispatch(
            updateKyc({
              nextLevel,
            }),
          );

          navigate(
            kycStatus?.level ===
              KycPromotionRequiredDetailsPromotionKYCLevelEnum._0
              ? routePaths.KYC_FIRST_CONFIRMATION
              : routePaths.KYC_CONFIRMATION,
          );
        }}
      >
        {t('transaction.continue_button')}
      </ButtonCell>
    </>
  );
};
