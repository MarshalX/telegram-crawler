# account.emailVerifiedLogin

The email was verified correctly, and a login code was just sent to it.

```tl
account.emailVerifiedLogin#e1bb0d61 email:string sent_code:auth.SentCode = account.EmailVerified;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **email** | [string](/type/string.md) | The verified email address. |
| **sent\_code** | [auth.SentCode](/type/auth.SentCode.md) | Info about the sent [login code](/api/auth.md) |

### Type
[account.EmailVerified](/type/account.EmailVerified.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.