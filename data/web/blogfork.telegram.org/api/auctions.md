# Collectible gift auctions


To guarantee fair distribution of [collectible gifts](/api/gifts.md#collectible-gifts), new gift releases will be based on **auctions** — allowing users to place bids with Stars for new gifts over several rounds.  

### Fetching auction state

    inputStarGiftAuction#02e16c98 gift_id:long = InputStarGiftAuction;
    inputStarGiftAuctionSlug#7ab58308 slug:string = InputStarGiftAuction;

    starGift#313a9547 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true require_premium:flags.7?true limited_per_user:flags.8?true peer_color_available:flags.10?true auction:flags.11?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int availability_resale:flags.4?long convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long resell_min_stars:flags.4?long title:flags.5?string released_by:flags.6?Peer per_user_total:flags.8?int per_user_remains:flags.8?int locked_until_date:flags.9?int auction_slug:flags.11?string gifts_per_round:flags.11?int auction_start_date:flags.11?int upgrade_variants:flags.12?int background:flags.13?StarGiftBackground = StarGift;

    starGiftAuctionState#771a4e66 version:int start_date:int end_date:int min_bid_amount:long bid_levels:Vector<AuctionBidLevel> top_bidders:Vector<long> next_round_at:int last_gift_num:int gifts_left:int current_round:int total_rounds:int rounds:Vector<StarGiftAuctionRound> = StarGiftAuctionState;
    starGiftAuctionStateFinished#972dabbf flags:# start_date:int end_date:int average_price:long listed_count:flags.0?int fragment_listed_count:flags.1?int fragment_listed_url:flags.1?string = StarGiftAuctionState;
    starGiftAuctionStateNotModified#fe333952 = StarGiftAuctionState;

    starGiftAuctionUserState#2eeed1c4 flags:# returned:flags.1?true bid_amount:flags.0?long bid_date:flags.0?int min_bid_amount:flags.0?long bid_peer:flags.0?Peer acquired_count:int = StarGiftAuctionUserState;

    starGiftActiveAuctionState#d31bc45d gift:StarGift state:StarGiftAuctionState user_state:StarGiftAuctionUserState = StarGiftActiveAuctionState;

    payments.starGiftActiveAuctionsNotModified#db33dad0 = payments.StarGiftActiveAuctions;
    payments.starGiftActiveAuctions#aef6abbc auctions:Vector<StarGiftActiveAuctionState> users:Vector<User> chats:Vector<Chat> = payments.StarGiftActiveAuctions;

    payments.starGiftAuctionState#6b39f4ec gift:StarGift state:StarGiftAuctionState user_state:StarGiftAuctionUserState timeout:int users:Vector<User> chats:Vector<Chat> = payments.StarGiftAuctionState;

    updateStarGiftAuctionState#48e246c2 gift_id:long state:StarGiftAuctionState = Update;
    updateStarGiftAuctionUserState#dc58f31e gift_id:long user_state:StarGiftAuctionUserState = Update;

    ---functions---

    payments.getStarGiftActiveAuctions#a5d0514d hash:long = payments.StarGiftActiveAuctions;
    payments.getStarGiftAuctionState#5c9ff4d6 auction:InputStarGiftAuction version:int = payments.StarGiftAuctionState;

Each auction will distribute a specific amount of variants of a specific gift to top bidders: auction information is split between its [StarGiftAuctionState](/type/StarGiftAuctionState.md) object, its related [starGift](/constructor/starGift.md) object and the user's [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md), if the user placed a bid in the auction.  

All three of the objects mentioned above will be returned together by the following methods:

- [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md), which returns the state of a specific auction, passing the following params:
  - `auction`: an auctioned gift ID using [inputStarGiftAuction](/constructor/inputStarGiftAuction.md), or an [auction deep link slug &raquo;](/api/links.md#auction-links) with [inputStarGiftAuctionSlug](/constructor/inputStarGiftAuctionSlug.md):
  - `version`: the locally cached [starGiftAuctionState](/constructor/starGiftAuctionState.md).`version` field; `0` if there's no locally cached [starGiftAuctionState](/constructor/starGiftAuctionState.md) yet.

  Invoking this method will also subscribe the user to [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) updates from the specified auction, for [payments.starGiftAuctionState](/constructor/payments.starGiftAuctionState.md).`timeout` seconds; if the user is still on the auction state page, re-invoke the method after `timeout` seconds to keep receiving updates.  

  The server will also send [updateStarGiftAuctionUserState](/constructor/updateStarGiftAuctionUserState.md) by itself without the need to poll with [payments.starGiftAuctionState](/constructor/payments.starGiftAuctionState.md) when:

  - The user places a bid
  - The user wins a gift

  If the passed `version` is equal to the remote `version`, auction information hasn't changed, thus a [starGiftAuctionStateNotModified](/constructor/starGiftAuctionStateNotModified.md) will be returned: note that this **will** still renew the update subscription.  

  Note that [starGiftAuctionStateNotModified](/constructor/starGiftAuctionStateNotModified.md) can **only** be returned by this method, never by updates or other methods.  

  Note that [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) and [updateStarGiftAuctionUserState](/constructor/updateStarGiftAuctionUserState.md) do NOT contain the linked [starGift](/constructor/starGift.md) object (which is mandatory to render some information in graphical clients), just the gift's ID.  
  
  While in most cases this is not an issue, because these updates can only be emitted to clients that invoke [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md), which already returns the gift, in some cases the gift may not be cached: in this case (if an auction update references an unknown auction), [payments.getStarGiftActiveAuctions](/method/payments.getStarGiftActiveAuctions.md) can be used to return full information (gift+auction+user state) for all currently active gift auctions **where the user has placed a bid**:

- [payments.getStarGiftActiveAuctions](/method/payments.getStarGiftActiveAuctions.md) returns all not-yet-ended gift auctions **the user has ever placed a bid on** (including auctions where the user was outbid and the bid was returned, i.e. with the [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`returned` flag set), passing the following params:
  - `hash`: initially `0` for the first call, can then be set to a hash of the auctions (+user auction state) to which the user is participating, generated from the locally cached list as follows:
    
    For all active auctions (filter out finished auctions according to [StarGiftAuctionState](/type/StarGiftAuctionState.md).`end_date`) where the user placed a bid (keep only auctions where the [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_date` flag is set), generate a [hash &raquo;](/api/offsets.md#hash-generation) passing [starGiftAuctionState](/constructor/starGiftAuctionState.md).`version` followed by [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_date`, for all filtered auctions.  

    [Example (tdesktop) &raquo;](https://github.com/telegramdesktop/tdesktop/blob/9cca0059b5cdc6be94ba355bf91d69d890dfdf75/Telegram/SourceFiles/data/components/gift_auctions.cpp#L335)

  The primary purpose of [payments.getStarGiftActiveAuctions](/method/payments.getStarGiftActiveAuctions.md) is to display an auction badge in the chat list immediately on app startup, without waiting for real-time [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) updates to arrive: the client invokes it to discover which auctions the user is participating in and show the badge proactively.  

  This is in contrast with [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md), which is invoked when the user opens a specific auction, to fetch its full state, subscribe to its real-time updates and render the detailed auction UI.  

Any [starGift](/constructor/starGift.md) with the `auction` flag (and linked flags) set is auction-only: it must **not** be bought through the normal [gift sending flow &raquo;](/api/gifts.md#sending-gifts).  

[starGift](/constructor/starGift.md).`auction_slug` contains an [auction deep link slug &raquo;](/api/links.md#auction-links) that can be used to generate an [auction deep link &raquo;](/api/links.md#auction-links).  

[starGift](/constructor/starGift.md).`background` contains the default background palette for that gift type, also used when rendering auction previews.  

Active or pending auctions are described by [starGiftAuctionState](/constructor/starGiftAuctionState.md) constructors.  

Note: only apply new incoming [starGiftAuctionState](/constructor/starGiftAuctionState.md)s from [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) and method call results if the incoming `version` is bigger than the locally cached version, as the server may sometimes return slightly outdated cached versions in method results and/or updates.  

On the other hand, finished auctions are represented by [starGiftAuctionStateFinished](/constructor/starGiftAuctionStateFinished.md), which doesn't have a `version` field and should be applied unconditionally over any locally cached [starGiftAuctionState](/constructor/starGiftAuctionState.md), as it's the final, irreversible state of all auctions.  

As mentioned above, auction information is split between [StarGiftAuctionState](/type/StarGiftAuctionState.md), [starGift](/constructor/starGift.md) and [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md), here's a more detailed overview.  

Gifts acquired through collectible gift auction cannot be [converted back into Telegram Stars &raquo;](/api/gifts.md#converting-a-gift-back-into-stars).  

### Auction flow

    auctionBidLevel#310240cc pos:int amount:long date:int = AuctionBidLevel;
    
    starGiftAuctionRound#3aae0528 num:int duration:int = StarGiftAuctionRound;
    starGiftAuctionRoundExtendable#aa021e5 num:int duration:int extend_top:int extend_window:int = StarGiftAuctionRound;

    starGift#313a9547 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true require_premium:flags.7?true limited_per_user:flags.8?true peer_color_available:flags.10?true auction:flags.11?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int availability_resale:flags.4?long convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long resell_min_stars:flags.4?long title:flags.5?string released_by:flags.6?Peer per_user_total:flags.8?int per_user_remains:flags.8?int locked_until_date:flags.9?int auction_slug:flags.11?string gifts_per_round:flags.11?int auction_start_date:flags.11?int upgrade_variants:flags.12?int background:flags.13?StarGiftBackground = StarGift;

    starGiftAuctionState#771a4e66 version:int start_date:int end_date:int min_bid_amount:long bid_levels:Vector<AuctionBidLevel> top_bidders:Vector<long> next_round_at:int last_gift_num:int gifts_left:int current_round:int total_rounds:int rounds:Vector<StarGiftAuctionRound> = StarGiftAuctionState;
    starGiftAuctionStateFinished#972dabbf flags:# start_date:int end_date:int average_price:long listed_count:flags.0?int fragment_listed_count:flags.1?int fragment_listed_url:flags.1?string = StarGiftAuctionState;

    starGiftAuctionUserState#2eeed1c4 flags:# returned:flags.1?true bid_amount:flags.0?long bid_date:flags.0?int min_bid_amount:flags.0?long bid_peer:flags.0?Peer acquired_count:int = StarGiftAuctionUserState;

    inputInvoiceStarGiftAuctionBid#1ecafa10 flags:# hide_name:flags.0?true update_bid:flags.2?true peer:flags.3?InputPeer gift_id:long bid_amount:long message:flags.1?TextWithEntities = InputInvoice;

    messageActionStarGift#ea2c31d3 flags:# name_hidden:flags.0?true saved:flags.2?true converted:flags.3?true upgraded:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true prepaid_upgrade:flags.13?true upgrade_separate:flags.16?true auction_acquired:flags.17?true gift:StarGift message:flags.1?TextWithEntities convert_stars:flags.4?long upgrade_msg_id:flags.5?int upgrade_stars:flags.8?long from_id:flags.11?Peer peer:flags.12?Peer saved_id:flags.12?long prepaid_upgrade_hash:flags.14?string gift_msg_id:flags.15?int to_id:flags.18?Peer gift_num:flags.19?int = MessageAction;

    starGiftAuctionAcquiredGift#42b00348 flags:# name_hidden:flags.0?true peer:Peer date:int bid_amount:long round:int pos:int message:flags.1?TextWithEntities gift_num:flags.2?int = StarGiftAuctionAcquiredGift;

    payments.starGiftAuctionAcquiredGifts#7d5bd1f0 gifts:Vector<StarGiftAuctionAcquiredGift> users:Vector<User> chats:Vector<Chat> = payments.StarGiftAuctionAcquiredGifts;

    webPageAttributeStarGiftAuction#1c641c2 gift:StarGift end_date:int = WebPageAttribute;

    ---functions---

    payments.getStarGiftAuctionAcquiredGifts#6ba2cbec gift_id:long = payments.StarGiftAuctionAcquiredGifts;

Auctions start at [StarGiftAuctionState](/type/StarGiftAuctionState.md).`start_date` and end at [StarGiftAuctionState](/type/StarGiftAuctionState.md).`end_date` (both fields are UNIX timestamps).  

Each auction has [starGiftAuctionState](/constructor/starGiftAuctionState.md).`total_rounds` rounds: in each round, a specific amount (N = [starGift](/constructor/starGift.md).`gifts_per_round`) of variants of a specific gift (the [starGift](/constructor/starGift.md)) is distributed to the top `N` bidders, for a total of [starGift](/constructor/starGift.md).`gifts_per_round` `*` [starGiftAuctionState](/constructor/starGiftAuctionState.md).`total_rounds` gifts.  

[starGiftAuctionState](/constructor/starGiftAuctionState.md).`current_round` indicates the current active auction round.  

If your bid didn't end up in the top `N`, it automatically carries over to the next round. Once all the gifts have been awarded, any remaining bids will be automatically refunded.  

You can participate in more than one round to get several gifts — and increase your chances by increasing your bid at any time: bids are placed using [Telegram Stars](/api/stars.md).  

The same user may also participate in multiple active auctions at the same time: each auction has its own [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md), and all active auctions with a placed bid can be fetched with [payments.getStarGiftActiveAuctions](/method/payments.getStarGiftActiveAuctions.md).  

The minimum amount for a bid is contained in [starGiftAuctionState](/constructor/starGiftAuctionState.md).`min_bid_amount`; however, if the user already placed a bid in this auction, the value in [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`min_bid_amount` is the minimum amount that must be used, instead.  

A placed bid cannot be retracted: the only three possible outcomes are a win (in the current or any of the future rounds, since the bid will get carried over automatically), an increase of the bid amount or a refund, if the user loses all bids and the auction finishes.    

Placed bids show up in the [Stars transaction history &raquo;](/api/stars.md) with the `stargift_auction_bid` flag set.  

To place a bid, invoke [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoiceStarGiftAuctionBid](/constructor/inputInvoiceStarGiftAuctionBid.md), then follow the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

The constructor accepts the following parameters:

* `peer`: Identifier of the user or channel (only if [channelFull](/constructor/channelFull.md).`stargifts_available` is set) that will receive the gift
* `gift_id`: Identifier of the gift, from [starGift](/constructor/starGift.md).`id`
* `message`: Optional message that will be attached with the gift if we end up winning this round: the maximum length for this field is specified in the [stargifts_message_length_max client configuration value &raquo;](/api/config.md#stargifts-message-length-max).  
  Must not be set when updating an existing bid, as the value cannot be changed for existing bids.  
* `hide_name`: If set, your name will be hidden if the destination peer decides to display the gift on their profile (they will still see that you sent the gift).  
  Must not be set when updating an existing bid, as the value cannot be changed for existing bids.
* `bid_amount`: Total amount of the bid in [Telegram Stars](/api/stars.md).
* `peer`: Recipient that will receive the gift if we end up winning this round: must be set when making a new bid, must not be set when updating an existing bid, as the value cannot be changed for existing bids.  
* `update_bid`: Must be set when increasing an already existing bid.

The `bid_amount`, `bid_date`, `bid_peer` and `min_bid_amount` flags of [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md) will all be set if the user placed a bid before:

- [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_amount` contains the amount of the placed bid in [Telegram Stars](/api/stars.md)
- [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_date` contains a UNIX timestamp, indicating when the bid was placed
- [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_peer` contains the peer that will receive the gift, if you end up winning this round
- [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`min_bid_amount` contains the minumum allowed bid amount in [Telegram Stars](/api/stars.md), if set overrides [starGiftAuctionState](/constructor/starGiftAuctionState.md).`min_bid_amount` for the current user

[starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`acquired_count` will contain the number of gifts that were purchased so far in the auction by the current user.  

[starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`returned` will be set if the bid was returned to the user, because it was outbid so much that it fell out of the top [starGiftAuctionState](/constructor/starGiftAuctionState.md).`gifts_left` positions, meaning that even if no new bids are placed, the user will never receive any gifts, so the bid was completely removed from the auction, and in order to participate again the user must manually make a new bid.  

Here's a description of the remaining fields of [starGiftAuctionState](/constructor/starGiftAuctionState.md):  

* `gifts_left` contains the number of gifts still distributable in the auction (overrides the locally cached [starGift](/constructor/starGift.md).`availability_remains`, which contains the same value, just lagging behind as it doesn't get updated via [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md)).
* `top_bidders` contains the user IDs of the current top 3 bidders; the corresponding users are returned in the `users` vector of the containing object as [min](/api/min.md) users.
* `rounds` contains full and detailed information about the all rounds in the auction as a list of [StarGiftAuctionRound](/type/StarGiftAuctionRound.md) objects: note that each [StarGiftAuctionRound](/type/StarGiftAuctionRound.md) covers one or more rounds (specifically, each [StarGiftAuctionRound](/type/StarGiftAuctionRound.md) covers rounds starting from `num` up until `next.num-1` inclusively, where `next` is the next [StarGiftAuctionRound](/type/StarGiftAuctionRound.md)), covering all rounds in the auction in a concise manner.  

  Extendable rounds also contain `extend_top` and `extend_window` parameters, indicating that changes in the top `extend_top` bid positions will prolong the duration of the current round by `extend_window` seconds.  
* `last_gift_num` contains the number of gifts that were distributed in the previous round, and is also used to compute the approximated index of the gift that the current user will receive, if a bid was placed, see below for more info.
* `bid_levels` lists the bids for different positions in the ranking, represented by [auctionBidLevel](/constructor/auctionBidLevel.md): exact values are provided for the first 100 places, and then progressively coarser checkpoints are returned for larger positions (for example, 1,2,3,..., 100, 200, 300, ..., 900, 1000, 2000, ..., [starGiftAuctionState](/constructor/starGiftAuctionState.md).`gifts_left`).  
  
  Levels are sorted in ascending order, as specified in the example.  

  Use `bid_levels` together with [starGiftAuctionState](/constructor/starGiftAuctionState.md).`top_bidders`, [starGiftAuctionState](/constructor/starGiftAuctionState.md).`last_gift_num`, [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_amount` and [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`bid_date` to estimate the current user's position, as follows:
  
  - If the current user ID is present in the `top_bidders`, the position will be precisely equal to the index within `top_bidders` plus one (since places start from 1)
  - Otherwise, iterate through `bid_levels` until either:
    - ([auctionBidLevel](/constructor/auctionBidLevel.md).`amount` is equal to our bid amount AND [auctionBidLevel](/constructor/auctionBidLevel.md).`date` is bigger than or equal to our bid date) OR
    - [auctionBidLevel](/constructor/auctionBidLevel.md).`amount` is smaller than our bid

    In other words, if two bids have the same amount, the earlier one ranks higher; and for approximate positions, round up to the next returned checkpoint.  

    The user's position will then be equal to the chosen [auctionBidLevel](/constructor/auctionBidLevel.md).`pos`.  
    If no [auctionBidLevel](/constructor/auctionBidLevel.md) matched using the above two rules, the position is equal to the last [auctionBidLevel](/constructor/auctionBidLevel.md).`pos` plus one.  

  The expected collectible number for the current user's bid can be estimated as `last_gift_num + user_position`.  

Won gifts are delivered as [messageActionStarGift](/constructor/messageActionStarGift.md) service messages with the `auction_acquired` flag set.  
`to_id` identifies the final recipient of the gift, and `gift_num` contains the collectible number.  

Use [payments.getStarGiftAuctionAcquiredGifts](/method/payments.getStarGiftAuctionAcquiredGifts.md) to list the gifts that the current user won in an auction.  

Each returned [starGiftAuctionAcquiredGift](/constructor/starGiftAuctionAcquiredGift.md) contains the destination peer, bid amount, round number, position, optional message, hidden-name flag and optional `gift_num` containing the collectible number.  

Once an auction ends, [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md) will return [starGiftAuctionStateFinished](/constructor/starGiftAuctionStateFinished.md), containing the final `start_date`, `end_date`, `average_price`.  

[starGiftAuctionStateFinished](/constructor/starGiftAuctionStateFinished.md) can also contain the `listed_count` and `fragment_listed_count`+`fragment_listed_url` flags, containing the number of gifts from the auction currently being resold on Telegram and [Fragment](https://fragment.com); when the respective UI label is clicked by the user, the client should open up the list of gifts currently on resale, as follows:

- For `listed_count`, invoke [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) with the gift ID, following the usual [gift selection flow &raquo;](/api/gifts.md#sending-gifts)
- For `fragment_listed_count`, open `fragment_listed_url` in the browser.

[Auction deep links &raquo;](/api/links.md#auction-links) have a [webPage](/constructor/webPage.md).`type` equal to `telegram_auction` and contain the [webPageAttributeStarGiftAuction](/constructor/webPageAttributeStarGiftAuction.md) attribute.  
