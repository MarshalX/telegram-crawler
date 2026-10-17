# phoneCallDiscarded

Indicates a discarded phone call, see [here »](/api/calls.md) for more info on the full flow.

```tl
phoneCallDiscarded#50ca4de1 flags:# need_rating:flags.2?true need_debug:flags.3?true video:flags.6?true id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **need\_rating** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the server required the user to [rate](/method/phone.setCallRating.md) the call |
| **need\_debug** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the server required the client to [send](/method/phone.saveCallDebug.md) the libtgvoip call debug data |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether the call was a video call |
| **id** | [long](/type/long.md) | Call ID |
| **reason** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PhoneCallDiscardReason](/type/PhoneCallDiscardReason.md) | Why was the phone call discarded |
| **duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Duration of the phone call in seconds |

### Type
[PhoneCall](/type/PhoneCall.md)

### Related pages

#### [phone.setCallRating](/method/phone.setCallRating.md)
Rate a call, returns info about the rating message sent to the official VoIP bot, see [here »](/api/calls.md#call-rating) for more info on the full flow.

#### [phone.saveCallDebug](/method/phone.saveCallDebug.md)
Send [phone call](/api/calls.md#call-debug) debug data to server.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.