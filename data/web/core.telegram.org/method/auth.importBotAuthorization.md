# auth.importBotAuthorization

Login as a bot

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.importBotAuthorization#67a3ff2c flags:int api_id:int api_hash:string bot_auth_token:string = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [int](/type/int.md) | Reserved for future use |
| **api\_id** | [int](/type/int.md) | Application identifier (see. [App configuration](/myapp)) |
| **api\_hash** | [string](/type/string.md) | Application identifier hash (see. [App configuration](/myapp)) |
| **bot\_auth\_token** | [string](/type/string.md) | Bot token (see [bots](/bots.md)) |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Both users and bots can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ACCESS\_TOKEN\_EXPIRED | Access token expired. |
| 400 | ACCESS\_TOKEN\_INVALID | Access token invalid. |
| 400 | API\_ID\_INVALID | API ID invalid. |
| 400 | API\_ID\_PUBLISHED\_FLOOD | This API id was published somewhere, you can't use it now. |

### Related pages

#### [Bots: An introduction for developers](/bots.md)
Bots are small applications that run entirely within the Telegram app.