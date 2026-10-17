# phoneCallAccepted

An accepted phone call, see [here »](/api/calls.md) for more info on the full flow.

```tl
phoneCallAccepted#3660c311 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_b:bytes protocol:PhoneCallProtocol = PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether this is a video call |
| **id** | [long](/type/long.md) | ID of accepted phone call |
| **access\_hash** | [long](/type/long.md) | Access hash of phone call |
| **date** | [int](/type/int.md) | When was the call accepted |
| **admin\_id** | [long](/type/long.md) | ID of the call creator |
| **participant\_id** | [long](/type/long.md) | ID of the other user in the call |
| **g\_b** | [bytes](/type/bytes.md) | B parameter for [secure E2E phone call key exchange](/api/end-to-end/voice-calls.md) |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Protocol to use for phone call |

### Type
[PhoneCall](/type/PhoneCall.md)

### Related pages

#### [End-to-End Encrypted Voice Calls](/api/end-to-end/voice-calls.md)
Deprecated description of encryption in voice calls as implemented in Telegram apps older than version 7.0.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.