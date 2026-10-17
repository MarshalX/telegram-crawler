# E2e.chain.Block

A block in the [main E2E conference call blockchain](/api/end-to-end/group-calls.md#block-structure), containing state changes for the call and the resulting state proof.

When submitting blocks to the server, use the canonical constructor ID shown in the schema; blocks returned by the server use the incremented constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains).

<!-- schema -->
```
e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;
```
<!-- /schema -->

### Constructors

| Constructor | Description |
| --- | --- |
| [e2e.chain.block](/constructor/e2e.chain.block.md) | A block in the [main E2E conference call blockchain](/api/end-to-end/group-calls.md#block-structure), containing state changes for the call and the resulting state proof.\
\
When submitting blocks to the server, use the canonical constructor ID shown in the schema; blocks returned by the server use the incremented constructor ID described in the [subchain documentation](/api/end-to-end/group-calls.md#subchains). |

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.