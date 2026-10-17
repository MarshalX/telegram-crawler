# users.setSecureValueErrors

Notify the user that the sent [passport](/passport.md) data contains some errors The user will not be able to re-submit their Passport data to you until the errors are fixed (the contents of the field for which you returned the error must change).

Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
users.setSecureValueErrors#90c894b5 id:InputUser errors:Vector<SecureValueError> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputUser](/type/InputUser.md) | The user |
| **errors** | [Vector](/type/Vector%20t)&lt;[SecureValueError](/type/SecureValueError.md)&gt; | Errors |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DATA\_HASH\_SIZE\_INVALID | The size of the specified secureValueErrorData.data_hash is invalid. |
| 400 | HASH\_SIZE\_INVALID | The size of the specified secureValueError.hash is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.