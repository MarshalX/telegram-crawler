# Account.TmpPassword

Temporary password

```tl
account.tmpPassword#db64fd34 tmp_password:bytes valid_until:int = account.TmpPassword;

---functions---

account.getTmpPassword#449e0b51 password:InputCheckPasswordSRP period:int = account.TmpPassword;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.tmpPassword](/constructor/account.tmpPassword.md) | Temporary payment password |

### Methods

| Method | Description |
| --- | --- |
| [account.getTmpPassword](/method/account.getTmpPassword.md) | Get temporary payment password |