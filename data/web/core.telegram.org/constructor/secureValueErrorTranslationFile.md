# secureValueErrorTranslationFile

Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes.

```tl
secureValueErrorTranslationFile#a1144770 type:SecureValueType file_hash:bytes text:string = SecureValueError;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | One of [secureValueTypePersonalDetails](/constructor/secureValueTypePersonalDetails.md), [secureValueTypePassport](/constructor/secureValueTypePassport.md), [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md), [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md), [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md), [secureValueTypeUtilityBill](/constructor/secureValueTypeUtilityBill.md), [secureValueTypeBankStatement](/constructor/secureValueTypeBankStatement.md), [secureValueTypeRentalAgreement](/constructor/secureValueTypeRentalAgreement.md), [secureValueTypePassportRegistration](/constructor/secureValueTypePassportRegistration.md), [secureValueTypeTemporaryRegistration](/constructor/secureValueTypeTemporaryRegistration.md) |
| **file\_hash** | [bytes](/type/bytes.md) | File hash |
| **text** | [string](/type/string.md) | Error message |

### Type
[SecureValueError](/type/SecureValueError.md)

### Related pages

#### [secureValueTypePersonalDetails](/constructor/secureValueTypePersonalDetails.md)
Personal details

#### [secureValueTypePassport](/constructor/secureValueTypePassport.md)
Passport

#### [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md)
Driver's license

#### [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md)
Identity card

#### [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md)
Internal [passport](/passport.md)

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