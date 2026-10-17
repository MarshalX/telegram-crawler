# messages.getPeerDialogs

Get dialog info of specified peers

```tl
messages.peerDialogs#3371c354 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> state:updates.State = messages.PeerDialogs;
---functions---
messages.getPeerDialogs#e470bcfd peers:Vector<InputDialogPeer> = messages.PeerDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peers** | [Vector](/type/Vector%20t)&lt;[InputDialogPeer](/type/InputDialogPeer.md)&gt; | Peers |

### Result
[messages.PeerDialogs](/type/messages.PeerDialogs.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | FROZEN\_PARTICIPANT\_MISSING | The current account is [frozen](/api/auth.md#frozen-accounts), and cannot access the specified peer. |
| 400 | INPUT\_PEERS\_EMPTY | The specified peer array is empty. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.