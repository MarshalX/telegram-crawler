# e2e.chain.sharedKey

Encrypted [shared group key material](/api/end-to-end/group-calls.md#shared-key-encryption) for an E2E conference call.

<!-- schema -->
```
e2e.chain.sharedKey#8a847e7f ek:int256 encrypted_shared_key:string dest_user_id:Vector<long> dest_header:Vector<bytes> = e2e.chain.SharedKey;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **ek** | [int256](/type/int256.md) | Ephemeral public key used to derive per-participant secrets for decrypting the shared key. |
| **encrypted\_shared\_key** | [string](/type/string.md) | Encrypted raw group shared key. |
| **dest\_user\_id** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Exactly one unique user ID for each participant in the current group state, in any order |
| **dest\_header** | [Vector](/type/Vector%20t)&lt;[bytes](/type/bytes.md)&gt; | Encrypted per-participant headers containing the one-time secret needed to decrypt `encrypted_shared_key`; each entry corresponds to a user ID located under the same key in `dest_user_id`. |

### Type
[e2e.chain.SharedKey](/type/e2e.chain.SharedKey.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.