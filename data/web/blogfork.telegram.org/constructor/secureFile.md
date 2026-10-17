# secureFile

Secure [passport](/passport.md) file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile)

```tl
secureFile#7d09c27e id:long access_hash:long size:long dc_id:int date:int file_hash:bytes secret:bytes = SecureFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | ID |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **size** | [long](/type/long.md) | File size |
| **dc\_id** | [int](/type/int.md) | DC ID |
| **date** | [int](/type/int.md) | Date of upload |
| **file\_hash** | [bytes](/type/bytes.md) | File hash |
| **secret** | [bytes](/type/bytes.md) | Secret |

### Type
[SecureFile](/type/SecureFile.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.