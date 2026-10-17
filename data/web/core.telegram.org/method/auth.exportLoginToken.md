# auth.exportLoginToken

Generate a login token, for [login via QR code](/api/qr-login.md).  
The generated login token should be encoded using base64url, then shown as a `tg://login?token=base64encodedtoken` [deep link »](/api/links.md#qr-code-login-links) in the QR code.

For more info, see [login via QR code](/api/qr-login.md).

```tl
auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
auth.loginTokenMigrateTo#68e9916 dc_id:int token:bytes = auth.LoginToken;
auth.loginTokenSuccess#390d5c5e authorization:auth.Authorization = auth.LoginToken;
---functions---
auth.exportLoginToken#b7e085fe api_id:int api_hash:string except_ids:Vector<long> = auth.LoginToken;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **api\_id** | [int](/type/int.md) | Application identifier (see. [App configuration](/myapp)) |
| **api\_hash** | [string](/type/string.md) | Application identifier hash (see. [App configuration](/myapp)) |
| **except\_ids** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | List of already logged-in user IDs, to prevent logging in twice with the same user |

### Result
[auth.LoginToken](/type/auth.LoginToken.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | API\_ID\_INVALID | API ID invalid. |
| 400 | API\_ID\_PUBLISHED\_FLOOD | This API id was published somewhere, you can't use it now. |
| 500 | AUTH\_RESTART | Restart the authorization process. |

### Related pages

#### [Login via QR code](/api/qr-login.md)
QR code login flow

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.