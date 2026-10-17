# inputSecureValue

Secure value, [for more info see the passport docs »](/passport/encryption.md#encryption)

```tl
inputSecureValue#db21d0a7 flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?InputSecureFile reverse_side:flags.2?InputSecureFile selfie:flags.3?InputSecureFile translation:flags.6?Vector<InputSecureFile> files:flags.4?Vector<InputSecureFile> plain_data:flags.5?SecurePlainData = InputSecureValue;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **type** | [SecureValueType](/type/SecureValueType.md) | Secure [passport](/passport.md) value type |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[SecureData](/type/SecureData.md) | Encrypted [Telegram Passport](/passport.md) element data |
| **front\_side** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputSecureFile](/type/InputSecureFile.md) | Encrypted [passport](/passport.md) file with the front side of the document |
| **reverse\_side** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputSecureFile](/type/InputSecureFile.md) | Encrypted [passport](/passport.md) file with the reverse side of the document |
| **selfie** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InputSecureFile](/type/InputSecureFile.md) | Encrypted [passport](/passport.md) file with a selfie of the user holding the document |
| **translation** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Vector](/type/Vector%20t)&lt;[InputSecureFile](/type/InputSecureFile.md)&gt; | Array of encrypted [passport](/passport.md) files with translated versions of the provided documents |
| **files** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[InputSecureFile](/type/InputSecureFile.md)&gt; | Array of encrypted [passport](/passport.md) files with photos the of the documents |
| **plain\_data** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[SecurePlainData](/type/SecurePlainData.md) | Plaintext verified [passport](/passport.md) data |

### Type
[InputSecureValue](/type/InputSecureValue.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.