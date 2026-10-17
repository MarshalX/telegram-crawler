# messages.botResults

Result of a query to an inline bot

```tl
messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **gallery** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the result is a picture gallery |
| **query\_id** | [long](/type/long.md) | Query ID |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | The next offset to use when navigating through results |
| **switch\_pm** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InlineBotSwitchPM](/type/InlineBotSwitchPM.md) | Shown as a button on top of the remaining inline result list; if clicked, redirects the user to a private chat with the bot with the specified start parameter. |
| **switch\_webview** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InlineBotWebView](/type/InlineBotWebView.md) | Shown as a button on top of the remaining inline result list; if clicked, opens the specified [inline mode mini app](/api/bots/webapps.md#inline-mode-mini-apps). |
| **results** | [Vector](/type/Vector%20t)&lt;[BotInlineResult](/type/BotInlineResult.md)&gt; | The results |
| **cache\_time** | [int](/type/int.md) | Caching validity of the results |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the results |

### Type
[messages.BotResults](/type/messages.BotResults.md)

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.