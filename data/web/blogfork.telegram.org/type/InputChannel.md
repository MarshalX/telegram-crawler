# InputChannel

Represents a channel

```tl
inputChannelEmpty#ee8c1e86 = InputChannel;
inputChannel#f35aec28 channel_id:long access_hash:long = InputChannel;
inputChannelFromMessage#5b934f9d peer:InputPeer msg_id:int channel_id:long = InputChannel;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputChannelEmpty](/constructor/inputChannelEmpty.md) | Represents the absence of a channel |
| [inputChannel](/constructor/inputChannel.md) | Represents a channel |
| [inputChannelFromMessage](/constructor/inputChannelFromMessage.md) | Defines a [min](/api/min.md) channel that was seen in a certain message of a certain chat. |