# updateChannelReadMessagesContents

The specified [channel/supergroup](/api/channel.md) messages were read (emitted specifically for messages like voice messages or video, only once the media is watched and marked as read using [channels.readMessageContents](/method/channels.readMessageContents.md))

```tl
updateChannelReadMessagesContents#25f324f7 flags:# channel_id:long top_msg_id:flags.0?int saved_peer_id:flags.1?Peer messages:Vector<int> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel\_id** | [long](/type/long.md) | [Channel/supergroup](/api/channel.md) ID |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Forum topic ID](/api/forum.md#forum-topics). |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | If set, the messages were read within the specified [monoforum topic »](/api/monoforum.md). |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of messages that were read |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [channels.readMessageContents](/method/channels.readMessageContents.md)
Mark [channel/supergroup](/api/channel.md) message contents as read, emitting an [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md).