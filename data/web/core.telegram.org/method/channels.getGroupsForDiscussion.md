# channels.getGroupsForDiscussion

Get all groups that can be used as [discussion groups](/api/discussion.md).

Returned [basic group chats](/api/channel.md#basic-groups) must be first upgraded to [supergroups](/api/channel.md#supergroups) before they can be set as a discussion group.  
To set a returned supergroup as a discussion group, access to its old messages must be enabled using [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md), first.

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
---functions---
channels.getGroupsForDiscussion#f5dad378 = messages.Chats;
```

### Parameters

This constructor does not require any parameters.

### Result
[messages.Chats](/type/messages.Chats.md)

### Only users can use this method

### Related pages

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md)
Hide/unhide message history for new channel/supergroup users