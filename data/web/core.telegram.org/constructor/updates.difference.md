# updates.difference

Full list of occurred events.

```tl
updates.difference#f49ca0 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> state:updates.State = updates.Difference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **new\_messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of new messages |
| **new\_encrypted\_messages** | [Vector](/type/Vector%20t)&lt;[EncryptedMessage](/type/EncryptedMessage.md)&gt; | List of new encrypted secret chat messages |
| **other\_updates** | [Vector](/type/Vector%20t)&lt;[Update](/type/Update.md)&gt; | List of updates |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of chats mentioned in events |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in events |
| **state** | [updates.State](/type/updates.State.md) | Current state |

### Type
[updates.Difference](/type/updates.Difference.md)