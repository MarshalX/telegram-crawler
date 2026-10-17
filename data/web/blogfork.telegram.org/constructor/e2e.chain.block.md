# e2e.chain.block

A block in the [main E2E conference call blockchain](/api/end-to-end/group-calls.md#block-structure), containing state changes for the call and the resulting state proof.

When submitting blocks to the server, use the canonical constructor ID shown in the schema; blocks returned by the server use the incremented constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains).

<!-- schema -->
```
e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;
```
<!-- /schema -->

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **signature** | [int512](/type/int512.md) | Signature of the TL-serialized block with the `signature` field zeroed out. |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **prev\_block\_hash** | [int256](/type/int256.md) | SHA256 hash of the previous accepted main-chain block. |
| **changes** | [Vector](/type/Vector%20t)&lt;[e2e.chain.Change](/type/e2e.chain.Change.md)&gt; | State changes applied by this block; a valid block must contain at least a group-state change or key-value change. |
| **height** | [int](/type/int.md) | Sequential block number; it must be exactly one more than the locally accepted height. |
| **state\_proof** | [e2e.chain.StateProof](/type/e2e.chain.StateProof.md) | Resulting blockchain state after all changes in this block are applied. |
| **signature\_public\_key** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int256](/type/int256.md) | Public key of the participant that created and signed the block; may be omitted when it matches the first participant's key, except at height `0`. |

### Type
[e2e.chain.Block](/type/e2e.chain.Block.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.