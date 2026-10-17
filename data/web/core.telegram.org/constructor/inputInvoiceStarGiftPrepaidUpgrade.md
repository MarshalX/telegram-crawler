# inputInvoiceStarGiftPrepaidUpgrade

[Separately prepay for the upgrade of a gift »](/api/gifts.md#prepaying-for-someone-elses-upgrade).

```tl
inputInvoiceStarGiftPrepaidUpgrade#9a0b48b8 peer:InputPeer hash:string = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer that owns the gift. |
| **hash** | [string](/type/string.md) | The upgrade hash from [messageActionStarGift](/constructor/messageActionStarGift.md).`prepaid_upgrade_hash` or [savedStarGift](/constructor/savedStarGift.md).`prepaid_upgrade_hash`. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [savedStarGift](/constructor/savedStarGift.md)
Represents a [gift](/api/gifts.md) owned by a peer.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.