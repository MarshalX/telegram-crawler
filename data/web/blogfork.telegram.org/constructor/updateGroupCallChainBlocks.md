# updateGroupCallChainBlocks

Contains conference call blockchain blocks, see [handling E2E group call updates »](/api/end-to-end/group-calls.md#handling-updates).

```tl
updateGroupCallChainBlocks#a477288f call:InputGroupCall sub_chain_id:int blocks:Vector<bytes> next_offset:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Conference whose specified subchain received these blocks |
| **sub\_chain\_id** | [int](/type/int.md) | `0` for the main state blockchain, `1` for the call verification subchain |
| **blocks** | [Vector](/type/Vector%20t)&lt;[bytes](/type/bytes.md)&gt; | Serialized subchain blocks with the server-adjusted constructor IDs described in the [subchain documentation »](/api/end-to-end/group-calls.md#subchains) |
| **next\_offset** | [int](/type/int.md) | Height of the block located *after* the last block in `blocks`; the first returned block has height `next_offset - blocks.length` |

### Type
[Update](/type/Update.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.