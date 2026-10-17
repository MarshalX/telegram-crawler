# messages.savedDialogs

Represents some [saved message dialogs »](/api/saved-messages.md).

```tl
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dialogs** | [Vector](/type/Vector%20t)&lt;[SavedDialog](/type/SavedDialog.md)&gt; | [Saved message dialogs »](/api/saved-messages.md). |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of last messages from each saved dialog |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[messages.SavedDialogs](/type/messages.SavedDialogs.md)

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.