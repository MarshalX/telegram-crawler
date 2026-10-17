# messages.messagesSlice

Incomplete list of messages and auxiliary data.

```tl
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inexact** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, indicates that the results may be inexact |
| **count** | [int](/type/int.md) | Total number of messages in the list |
| **next\_rate** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Rate to use in the `offset_rate` parameter in the next call to [messages.searchGlobal](/method/messages.searchGlobal.md) |
| **offset\_id\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Indicates the absolute position of `messages[0]` within the total result set with count `count`. \
This is useful, for example, if the result was fetched using `offset_id`, and we need to display a `progress/total` counter (like `photo 134 of 200`, for all media in a chat, we could simply use `photo ${offset_id_offset} of ${count}`). |
| **search\_flood** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[SearchPostsFlood](/type/SearchPostsFlood.md) | [For global post searches »](/api/search.md#posts-tab), the remaining amount of free searches, here `query_is_free` is related to the current call only, not to the next paginated call, and all subsequent pagination calls will always be free. |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of messages |
| **topics** | [Vector](/type/Vector%20t)&lt;[ForumTopic](/type/ForumTopic.md)&gt; | [Forum topics](/api/forum.md#forum-topics) the returned messages belong to. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of chats mentioned in messages |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in messages and chats |

### Type
[messages.Messages](/type/messages.Messages.md)

### Related pages

#### [messages.searchGlobal](/method/messages.searchGlobal.md)
Search for messages and peers globally

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.