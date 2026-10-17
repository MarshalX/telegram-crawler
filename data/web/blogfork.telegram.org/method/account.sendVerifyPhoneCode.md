# account.sendVerifyPhoneCode

Send the verification phone code for telegram [passport](/passport.md).

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
account.sendVerifyPhoneCode#a5a356f9 phone_number:string settings:CodeSettings = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | The phone number to verify |
| **settings** | [CodeSettings](/type/CodeSettings.md) | Phone code settings |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.