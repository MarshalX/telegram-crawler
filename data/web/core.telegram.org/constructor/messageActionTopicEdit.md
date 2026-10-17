# messageActionTopicEdit

[Forum topic](/api/forum.md#forum-topics) information was edited.

```tl
messageActionTopicEdit#c0944820 flags:# title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | New topic title. |
| **icon\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | ID of the new [custom emoji](/api/custom-emoji.md) used as topic icon, or if it was removed. |
| **closed** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Bool](/type/Bool.md) | Whether the topic was opened or closed. |
| **hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Bool](/type/Bool.md) | Whether the topic was hidden or unhidden (only valid for the "General" topic, `id=1`). |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.