# messages.getMessageEditData

Find out if a media message's caption can be edited

```tl
messages.messageEditData#26b5dde6 flags:# caption:flags.0?true = messages.MessageEditData;
---functions---
messages.getMessageEditData#fda68d36 peer:InputPeer id:int = messages.MessageEditData;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the media was sent |
| **id** | [int](/type/int.md) | ID of message |

### Result
[messages.MessageEditData](/type/messages.MessageEditData.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 403 | MESSAGE\_AUTHOR\_REQUIRED | Message author required. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |