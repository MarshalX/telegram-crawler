# savedStarGift

Represents a [gift](/api/gifts.md) owned by a peer.

```tl
savedStarGift#41df43fc flags:# name_hidden:flags.0?true unsaved:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true pinned_to_top:flags.12?true upgrade_separate:flags.17?true from_id:flags.1?Peer date:int gift:StarGift message:flags.2?TextWithEntities msg_id:flags.3?int saved_id:flags.11?long convert_stars:flags.4?long upgrade_stars:flags.6?long can_export_at:flags.7?int transfer_stars:flags.8?long can_transfer_at:flags.13?int can_resell_at:flags.14?int collection_id:flags.15?Vector<int> prepaid_upgrade_hash:flags.16?string drop_original_details_stars:flags.18?long gift_num:flags.19?int can_craft_at:flags.20?int = SavedStarGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **name\_hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the gift sender in `from_id` and the `message` are set only for the receiver of the gift. |
| **unsaved** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, the gift is **not** pinned on the user's profile. |
| **refunded** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | This gift was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts) and then re-downgraded to a regular gift because a request to refund the payment related to the upgrade was made, and the money was returned. |
| **can\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Only set for non-collectible gifts, if they can be upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts). |
| **pinned\_to\_top** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether this gift is pinned on top of the user's profile page. |
| **upgrade\_separate** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | If set, someone already [separately pre-paid](/api/gifts.md#prepaying-for-someone-elses-upgrade) for the upgrade of this gift. |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | Sender of the gift (unset for anonymous gifts). |
| **date** | [int](/type/int.md) | Reception date of the gift. |
| **gift** | [StarGift](/type/StarGift.md) | The collectible gift. |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[TextWithEntities](/type/TextWithEntities.md) | Message attached to the gift. |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | For gifts received by users, ID to use in [inputSavedStarGiftUser](/constructor/inputSavedStarGiftUser.md) constructors. |
| **saved\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[long](/type/long.md) | For gifts received by channels, ID to use in [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md) constructors. |
| **convert\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | For non-collectible gifts, the receiver of this gift may convert it to this many Telegram Stars, instead of displaying it on their profile page. |
| **upgrade\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[long](/type/long.md) | **Only** for **pre-paid** non-collectible gifts, the number of Telegram Stars the sender has **already paid** to [convert the gift into a collectible gift »](/api/gifts.md#collectible-gifts) (this is different from the meaning of the flag in [messageActionStarGift](/constructor/messageActionStarGift.md), where it signals the upgrade price for not yet upgraded gifts). |
| **can\_export\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[int](/type/int.md) | If set, indicates that the current gift can't be [exported to the TON blockchain »](/api/gifts.md#withdraw-a-collectible-gift-to-the-ton-blockchain) yet: the owner will be able to export it at the specified unixtime. |
| **transfer\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[long](/type/long.md) | If set, indicates that the gift can be [transferred »](/api/gifts.md#transferring-collectible-gifts) to another user by paying the specified amount of stars. |
| **can\_transfer\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[int](/type/int.md) | If set, indicates that the current gift can't be [transferred »](/api/gifts.md#transferring-collectible-gifts) yet: the owner will be able to transfer it at the specified unixtime. |
| **can\_resell\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[int](/type/int.md) | If set, indicates that the current gift can't be [resold »](/api/gifts.md#reselling-collectible-gifts) yet: the owner will be able to put it up for sale at the specified unixtime. |
| **collection\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the [collections »](/api/gifts.md#gift-collections) that this gift is a part of. |
| **prepaid\_upgrade\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | [Hash to prepay for a gift upgrade separately »](/api/gifts.md#prepaying-for-someone-elses-upgrade). |
| **drop\_original\_details\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[long](/type/long.md) | If set, the [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute of this gift may be removed by paying the specified amount of stars, see [here »](/api/gifts.md#dropping-the-original-details-of-an-upgraded-gift) for the full flow. |
| **gift\_num** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[int](/type/int.md) | Collectible number assigned to the gift, if already known. |
| **can\_craft\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[int](/type/int.md) | If set, this gift can be used for [crafting »](/api/gifts.md#crafting-collectible-gifts) only starting from the specified unixtime. |

### Type
[SavedStarGift](/type/SavedStarGift.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [inputSavedStarGiftUser](/constructor/inputSavedStarGiftUser.md)
A gift received in a private chat with another user.

#### [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md)
A gift received by a channel we own.

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md)
Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).