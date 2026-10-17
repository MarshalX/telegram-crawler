# E2e.chain.SharedKey

Encrypted [shared group key material](/api/end-to-end/group-calls.md#shared-key-encryption) for an E2E conference call.

<!-- schema -->
```
e2e.chain.sharedKey#8a847e7f ek:int256 encrypted_shared_key:string dest_user_id:Vector<long> dest_header:Vector<bytes> = e2e.chain.SharedKey;
```
<!-- /schema -->

### Constructors

| Constructor | Description |
| --- | --- |
| [e2e.chain.sharedKey](/constructor/e2e.chain.sharedKey.md) | Encrypted [shared group key material](/api/end-to-end/group-calls.md#shared-key-encryption) for an E2E conference call. |

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.