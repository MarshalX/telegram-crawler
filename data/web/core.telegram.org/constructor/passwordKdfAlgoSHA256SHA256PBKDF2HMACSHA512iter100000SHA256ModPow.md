# passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow

This key derivation algorithm defines that [SRP 2FA login](/api/srp.md) must be used

```tl
passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow#3a912d4a salt1:bytes salt2:bytes g:int p:bytes = PasswordKdfAlgo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **salt1** | [bytes](/type/bytes.md) | One of two salts used by the derivation function (see [SRP 2FA login](/api/srp.md)) |
| **salt2** | [bytes](/type/bytes.md) | One of two salts used by the derivation function (see [SRP 2FA login](/api/srp.md)) |
| **g** | [int](/type/int.md) | Base (see [SRP 2FA login](/api/srp.md)) |
| **p** | [bytes](/type/bytes.md) | 2048-bit modulus (see [SRP 2FA login](/api/srp.md)) |

### Type
[PasswordKdfAlgo](/type/PasswordKdfAlgo.md)

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.