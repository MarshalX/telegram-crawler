# account.acceptAuthorization

Sends a Telegram Passport authorization form, effectively sharing data with the service

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.acceptAuthorization#f3ed4c73 bot_id:long scope:string public_key:string value_hashes:Vector<SecureValueHash> credentials:SecureCredentialsEncrypted = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot\_id** | [long](/type/long.md) | Bot ID |
| **scope** | [string](/type/string.md) | Telegram Passport element types requested by the service |
| **public\_key** | [string](/type/string.md) | Service's public key |
| **value\_hashes** | [Vector](/type/Vector%20t)&lt;[SecureValueHash](/type/SecureValueHash.md)&gt; | Types of values sent and their hashes |
| **credentials** | [SecureCredentialsEncrypted](/type/SecureCredentialsEncrypted.md) | Encrypted values |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | PUBLIC\_KEY\_REQUIRED | A public key is required. |