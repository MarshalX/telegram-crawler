# messageActionPhoneCall

A phone call

```tl
messageActionPhoneCall#80e11a7f flags:# video:flags.2?true call_id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Is this a video call? |
| **call\_id** | [long](/type/long.md) | Call ID |
| **reason** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PhoneCallDiscardReason](/type/PhoneCallDiscardReason.md) | If the call has ended, the reason why it ended |
| **duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Duration of the call in seconds |

### Type
[MessageAction](/type/MessageAction.md)