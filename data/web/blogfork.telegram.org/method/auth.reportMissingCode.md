# auth.reportMissingCode

Official apps only, reports that the SMS authentication code wasn't delivered.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.reportMissingCode#cb9deff6 phone_number:string phone_code_hash:string mnc:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number where we were supposed to receive the code |
| **phone\_code\_hash** | [string](/type/string.md) | The phone code hash obtained from [auth.sendCode](/method/auth.sendCode.md) |
| **mnc** | [string](/type/string.md) | [MNC](https://en.wikipedia.org/wiki/Mobile_country_code) of the current network operator. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login