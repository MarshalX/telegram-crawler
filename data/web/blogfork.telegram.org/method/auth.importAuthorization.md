# auth.importAuthorization

Logs in a user using a key transmitted from his native data-center.

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.importAuthorization#a57a7dad id:long bytes:bytes = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | User ID |
| **bytes** | [bytes](/type/bytes.md) | Authorization key |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Both users and bots can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AUTH\_BYTES\_INVALID | The provided authorization is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |