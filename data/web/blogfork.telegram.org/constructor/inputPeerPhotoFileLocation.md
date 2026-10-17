# inputPeerPhotoFileLocation

Location of profile photo of channel/group/supergroup/user

```tl
inputPeerPhotoFileLocation#37257e99 flags:# big:flags.0?true peer:InputPeer photo_id:long = InputFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **big** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to download the high-quality version of the picture |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer whose profile picture should be downloaded |
| **photo\_id** | [long](/type/long.md) | Photo ID |

### Type
[InputFileLocation](/type/InputFileLocation.md)