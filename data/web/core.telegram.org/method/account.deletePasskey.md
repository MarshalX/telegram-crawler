# account.deletePasskey

Delete a passkey associated to the current account, see [here »](/api/passkeys.md#delete-passkeys) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.deletePasskey#f5b5563f id:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [string](/type/string.md) | Identifier of the passkey to delete, taken from [passkey](/constructor/passkey.md).`id`, usually obtained using [account.getPasskeys](/method/account.getPasskeys.md). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [passkey](/constructor/passkey.md)
Human-readable info about a passkey associated to an account, returned when [creating a passkey »](/api/passkeys.md#creating-a-passkey) or [listing passkeys »](/api/passkeys.md#list-passkeys).

#### [account.getPasskeys](/method/account.getPasskeys.md)
List the passkeys associated to the current account that can be used to log in, see [here »](/api/passkeys.md#list-passkeys) for more info on passkeys.

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.