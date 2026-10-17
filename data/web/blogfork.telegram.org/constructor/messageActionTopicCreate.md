# messageActionTopicCreate

A [forum topic](/api/forum.md#forum-topics) was created.

```tl
messageActionTopicCreate#d999256 flags:# title_missing:flags.1?true title:string icon_color:int icon_emoji_id:flags.0?long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title\_missing** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the topic has no user-defined title, can only be set for the per-user topics of [bot forums](/api/forum.md#bot-forums); if this field is set, the topic title likely needs to be changed by the bot. |
| **title** | [string](/type/string.md) | Topic name. |
| **icon\_color** | [int](/type/int.md) | If no custom emoji icon is specified, specifies the color of the fallback topic icon (RGB), one of `0x6FB9F0`, `0xFFD67E`, `0xCB86DB`, `0x8EEE98`, `0xFF93B2`, or `0xFB6F5F`. |
| **icon\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of the [custom emoji](/api/custom-emoji.md) used as topic icon. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.