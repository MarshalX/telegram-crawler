# secureValueErrorFile

Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes.

```tl
secureValueErrorFile#7a700873 type:SecureValueType file_hash:bytes text:string = SecureValueError;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | One of [secureValueTypeUtilityBill](/constructor/secureValueTypeUtilityBill.md), [secureValueTypeBankStatement](/constructor/secureValueTypeBankStatement.md), [secureValueTypeRentalAgreement](/constructor/secureValueTypeRentalAgreement.md), [secureValueTypePassportRegistration](/constructor/secureValueTypePassportRegistration.md), [secureValueTypeTemporaryRegistration](/constructor/secureValueTypeTemporaryRegistration.md) |
| **file\_hash** | [bytes](/type/bytes.md) | File hash |
| **text** | [string](/type/string.md) | Error message |

### Type
[SecureValueError](/type/SecureValueError.md)

### Related pages

#### [secureValueTypeUtilityBill](/constructor/secureValueTypeUtilityBill.md)
Utility bill

#### [secureValueTypeBankStatement](/constructor/secureValueTypeBankStatement.md)
Bank statement

#### [secureValueTypeRentalAgreement](/constructor/secureValueTypeRentalAgreement.md)
Rental agreement

#### [secureValueTypePassportRegistration](/constructor/secureValueTypePassportRegistration.md)
Internal registration [passport](/passport.md)

#### [secureValueTypeTemporaryRegistration](/constructor/secureValueTypeTemporaryRegistration.md)
Temporary registration