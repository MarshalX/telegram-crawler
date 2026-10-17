# secureValueErrorSelfie

Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes.

```tl
secureValueErrorSelfie#e537ced6 type:SecureValueType file_hash:bytes text:string = SecureValueError;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | One of [secureValueTypePassport](/constructor/secureValueTypePassport.md), [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md), [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md), [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md) |
| **file\_hash** | [bytes](/type/bytes.md) | File hash |
| **text** | [string](/type/string.md) | Error message |

### Type
[SecureValueError](/type/SecureValueError.md)

### Related pages

#### [secureValueTypePassport](/constructor/secureValueTypePassport.md)
Passport

#### [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md)
Driver's license

#### [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md)
Identity card

#### [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md)
Internal [passport](/passport.md)