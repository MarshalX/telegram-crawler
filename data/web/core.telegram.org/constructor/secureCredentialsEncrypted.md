# secureCredentialsEncrypted

Encrypted credentials required to decrypt [telegram passport](/passport.md) data.

```tl
secureCredentialsEncrypted#33f0ea47 data:bytes hash:bytes secret:bytes = SecureCredentialsEncrypted;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **data** | [bytes](/type/bytes.md) | Encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication, as described in [decrypting data »](/passport.md#decrypting-data) |
| **hash** | [bytes](/type/bytes.md) | Data hash for data authentication as described in [decrypting data »](/passport.md#decrypting-data) |
| **secret** | [bytes](/type/bytes.md) | Secret, encrypted with the bot's public RSA key, required for data decryption as described in [decrypting data »](/passport.md#decrypting-data) |

### Type
[SecureCredentialsEncrypted](/type/SecureCredentialsEncrypted.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.