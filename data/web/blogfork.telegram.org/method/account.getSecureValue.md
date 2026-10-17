# account.getSecureValue

Get saved [Telegram Passport](/passport.md) document, [for more info see the passport docs »](/passport/encryption.md#encryption)

```tl
---functions---
account.getSecureValue#73665bc2 types:Vector<SecureValueType> = Vector<SecureValue>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **types** | [Vector](/type/Vector%20t)&lt;[SecureValueType](/type/SecureValueType.md)&gt; | Requested value types |

### Result
[Vector](/type/Vector%20t)&lt;[SecureValue](/type/SecureValue.md)&gt;

### Only users can use this method

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.