# account.getTmpPassword

Get temporary payment password

```tl
account.tmpPassword#db64fd34 tmp_password:bytes valid_until:int = account.TmpPassword;
---functions---
account.getTmpPassword#449e0b51 password:InputCheckPasswordSRP period:int = account.TmpPassword;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | SRP password parameters |
| **period** | [int](/type/int.md) | Time during which the temporary password will be valid, in seconds; should be between 60 and 86400 |

### Result
[account.TmpPassword](/type/account.TmpPassword.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |
| 400 | SRP\_A\_INVALID | The specified inputCheckPasswordSRP.A value is invalid. |
| 400 | TMP\_PASSWORD\_DISABLED | The temporary password is disabled. |