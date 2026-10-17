# messageActionStarGift

You received a [gift, see here »](/api/gifts.md) for more info.

```tl
messageActionStarGift#ea2c31d3 flags:# name_hidden:flags.0?true saved:flags.2?true converted:flags.3?true upgraded:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true prepaid_upgrade:flags.13?true upgrade_separate:flags.16?true auction_acquired:flags.17?true gift:StarGift message:flags.1?TextWithEntities convert_stars:flags.4?long upgrade_msg_id:flags.5?int upgrade_stars:flags.8?long from_id:flags.11?Peer peer:flags.12?Peer saved_id:flags.12?long prepaid_upgrade_hash:flags.14?string gift_msg_id:flags.15?int to_id:flags.18?Peer gift_num:flags.19?int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **name\_hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the name of the sender of the gift will be hidden if the destination user decides to display the gift on their profile |
| **saved** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this gift was added to the destination user's profile (may be toggled using [payments.saveStarGift](/method/payments.saveStarGift.md) and fetched using [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md)) |
| **converted** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this gift was converted to [Telegram Stars](/api/stars.md) and cannot be displayed on the profile anymore. |
| **upgraded** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | This gift was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts). |
| **refunded** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | This gift is not available anymore because a request to refund the payment related to this gift was made, and the money was returned. |
| **can\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, this gift can be [upgraded to a collectible gift](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift); can only be set for the receiver of a gift. |
| **prepaid\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | The sender has already pre-paid for the upgrade of this gift to a collectible gift. |
| **upgrade\_separate** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | This service message is the notification of a [separate pre-payment for the upgrade of a gift we own](/api/gifts.md#prepaying-for-someone-elses-upgrade). |
| **auction\_acquired** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | If set, this gift was acquired in a [collectible gifts auction »](/api/auctions.md). |
| **gift** | [StarGift](/type/StarGift.md) | Info about the gift |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Additional message from the sender of the gift |
| **convert\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | The receiver of this gift may convert it to this many Telegram Stars, instead of displaying it on their profile page.\
`convert_stars` will be equal to `stars` only if the gift was bought using recently bought Telegram Stars, otherwise it will be less than `stars`. |
| **upgrade\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | If set, this gift was [upgraded to a collectible gift](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift), and the corresponding [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) is available at the specified message ID. |
| **upgrade\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[long](/type/long.md) | The number of Telegram Stars the user can pay to [convert the gift into a collectible gift »](/api/gifts.md#collectible-gifts). |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[Peer](/type/Peer.md) | Sender of the gift (unset for anonymous gifts). |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[Peer](/type/Peer.md) | Receiver of the gift. |
| **saved\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[long](/type/long.md) | For channel gifts, ID to use in [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md) constructors. |
| **prepaid\_upgrade\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[string](/type/string.md) | [Hash to prepay for a gift upgrade separately »](/api/gifts.md#prepaying-for-someone-elses-upgrade). |
| **gift\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | For [separate upgrades](/api/gifts.md#prepaying-for-someone-elses-upgrade), the identifier of the message with the gift whose upgrade was prepaid (only valid for the receiver of the service message). |
| **to\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[Peer](/type/Peer.md) | For gifts acquired in an [auction »](/api/auctions.md) (i.e. when `auction_acquired` is set), the peer the gift was assigned to; only present if the target peer is different from the bidder, in which case it will only be present to the messageActionStarGift sent to the bidder, not to the messageActionStarGift sent to the target peer. |
| **gift\_num** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[int](/type/int.md) | For gifts acquired in an [auction »](/api/auctions.md), the collectible number of the won [collectible gift »](/api/gifts.md#collectible-gifts); this field is disjoint from `auction_acquired` because **only** auction collectibles won before this field was introduced in the API will not have this flag set. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [payments.saveStarGift](/method/payments.saveStarGift.md)
Display or remove a [received or hosted gift »](/api/gifts.md#hosted-collectible-gifts) from our profile.

#### [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md)
Fetch the full list of [gifts »](/api/gifts.md#list-all-received-gifts) owned, received or [hosted »](/api/gifts.md#hosted-collectible-gifts) by a peer.

Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned) to the profile, depending on the passed flags.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)
A [gift »](/api/gifts.md) was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md)
A gift received by a channel we own.