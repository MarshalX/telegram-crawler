# secureValueErrorFiles

Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes.

```tl
secureValueErrorFiles#666220e9 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | One of [secureValueTypeUtilityBill](/constructor/secureValueTypeUtilityBill.md), [secureValueTypeBankStatement](/constructor/secureValueTypeBankStatement.md), [secureValueTypeRentalAgreement](/constructor/secureValueTypeRentalAgreement.md), [secureValueTypePassportRegistration](/constructor/secureValueTypePassportRegistration.md), [secureValueTypeTemporaryRegistration](/constructor/secureValueTypeTemporaryRegistration.md) |
| **file\_hash** | [Vector](/type/Vector%20t)&lt;[bytes](/type/bytes.md)&gt; | File hash |
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