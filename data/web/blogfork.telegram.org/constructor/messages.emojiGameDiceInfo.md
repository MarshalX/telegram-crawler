# messages.emojiGameDiceInfo

Dice game information.

```tl
messages.emojiGameDiceInfo#44e56023 flags:# game_hash:string prev_stake:long current_streak:int params:Vector<int> plays_left:flags.0?int = messages.EmojiGameInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **game\_hash** | [string](/type/string.md) | Game hash. |
| **prev\_stake** | [long](/type/long.md) | Previous stake. |
| **current\_streak** | [int](/type/int.md) | Current streak. |
| **params** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Parameters. |
| **plays\_left** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Plays left. |

### Type
[messages.EmojiGameInfo](/type/messages.EmojiGameInfo.md)