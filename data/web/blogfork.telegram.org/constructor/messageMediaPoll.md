# messageMediaPoll

Poll

```tl
messageMediaPoll#773f4e66 flags:# poll:Poll results:PollResults attached_media:flags.0?MessageMedia = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **poll** | [Poll](/type/Poll.md) | The poll |
| **results** | [PollResults](/type/PollResults.md) | The results of the poll |
| **attached\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[MessageMedia](/type/MessageMedia.md) | Optional media attachment displayed alongside the poll |

### Type
[MessageMedia](/type/MessageMedia.md)