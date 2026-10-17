# messages.search

Search for messages.

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | User or chat, histories with which are searched, or [(inputPeerEmpty)](/constructor/inputPeerEmpty.md) constructor to search in all private chats and [normal groups (not channels) »](/api/channel.md). Use [messages.searchGlobal](/method/messages.searchGlobal.md) to search globally in all chats, groups, supergroups and channels. |
| **q** | [string](/type/string.md) | Text search request |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | Only return messages sent by the specified user ID |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPeer](/type/InputPeer.md) | Search within the [saved message dialog »](/api/saved-messages.md) with this ID. |
| **saved\_reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[Reaction](/type/Reaction.md)&gt; | You may search for [saved messages tagged »](/api/saved-messages.md#tags) with one or more reactions using this flag. |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | [Thread ID](/api/threads.md) |
| **filter** | [MessagesFilter](/type/MessagesFilter.md) | Filter to return only specified message types |
| **min\_date** | [int](/type/int.md) | If a positive value was transferred, only messages with a sending date bigger than the transferred one will be returned |
| **max\_date** | [int](/type/int.md) | If a positive value was transferred, only messages with a sending date smaller than the transferred one will be returned |
| **offset\_id** | [int](/type/int.md) | Only return messages starting from the specified message ID |
| **add\_offset** | [int](/type/int.md) | [Additional offset](/api/offsets.md) |
| **limit** | [int](/type/int.md) | [Number of results to return](/api/offsets.md), can be 0 to only return the message counter. |
| **max\_id** | [int](/type/int.md) | [Maximum message ID to return](/api/offsets.md) |
| **min\_id** | [int](/type/int.md) | [Minimum message ID to return](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash](/api/offsets.md) |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | FROM\_PEER\_INVALID | The specified from_id is invalid. |
| 400 | INPUT\_FILTER\_INVALID | The specified filter is invalid. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PEER\_ID\_NOT\_SUPPORTED | The provided peer ID is not supported. |
| 400 | SEARCH\_QUERY\_EMPTY | The search query is empty. |
| 400 | TAKEOUT\_INVALID | The specified takeout ID is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [inputPeerEmpty](/constructor/inputPeerEmpty.md)
An empty constructor, no user or chat is defined.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [messages.searchGlobal](/method/messages.searchGlobal.md)
Search for messages and peers globally

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.