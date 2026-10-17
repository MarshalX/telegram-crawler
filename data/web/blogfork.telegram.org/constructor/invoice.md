# invoice

Invoice

```tl
invoice#49ee584 flags:# test:flags.0?true name_requested:flags.1?true phone_requested:flags.2?true email_requested:flags.3?true shipping_address_requested:flags.4?true flexible:flags.5?true phone_to_provider:flags.6?true email_to_provider:flags.7?true recurring:flags.9?true currency:string prices:Vector<LabeledPrice> max_tip_amount:flags.8?long suggested_tip_amounts:flags.8?Vector<long> terms_url:flags.10?string subscription_period:flags.11?int = Invoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **test** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Test invoice |
| **name\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag if you require the user's full name to complete the order |
| **phone\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Set this flag if you require the user's phone number to complete the order |
| **email\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Set this flag if you require the user's email address to complete the order |
| **shipping\_address\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Set this flag if you require the user's shipping address to complete the order |
| **flexible** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Set this flag if the final price depends on the shipping method |
| **phone\_to\_provider** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Set this flag if user's phone number should be sent to provider |
| **email\_to\_provider** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Set this flag if user's email address should be sent to provider |
| **recurring** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether this is a recurring payment |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code, or `XTR` for [Telegram Stars](/api/stars.md). |
| **prices** | [Vector](/type/Vector%20t)&lt;[LabeledPrice](/type/LabeledPrice.md)&gt; | Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.) |
| **max\_tip\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[long](/type/long.md) | The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **suggested\_tip\_amounts** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | A vector of suggested amounts of tips in the *smallest units* of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed `max_tip_amount`. |
| **terms\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[string](/type/string.md) | Terms of service URL |
| **subscription\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | The number of seconds between consecutive Telegram Star debiting for [bot subscription](/api/subscriptions.md#bot-subscriptions) invoices |

### Type
[Invoice](/type/Invoice.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Star subscriptions](/api/subscriptions.md)
Bots and channels may create subscriptions, periodically charging users a certain amount of Telegram Stars in exchange for content and services.