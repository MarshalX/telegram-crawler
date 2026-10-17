# messages.updateSavedReactionTag

Update the [description of a saved message tag »](/api/saved-messages.md#tags).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.updateSavedReactionTag#60297dec flags:# reaction:Reaction title:flags.0?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **reaction** | [Reaction](/type/Reaction.md) | [Reaction](/api/reactions.md) associated to the tag |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Tag description, max 12 UTF-8 characters; to remove the description call the method without setting this flag. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 400 | REACTION\_INVALID | The specified reaction is invalid. |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.