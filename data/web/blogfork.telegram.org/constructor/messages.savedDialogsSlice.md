# messages.savedDialogsSlice

Incomplete list of [saved message dialogs »](/api/saved-messages.md) with messages and auxiliary data.

```tl
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Total number of saved message dialogs |
| **dialogs** | [Vector](/type/Vector%20t)&lt;[SavedDialog](/type/SavedDialog.md)&gt; | List of saved message dialogs |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of last messages from dialogs |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[messages.SavedDialogs](/type/messages.SavedDialogs.md)

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.