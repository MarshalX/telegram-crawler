# updates.differenceSlice

Incomplete list of occurred events.

```tl
updates.differenceSlice#a8fb1981 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> intermediate_state:updates.State = updates.Difference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **new\_messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of new messages |
| **new\_encrypted\_messages** | [Vector](/type/Vector%20t)&lt;[EncryptedMessage](/type/EncryptedMessage.md)&gt; | New messages from the [encrypted event sequence](/api/updates.md) |
| **other\_updates** | [Vector](/type/Vector%20t)&lt;[Update](/type/Update.md)&gt; | List of updates |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of chats mentioned in events |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in events |
| **intermediate\_state** | [updates.State](/type/updates.State.md) | Intermediary state |

### Type
[updates.Difference](/type/updates.Difference.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.