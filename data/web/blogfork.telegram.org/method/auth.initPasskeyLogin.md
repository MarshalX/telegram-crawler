# auth.initPasskeyLogin

Initialize login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info.

```tl
auth.passkeyLoginOptions#e2037789 options:DataJSON = auth.PasskeyLoginOptions;
---functions---
auth.initPasskeyLogin#518ad0b7 api_id:int api_hash:string = auth.PasskeyLoginOptions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **api\_id** | [int](/type/int.md) | Application identifier (see [App configuration](/myapp)) |
| **api\_hash** | [string](/type/string.md) | Application identifier hash (see [App configuration](/myapp)) |

### Result
[auth.PasskeyLoginOptions](/type/auth.PasskeyLoginOptions.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | API\_ID\_INVALID | API ID invalid. |
| 500 | AUTH\_RESTART | Restart the authorization process. |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.