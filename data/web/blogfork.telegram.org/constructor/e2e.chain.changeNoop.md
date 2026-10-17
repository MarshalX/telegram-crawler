# e2e.chain.changeNoop

A no-operation [E2E conference call blockchain change](/api/end-to-end/group-calls.md#change-types-for-group-calls), potentially used only to randomize the resulting block hash.

<!-- schema -->
```
e2e.chain.changeNoop#deb4a41b nonce:int256 = e2e.chain.Change;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **nonce** | [int256](/type/int256.md) | Random value included in the no-op change. |

### Type
[e2e.chain.Change](/type/e2e.chain.Change.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.