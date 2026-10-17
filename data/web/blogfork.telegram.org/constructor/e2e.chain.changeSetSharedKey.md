# e2e.chain.changeSetSharedKey

Establishes a new shared encryption key for an E2E conference call, see [change types for group calls »](/api/end-to-end/group-calls.md#change-types-for-group-calls).

<!-- schema -->
```
e2e.chain.changeSetSharedKey#987a2158 shared_key:e2e.chain.SharedKey = e2e.chain.Change;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shared\_key** | [e2e.chain.SharedKey](/type/e2e.chain.SharedKey.md) | Encrypted shared key material for all participants in the current group state. |

### Type
[e2e.chain.Change](/type/e2e.chain.Change.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.