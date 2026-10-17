# updates.channelDifferenceTooLong

The passed `pts` is too old: one or more updates starting from the specified PTS were deleted from the message box of this channel.

For supergroups/channels, this usually happens for updates older than `latestPts - 100000` (though do not rely on this value, it's a server-side implementation detail that may change, and should not be used by clients in any way).

```tl
updates.channelDifferenceTooLong#a4bcc6fe flags:# final:flags.0?true timeout:flags.1?int dialog:Dialog messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **final** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether there are more updates that must be fetched (always set) |
| **timeout** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Clients are supposed to refetch the channel difference after timeout seconds have elapsed |
| **dialog** | [Dialog](/type/Dialog.md) | Dialog containing the latest [PTS](/api/updates.md) that can be used to reset the channel state |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | The latest messages (not starting from the passed `pts`, just the latest messages). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats from messages |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users from messages |

### Type
[updates.ChannelDifference](/type/updates.ChannelDifference.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.