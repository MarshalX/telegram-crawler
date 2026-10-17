# account.verifyPhone

Verify a phone number for telegram [passport](/passport.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.verifyPhone#4dd3a7f6 phone_number:string phone_code_hash:string phone_code:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash received from the call to [account.sendVerifyPhoneCode](/method/account.sendVerifyPhoneCode.md) |
| **phone\_code** | [string](/type/string.md) | Code received after the call to [account.sendVerifyPhoneCode](/method/account.sendVerifyPhoneCode.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |

### Related pages

#### [account.sendVerifyPhoneCode](/method/account.sendVerifyPhoneCode.md)
Send the verification phone code for telegram [passport](/passport.md).

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.