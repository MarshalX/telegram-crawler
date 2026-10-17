# ChatBannedRights

Represents the rights of a normal user in a [supergroup/channel/chat](/api/channel.md).

```tl
chatBannedRights#9f120418 flags:# view_messages:flags.0?true send_messages:flags.1?true send_media:flags.2?true send_stickers:flags.3?true send_gifs:flags.4?true send_games:flags.5?true send_inline:flags.6?true embed_links:flags.7?true send_polls:flags.8?true change_info:flags.10?true invite_users:flags.15?true pin_messages:flags.17?true manage_topics:flags.18?true send_photos:flags.19?true send_videos:flags.20?true send_roundvideos:flags.21?true send_audios:flags.22?true send_voices:flags.23?true send_docs:flags.24?true send_plain:flags.25?true edit_rank:flags.26?true send_reactions:flags.27?true until_date:int = ChatBannedRights;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatBannedRights](/constructor/chatBannedRights.md) | Represents the rights of a normal user in a [supergroup/channel/chat](/api/channel.md). In this case, the flags are inverted: if set, a flag **does not allow** a user to do X. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.