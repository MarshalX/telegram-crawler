# PhoneCall

Phone call

```tl
phoneCallEmpty#5366c915 id:long = PhoneCall;
phoneCallWaiting#c5226f17 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long protocol:PhoneCallProtocol receive_date:flags.0?int = PhoneCall;
phoneCallRequested#14b0ed0c flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_hash:bytes protocol:PhoneCallProtocol = PhoneCall;
phoneCallAccepted#3660c311 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_b:bytes protocol:PhoneCallProtocol = PhoneCall;
phoneCall#30535af5 flags:# p2p_allowed:flags.5?true video:flags.6?true conference_supported:flags.8?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long protocol:PhoneCallProtocol connections:Vector<PhoneConnection> start_date:int custom_parameters:flags.7?DataJSON = PhoneCall;
phoneCallDiscarded#50ca4de1 flags:# need_rating:flags.2?true need_debug:flags.3?true video:flags.6?true id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = PhoneCall;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phoneCallEmpty](/constructor/phoneCallEmpty.md) | Empty constructor |
| [phoneCallWaiting](/constructor/phoneCallWaiting.md) | Incoming phone call, see [here »](/api/calls.md) for more info on the full flow. |
| [phoneCallRequested](/constructor/phoneCallRequested.md) | Requested phone call, see [here »](/api/calls.md) for more info on the full flow. |
| [phoneCallAccepted](/constructor/phoneCallAccepted.md) | An accepted phone call, see [here »](/api/calls.md) for more info on the full flow. |
| [phoneCall](/constructor/phoneCall.md) | Phone call, see [here »](/api/calls.md) for more info on the full flow. |
| [phoneCallDiscarded](/constructor/phoneCallDiscarded.md) | Indicates a discarded phone call, see [here »](/api/calls.md) for more info on the full flow. |