# PasswordKdfAlgo

Key derivation function to use when generating the [password hash for SRP two-factor authorization](/api/srp.md)

```tl
passwordKdfAlgoUnknown#d45ab096 = PasswordKdfAlgo;
passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow#3a912d4a salt1:bytes salt2:bytes g:int p:bytes = PasswordKdfAlgo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [passwordKdfAlgoUnknown](/constructor/passwordKdfAlgoUnknown.md) | Unknown KDF (most likely, the client is outdated and does not support the specified KDF algorithm) |
| [passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow](/constructor/passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow.md) | This key derivation algorithm defines that [SRP 2FA login](/api/srp.md) must be used |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.