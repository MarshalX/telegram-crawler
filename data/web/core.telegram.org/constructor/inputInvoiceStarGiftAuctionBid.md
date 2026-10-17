# inputInvoiceStarGiftAuctionBid

Used to place a bid in a [collectible gift auction »](/api/auctions.md).

```tl
inputInvoiceStarGiftAuctionBid#1ecafa10 flags:# hide_name:flags.0?true update_bid:flags.2?true peer:flags.3?InputPeer gift_id:long bid_amount:long message:flags.1?TextWithEntities = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **hide\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, your name will be hidden if the destination peer decides to display the gift on their profile (they will still see that you sent the gift).  \
  Must not be set when updating an existing bid, as the value cannot be changed for existing bids. |
| **update\_bid** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Must be set when increasing an already existing bid. |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InputPeer](/type/InputPeer.md) | Identifier of the user or channel (only if [channelFull](/constructor/channelFull.md).`stargifts_available` is set) that will receive the gift. |
| **gift\_id** | [long](/type/long.md) | Identifier of the gift, from [starGift](/constructor/starGift.md).`id` |
| **bid\_amount** | [long](/type/long.md) | Total amount of the bid in [Telegram Stars](/api/stars.md). |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Optional message that will be attached with the gift if we end up winning this round: the maximum length for this field is specified in the [stargifts\_message\_length\_max client configuration value »](/api/config.md#stargifts-message-length-max).  \
  Must not be set when updating an existing bid, as the value cannot be changed for existing bids. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [channelFull](/constructor/channelFull.md)
Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.