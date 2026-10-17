# payments.transferStarGift

Transfer a [collectible gift](/api/gifts.md#collectible-gifts) to another user or channel: can only be used if transfer is free (i.e. [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md).`transfer_stars` is not set); see [here »](/api/gifts.md#transferring-collectible-gifts) for more info on the full flow (including the different flow to use in case the transfer isn't free).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
payments.transferStarGift#7f18176a stargift:InputSavedStarGift to_id:InputPeer = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The gift to transfer. |
| **to\_id** | [InputPeer](/type/InputPeer.md) | Destination peer. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PAYMENT\_REQUIRED | Payment is required for this action, see [here&nbsp;&raquo;](/api/gifts.md) for more info. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | SAVED\_ID\_EMPTY | The passed inputSavedStarGiftChat.saved_id is empty. |
| 400 | STARGIFT\_NOT\_FOUND | The specified gift was not found. |
| 400 | STARGIFT\_NOT\_OWNER | You're not the owner of the gift you trying to transfer. |
| 400 | STARGIFT\_NOT\_UNIQUE | You can't transfer a non-collectible gift. |
| 400 | STARGIFT\_OWNER\_INVALID | You cannot transfer or sell a gift owned by another user. |
| 400 | STARGIFT\_PEER\_INVALID | The specified inputSavedStarGiftChat.peer is invalid. |
| 400 | STARGIFT\_TRANSFER\_TOO\_EARLY\_%d | You cannot transfer this gift yet, wait %d seconds. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)
A [gift »](/api/gifts.md) was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.