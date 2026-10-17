# account.sendChangePhoneCode

Verify a new phone number to associate to the current account

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
account.sendChangePhoneCode#82574ae5 phone_number:string settings:CodeSettings = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | New phone number |
| **settings** | [CodeSettings](/type/CodeSettings.md) | Phone code settings |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | FRESH\_CHANGE\_PHONE\_FORBIDDEN | You can't change phone number right after logging in, please wait at least 24 hours. |
| 400 | PHONE\_NUMBER\_BANNED | The provided phone number is banned from telegram. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 400 | PHONE\_NUMBER\_OCCUPIED | The phone number is already in use. |