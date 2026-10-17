# payments.refundStarsCharge

Refund a [Telegram Stars](/api/stars.md) transaction, see [here »](/api/payments.md#6-refunds) for more info.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
payments.refundStarsCharge#25ae8f4a user_id:InputUser charge_id:string = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User to refund. |
| **charge\_id** | [string](/type/string.md) | Transaction ID. |

### Result
[Updates](/type/Updates.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHARGE\_ALREADY\_REFUNDED | The transaction was already refunded. |
| 400 | CHARGE\_ID\_EMPTY | The specified charge_id is empty. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Payments API](/api/payments.md)
You can accept payments from Telegram users via Telegram Bots.