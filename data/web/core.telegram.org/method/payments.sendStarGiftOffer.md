# payments.sendStarGiftOffer

Send an offer to purchase a [collectible gift »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
payments.sendStarGiftOffer#8fb86b41 flags:# peer:InputPeer slug:string price:StarsAmount duration:int random_id:long allow_paid_stars:flags.0?long = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Owner of the collectible gift: equal to [starGiftUnique](/constructor/starGiftUnique.md).`owner_id`. |
| **slug** | [string](/type/string.md) | Identifier of the collectible gift: equal to [starGiftUnique](/constructor/starGiftUnique.md).`slug`. |
| **price** | [StarsAmount](/type/StarsAmount.md) | Offer price, in stars or TON. |
| **duration** | [int](/type/int.md) | Duration of the offer, in seconds: must be one of `21600`, `43200`, `86400`, `129600`, `172800`, or `259200`; can also be `120` in test mode. |
| **random\_id** | [long](/type/long.md) | Random 64-bit identifier used to avoid sending the same offer twice in case of network issues. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | If the destination peer has [paid messages »](/api/paid-messages.md) enabled, specifies the amount of [Telegram Stars](/api/stars.md) the sending user has agreed to pay in order to send the offer (in addition to the amount for the offer itself, contained in `price`). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | INPUT\_STARS\_AMOUNT\_INVALID | The specified offer amount in stars is invalid, see [here&nbsp;&raquo;](/api/gifts.md#collectible-gift-purchase-offers) for the allowed range. |
| 400 | INPUT\_STARS\_NANOS\_INVALID |  The specified offer amount in nanotons is invalid, see [here&nbsp;&raquo;](/api/gifts.md#collectible-gift-purchase-offers) for the allowed range. |
| 400 | INVOICE\_INVALID | The specified invoice is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | RESELL\_STARS\_TOO\_FEW | The offered price is too low. |
| 400 | RESELL\_STARS\_TOO\_MUCH | The offered price is too high. |
| 400 | STARGIFT\_OFFER\_INVALID | The specified offer amount is invalid. |
| 400 | STARGIFT\_OFFER\_NOT\_ALLOWED | You can't send a purchase offer for this gift. |
| 400 | STARGIFT\_SLUG\_INVALID | The specified gift slug is invalid. |

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.