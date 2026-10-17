# messages.dialogsSlice

Incomplete list of dialogs with messages and auxiliary data.

```tl
messages.dialogsSlice#71e094f3 count:int dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Total number of dialogs |
| **dialogs** | [Vector](/type/Vector%20t)&lt;[Dialog](/type/Dialog.md)&gt; | List of dialogs |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of last messages from dialogs |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of chats mentioned in dialogs |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in messages and chats |

### Type
[messages.Dialogs](/type/messages.Dialogs.md)