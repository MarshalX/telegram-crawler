# inputSecureFileLocation

Location of encrypted telegram [passport](/passport.md) file.

```tl
inputSecureFileLocation#cbc7ee28 id:long access_hash:long = InputFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | File ID, **id** parameter value from [secureFile](/constructor/secureFile.md) |
| **access\_hash** | [long](/type/long.md) | Checksum, **access\_hash** parameter value from [secureFile](/constructor/secureFile.md) |

### Type
[InputFileLocation](/type/InputFileLocation.md)

### Related pages

#### [secureFile](/constructor/secureFile.md)
Secure [passport](/passport.md) file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile)

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.