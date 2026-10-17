# channelAdminLogEventActionChangeEmojiStickerSet

The supergroup's [custom emoji stickerset](/api/boost.md#setting-a-custom-emoji-stickerset-for-supergroups) was changed.

```tl
channelAdminLogEventActionChangeEmojiStickerSet#46d840ab prev_stickerset:InputStickerSet new_stickerset:InputStickerSet = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Old value |
| **new\_stickerset** | [InputStickerSet](/type/InputStickerSet.md) | New value |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.