# inputStorePaymentGiftPremium

Info about a gifted Telegram Premium purchase

```tl
inputStorePaymentGiftPremium#616f7fe8 user_id:InputUser currency:string amount:long = InputStorePaymentPurpose;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | The user to which the Telegram Premium subscription was gifted |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)