# inputInvoiceStarGift

Used to buy a [Telegram Star Gift, see here »](/api/gifts.md) for more info.

```tl
inputInvoiceStarGift#e8625e92 flags:# hide_name:flags.0?true include_upgrade:flags.2?true peer:InputPeer gift_id:long message:flags.1?TextWithEntities = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **hide\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, your name will be hidden if the destination user decides to display the gift on their profile (they will still see that you sent the gift) |
| **include\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Also pay for an eventual upgrade of the gift to a [collectible gift »](/api/gifts.md#collectible-gifts). |
| **peer** | [InputPeer](/type/InputPeer.md) | Receiver of the gift. |
| **gift\_id** | [long](/type/long.md) | Identifier of the gift, from [starGift](/constructor/starGift.md).`id` |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Optional message, attached with the gift. \
The maximum length for this field is specified in the [stargifts\_message\_length\_max client configuration value »](/api/config.md#stargifts-message-length-max). |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.