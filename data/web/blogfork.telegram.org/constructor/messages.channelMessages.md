# messages.channelMessages

Channel messages

```tl
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inexact** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, returned results may be inexact |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **count** | [int](/type/int.md) | Total number of results were found server-side (may not be all included here) |
| **offset\_id\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Indicates the absolute position of `messages[0]` within the total result set with count `count`. \
This is useful, for example, if the result was fetched using `offset_id`, and we need to display a `progress/total` counter (like `photo 134 of 200`, for all media in a chat, we could simply use `photo ${offset_id_offset} of ${count}`. |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | Found messages |
| **topics** | [Vector](/type/Vector%20t)&lt;[ForumTopic](/type/ForumTopic.md)&gt; | [Forum topic](/api/forum.md#forum-topics) information |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users |

### Type
[messages.Messages](/type/messages.Messages.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.