# payments.upgradeStarGift

Upgrade a [gift](/api/gifts.md) to a [collectible gift](/api/gifts.md#collectible-gifts): can only be used if the upgrade was already paid by the gift sender; see [here »](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift) for more info on the full flow (including the different flow to use in case the upgrade was not paid by the gift sender).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
payments.upgradeStarGift#aed6e4f5 flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **keep\_original\_details** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to keep the original gift text, sender and receiver in the upgraded gift as a [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute. |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The gift to upgrade |

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
| 400 | SAVED\_ID\_EMPTY | The passed inputSavedStarGiftChat.saved_id is empty. |
| 400 | STARGIFT\_ALREADY\_CONVERTED | The specified star gift was already converted to Stars. |
| 400 | STARGIFT\_ALREADY\_UPGRADED | The specified gift was already upgraded to a collectible gift. |
| 400 | STARGIFT\_UPGRADE\_UNAVAILABLE | A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](/constructor/messageActionStarGift.md)/[savedStarGift](/constructor/savedStarGift.md).`can_upgrade` flag is set. |

### Related pages

#### [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md)
Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [savedStarGift](/constructor/savedStarGift.md)
Represents a [gift](/api/gifts.md) owned by a peer.