# chatlists.exportChatlistInvite

Export a [folder »](/api/folders.md), creating a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.exportedChatlistInvite#10e6e3a6 filter:DialogFilter invite:ExportedChatlistInvite = chatlists.ExportedChatlistInvite;
---functions---
chatlists.exportChatlistInvite#8472478e chatlist:InputChatlist title:string peers:Vector<InputPeer> = chatlists.ExportedChatlistInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | The folder to export |
| **title** | [string](/type/string.md) | An optional name for the link |
| **peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | The list of channels, group and supergroups to share with the link. Basic groups will automatically be [converted to supergroups](/api/channel.md#migration) when invoking the method. |

### Result
[chatlists.ExportedChatlistInvite](/type/chatlists.ExportedChatlistInvite.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHATLISTS\_TOO\_MUCH | You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits&nbsp;&raquo;](/api/config.md#chatlist-invites-limit-default). |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |
| 400 | INVITES\_TOO\_MUCH | The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters&nbsp;&raquo;](/api/config.md#chatlist-invites-limit-default) was reached. |
| 400 | PEERS\_LIST\_EMPTY | The specified list of peers is empty. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.