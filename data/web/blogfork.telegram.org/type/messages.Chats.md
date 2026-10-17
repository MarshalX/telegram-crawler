# messages.Chats

Object contains list of chats with auxiliary data.

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;

---functions---

messages.getChats#49e9528f id:Vector<long> = messages.Chats;
channels.getChannels#a7f6bbb id:Vector<InputChannel> = messages.Chats;
channels.getAdminedPublicChannels#f8b036af flags:# by_location:flags.0?true check_limit:flags.1?true for_personal:flags.2?true = messages.Chats;
messages.getCommonChats#e40ca104 user_id:InputUser max_id:long limit:int = messages.Chats;
channels.getLeftChannels#8341ecc0 offset:int = messages.Chats;
channels.getGroupsForDiscussion#f5dad378 = messages.Chats;
stories.getChatsToSend#a56a8b60 = messages.Chats;
channels.getChannelRecommendations#25a71742 flags:# channel:flags.0?InputChannel = messages.Chats;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.chats](/constructor/messages.chats.md) | List of chats with auxiliary data. |
| [messages.chatsSlice](/constructor/messages.chatsSlice.md) | Partial list of chats, more would have to be fetched with [pagination](/api/offsets.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.getChats](/method/messages.getChats.md) | Returns chat basic info on their IDs. |
| [messages.getCommonChats](/method/messages.getCommonChats.md) | Get chats in common with a user |
| [channels.getChannels](/method/channels.getChannels.md) | Get info about [channels/supergroups](/api/channel.md) |
| [channels.getAdminedPublicChannels](/method/channels.getAdminedPublicChannels.md) | Get [channels/supergroups/geogroups](/api/channel.md) we're admin in. Usually called when the user exceeds the [limit](/constructor/config.md) for owned public [channels/supergroups/geogroups](/api/channel.md), and the user is given the choice to remove one of his channels/supergroups/geogroups. |
| [channels.getLeftChannels](/method/channels.getLeftChannels.md) | Get a list of [channels/supergroups](/api/channel.md) we left, requires a [takeout session, see here » for more info](/api/takeout.md). |
| [channels.getGroupsForDiscussion](/method/channels.getGroupsForDiscussion.md) | Get all groups that can be used as [discussion groups](/api/discussion.md).\
\
Returned [basic group chats](/api/channel.md#basic-groups) must be first upgraded to [supergroups](/api/channel.md#supergroups) before they can be set as a discussion group.  \
To set a returned supergroup as a discussion group, access to its old messages must be enabled using [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md), first. |
| [channels.getChannelRecommendations](/method/channels.getChannelRecommendations.md) | Obtain a list of similarly themed public channels, selected based on similarities in their **subscriber bases**. |
| [stories.getChatsToSend](/method/stories.getChatsToSend.md) | Obtain a list of channels where the user can post [stories](/api/stories.md) |