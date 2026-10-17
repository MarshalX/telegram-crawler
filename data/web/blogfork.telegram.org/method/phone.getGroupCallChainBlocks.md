# phone.getGroupCallChainBlocks

Fetch blocks from a conference call [subchain »](/api/end-to-end/group-calls.md#subchains); handle the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) as [specified here »](/api/end-to-end/group-calls.md#handling-updates).

If the number of blocks returned by *any* call to this method is equal to `limit`, this method must be re-invoked immediately after processing the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), with the newly committed `offset` (usually equal to the returned `next_offset`).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.getGroupCallChainBlocks#ee9f88a6 call:InputGroupCall sub_chain_id:int offset:int limit:int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Conference whose subchain blocks should be fetched |
| **sub\_chain\_id** | [int](/type/int.md) | `0` for the main state blockchain, `1` for the call verification subchain |
| **offset** | [int](/type/int.md) | Fetch blocks starting from this height; pass `-1` to fetch the latest block |
| **limit** | [int](/type/int.md) | Maximum number of blocks to return in this call, [see pagination](/api/offsets.md), max 100. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.

#### [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md)
Contains conference call blockchain blocks, see [handling E2E group call updates »](/api/end-to-end/group-calls.md#handling-updates).