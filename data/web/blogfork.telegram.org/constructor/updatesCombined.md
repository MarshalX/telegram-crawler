# updatesCombined

Constructor for a group of updates.

```tl
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **updates** | [Vector](/type/Vector%20t)&lt;[Update](/type/Update.md)&gt; | List of updates |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in updates |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of chats mentioned in updates |
| **date** | [int](/type/int.md) | Current date |
| **seq\_start** | [int](/type/int.md) | Value **seq** for the earliest update in a group |
| **seq** | [int](/type/int.md) | Value **seq** for the latest update in a group |

### Type
[Updates](/type/Updates.md)