# auth.checkPaidAuth

Checks the status of a [login payment](/api/auth.md#paid-auth).

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
auth.checkPaidAuth#56e59f9c phone_number:string phone_code_hash:string form_id:long = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number |
| **phone\_code\_hash** | [string](/type/string.md) | The phone code hash obtained from [auth.sendCode](/method/auth.sendCode.md) |
| **form\_id** | [long](/type/long.md) | The payment form ID passed to [payments.sendPaymentForm](/method/payments.sendPaymentForm.md). |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login

#### [payments.sendPaymentForm](/method/payments.sendPaymentForm.md)
Send compiled payment form

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.