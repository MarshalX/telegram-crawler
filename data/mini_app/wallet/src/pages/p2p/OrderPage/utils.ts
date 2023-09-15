import {
  BuyOfferRestDto,
  ItemOrderStatusStatusEnum,
  OrderRestDto,
  OrderRestDtoStatusEnum,
  SellOfferRestDto,
} from 'api/p2p/generated-common';

export function getLastChangelog(order?: OrderRestDto) {
  if (!order) return;

  return order.changeLog.items[order.changeLog.items.length - 1];
}

export function getOrderStatusBeforeCancel(order?: OrderRestDto) {
  if (!order) return;

  const canceledStatuses: ItemOrderStatusStatusEnum[] = [
    ItemOrderStatusStatusEnum.Cancelled,
    ItemOrderStatusStatusEnum.Cancelling,
    ItemOrderStatusStatusEnum.Rejected,
  ];
  const { items: logs } = order.changeLog;

  for (let i = logs.length - 1; i >= 0; i--) {
    const log = logs[i];
    const nextLog = logs[i + 1];
    if (
      canceledStatuses.includes(nextLog?.status) &&
      !canceledStatuses.includes(log.status)
    )
      return log.status;
  }
}

export function orderIsCancelled(order?: OrderRestDto): boolean {
  if (!order) return false;

  return order.status === 'CANCELLED' || order.status === 'CANCELLING';
}

export function getIsOfferDeactivated(order: OrderRestDto) {
  return (
    order.status === 'REJECTED' && order.rejectReason === 'OFFER_DEACTIVATED'
  );
}

export function buyerDidNotConfirmOrder(order?: OrderRestDto): boolean {
  if (!order) return false;
  return order.status === 'REJECTED';
}

export function getIsOrderWasNotAccepted({
  order,
  offer,
}: {
  order?: OrderRestDto;
  offer?: SellOfferRestDto | BuyOfferRestDto;
}) {
  if (!order || !offer) return false;

  const lastChangelog = getLastChangelog(order);
  const previousStatus = getOrderStatusBeforeCancel(order);

  return (
    orderIsCancelled(order) &&
    previousStatus === 'NEW' &&
    !!lastChangelog &&
    ((offer.type === 'SALE' &&
      lastChangelog.initiatorUserId === order.seller?.userId) ||
      (offer.type === 'PURCHASE' &&
        lastChangelog.initiatorUserId === order.buyer?.userId))
  );
}

export function getIsOrderWasCancelledBeforeAccept({
  order,
  offer,
}: {
  order?: OrderRestDto;
  offer?: SellOfferRestDto | BuyOfferRestDto;
}) {
  if (!order || !offer) return false;

  const lastChangelog = getLastChangelog(order);
  const previousStatus = getOrderStatusBeforeCancel(order);

  return orderIsCancelled(order) && previousStatus === 'NEW' && !!lastChangelog;
}

export function getIsOrderWasCancelledBeforePaymentConfirm({
  order,
  offer,
}: {
  order?: OrderRestDto;
  offer?: SellOfferRestDto | BuyOfferRestDto;
}) {
  if (!order || !orderIsCancelled(order) || !offer) return false;

  const lastChangelog = getLastChangelog(order);
  const previousStatus = getOrderStatusBeforeCancel(order);
  const acceptedStatuses: OrderRestDtoStatusEnum[] = [
    'ACCEPTED_ORDER',
    'ACCEPTING_ORDER',
  ];

  if (!previousStatus) return false;

  return (
    (acceptedStatuses.includes(previousStatus) && !!lastChangelog) ||
    previousStatus === 'TIMEOUT_EXPIRED_SENDING_PAYMENT_BY_BUYER'
  );
}

export function getIsOrderWasCancelledAfterPaymentConfirm({
  order,
  offer,
}: {
  order?: OrderRestDto;
  offer?: SellOfferRestDto | BuyOfferRestDto;
}) {
  if (!order || !offer) return false;

  const lastChangelog = getLastChangelog(order);
  const previousStatus = getOrderStatusBeforeCancel(order);

  return (
    orderIsCancelled(order) &&
    previousStatus === 'CONFIRMED_SENDING_PAYMENT_BY_BUYER' &&
    !!lastChangelog
  );
}
