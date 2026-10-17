# messages.getChats

Returns chat basic info on their IDs.

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
---functions---
messages.getChats#49e9528f id:Vector<long> = messages.Chats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | List of chat IDs |

### Result
[messages.Chats](/type/messages.Chats.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |