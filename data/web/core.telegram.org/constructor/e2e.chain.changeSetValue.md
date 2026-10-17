# e2e.chain.changeSetValue

Updates the [key-value trie state for an E2E conference call blockchain](/api/end-to-end/group-calls.md#change-types-for-group-calls).

<!-- schema -->
```
e2e.chain.changeSetValue#7c4f9bfa key:bytes value:bytes = e2e.chain.Change;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **key** | [bytes](/type/bytes.md) | Key-value trie key; clients that do not implement the trie must ignore its contents |
| **value** | [bytes](/type/bytes.md) | Key-value trie value; clients that do not implement the trie must ignore its contents and accept the containing block's `state_proof.kv_hash` |

### Type
[e2e.chain.Change](/type/e2e.chain.Change.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.