# messages.readEncryptedHistory

Marks message history within a secret chat as read.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.readEncryptedHistory#7f4b690a peer:InputEncryptedChat max_date:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | Secret chat ID |
| **max\_date** | [int](/type/int.md) | Maximum date value for received messages in history |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | MAX\_DATE\_INVALID | The specified maximum date is invalid. |
| 400 | MSG\_WAIT\_FAILED | A waiting call returned an error. |