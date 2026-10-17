# secureValueErrorReverseSide

Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes.

```tl
secureValueErrorReverseSide#868a2aa5 type:SecureValueType file_hash:bytes text:string = SecureValueError;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | One of [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md), [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md) |
| **file\_hash** | [bytes](/type/bytes.md) | File hash |
| **text** | [string](/type/string.md) | Error message |

### Type
[SecureValueError](/type/SecureValueError.md)

### Related pages

#### [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md)
Driver's license

#### [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md)
Identity card