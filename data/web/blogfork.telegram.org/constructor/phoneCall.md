# phoneCall

Phone call, see [here »](/api/calls.md) for more info on the full flow.

```tl
phoneCall#30535af5 flags:# p2p_allowed:flags.5?true video:flags.6?true conference_supported:flags.8?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long protocol:PhoneCallProtocol connections:Vector<PhoneConnection> start_date:int custom_parameters:flags.7?DataJSON = PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **p2p\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether P2P connection to the other peer is allowed |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether this is a video call |
| **conference\_supported** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, the other party supports [migrating the call to a conference call »](/api/calls.md#migrating-to-a-conference-call); clients should only offer the migrate/"Add participants" option in the call UI when this flag is set. |
| **id** | [long](/type/long.md) | Call ID |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **date** | [int](/type/int.md) | Date of creation of the call |
| **admin\_id** | [long](/type/long.md) | User ID of the creator of the call |
| **participant\_id** | [long](/type/long.md) | User ID of the other participant in the call |
| **g\_a\_or\_b** | [bytes](/type/bytes.md) | [Parameter for key exchange](/api/end-to-end/voice-calls.md) |
| **key\_fingerprint** | [long](/type/long.md) | [Key fingerprint](/api/end-to-end/voice-calls.md) |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Call protocol info to be passed to libtgvoip |
| **connections** | [Vector](/type/Vector%20t)&lt;[PhoneConnection](/type/PhoneConnection.md)&gt; | List of endpoints the user can connect to exchange call data |
| **start\_date** | [int](/type/int.md) | When was the call actually started |
| **custom\_parameters** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[DataJSON](/type/DataJSON.md) | Custom JSON-encoded call parameters to be passed to tgcalls. |

### Type
[PhoneCall](/type/PhoneCall.md)

### Related pages

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.

#### [End-to-End Encrypted Voice Calls](/api/end-to-end/voice-calls.md)
Deprecated description of encryption in voice calls as implemented in Telegram apps older than version 7.0.