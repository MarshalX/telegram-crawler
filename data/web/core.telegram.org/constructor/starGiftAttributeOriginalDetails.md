# starGiftAttributeOriginalDetails

Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
starGiftAttributeOriginalDetails#e0bff26c flags:# sender_id:flags.0?Peer recipient_id:Peer date:int message:flags.1?TextWithEntities = StarGiftAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **sender\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | Original sender of the gift, absent if the gift was private. |
| **recipient\_id** | [Peer](/type/Peer.md) | Original receiver of the gift. |
| **date** | [int](/type/int.md) | When was the gift sent. |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Original message attached to the gift, if present. |

### Type
[StarGiftAttribute](/type/StarGiftAttribute.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.