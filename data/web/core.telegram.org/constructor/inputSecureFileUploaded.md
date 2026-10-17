# inputSecureFileUploaded

Uploaded secure file, for more info [see the passport docs »](/passport/encryption.md#inputsecurefile)

```tl
inputSecureFileUploaded#3334b0f0 id:long parts:int md5_checksum:string file_hash:bytes secret:bytes = InputSecureFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Secure file ID |
| **parts** | [int](/type/int.md) | Secure file part count |
| **md5\_checksum** | [string](/type/string.md) | MD5 hash of encrypted uploaded file, to be checked server-side |
| **file\_hash** | [bytes](/type/bytes.md) | File hash |
| **secret** | [bytes](/type/bytes.md) | Secret |

### Type
[InputSecureFile](/type/InputSecureFile.md)

### Related pages

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.