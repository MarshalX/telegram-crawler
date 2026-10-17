# channels.setEmojiStickers

Set a [custom emoji stickerset](/api/custom-emoji.md) for supergroups. Only usable after reaching at least the [boost level »](/api/boost.md) specified in the [`group_emoji_stickers_level_min` »](/api/config.md#group-emoji-stickers-level-min) config parameter.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.setEmojiStickers#3cd930b7 channel:InputChannel stickerset:InputStickerSet = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The supergroup |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | The custom emoji stickerset to associate to the supergroup |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.