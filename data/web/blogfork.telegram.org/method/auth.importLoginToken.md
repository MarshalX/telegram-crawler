# auth.importLoginToken

Login using a redirected login token, generated in case of DC mismatch during [QR code login](/api/qr-login.md).

For more info, see [login via QR code](/api/qr-login.md).

```tl
auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
auth.loginTokenMigrateTo#68e9916 dc_id:int token:bytes = auth.LoginToken;
auth.loginTokenSuccess#390d5c5e authorization:auth.Authorization = auth.LoginToken;
---functions---
auth.importLoginToken#95ac5ce4 token:bytes = auth.LoginToken;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **token** | [bytes](/type/bytes.md) | Login token |

### Result
[auth.LoginToken](/type/auth.LoginToken.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AUTH\_TOKEN\_ALREADY\_ACCEPTED | The specified auth token was already accepted. |
| 400 | AUTH\_TOKEN\_EXPIRED | The authorization token has expired. |
| 400 | AUTH\_TOKEN\_INVALID | The specified auth token is invalid. |
| 400 | AUTH\_TOKEN\_INVALIDX | The specified auth token is invalid. |

### Related pages

#### [Login via QR code](/api/qr-login.md)
QR code login flow