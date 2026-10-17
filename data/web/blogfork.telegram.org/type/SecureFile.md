# SecureFile

Secure [passport](/passport.md) file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile)

```tl
secureFileEmpty#64199744 = SecureFile;
secureFile#7d09c27e id:long access_hash:long size:long dc_id:int date:int file_hash:bytes secret:bytes = SecureFile;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [secureFileEmpty](/constructor/secureFileEmpty.md) | Empty constructor |
| [secureFile](/constructor/secureFile.md) | Secure [passport](/passport.md) file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile) |

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.