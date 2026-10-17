# auth.sendCode

Send the verification code for login

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number in international format |
| **api\_id** | [int](/type/int.md) | Application identifier (see [App configuration](/myapp)) |
| **api\_hash** | [string](/type/string.md) | Application secret hash (see [App configuration](/myapp)) |
| **settings** | [CodeSettings](/type/CodeSettings.md) | Settings for the code type to send |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | API\_ID\_INVALID | API ID invalid. |
| 400 | API\_ID\_PUBLISHED\_FLOOD | This API id was published somewhere, you can't use it now. |
| 500 | AUTH\_RESTART | Restart the authorization process. |
| 500 | AUTH\_RESTART\_%d | Internal error (debug info %d), please repeat the method call. |
| 400 | PHONE\_NUMBER\_APP\_SIGNUP\_FORBIDDEN | You can't sign up using this app. |
| 400 | PHONE\_NUMBER\_BANNED | The provided phone number is banned from telegram. |
| 400 | PHONE\_NUMBER\_FLOOD | You asked for the code too many times. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 406 | PHONE\_PASSWORD\_FLOOD | You have tried logging in too many times. |
| 400 | PHONE\_PASSWORD\_PROTECTED | This phone is password protected. |
| 400 | SMS\_CODE\_CREATE\_FAILED | An error occurred while creating the SMS code. |
| 406 | UPDATE\_APP\_TO\_LOGIN | Please update your client to login. |