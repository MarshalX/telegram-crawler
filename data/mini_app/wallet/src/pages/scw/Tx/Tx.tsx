import { useCollectible } from 'query/getGems/collectibles/collectible';
import { useAccountEvents } from 'query/scw/account';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TransactionTypeEnum } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { Media } from 'pages/collectibles/components/Media/Media';

import { Amount } from 'containers/common/Amount/Amount';
import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';
import {
  EventCellInfo,
  getEventCellInfo,
} from 'containers/scw/SCWEventCell/SCWEventCell';
import { TransactionCardSkeleton } from 'containers/wallet/TransactionCard/TransactionCard';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { copyToClipboard } from 'utils/common/common';
import { printCryptoAmount } from 'utils/common/currency';
import { printDate } from 'utils/common/date';
import {
  getActionNftAddress,
  getActionRecipient,
  getActionSender,
} from 'utils/scw/actions';
import { squashAddress } from 'utils/wallet/transactions';

import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Tx.module.scss';

const TxSkeleton = () => {
  const theme = useTheme();

  return (
    <>
      {theme === 'material' ? (
        <Section separator>
          <TransactionCardSkeleton />
        </Section>
      ) : (
        <section>
          <TransactionCardSkeleton />
        </section>
      )}
      <Section separator>
        <Cell.List>
          <Cell>
            <Cell.Text skeleton />
          </Cell>
          <Cell>
            <Cell.Text skeleton />
          </Cell>
        </Cell.List>
      </Section>
    </>
  );
};

const CollectibleDisplay: FC<{ address: string }> = ({ address }) => {
  const { themeClassName } = useTheme(styles);
  const collectibleResponse = useCollectible(address);
  const collectible = collectibleResponse?.data?.collectible;

  if (!collectible) {
    return (
      <>
        <div className={themeClassName('contentSkeleton')} />
        <Text
          apple={{ variant: 'title1', color: 'text' }}
          material={{
            variant: 'headline5',
            color: 'text',
          }}
          skeleton
          skeletonWidth={100}
        />
      </>
    );
  }

  return (
    <div className={themeClassName('content')}>
      <Media className={styles.contentMedia} payload={collectible.content} />
      <Text
        apple={{ variant: 'title1', color: 'text' }}
        material={{
          variant: 'headline5',
          color: 'text',
        }}
      >
        {collectible.name || squashAddress(address, { start: 4, end: 4 })}
      </Text>
    </div>
  );
};

const Tx = () => {
  const { theme } = useTheme(styles);
  const languageCode = useLanguage();
  const { t } = useTranslation();
  const params = useParams();
  const snackbarContext = useContext(SnackbarContext);
  const eventId = params.id as string;

  const { raw } = useAppSelector((state) => state.scw);
  const { data: eventsData, isLoading } = useAccountEvents();
  const events = eventsData ? eventsData.events : [];
  const event = events.find((event) => event.event_id == eventId);
  const nftAddress = event ? getActionNftAddress(event.actions[0]) : undefined;
  const eventInfo: EventCellInfo | undefined =
    event && getEventCellInfo(event.actions[0], raw);

  const mediaSize = theme === 'apple' ? 32 : 24;

  const amount = eventInfo?.amount || 0;
  const type = eventInfo?.isSender
    ? TransactionTypeEnum.Withdraw
    : TransactionTypeEnum.Deposit;
  const currency = eventInfo?.currency || '';
  const status = eventInfo?.success
    ? 'transactions.success'
    : 'transactions.failed';

  const sender = event && getActionSender(event.actions[0]);
  const recipient = event && getActionRecipient(event.actions[0]);

  const renderMedia = () => {
    return <OperationIcon gateway={'top_up'} size={mediaSize} type={type} />;
  };

  const renderOperation = () => {
    return eventInfo?.isSender
      ? t('transaction.sent')
      : t('transaction.received');
  };
  const renderCounterParty = (squash: boolean) => {
    if (eventInfo?.isSender && recipient) {
      return (
        recipient.name ||
        (squash
          ? squashAddress(recipient?.address, { start: 4, end: 4 })
          : recipient?.address)
      );
    } else if (sender) {
      return (
        sender?.name ||
        (squash
          ? squashAddress(sender?.address, { start: 4, end: 4 })
          : sender.address)
      );
    }
    return undefined;
  };
  const counterPartySquashed = renderCounterParty(true);
  const counterPartyFull = renderCounterParty(false);

  const formattedAmount = printCryptoAmount({
    amount,
    currency,
    languageCode,
    currencyDisplay: false,
  });

  return (
    <Page mode="secondary">
      <BackButton />
      <Skeleton skeletonShown={isLoading} skeleton={<TxSkeleton />}>
        <Amount
          appearance={'default'}
          top={
            <OperationInfo
              avatar={renderMedia()}
              operation={renderOperation()}
              merchant={counterPartySquashed}
            />
          }
          bottom={
            <>
              {nftAddress && <CollectibleDisplay address={nftAddress} />}
              <>
                {printDate({
                  value: new Date((event?.timestamp || 0) * 1000),
                  t,
                  languageCode,
                })}
              </>
            </>
          }
          value={
            !nftAddress && (
              <>
                {amount > 0 ? (type === 'deposit' ? '+' : '-') : ''}
                {formattedAmount}
              </>
            )
          }
          currency={currency}
        />
        <Section separator={theme === 'material'}>
          <Cell.List>
            {/* TODO: Send again cell */}
            <a
              target="_blank"
              href={`https://tonviewer.com/transaction/${eventId}`}
              rel="noreferrer noopener"
            >
              <Cell tappable chevron>
                <Cell.Text
                  title={t('scw.tx.view_on_explorer')}
                  titleAppearance="primary"
                />
              </Cell>
            </a>
          </Cell.List>
        </Section>
        <Section separator title={t('scw.tx.payment_details')}>
          <Cell.List>
            <Cell>
              <Cell.Text
                title={t(status)}
                description={t('scw.tx.status')}
                inverted
              />
            </Cell>
            {eventInfo?.comment && (
              <Cell>
                <Cell.Text
                  title={eventInfo.comment}
                  description={t('p2p.preview_offer_page.comment')}
                  inverted
                />
              </Cell>
            )}
            {counterPartyFull && (
              <Cell
                onClick={() =>
                  copyToClipboard(counterPartyFull).then(() => {
                    snackbarContext.showSnackbar({
                      text: t('transaction.address_copied'),
                    });
                  })
                }
              >
                <Cell.Text
                  title={counterPartyFull}
                  description={t(
                    eventInfo?.isSender
                      ? 'transaction.sent'
                      : 'transaction.received',
                  )}
                  titleClassName={styles.recipient}
                  inverted
                />
              </Cell>
            )}
          </Cell.List>
        </Section>
      </Skeleton>
    </Page>
  );
};

export default Tx;
