# messageActionPaymentRefunded

Describes a payment refund (service message received by both users and bots).

```tl
messageActionPaymentRefunded#41b3e202 flags:# peer:Peer currency:string total_amount:long payload:flags.0?bytes charge:PaymentCharge = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | Identifier of the peer that returned the funds. |
| **currency** | [string](/type/string.md) | Currency, `XTR` for Telegram Stars. |
| **total\_amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **payload** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | Bot specified invoice payload (only received by bots). |
| **charge** | [PaymentCharge](/type/PaymentCharge.md) | Provider payment identifier |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)