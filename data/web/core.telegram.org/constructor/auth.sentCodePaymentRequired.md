# auth.sentCodePaymentRequired

Official apps may receive this constructor, indicating that due to the high cost of SMS verification codes for the user's country/provider, the user must purchase a [Telegram Premium](/api/premium.md) subscription in order to proceed with the login/signup, see [here »](/api/auth.md#paid-auth) for more info.

```tl
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **store\_product** | [string](/type/string.md) | For official apps, tore identifier of the Telegram Premium subscription. |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash, to be stored and later re-used with [auth.signIn](/method/auth.signIn.md) |
| **support\_email\_address** | [string](/type/string.md) | An email address that can be contacted for more information about this request. |
| **support\_email\_subject** | [string](/type/string.md) | The mandatory subject for the email. |
| **premium\_days** | [int](/type/int.md) | Duration in days of the [Telegram Premium](/api/premium.md) subscription granted by this purchase. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code. |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[auth.SentCode](/type/auth.SentCode.md)

### Related pages

#### [auth.signIn](/method/auth.signIn.md)
Signs in a user with a validated phone number.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Bot Payments API](/bots/payments.md)

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.