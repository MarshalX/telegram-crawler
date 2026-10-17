# phoneCallProtocol

Protocol info for the VoIP library, see [here »](/api/calls.md#populating-phonecallprotocol) for details on how to populate it.

```tl
phoneCallProtocol#fc878fc8 flags:# udp_p2p:flags.0?true udp_reflector:flags.1?true min_layer:int max_layer:int library_versions:Vector<string> = PhoneCallProtocol;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **udp\_p2p** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to allow P2P connection to the other participant |
| **udp\_reflector** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to allow connection to the other participants through the reflector servers |
| **min\_layer** | [int](/type/int.md) | Minimum layer for remote libtgvoip |
| **max\_layer** | [int](/type/int.md) | Maximum layer for remote libtgvoip |
| **library\_versions** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | When using [phone.requestCall](/method/phone.requestCall.md) and [phone.acceptCall](/method/phone.acceptCall.md), specify all library versions supported by the client. \
The server will merge and choose the best library version supported by both peers, returning only the best value in the result of the callee's [phone.acceptCall](/method/phone.acceptCall.md) and in the [phoneCallAccepted](/constructor/phoneCallAccepted.md) update received by the caller. |

### Type
[PhoneCallProtocol](/type/PhoneCallProtocol.md)

### Related pages

#### [phone.requestCall](/method/phone.requestCall.md)
Start a telegram phone call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow.

#### [phone.acceptCall](/method/phone.acceptCall.md)
Accept incoming call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow.

#### [phoneCallAccepted](/constructor/phoneCallAccepted.md)
An accepted phone call, see [here »](/api/calls.md) for more info on the full flow.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.