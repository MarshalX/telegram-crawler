# messages.deleteTopicHistory

Delete message history of a [forum topic](/api/forum.md)

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
---functions---
messages.deleteTopicHistory#d2816f10 peer:InputPeer top_msg_id:int = messages.AffectedHistory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The supergroup forum, private chat (for forum-enabled bots) or bot forum (for users) where the topic is located. |
| **top\_msg\_id** | [int](/type/int.md) | Topic ID |

### Result
[messages.AffectedHistory](/type/messages.AffectedHistory.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.