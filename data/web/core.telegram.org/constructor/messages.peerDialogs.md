# messages.peerDialogs

Dialog info of multiple peers

```tl
messages.peerDialogs#3371c354 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> state:updates.State = messages.PeerDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dialogs** | [Vector](/type/Vector%20t)&lt;[Dialog](/type/Dialog.md)&gt; | Dialog info |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | Messages mentioned in dialog info |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users |
| **state** | [updates.State](/type/updates.State.md) | Current [update state of dialog](/api/updates.md) |

### Type
[messages.PeerDialogs](/type/messages.PeerDialogs.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.