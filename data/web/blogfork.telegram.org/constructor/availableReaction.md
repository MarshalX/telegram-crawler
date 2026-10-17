# availableReaction

Animations associated with a message reaction

```tl
availableReaction#c077ec01 flags:# inactive:flags.0?true premium:flags.2?true reaction:string title:string static_icon:Document appear_animation:Document select_animation:Document activate_animation:Document effect_animation:Document around_animation:flags.1?Document center_icon:flags.1?Document = AvailableReaction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inactive** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If not set, the reaction can be added to new messages and enabled in chats. |
| **premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this reaction can only be used by Telegram Premium users |
| **reaction** | [string](/type/string.md) | Reaction emoji |
| **title** | [string](/type/string.md) | Reaction description |
| **static\_icon** | [Document](/type/Document.md) | Static icon for the reaction |
| **appear\_animation** | [Document](/type/Document.md) | The animated sticker to show when the user opens the reaction dropdown |
| **select\_animation** | [Document](/type/Document.md) | The animated sticker to show when the user hovers over the reaction |
| **activate\_animation** | [Document](/type/Document.md) | The animated sticker to show when the reaction is chosen and activated |
| **effect\_animation** | [Document](/type/Document.md) | The background effect (still an animated sticker) to play under the `activate_animation`, when the reaction is chosen and activated |
| **around\_animation** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Document](/type/Document.md) | The animation that plays around the button when you press an existing reaction (played together with `center_icon`). |
| **center\_icon** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Document](/type/Document.md) | The animation of the emoji inside the button when you press an existing reaction (played together with `around_animation`). |

### Type
[AvailableReaction](/type/AvailableReaction.md)