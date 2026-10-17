# account.sendConfirmPhoneCode

Send confirmation code to cancel account deletion, for more info [click here »](/api/account-deletion.md)

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
account.sendConfirmPhoneCode#1b3faa88 hash:string settings:CodeSettings = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [string](/type/string.md) | The hash from the service notification, for more info [click here »](/api/account-deletion.md) |
| **settings** | [CodeSettings](/type/CodeSettings.md) | Phone code settings |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | HASH\_INVALID | The provided hash is invalid. |

### Related pages

#### [Account deletion](/api/account-deletion.md)
How to reset an account if the 2FA password was forgotten.