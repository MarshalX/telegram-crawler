# messages.deleteHistory

Deletes communication history.

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
---functions---
messages.deleteHistory#b08f922a flags:# just_clear:flags.0?true revoke:flags.1?true peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **just\_clear** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Just clear history for the current user, without actually removing messages for every chat user |
| **revoke** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to delete the message history for all chat participants |
| **peer** | [InputPeer](/type/InputPeer.md) | User or chat, communication history of which will be deleted |
| **max\_id** | [int](/type/int.md) | Maximum ID of message to delete |
| **min\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Delete all messages newer than this UNIX timestamp |
| **max\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Delete all messages older than this UNIX timestamp |

### Result
[messages.AffectedHistory](/type/messages.AffectedHistory.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_REVOKE\_DATE\_UNSUPPORTED | `min_date` and `max_date` are not available for using with non-user peers. |
| 400 | MAX\_DATE\_INVALID | The specified maximum date is invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MIN\_DATE\_INVALID | The specified minimum date is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |