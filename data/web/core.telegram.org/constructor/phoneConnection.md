# phoneConnection

DEPRECATED (libtgvoip): Identifies an endpoint that can be used to connect to the other user in a phone call

```tl
phoneConnection#9cc123c7 flags:# tcp:flags.0?true id:long ip:string ipv6:string port:int peer_tag:bytes = PhoneConnection;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **tcp** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether TCP should be used |
| **id** | [long](/type/long.md) | Endpoint ID |
| **ip** | [string](/type/string.md) | IP address of endpoint |
| **ipv6** | [string](/type/string.md) | IPv6 address of endpoint |
| **port** | [int](/type/int.md) | Port ID |
| **peer\_tag** | [bytes](/type/bytes.md) | Our peer tag |

### Type
[PhoneConnection](/type/PhoneConnection.md)