# starGiftUnique

Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

```tl
starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **require\_premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | This gift can only be bought by users with a [Premium](/api/premium.md) subscription. |
| **resale\_ton\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether the gift can be bought only using Grams. |
| **theme\_available** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | A chat theme associated to this gift is available, [see here »](/api/themes.md#chat-themes) for more info on how to use it. |
| **burned** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | This gift was already used as an ingredient for [crafting another collectible gift »](/api/gifts.md#crafting-collectible-gifts). |
| **crafted** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | This collectible gift was obtained by [crafting »](/api/gifts.md#crafting-collectible-gifts), not by upgrading a regular gift. |
| **id** | [long](/type/long.md) | Unique identifier of this collectible gift. |
| **gift\_id** | [long](/type/long.md) | ID of the regular gift from which this gift was upgraded (all collectible gifts upgraded from the same gift will have the same `gift_id`, with different attributes). |
| **title** | [string](/type/string.md) | Collectible title. |
| **slug** | [string](/type/string.md) | Slug that can be used to create a [collectible gift deep link »](/api/links.md#collectible-gift-link), or [elsewhere in the API where a collectible slug is accepted](/api/gifts.md). |
| **num** | [int](/type/int.md) | Unique identifier of this collectible gift among all (already upgraded) collectible gifts of the same type. |
| **owner\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | The owner of the gift. |
| **owner\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | The name of the owner if neither `owner_id` nor `owner_address` are set. |
| **owner\_address** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | For [NFTs on the TON blockchain](/api/gifts.md#withdraw-a-collectible-gift-to-the-ton-blockchain), contains the address of the owner (append it to the [ton\_blockchain\_explorer\_url client configuration value »](/api/config.md#ton-blockchain-explorer-url) to obtain a link with information about the address). |
| **attributes** | [Vector](/type/Vector%20t)&lt;[StarGiftAttribute](/type/StarGiftAttribute.md)&gt; | Collectible attributes |
| **availability\_issued** | [int](/type/int.md) | Total number of gifts of the same type that were upgraded to a collectible gift. |
| **availability\_total** | [int](/type/int.md) | Total number of gifts of the same type that can be upgraded or were already upgraded to a collectible gift. |
| **gift\_address** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | For [NFTs on the TON blockchain](/api/gifts.md#withdraw-a-collectible-gift-to-the-ton-blockchain), contains the address of the NFT (append it to the [ton\_blockchain\_explorer\_url client configuration value »](/api/config.md#ton-blockchain-explorer-url) to obtain a link with information about the address). |
| **resell\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[StarsAmount](/type/StarsAmount.md)&gt; | Resale price of the gift. |
| **released\_by** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[Peer](/type/Peer.md) | This gift was released by the specified peer. |
| **value\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[long](/type/long.md) | Estimated price of the gift. |
| **value\_currency** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[string](/type/string.md) | Currency for the gift's estimated price. |
| **value\_usd\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[long](/type/long.md) | Estimated price of the gift in USD cents. |
| **theme\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[Peer](/type/Peer.md) | The current chat where the associated [chat theme](/api/themes.md#chat-themes) is installed, if any (gift-based themes can only be installed in one chat at a time). |
| **peer\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[PeerColor](/type/PeerColor.md) | Can contain a [collectible message palette »](/api/colors.md#collectible-message-palettes). |
| **host\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[Peer](/type/Peer.md) | If set, the gift is currently [hosted on the specified user or channel profile »](/api/gifts.md#hosted-collectible-gifts), while ownership remains with the TON wallet in `owner_address`. |
| **offer\_min\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[int](/type/int.md) | If set, you can [send a purchase offer for this gift »](/api/gifts.md#collectible-gift-purchase-offers): the minimum offer price is specified in this flag. |
| **craft\_chance\_permille** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[int](/type/int.md) | Success probability, per 1000, contributed by this gift when it is used for [crafting »](/api/gifts.md#crafting-collectible-gifts). |

### Type
[StarGift](/type/StarGift.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [starGiftAttributeModel](/constructor/starGiftAttributeModel.md)
The model of a [collectible gift »](/api/gifts.md#collectible-gifts).