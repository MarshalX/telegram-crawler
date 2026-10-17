# messageMediaDice

[Dice-based animated sticker](/api/dice.md)

```tl
messageMediaDice#8cbec07 flags:# value:int emoticon:string game_outcome:flags.0?messages.EmojiGameOutcome = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **value** | [int](/type/int.md) | [Dice value](/api/dice.md) |
| **emoticon** | [string](/type/string.md) | The emoji, for now 🏀, 🎲 and 🎯 are supported |
| **game\_outcome** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[messages.EmojiGameOutcome](/type/messages.EmojiGameOutcome.md) | Dice game outcome. |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [Animated dice](/api/dice.md)
Telegram supports sending animated dice emojis.