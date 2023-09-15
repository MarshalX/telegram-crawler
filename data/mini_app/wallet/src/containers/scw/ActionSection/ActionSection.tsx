import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Action } from 'api/tonapi/generated/api';

import { useAppSelector } from 'store';

import { Cell } from 'components/Cells';
import Section from 'components/Section/Section';

import { printCryptoAmount } from 'utils/common/currency';
import {
  getActionAmount,
  getActionDetails,
  getActionRecipient,
} from 'utils/scw/actions';
import { convertToDecimal } from 'utils/scw/ton';

import styles from './ActionSection.module.scss';

export const ActionSection: FC<{
  action: Action;
  hasOneAction: boolean;
  fee?: string;
}> = ({ action, hasOneAction, fee }) => {
  const { t } = useTranslation();
  const { languageCode } = useAppSelector((state) => state.settings);

  const recipient = getActionRecipient(action);
  const amount = getActionAmount(action);
  const details = getActionDetails(action);

  const amountText = printCryptoAmount({
    amount: convertToDecimal(amount.amount),
    currency: amount.currency,
    languageCode,
    currencyDisplay: 'code',
  });

  return (
    <Section separator>
      <Cell.List>
        <Cell>
          <Cell.Text
            title={recipient?.name || recipient.address}
            description={t('scw.tx.recipient_address')}
            className={styles.address}
            inverted
          />
        </Cell>
        {hasOneAction && fee && (
          <Cell>
            <Cell.Text
              title={`≈ ${fee}`}
              description={t('send_confirmation.fee')}
              inverted
            />
          </Cell>
        )}
        {!hasOneAction && (
          <Cell>
            <Cell.Text
              title={amountText}
              description={t('send_confirmation.total')}
              inverted
            />
          </Cell>
        )}
        {details && (
          <Cell>
            <Cell.Text
              title={<pre className={styles.pre}>{details}</pre>}
              description={t('collectibles.collectible_page.details')}
              inverted
            />
          </Cell>
        )}
      </Cell.List>
    </Section>
  );
};
