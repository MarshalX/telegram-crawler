# starGift

Represents a [star gift, see here »](/api/gifts.md) for more info.

```tl
starGift#313a9547 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true require_premium:flags.7?true limited_per_user:flags.8?true peer_color_available:flags.10?true auction:flags.11?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int availability_resale:flags.4?long convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long resell_min_stars:flags.4?long title:flags.5?string released_by:flags.6?Peer per_user_total:flags.8?int per_user_remains:flags.8?int locked_until_date:flags.9?int auction_slug:flags.11?string gifts_per_round:flags.11?int auction_start_date:flags.11?int upgrade_variants:flags.12?int background:flags.13?StarGiftBackground = StarGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **limited** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is a limited-supply gift. |
| **sold\_out** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this gift sold out and cannot be bought anymore. |
| **birthday** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this is a birthday-themed gift |
| **require\_premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | This gift can only be bought by users with a [Premium](/api/premium.md) subscription. |
| **limited\_per\_user** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, the maximum number of gifts of this type that can be owned by a single user is limited and specified in `per_user_total`, and the remaining slots for the current user in `per_user_remains`. |
| **peer\_color\_available** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, collectible gifts of this type may be used to generate a [message color palette and pattern »](/api/colors.md#collectible-message-palettes). |
| **auction** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | If set, this is a collectible gift that can only be bought through a [collectible gift auction »](/api/auctions.md). |
| **id** | [long](/type/long.md) | Identifier of the gift |
| **sticker** | [Document](/type/Document.md) | [Sticker](/api/stickers.md) that represents the gift. |
| **stars** | [long](/type/long.md) | Price of the gift in [Telegram Stars](/api/stars.md). |
| **availability\_remains** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | For limited-supply gifts: the remaining number of gifts that may be bought. |
| **availability\_total** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | For limited-supply gifts: the total number of gifts that was available in the initial supply. |
| **availability\_resale** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | The total number of (upgraded to [collectibles](/api/gifts.md#collectible-gifts)) gifts of this type currently on [resale](/api/gifts.md#reselling-collectible-gifts) |
| **convert\_stars** | [long](/type/long.md) | The receiver of this gift may convert it to this many Telegram Stars, instead of displaying it on their profile page.\
`convert_stars` will be equal to `stars` only if the gift was bought using recently bought Telegram Stars, otherwise it will be less than `stars`. |
| **first\_sale\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For sold out gifts only: when was the gift first bought. |
| **last\_sale\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For sold out gifts only: when was the gift last bought. |
| **upgrade\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | The number of Telegram Stars the user can pay to [convert the gift into a collectible gift »](/api/gifts.md#collectible-gifts). |
| **resell\_min\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | The minimum price in [Stars](/api/stars.md) for gifts of this type currently on [resale](/api/gifts.md#reselling-collectible-gifts). |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | Title of the gift |
| **released\_by** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Peer](/type/Peer.md) | This gift was released by the specified peer. |
| **per\_user\_total** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[int](/type/int.md) | Maximum number of gifts of this type that can be owned by any user. |
| **per\_user\_remains** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[int](/type/int.md) | Remaining number of gifts of this type that can be owned by the current user. |
| **locked\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[int](/type/int.md) | If set, the specified gift *possibly* cannot be sent until the specified date, see [here »](/api/gifts.md) for the full flow. |
| **auction\_slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | Always set for gifts that can be bought on [auctions »](/api/auctions.md), contains the [auction deep link slug »](/api/links.md#auction-links). |
| **gifts\_per\_round** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | Always set for gifts that can be bought on [auctions »](/api/auctions.md), contains the number of gifts of this kind that are distributed on every round. |
| **auction\_start\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | Always set for gifts that can be bought on [auctions »](/api/auctions.md), contains the UNIX timestamp indicating when will the auction start (or when the auction started, if it points to the past). |
| **upgrade\_variants** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[int](/type/int.md) | Total number of possible [collectible variants »](/api/gifts.md#listing-all-possible-collectible-variants) for this gift type. |
| **background** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[StarGiftBackground](/type/StarGiftBackground.md) | Default background palette for this gift type, used when rendering gift cards and previews before a specific collectible backdrop is chosen. |

### Type
[StarGift](/type/StarGift.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.