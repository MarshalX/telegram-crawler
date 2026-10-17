# SecurePasswordKdfAlgo

KDF algorithm to use for computing telegram [passport](/passport.md) hash

```tl
securePasswordKdfAlgoUnknown#4a8537 = SecurePasswordKdfAlgo;
securePasswordKdfAlgoPBKDF2HMACSHA512iter100000#bbf2dda0 salt:bytes = SecurePasswordKdfAlgo;
securePasswordKdfAlgoSHA512#86471d92 salt:bytes = SecurePasswordKdfAlgo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [securePasswordKdfAlgoUnknown](/constructor/securePasswordKdfAlgoUnknown.md) | Unknown KDF algo (most likely the client has to be updated) |
| [securePasswordKdfAlgoPBKDF2HMACSHA512iter100000](/constructor/securePasswordKdfAlgoPBKDF2HMACSHA512iter100000.md) | PBKDF2 with SHA512 and 100000 iterations KDF algo |
| [securePasswordKdfAlgoSHA512](/constructor/securePasswordKdfAlgoSHA512.md) | SHA512 KDF algo |

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.