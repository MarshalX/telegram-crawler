# InputSecureFile

Secure [passport](/passport.md) file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile)

```tl
inputSecureFileUploaded#3334b0f0 id:long parts:int md5_checksum:string file_hash:bytes secret:bytes = InputSecureFile;
inputSecureFile#5367e5be id:long access_hash:long = InputSecureFile;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputSecureFileUploaded](/constructor/inputSecureFileUploaded.md) | Uploaded secure file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile) |
| [inputSecureFile](/constructor/inputSecureFile.md) | Pre-uploaded [passport](/passport.md) file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile) |

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.