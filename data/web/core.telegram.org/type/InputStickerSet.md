# InputStickerSet

Represents a stickerset

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
inputStickerSetEmpty#ffb62b95 = InputStickerSet;
inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
```

API schema:
<!-- /schema-blocks -->

```tl
inputStickerSetEmpty#ffb62b95 = InputStickerSet;
inputStickerSetID#9de7a269 id:long access_hash:long = InputStickerSet;
inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
inputStickerSetAnimatedEmoji#28703c8 = InputStickerSet;
inputStickerSetDice#e67f520e emoticon:string = InputStickerSet;
inputStickerSetAnimatedEmojiAnimations#cde3739 = InputStickerSet;
inputStickerSetPremiumGifts#c88b3b02 = InputStickerSet;
inputStickerSetEmojiGenericAnimations#4c4d4ce = InputStickerSet;
inputStickerSetEmojiDefaultStatuses#29d0f5ee = InputStickerSet;
inputStickerSetEmojiDefaultTopicIcons#44c1f8e9 = InputStickerSet;
inputStickerSetEmojiChannelDefaultStatuses#49748553 = InputStickerSet;
inputStickerSetTonGifts#1cf671a0 = InputStickerSet;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputStickerSetShortName](/constructor/inputStickerSetShortName.md) | Stickerset by short name, from a [stickerset deep link »](/api/links.md#stickerset-links) |
| [inputStickerSetEmpty](/constructor/inputStickerSetEmpty.md) | Empty constructor |
| [inputStickerSetID](/constructor/inputStickerSetID.md) | Stickerset by ID |
| [inputStickerSetAnimatedEmoji](/constructor/inputStickerSetAnimatedEmoji.md) | Animated emojis stickerset |
| [inputStickerSetDice](/constructor/inputStickerSetDice.md) | Used for fetching [animated dice stickers](/api/dice.md) |
| [inputStickerSetAnimatedEmojiAnimations](/constructor/inputStickerSetAnimatedEmojiAnimations.md) | Animated emoji reaction stickerset (contains animations to play when a user clicks on a given animated emoji) |
| [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md) | Stickers to show when receiving a gifted Telegram Premium subscription |
| [inputStickerSetEmojiGenericAnimations](/constructor/inputStickerSetEmojiGenericAnimations.md) | Generic animation stickerset containing animations to play when [reacting to messages using a normal emoji without a custom animation](/api/reactions.md) |
| [inputStickerSetEmojiDefaultStatuses](/constructor/inputStickerSetEmojiDefaultStatuses.md) | Default [custom emoji status](/api/emoji-status.md) stickerset |
| [inputStickerSetEmojiDefaultTopicIcons](/constructor/inputStickerSetEmojiDefaultTopicIcons.md) | Default [custom emoji](/api/custom-emoji.md) stickerset for [forum topic icons](/api/forum.md#forum-topics) |
| [inputStickerSetEmojiChannelDefaultStatuses](/constructor/inputStickerSetEmojiChannelDefaultStatuses.md) | Default [custom emoji status](/api/emoji-status.md) stickerset for channel statuses |
| [inputStickerSetTonGifts](/constructor/inputStickerSetTonGifts.md) | TON gifts stickerset. |