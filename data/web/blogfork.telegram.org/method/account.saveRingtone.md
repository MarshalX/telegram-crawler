# account.saveRingtone

Save or remove saved notification sound.

If the notification sound is already in MP3 format, [account.savedRingtone](/constructor/account.savedRingtone.md) will be returned.  
Otherwise, it will be automatically converted and a [account.savedRingtoneConverted](/constructor/account.savedRingtoneConverted.md) will be returned, containing a new [document](/constructor/document.md) object that should be used to refer to the ringtone from now on (ie when deleting it using the `unsave` parameter, or when downloading it).

```tl
account.savedRingtone#b7263f6d = account.SavedRingtone;
account.savedRingtoneConverted#1f307eb7 document:Document = account.SavedRingtone;
---functions---
account.saveRingtone#3dea5b03 id:InputDocument unsave:Bool = account.SavedRingtone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputDocument](/type/InputDocument.md) | Notification sound uploaded using [account.uploadRingtone](/method/account.uploadRingtone.md) |
| **unsave** | [Bool](/type/Bool.md) | Whether to add or delete the notification sound |

### Result
[account.SavedRingtone](/type/account.SavedRingtone.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | RINGTONE\_INVALID | The specified ringtone is invalid. |

### Related pages

#### [account.uploadRingtone](/method/account.uploadRingtone.md)
Upload notification sound, use [account.saveRingtone](/method/account.saveRingtone.md) to convert it and add it to the list of saved notification sounds.

#### [account.savedRingtone](/constructor/account.savedRingtone.md)
The notification sound was already in MP3 format and was saved without any modification

#### [account.savedRingtoneConverted](/constructor/account.savedRingtoneConverted.md)
The notification sound was not in MP3 format and was successfully converted and saved, use the returned [Document](/type/Document.md) to refer to the notification sound from now on

#### [document](/constructor/document.md)
Document