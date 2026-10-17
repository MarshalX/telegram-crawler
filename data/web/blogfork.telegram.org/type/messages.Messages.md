# messages.Messages

Object contains information on list of messages with auxiliary data.

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;

---functions---

messages.getMessages#63c66506 id:Vector<InputMessage> = messages.Messages;
messages.getHistory#4423e6c5 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
channels.getMessages#ad8c9a23 channel:InputChannel id:Vector<InputMessage> = messages.Messages;
messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;
messages.getUnreadMentions#f107e790 flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.getRecentLocations#702a40e0 peer:InputPeer limit:int hash:long = messages.Messages;
messages.getScheduledHistory#f516760b peer:InputPeer hash:long = messages.Messages;
messages.getScheduledMessages#bdbb0464 peer:InputPeer id:Vector<int> = messages.Messages;
messages.getReplies#22ddd30c peer:InputPeer msg_id:int offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.getUnreadReactions#bd7f90ac flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.searchSentMedia#107e31a0 q:string filter:MessagesFilter limit:int = messages.Messages;
messages.getSavedHistory#998ab009 flags:# parent_peer:flags.0?InputPeer peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.getQuickReplyMessages#94a495c3 flags:# shortcut_id:int id:flags.0?Vector<int> hash:long = messages.Messages;
channels.searchPosts#f2c4f24d flags:# hashtag:flags.0?string query:flags.1?string offset_rate:int offset_peer:InputPeer offset_id:int limit:int allow_paid_stars:flags.2?long = messages.Messages;
messages.getUnreadPollVotes#43286cf2 flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.getPersonalChannelHistory#55fb0996 user_id:InputUser limit:int max_id:int min_id:int hash:long = messages.Messages;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.messages](/constructor/messages.messages.md) | Full list of messages with auxiliary data. |
| [messages.messagesSlice](/constructor/messages.messagesSlice.md) | Incomplete list of messages and auxiliary data. |
| [messages.channelMessages](/constructor/messages.channelMessages.md) | Channel messages |
| [messages.messagesNotModified](/constructor/messages.messagesNotModified.md) | No new messages matching the query were found |

### Methods

| Method | Description |
| --- | --- |
| [messages.getMessages](/method/messages.getMessages.md) | Returns the list of messages by their IDs. |
| [messages.getHistory](/method/messages.getHistory.md) | Returns the message history in a peer.\
\
Results are ordered by date (descending). |
| [messages.search](/method/messages.search.md) | Search for messages. |
| [messages.searchGlobal](/method/messages.searchGlobal.md) | Search for messages and peers globally |
| [messages.getUnreadMentions](/method/messages.getUnreadMentions.md) | Get unread messages where we were mentioned |
| [messages.getRecentLocations](/method/messages.getRecentLocations.md) | Get all recent [live locations](/api/live-location.md) sent to a specific chat: returns up to 1 location message ([messageMediaGeoLive](/constructor/messageMediaGeoLive.md)) per chat participant. |
| [messages.getScheduledHistory](/method/messages.getScheduledHistory.md) | Get scheduled messages |
| [messages.getScheduledMessages](/method/messages.getScheduledMessages.md) | Get scheduled messages |
| [messages.getReplies](/method/messages.getReplies.md) | Get messages in a reply thread |
| [messages.getUnreadReactions](/method/messages.getUnreadReactions.md) | Get unread reactions to messages you sent |
| [messages.searchSentMedia](/method/messages.searchSentMedia.md) | View and search recently sent media.  \
This method does not support pagination. |
| [messages.getSavedHistory](/method/messages.getSavedHistory.md) | Fetch [saved messages »](/api/saved-messages.md) forwarded from a specific peer, or fetch messages from a [monoforum topic »](/api/monoforum.md). |
| [messages.getQuickReplyMessages](/method/messages.getQuickReplyMessages.md) | Fetch (a subset or all) messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts). |
| [messages.getUnreadPollVotes](/method/messages.getUnreadPollVotes.md) | Get messages containing polls with [unread votes »](/api/poll.md#unread-poll-votes) |
| [messages.getPersonalChannelHistory](/method/messages.getPersonalChannelHistory.md) | Fetch the message history of a user's [personal channel »](/api/profile.md#personal-channel). |
| [channels.getMessages](/method/channels.getMessages.md) | Get [channel/supergroup](/api/channel.md) messages |
| [channels.searchPosts](/method/channels.searchPosts.md) | Globally search for posts from public [channels »](/api/channel.md) (*including* those we aren't a member of) containing either a specific hashtag, *or* a full text query.\
\
Exactly one of `query` and `hashtag` must be set. |