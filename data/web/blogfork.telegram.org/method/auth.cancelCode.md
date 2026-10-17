# auth.cancelCode

Cancel the login verification code

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.cancelCode#1f040578 phone_number:string phone_code_hash:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash from [auth.sendCode](/method/auth.sendCode.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login