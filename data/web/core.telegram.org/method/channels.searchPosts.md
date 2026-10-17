# channels.searchPosts

Globally search for posts from public [channels »](/api/channel.md) (*including* those we aren't a member of) containing either a specific hashtag, *or* a full text query.

Exactly one of `query` and `hashtag` must be set.

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
channels.searchPosts#f2c4f24d flags:# hashtag:flags.0?string query:flags.1?string offset_rate:int offset_peer:InputPeer offset_id:int limit:int allow_paid_stars:flags.2?long = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **hashtag** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | The hashtag to search, without the `#` character. |
| **query** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | The full text query: each user has a limited amount of free full text search slots, after which payment is required, see [here »](/api/search.md#posts-tab) for more info on the full flow. |
| **offset\_rate** | [int](/type/int.md) | Initially 0, then set to the [`next_rate` parameter of messages.messagesSlice](/constructor/messages.messagesSlice.md), or if that is absent, the `date` of the last returned message. |
| **offset\_peer** | [InputPeer](/type/InputPeer.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | For full text post searches (`query`), allows payment of the specified amount of Stars for the search, see [here »](/api/search.md#posts-tab) for more info on the full flow. |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 420 | FROZEN\_METHOD\_INVALID | The current account is [frozen](/api/auth.md#frozen-accounts), and thus cannot execute the specified action. |
| 400 | OFFSET\_PEER\_ID\_INVALID | The provided offset peer is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.

#### [messages.messagesSlice](/constructor/messages.messagesSlice.md)
Incomplete list of messages and auxiliary data.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.