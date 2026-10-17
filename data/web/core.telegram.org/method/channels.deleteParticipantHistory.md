# channels.deleteParticipantHistory

Delete all messages sent by a specific participant of a given supergroup

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
---functions---
channels.deleteParticipantHistory#367544db channel:InputChannel participant:InputPeer = messages.AffectedHistory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Supergroup |
| **participant** | [InputPeer](/type/InputPeer.md) | The participant whose messages should be deleted |

### Result
[messages.AffectedHistory](/type/messages.AffectedHistory.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PARTICIPANT\_ID\_INVALID | The specified participant ID is invalid. |