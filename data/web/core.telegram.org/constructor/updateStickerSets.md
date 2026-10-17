# updateStickerSets

Installed stickersets have changed, the client should refetch them as [described in the docs](/api/stickers.md#installing-stickersets).

```tl
updateStickerSets#31c24808 flags:# masks:flags.0?true emojis:flags.1?true = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether mask stickersets have changed |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the list of installed [custom emoji stickersets](/api/custom-emoji.md) has changed |

### Type
[Update](/type/Update.md)

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.