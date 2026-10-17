# updateReadMessagesContents

Contents of messages in the common [message box](/api/updates.md) were read (emitted specifically for messages like voice messages or video, only once the media is watched and marked as read using [messages.readMessageContents](/method/messages.readMessageContents.md)).

```tl
updateReadMessagesContents#f8227181 flags:# messages:Vector<int> pts:int pts_count:int date:flags.0?int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of read messages |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |
| **date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | When was the last message in `messages` marked as read. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [messages.readMessageContents](/method/messages.readMessageContents.md)
Notifies the sender about the recipient having listened a voice message or watched a video, emitting an [updateReadMessagesContents](/constructor/updateReadMessagesContents.md).