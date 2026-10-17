# E2e.chain.GroupBroadcast

A broadcast message used in the [E2E conference call key verification protocol](/api/end-to-end/group-calls.md#commit-reveal-protocol-workflow), implementing the commit/reveal scheme for generating verifiable call emoji.

<!-- schema -->
```
e2e.chain.groupBroadcastNonceCommit#d1512ae7 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce_hash:int256 = e2e.chain.GroupBroadcast;
e2e.chain.groupBroadcastNonceReveal#83f4f9d8 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce:int256 = e2e.chain.GroupBroadcast;
```
<!-- /schema -->

### Constructors

| Constructor | Description |
| --- | --- |
| [e2e.chain.groupBroadcastNonceCommit](/constructor/e2e.chain.groupBroadcastNonceCommit.md) | Commit message for the [E2E conference call emoji verification protocol](/api/end-to-end/group-calls.md#commit-reveal-protocol-workflow).\
\
When submitting this broadcast to the server, use the canonical constructor ID shown in the schema; broadcasts returned by the server use the constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains). |
| [e2e.chain.groupBroadcastNonceReveal](/constructor/e2e.chain.groupBroadcastNonceReveal.md) | Reveal message for the [E2E conference call emoji verification protocol](/api/end-to-end/group-calls.md#commit-reveal-protocol-workflow).\
\
When submitting this broadcast to the server, use the canonical constructor ID shown in the schema; broadcasts returned by the server use the constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains). |

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.