# auth.importWebTokenAuthorization

Login by importing an authorization token

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.importWebTokenAuthorization#2db873a9 api_id:int api_hash:string web_auth_token:string = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **api\_id** | [int](/type/int.md) | [API ID](/api/obtaining_api_id.md) |
| **api\_hash** | [string](/type/string.md) | [API hash](/api/obtaining_api_id.md) |
| **web\_auth\_token** | [string](/type/string.md) | The authorization token |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | API\_ID\_INVALID | API ID invalid. |
| 400 | WEBAUTH\_TOKEN\_EXPIRED | The specified auth token has expired. |

### Related pages

#### [Creating your Telegram Application](/api/obtaining_api_id.md)
How to get your application identifier and create a new Telegram app.