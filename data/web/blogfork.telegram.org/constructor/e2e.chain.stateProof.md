# e2e.chain.stateProof

Proof of the [E2E conference call blockchain state](/api/end-to-end/group-calls.md#block-application-process) after a block has been applied.

<!-- schema -->
```
e2e.chain.stateProof#d6b679e6 flags:# kv_hash:int256 group_state:flags.0?e2e.chain.GroupState shared_key:flags.1?e2e.chain.SharedKey = e2e.chain.StateProof;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **kv\_hash** | [int256](/type/int256.md) | Root hash of the key-value trie after applying the block. |
| **group\_state** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[e2e.chain.GroupState](/type/e2e.chain.GroupState.md) | Resulting participant and permission state.  \
**Must** be omitted if the block contains a `ChangeSetGroupState` action. \
**Must** be present if the block doesn't contain a `ChangeSetGroupState` action. |
| **shared\_key** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[e2e.chain.SharedKey](/type/e2e.chain.SharedKey.md) | Resulting shared key state. \
**Must** be omitted if the block contains a `ChangeSetGroupState` action *and/or* a `ChangeSetSharedKey` action. \
**Must** be present if the block doesn't contain a `ChangeSetGroupState` action *and/or* a `ChangeSetSharedKey` action. |

### Type
[e2e.chain.StateProof](/type/e2e.chain.StateProof.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.