# storiesStealthMode

Information about the current [stealth mode](/api/stories.md#stealth-mode) session.

```tl
storiesStealthMode#712e27fd flags:# active_until_date:flags.0?int cooldown_until_date:flags.1?int = StoriesStealthMode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **active\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | The date up to which stealth mode will be active. |
| **cooldown\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | The date starting from which the user will be allowed to re-enable stealth mode again. |

### Type
[StoriesStealthMode](/type/StoriesStealthMode.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.