# savedReactionTag

Info about a [saved message reaction tag »](/api/saved-messages.md#tags).

```tl
savedReactionTag#cb6ff828 flags:# reaction:Reaction title:flags.0?string count:int = SavedReactionTag;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **reaction** | [Reaction](/type/Reaction.md) | [Reaction](/api/reactions.md) associated to the tag. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Custom tag name assigned by the user (max 12 UTF-8 chars). |
| **count** | [int](/type/int.md) | Number of messages tagged with this tag. |

### Type
[SavedReactionTag](/type/SavedReactionTag.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.