# secureValueErrorData

Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes.

```tl
secureValueErrorData#e8a40bd9 type:SecureValueType data_hash:bytes field:string text:string = SecureValueError;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | The section of the user's Telegram Passport which has the error, one of [secureValueTypePersonalDetails](/constructor/secureValueTypePersonalDetails.md), [secureValueTypePassport](/constructor/secureValueTypePassport.md), [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md), [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md), [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md), [secureValueTypeAddress](/constructor/secureValueTypeAddress.md) |
| **data\_hash** | [bytes](/type/bytes.md) | Data hash |
| **field** | [string](/type/string.md) | Name of the data field which has the error |
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

#### [secureValueTypeAddress](/constructor/secureValueTypeAddress.md)
Address