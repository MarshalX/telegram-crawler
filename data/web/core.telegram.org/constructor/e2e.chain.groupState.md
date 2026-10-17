# e2e.chain.groupState

The participant list and external permission mask for an [E2E conference call blockchain state »](/api/end-to-end/group-calls.md#participants-and-permissions).

<!-- schema -->
```
e2e.chain.groupState#1ddc7584 participants:Vector<e2e.chain.GroupParticipant> external_permissions:int = e2e.chain.GroupState;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **participants** | [Vector](/type/Vector%20t)&lt;[e2e.chain.GroupParticipant](/type/e2e.chain.GroupParticipant.md)&gt; | Current call participants, identified by user ID and public key. |
| **external\_permissions** | [int](/type/int.md) | `add_users`, `remove_users` and `set_value` permission bits used only when applying a group-state change signed by a user not yet present in `participants`; the mask cannot increase |

### Type
[e2e.chain.GroupState](/type/e2e.chain.GroupState.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.