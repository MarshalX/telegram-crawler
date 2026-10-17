# phoneCallRequested

Requested phone call, see [here »](/api/calls.md) for more info on the full flow.

```tl
phoneCallRequested#14b0ed0c flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_hash:bytes protocol:PhoneCallProtocol = PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether this is a video call |
| **id** | [long](/type/long.md) | Phone call ID |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **date** | [int](/type/int.md) | When was the phone call created |
| **admin\_id** | [long](/type/long.md) | ID of the creator of the phone call |
| **participant\_id** | [long](/type/long.md) | ID of the other participant of the phone call |
| **g\_a\_hash** | [bytes](/type/bytes.md) | [Parameter for key exchange](/api/end-to-end/voice-calls.md) |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Call protocol info to be passed to libtgvoip |

### Type
[PhoneCall](/type/PhoneCall.md)

### Related pages

#### [End-to-End Encrypted Voice Calls](/api/end-to-end/voice-calls.md)
Deprecated description of encryption in voice calls as implemented in Telegram apps older than version 7.0.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.