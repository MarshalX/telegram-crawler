# auth.LoginToken

Login token (for QR code login)

```tl
auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
auth.loginTokenMigrateTo#68e9916 dc_id:int token:bytes = auth.LoginToken;
auth.loginTokenSuccess#390d5c5e authorization:auth.Authorization = auth.LoginToken;

---functions---

auth.exportLoginToken#b7e085fe api_id:int api_hash:string except_ids:Vector<long> = auth.LoginToken;
auth.importLoginToken#95ac5ce4 token:bytes = auth.LoginToken;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [auth.loginToken](/constructor/auth.loginToken.md) | Login token (for [QR code login](/api/qr-login.md)) |
| [auth.loginTokenMigrateTo](/constructor/auth.loginTokenMigrateTo.md) | Repeat the query to the specified DC |
| [auth.loginTokenSuccess](/constructor/auth.loginTokenSuccess.md) | Login via token (QR code) succeeded! |

### Methods

| Method | Description |
| --- | --- |
| [auth.exportLoginToken](/method/auth.exportLoginToken.md) | Generate a login token, for [login via QR code](/api/qr-login.md).  \
The generated login token should be encoded using base64url, then shown as a `tg://login?token=base64encodedtoken` [deep link »](/api/links.md#qr-code-login-links) in the QR code.\
\
For more info, see [login via QR code](/api/qr-login.md). |
| [auth.importLoginToken](/method/auth.importLoginToken.md) | Login using a redirected login token, generated in case of DC mismatch during [QR code login](/api/qr-login.md).\
\
For more info, see [login via QR code](/api/qr-login.md). |