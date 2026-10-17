# inputPeerChannelFromMessage

Defines a [min](/api/min.md) channel that was seen in a certain message of a certain chat.

```tl
inputPeerChannelFromMessage#bd2a0840 peer:InputPeer msg_id:int channel_id:long = InputPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat where the channel's message was seen |
| **msg\_id** | [int](/type/int.md) | The message ID |
| **channel\_id** | [long](/type/long.md) | The identifier of the channel that was seen |

### Type
[InputPeer](/type/InputPeer.md)

### Related pages

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.