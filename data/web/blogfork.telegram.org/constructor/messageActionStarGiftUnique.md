# messageActionStarGiftUnique

A [gift »](/api/gifts.md) was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this collectible was [upgraded »](/api/gifts.md#collectible-gifts) to a collectible gift from a previously received or sent (depending on the `out` flag of the containing [messageService](/constructor/messageService.md)) non-collectible gift. |
| **transferred** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, this collectible was transferred (either to the current user or by the current user to the other user in the private chat, depending on the `out` flag of the containing [messageService](/constructor/messageService.md)). |
| **saved** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, this gift is visible on the user or channel's profile page; can only be set for the receiver of a gift. |
| **refunded** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | This gift was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts) and then re-downgraded to a regular gift because a request to refund the payment related to the upgrade was made, and the money was returned. |
| **prepaid\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | The sender has pre-paid for the upgrade of this gift to a collectible gift. |
| **assigned** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | This collectible gift was [linked from the TON blockchain to a Telegram profile »](/api/gifts.md#hosted-collectible-gifts). |
| **from\_offer** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | This collectible gift was transferred after a [purchase offer »](/api/gifts.md#collectible-gift-purchase-offers) was accepted. |
| **craft** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | This collectible gift was obtained by [crafting »](/api/gifts.md#crafting-collectible-gifts). |
| **gift** | [StarGift](/type/StarGift.md) | The collectible gift. |
| **can\_export\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | If set, indicates that the current gift can't be [exported to the TON blockchain »](/api/gifts.md#withdraw-a-collectible-gift-to-the-ton-blockchain) yet: the owner will be able to export it at the specified unixtime. |
| **transfer\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | If set, indicates that the gift can be [transferred »](/api/gifts.md#transferring-collectible-gifts) to another user by paying the specified amount of stars. |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Peer](/type/Peer.md) | Sender of the gift (unset for anonymous gifts). |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Peer](/type/Peer.md) | Receiver of the gift. |
| **saved\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[long](/type/long.md) | For channel gifts, ID to use in [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md) constructors. |
| **resale\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[StarsAmount](/type/StarsAmount.md) | Resale price of the gift. |
| **can\_transfer\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[int](/type/int.md) | If set, indicates that the current gift can't be [transferred »](/api/gifts.md#transferring-collectible-gifts) yet: the owner will be able to transfer it at the specified unixtime. |
| **can\_resell\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | If set, indicates that the current gift can't be [resold »](/api/gifts.md#reselling-collectible-gifts) yet: the owner will be able to put it up for sale at the specified unixtime. |
| **drop\_original\_details\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[long](/type/long.md) | If set, the [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute of this gift may be removed by paying the specified amount of stars, see [here »](/api/gifts.md#dropping-the-original-details-of-an-upgraded-gift) for the full flow. |
| **can\_craft\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | If set, this gift can be used for [crafting »](/api/gifts.md#crafting-collectible-gifts) only starting from the specified unixtime. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [messageService](/constructor/messageService.md)
Indicates a service message

#### [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md)
A gift received by a channel we own.

#### [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md)
Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).