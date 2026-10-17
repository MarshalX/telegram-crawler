# secureValue

Secure value

```tl
secureValue#187fa0ca flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?SecureFile reverse_side:flags.2?SecureFile selfie:flags.3?SecureFile translation:flags.6?Vector<SecureFile> files:flags.4?Vector<SecureFile> plain_data:flags.5?SecurePlainData hash:bytes = SecureValue;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **type** | [SecureValueType](/type/SecureValueType.md) | Secure [passport](/passport.md) value type |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[SecureData](/type/SecureData.md) | Encrypted [Telegram Passport](/passport.md) element data |
| **front\_side** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[SecureFile](/type/SecureFile.md) | Encrypted [passport](/passport.md) file with the front side of the document |
| **reverse\_side** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[SecureFile](/type/SecureFile.md) | Encrypted [passport](/passport.md) file with the reverse side of the document |
| **selfie** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[SecureFile](/type/SecureFile.md) | Encrypted [passport](/passport.md) file with a selfie of the user holding the document |
| **translation** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Vector](/type/Vector%20t)&lt;[SecureFile](/type/SecureFile.md)&gt; | Array of encrypted [passport](/passport.md) files with translated versions of the provided documents |
| **files** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[SecureFile](/type/SecureFile.md)&gt; | Array of encrypted [passport](/passport.md) files with photos the of the documents |
| **plain\_data** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[SecurePlainData](/type/SecurePlainData.md) | Plaintext verified [passport](/passport.md) data |
| **hash** | [bytes](/type/bytes.md) | Data hash |

### Type
[SecureValue](/type/SecureValue.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.