# payments.resolveStarGiftOffer

Accept or decline a previously received [collectible gift purchase offer »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
payments.resolveStarGiftOffer#e9ce781c flags:# decline:flags.0?true offer_msg_id:int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **decline** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, declines the offer; otherwise, accepts it. |
| **offer\_msg\_id** | [int](/type/int.md) | Identifier of the [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md) service message describing the offer to act upon. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |

### Related pages

#### [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md)
Contains an offer to purchase a [collectible gift »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.