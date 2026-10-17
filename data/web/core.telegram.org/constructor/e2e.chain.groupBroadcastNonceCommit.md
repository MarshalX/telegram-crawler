# e2e.chain.groupBroadcastNonceCommit

Commit message for the [E2E conference call emoji verification protocol](/api/end-to-end/group-calls.md#commit-reveal-protocol-workflow).

When submitting this broadcast to the server, use the canonical constructor ID shown in the schema; broadcasts returned by the server use the constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains).

<!-- schema -->
```
e2e.chain.groupBroadcastNonceCommit#d1512ae7 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce_hash:int256 = e2e.chain.GroupBroadcast;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **signature** | [int512](/type/int512.md) | Signature of the TL-serialized commit message with the `signature` field zeroed out. |
| **user\_id** | [int64](/type/int64.md) | Telegram user ID of the participant sending the commit. |
| **chain\_height** | [int32](/type/int32.md) | Height of the main-chain block for which verification emojis are being generated. |
| **chain\_hash** | [int256](/type/int256.md) | Hash of the main-chain block for which verification emojis are being generated. |
| **nonce\_hash** | [int256](/type/int256.md) | SHA256 hash of the participant's random nonce, revealed later using [e2e.chain.groupBroadcastNonceReveal](/constructor/e2e.chain.groupBroadcastNonceReveal.md). |

### Type
[e2e.chain.GroupBroadcast](/type/e2e.chain.GroupBroadcast.md)

### Related pages

#### [e2e.chain.groupBroadcastNonceReveal](/constructor/e2e.chain.groupBroadcastNonceReveal.md)
Reveal message for the [E2E conference call emoji verification protocol](/api/end-to-end/group-calls.md#commit-reveal-protocol-workflow).

When submitting this broadcast to the server, use the canonical constructor ID shown in the schema; broadcasts returned by the server use the constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains).

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.