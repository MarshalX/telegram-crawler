# messages.dialogs

Full list of chats with messages and auxiliary data.

```tl
messages.dialogs#15ba6c40 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dialogs** | [Vector](/type/Vector%20t)&lt;[Dialog](/type/Dialog.md)&gt; | List of chats |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of last messages from each chat |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of groups mentioned in the chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in messages and groups |

### Type
[messages.Dialogs](/type/messages.Dialogs.md)