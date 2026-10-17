# inputChannelFromMessage

Defines a [min](/api/min.md) channel that was seen in a certain message of a certain chat.

```tl
inputChannelFromMessage#5b934f9d peer:InputPeer msg_id:int channel_id:long = InputChannel;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat where the channel was seen |
| **msg\_id** | [int](/type/int.md) | The message ID in the chat where the channel was seen |
| **channel\_id** | [long](/type/long.md) | The channel ID |

### Type
[InputChannel](/type/InputChannel.md)

### Related pages

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.