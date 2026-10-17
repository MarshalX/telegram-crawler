# e2e.chain.changeSetGroupState

Updates the [E2E conference call participant list and permissions](/api/end-to-end/group-calls.md#change-types-for-group-calls), clearing the current shared key state.

<!-- schema -->
```
e2e.chain.changeSetGroupState#2cf17146 group_state:e2e.chain.GroupState = e2e.chain.Change;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **group\_state** | [e2e.chain.GroupState](/type/e2e.chain.GroupState.md) | New group state containing the participant list and permission bits. |

### Type
[e2e.chain.Change](/type/e2e.chain.Change.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.