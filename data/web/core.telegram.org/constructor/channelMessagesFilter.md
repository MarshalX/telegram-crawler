# channelMessagesFilter

Filter for getting only certain types of channel messages.

This filter cannot be used to fetch messages older than the channel message box size.

```tl
channelMessagesFilter#cd77d957 flags:# exclude_new_messages:flags.1?true ranges:Vector<MessageRange> = ChannelMessagesFilter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **exclude\_new\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to exclude new messages from the search |
| **ranges** | [Vector](/type/Vector%20t)&lt;[MessageRange](/type/MessageRange.md)&gt; | A range of messages to fetch |

### Type
[ChannelMessagesFilter](/type/ChannelMessagesFilter.md)