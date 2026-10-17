# dcOption

Data center

```tl
dcOption#18b7a10d flags:# ipv6:flags.0?true media_only:flags.1?true tcpo_only:flags.2?true cdn:flags.3?true static:flags.4?true this_port_only:flags.5?true id:int ip_address:string port:int secret:flags.10?bytes = DcOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **ipv6** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the specified IP is an IPv6 address |
| **media\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this DC should only be used to [download or upload files](/api/files.md) |
| **tcpo\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this DC only supports connection with [transport obfuscation](/mtproto/mtproto-transports.md#transport-obfuscation) |
| **cdn** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is a [CDN DC](/cdn.md). |
| **static** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, this IP should be used when connecting through a proxy |
| **this\_port\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, clients must connect using only the specified port, without trying any other port. |
| **id** | [int](/type/int.md) | DC ID |
| **ip\_address** | [string](/type/string.md) | IP address of DC |
| **port** | [int](/type/int.md) | Port |
| **secret** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[bytes](/type/bytes.md) | If the `tcpo_only` flag is set, specifies the secret to use when connecting using [transport obfuscation](/mtproto/mtproto-transports.md#transport-obfuscation) |

### Type
[DcOption](/type/DcOption.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [MTProto transports](/mtproto/mtproto-transports.md)
The list of MTProto transport protocols used to wrap payloads.

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.