# E2e.chain.Change

A change applied to the [E2E conference call blockchain state](/api/end-to-end/group-calls.md#change-types-for-group-calls), recorded in an [e2e.chain.Block](/type/e2e.chain.Block.md) to modify the call's key-value store, participant list, or shared encryption key.

<!-- schema -->
```
e2e.chain.changeNoop#deb4a41b nonce:int256 = e2e.chain.Change;
e2e.chain.changeSetValue#7c4f9bfa key:bytes value:bytes = e2e.chain.Change;
e2e.chain.changeSetGroupState#2cf17146 group_state:e2e.chain.GroupState = e2e.chain.Change;
e2e.chain.changeSetSharedKey#987a2158 shared_key:e2e.chain.SharedKey = e2e.chain.Change;
```
<!-- /schema -->

### Constructors

| Constructor | Description |
| --- | --- |
| [e2e.chain.changeNoop](/constructor/e2e.chain.changeNoop.md) | A no-operation [E2E conference call blockchain change](/api/end-to-end/group-calls.md#change-types-for-group-calls), potentially used only to randomize the resulting block hash. |
| [e2e.chain.changeSetValue](/constructor/e2e.chain.changeSetValue.md) | Updates the [key-value trie state for an E2E conference call blockchain](/api/end-to-end/group-calls.md#change-types-for-group-calls). |
| [e2e.chain.changeSetGroupState](/constructor/e2e.chain.changeSetGroupState.md) | Updates the [E2E conference call participant list and permissions](/api/end-to-end/group-calls.md#change-types-for-group-calls), clearing the current shared key state. |
| [e2e.chain.changeSetSharedKey](/constructor/e2e.chain.changeSetSharedKey.md) | Establishes a new shared encryption key for an E2E conference call, see [change types for group calls »](/api/end-to-end/group-calls.md#change-types-for-group-calls). |

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.

#### [E2e.chain.Block](/type/e2e.chain.Block.md)
A block in the [main E2E conference call blockchain](/api/end-to-end/group-calls.md#block-structure), containing state changes for the call and the resulting state proof.

When submitting blocks to the server, use the canonical constructor ID shown in the schema; blocks returned by the server use the incremented constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains).