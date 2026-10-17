# auth.resetLoginEmail

Reset the [login email »](/api/auth.md#email-verification).

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
auth.resetLoginEmail#7e960193 phone_number:string phone_code_hash:string = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number of the account |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash, obtained as described in the [documentation »](/api/auth.md) |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMAIL\_INSTALL\_MISSING | Attempting to send a code to the recovery email, but no email is configured. |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 400 | TASK\_ALREADY\_EXISTS | An email reset was already requested. |

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.