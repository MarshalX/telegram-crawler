# phoneConnectionWebrtc

WebRTC connection parameters for a [phone call](/api/calls.md).

```tl
phoneConnectionWebrtc#635fe375 flags:# turn:flags.0?true stun:flags.1?true id:long ip:string ipv6:string port:int username:string password:string = PhoneConnection;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **turn** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is a TURN endpoint |
| **stun** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is a STUN endpoint |
| **id** | [long](/type/long.md) | Endpoint ID |
| **ip** | [string](/type/string.md) | IP address |
| **ipv6** | [string](/type/string.md) | IPv6 address |
| **port** | [int](/type/int.md) | Port |
| **username** | [string](/type/string.md) | Username |
| **password** | [string](/type/string.md) | Password |

### Type
[PhoneConnection](/type/PhoneConnection.md)

### Related pages

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.