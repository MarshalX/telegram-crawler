# messages.getOnlines

Get count of online users in a chat

```tl
chatOnlines#f041e250 onlines:int = ChatOnlines;
---functions---
messages.getOnlines#6e2be050 peer:InputPeer = ChatOnlines;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat |

### Result
[ChatOnlines](/type/ChatOnlines.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |