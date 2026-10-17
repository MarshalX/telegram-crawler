# secureData

Secure [passport](/passport.md) data, for more info [see the passport docs »](/passport/encryption.md#securedata)

```tl
secureData#8aeabec3 data:bytes data_hash:bytes secret:bytes = SecureData;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **data** | [bytes](/type/bytes.md) | Data |
| **data\_hash** | [bytes](/type/bytes.md) | Data hash |
| **secret** | [bytes](/type/bytes.md) | Secret |

### Type
[SecureData](/type/SecureData.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.