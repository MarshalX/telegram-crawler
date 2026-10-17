# updates.channelDifference

The new updates

```tl
updates.channelDifference#2064674e flags:# final:flags.0?true pts:int timeout:flags.1?int new_messages:Vector<Message> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **final** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether there are more updates to be fetched using getDifference, starting from the provided `pts` |
| **pts** | [int](/type/int.md) | The [PTS](/api/updates.md) from which to start getting updates the next time |
| **timeout** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Clients are supposed to refetch the channel difference after timeout seconds have elapsed, if the user is [currently viewing the chat, see here »](/api/updates.md#subscribing-to-updates-of-channels-supergroups) for more info. |
| **new\_messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | New messages |
| **other\_updates** | [Vector](/type/Vector%20t)&lt;[Update](/type/Update.md)&gt; | Other updates |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users |

### Type
[updates.ChannelDifference](/type/updates.ChannelDifference.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.