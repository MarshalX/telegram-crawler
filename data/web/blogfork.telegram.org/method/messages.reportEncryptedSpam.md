# messages.reportEncryptedSpam

Report a secret chat for spam

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reportEncryptedSpam#4b0c8c0f peer:InputEncryptedChat = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | The secret chat to report |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |