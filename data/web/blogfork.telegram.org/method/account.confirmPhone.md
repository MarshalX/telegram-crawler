# account.confirmPhone

Confirm a phone number to cancel account deletion, for more info [click here »](/api/account-deletion.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.confirmPhone#5f2178c3 phone_code_hash:string phone_code:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash, for more info [click here »](/api/account-deletion.md) |
| **phone\_code** | [string](/type/string.md) | SMS code, for more info [click here »](/api/account-deletion.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CODE\_HASH\_INVALID | Code hash invalid. |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |

### Related pages

#### [Account deletion](/api/account-deletion.md)
How to reset an account if the 2FA password was forgotten.