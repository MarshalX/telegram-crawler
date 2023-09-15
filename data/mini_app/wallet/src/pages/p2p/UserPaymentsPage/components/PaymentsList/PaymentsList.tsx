import { useUserPayments } from 'query/p2p/useUserPayments';
import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { SbpBankRestDto } from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { ButtonCell, Cell } from 'components/Cells';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { repeat } from 'utils/common/common';
import { getRecipientNumberFromAttributes } from 'utils/p2p/getRecipientNumberFromAttributes';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as FaceSVG } from 'images/face.svg';

import { usePaymentDetailsPageContext } from '../../UserPaymentsPage';
import styles from './PaymentsList.module.scss';

const FaceAnimation = lazy(
  () => import('components/animations/FaceAnimation/FaceAnimation'),
);

const PaymentsList = () => {
  const { t } = useTranslation();
  const { themeClassName, theme } = useTheme(styles);
  const navigate = useNavigate();
  const { data: paymentDetails } = useUserPayments();
  const { isPaymentsLoading } = usePaymentDetailsPageContext();
  const getPaymentMethodName = useGetPaymentMethodName();
  const handleClickAddPayment = () => {
    navigate(generatePath(routePaths.P2P_USER_PAYMENTS_NEW));
  };

  const handleBackClick = () => {
    navigate(routePaths.P2P_USER_PROFILE);
  };

  return (
    <>
      <BackButton onClick={handleBackClick} />
      {paymentDetails.length === 0 ? (
        <section className="container">
          <div className={themeClassName('emptyPayments')}>
            <Suspense fallback={<FaceSVG className={styles.face} />}>
              <FaceAnimation className={styles.face} />
            </Suspense>
            <p className={themeClassName('emptyText')}>
              {t('p2p.payment_details_page.empty_page_description')}
            </p>
            <p
              className={themeClassName('button')}
              onClick={handleClickAddPayment}
            >
              {t('p2p.payment_details_page.add_a_payment_method')}
            </p>
          </div>
        </section>
      ) : (
        <div className={themeClassName('root')}>
          <Section separator={theme === 'material'}>
            <ButtonCell onClick={handleClickAddPayment}>
              {t('p2p.payment_details_page.add_a_payment_method')}
            </ButtonCell>
          </Section>

          <Section
            title={t(
              'p2p.payment_details_page.added_payment_methods',
            ).toLocaleUpperCase()}
          >
            <Skeleton
              skeleton={
                <Cell.List>
                  {repeat((i) => {
                    return (
                      <Cell key={i}>
                        <Cell.Text skeleton description />
                      </Cell>
                    );
                  }, 4)}
                </Cell.List>
              }
              skeletonShown={isPaymentsLoading && !paymentDetails.length}
            >
              <Cell.List>
                {paymentDetails.map((payment) => (
                  <Cell
                    key={payment.id}
                    onClick={() =>
                      navigate(
                        generatePath(routePaths.P2P_USER_PAYMENTS_EDIT, {
                          id: String(payment.id),
                        }),
                      )
                    }
                    tappable
                    chevron
                  >
                    <Cell.Text
                      title={payment.name}
                      description={
                        <>
                          {getPaymentMethodName(
                            payment.paymentMethod,
                            payment.attributes?.values?.find(
                              (value) => value.name === 'BANKS',
                            )?.value as SbpBankRestDto[],
                          )}{' '}
                          · {payment.currency}
                          <br />
                          {getRecipientNumberFromAttributes(payment.attributes)}
                        </>
                      }
                    />
                  </Cell>
                ))}
              </Cell.List>
            </Skeleton>
          </Section>
        </div>
      )}
    </>
  );
};

export default PaymentsList;
