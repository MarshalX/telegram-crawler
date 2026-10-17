# account.deleteSecureValue

Delete stored [Telegram Passport](/passport.md) documents, [for more info see the passport docs »](/passport/encryption.md#encryption)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.deleteSecureValue#b880bc4b types:Vector<SecureValueType> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **types** | [Vector](/type/Vector%20t)&lt;[SecureValueType](/type/SecureValueType.md)&gt; | Document types to delete |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.