# updateDeleteScheduledMessages

Some [scheduled messages](/api/scheduled-messages.md) were deleted (or sent) from the schedule queue of a chat

```tl
updateDeleteScheduledMessages#f2a71983 flags:# peer:Peer messages:Vector<int> sent_messages:flags.0?Vector<int> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | Peer |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Deleted scheduled messages |
| **sent\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | If set, this update indicates that some scheduled messages were sent (not simply deleted from the schedule queue).  \
In this case, the `messages` field will contain the scheduled message IDs for the sent messages (initially returned in [updateNewScheduledMessage](/constructor/updateNewScheduledMessage.md)), and `sent_messages` will contain the real message IDs for the sent messages. |

### Type
[Update](/type/Update.md)

### Related pages

#### [updateNewScheduledMessage](/constructor/updateNewScheduledMessage.md)
A message was added to the [schedule queue of a chat](/api/scheduled-messages.md)

#### [Scheduled messages](/api/scheduled-messages.md)
Telegram allows scheduling messages