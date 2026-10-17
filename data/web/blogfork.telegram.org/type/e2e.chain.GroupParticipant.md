# E2e.chain.GroupParticipant

A participant in an [E2E conference call group state](/api/end-to-end/group-calls.md#blockchain-state-management).

<!-- schema -->
```
e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;
```
<!-- /schema -->

### Constructors

| Constructor | Description |
| --- | --- |
| [e2e.chain.groupParticipant](/constructor/e2e.chain.groupParticipant.md) | A participant and their permissions in an [E2E conference call group state »](/api/end-to-end/group-calls.md#participants-and-permissions). |

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.