# payments.getBankCardData

Get info about a credit card

```tl
payments.bankCardData#3e24e573 title:string open_urls:Vector<BankCardOpenUrl> = payments.BankCardData;
---functions---
payments.getBankCardData#2e79d779 number:string = payments.BankCardData;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **number** | [string](/type/string.md) | Credit card number |

### Result
[payments.BankCardData](/type/payments.BankCardData.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BANK\_CARD\_NUMBER\_INVALID | The specified card number is invalid. |