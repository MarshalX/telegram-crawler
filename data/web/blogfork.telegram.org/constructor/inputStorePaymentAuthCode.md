# inputStorePaymentAuthCode

Indicates payment for a login code.

```tl
inputStorePaymentAuthCode#3fc18057 flags:# restore:flags.0?true phone_number:string phone_code_hash:string premium_days:int currency:string amount:long = InputStorePaymentPurpose;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **restore** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to restore a previously made purchase. |
| **phone\_number** | [string](/type/string.md) | Phone number. |
| **phone\_code\_hash** | [string](/type/string.md) | `phone_code_hash` returned by [auth.sendCode](/method/auth.sendCode.md). |
| **premium\_days** | [int](/type/int.md) | Duration in days of the [Telegram Premium](/api/premium.md) subscription granted by this purchase, as indicated in [auth.sentCodePaymentRequired](/constructor/auth.sentCodePaymentRequired.md).`premium_days`. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md)

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [auth.sentCodePaymentRequired](/constructor/auth.sentCodePaymentRequired.md)
Official apps may receive this constructor, indicating that due to the high cost of SMS verification codes for the user's country/provider, the user must purchase a [Telegram Premium](/api/premium.md) subscription in order to proceed with the login/signup, see [here »](/api/auth.md#paid-auth) for more info.

#### [Bot Payments API](/bots/payments.md)