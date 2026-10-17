# e2e.chain.groupParticipant

A participant and their permissions in an [E2E conference call group state »](/api/end-to-end/group-calls.md#participants-and-permissions).

<!-- schema -->
```
e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | Telegram user ID of the participant. |
| **public\_key** | [int256](/type/int256.md) | Public key used to verify blocks and decrypt shared key material for this participant. |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **add\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this participant can add new participants. |
| **remove\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this participant can remove existing participants. |
| **set\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this participant can modify the key-value trie |
| **version** | [int](/type/int.md) | Maximum E2E group call protocol version supported by this participant; the call uses the smallest participant version, clamped to `0...255`. |

### Type
[e2e.chain.GroupParticipant](/type/e2e.chain.GroupParticipant.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.