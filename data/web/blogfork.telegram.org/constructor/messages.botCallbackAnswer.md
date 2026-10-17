# messages.botCallbackAnswer

Callback answer sent by the bot in response to a button press

```tl
messages.botCallbackAnswer#36585ea4 flags:# alert:flags.1?true has_url:flags.3?true native_ui:flags.4?true message:flags.0?string url:flags.2?string cache_time:int = messages.BotCallbackAnswer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **alert** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether an alert should be shown to the user instead of a toast notification |
| **has\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether an URL is present |
| **native\_ui** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether to show games in WebView or in native UI. |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Alert to show |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | URL to open |
| **cache\_time** | [int](/type/int.md) | For how long should this answer be cached |

### Type
[messages.BotCallbackAnswer](/type/messages.BotCallbackAnswer.md)