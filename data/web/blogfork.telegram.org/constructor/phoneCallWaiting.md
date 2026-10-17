# phoneCallWaiting

Incoming phone call, see [here »](/api/calls.md) for more info on the full flow.

```tl
phoneCallWaiting#c5226f17 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long protocol:PhoneCallProtocol receive_date:flags.0?int = PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Is this a video call |
| **id** | [long](/type/long.md) | Call ID |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **date** | [int](/type/int.md) | Date |
| **admin\_id** | [long](/type/long.md) | Admin ID |
| **participant\_id** | [long](/type/long.md) | Participant ID |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Phone call protocol info |
| **receive\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | When was the phone call received |

### Type
[PhoneCall](/type/PhoneCall.md)

### Related pages

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.