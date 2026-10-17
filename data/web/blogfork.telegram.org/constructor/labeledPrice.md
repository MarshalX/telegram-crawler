# labeledPrice

This object represents a portion of the price for goods or services.

```tl
labeledPrice#cb296bf8 label:string amount:long = LabeledPrice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **label** | [string](/type/string.md) | Portion label |
| **amount** | [long](/type/long.md) | Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[LabeledPrice](/type/LabeledPrice.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)