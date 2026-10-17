# updateMoveStickerSetToTop

A stickerset was just moved to top, [see here for more info »](/api/stickers.md#recent-stickersets)

```tl
updateMoveStickerSetToTop#86fccf85 flags:# masks:flags.0?true emojis:flags.1?true stickerset:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | This update is referring to a [mask stickerset](/api/stickers.md#mask-stickers) |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | This update is referring to a [custom emoji stickerset](/api/custom-emoji.md) |
| **stickerset** | [long](/type/long.md) | [Stickerset](/api/stickers.md) ID |

### Type
[Update](/type/Update.md)

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.