# messages.setInlineBotResults

Answer an inline query, for bots only

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setInlineBotResults#bb12a419 flags:# gallery:flags.0?true private:flags.1?true query_id:long results:Vector<InputBotInlineResult> cache_time:int next_offset:flags.2?string switch_pm:flags.3?InlineBotSwitchPM switch_webview:flags.4?InlineBotWebView = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **gallery** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag if the results are composed of media files |
| **private** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query |
| **query\_id** | [long](/type/long.md) | Unique identifier for the answered query |
| **results** | [Vector](/type/Vector%20t)&lt;[InputBotInlineResult](/type/InputBotInlineResult.md)&gt; | Vector of results for the inline query |
| **cache\_time** | [int](/type/int.md) | The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. |
| **switch\_pm** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InlineBotSwitchPM](/type/InlineBotSwitchPM.md) | If passed, clients will display a button on top of the remaining inline result list with the specified text, that switches the user to a private chat with the bot and sends the bot a start message with a certain parameter. |
| **switch\_webview** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[InlineBotWebView](/type/InlineBotWebView.md) | If passed, clients will display a button on top of the remaining inline result list with the specified text, that switches the user to the specified [inline mode mini app](/api/bots/webapps.md#inline-mode-mini-apps). |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ARTICLE\_TITLE\_EMPTY | The title of the article is empty. |
| 400 | AUDIO\_CONTENT\_URL\_EMPTY | The remote URL specified in the content field is empty. |
| 400 | AUDIO\_TITLE\_EMPTY | An empty audio title was provided. |
| 400 | BUTTON\_DATA\_INVALID | The data of one or more of the buttons you provided is invalid. |
| 400 | BUTTON\_TYPE\_INVALID | The type of one or more of the buttons you provided is invalid. |
| 400 | BUTTON\_URL\_INVALID | Button URL invalid. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 400 | FILE\_CONTENT\_TYPE\_INVALID | File content-type is invalid. |
| 400 | FILE\_TITLE\_EMPTY | An empty file title was specified. |
| 400 | GIF\_CONTENT\_TYPE\_INVALID | GIF content-type invalid. |
| 400 | MEDIA\_CAPTION\_TOO\_LONG | The caption is too long. |
| 400 | MESSAGE\_EMPTY | The provided message is empty. |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | NEXT\_OFFSET\_INVALID | The specified offset is longer than 64 bytes. |
| 400 | PEER\_TYPES\_INVALID | The passed [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md).`peer_types` field is invalid. |
| 400 | PHOTO\_CONTENT\_TYPE\_INVALID | Photo mime-type invalid. |
| 400 | PHOTO\_CONTENT\_URL\_EMPTY | Photo URL invalid. |
| 400 | PHOTO\_INVALID | Photo invalid. |
| 400 | PHOTO\_THUMB\_URL\_EMPTY | Photo thumbnail URL is empty. |
| 400 | QUERY\_ID\_INVALID | The query ID is invalid. |
| 400 | REPLY\_MARKUP\_INVALID | The provided reply markup is invalid. |
| 400 | RESULTS\_TOO\_MUCH | Too many results were provided. |
| 400 | RESULT\_ID\_DUPLICATE | You provided a duplicate result ID. |
| 400 | RESULT\_ID\_INVALID | One of the specified result IDs is invalid. |
| 400 | RESULT\_TYPE\_INVALID | Result type invalid. |
| 400 | SEND\_MESSAGE\_MEDIA\_INVALID | Invalid media provided. |
| 400 | SEND\_MESSAGE\_TYPE\_INVALID | The message type is invalid. |
| 400 | START\_PARAM\_EMPTY | The start parameter is empty. |
| 400 | START\_PARAM\_INVALID | Start parameter invalid. |
| 400 | STICKER\_DOCUMENT\_INVALID | The specified sticker document is invalid. |
| 400 | SWITCH\_PM\_TEXT\_EMPTY | The switch_pm.text field was empty. |
| 400 | SWITCH\_WEBVIEW\_URL\_INVALID | The URL specified in switch_webview.url is invalid! |
| 400 | URL\_INVALID | Invalid URL provided. |
| 403 | USER\_BOT\_INVALID | User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | VIDEO\_CONTENT\_TYPE\_INVALID | The video's content type is invalid. |
| 400 | VIDEO\_TITLE\_EMPTY | The specified video title is empty. |
| 400 | WEBDOCUMENT\_INVALID | Invalid webdocument URL provided. |
| 400 | WEBDOCUMENT\_MIME\_INVALID | Invalid webdocument mime type provided. |
| 400 | WEBDOCUMENT\_SIZE\_TOO\_BIG | Webdocument is too big! |
| 400 | WEBDOCUMENT\_URL\_EMPTY | The passed web document URL is empty. |
| 400 | WEBDOCUMENT\_URL\_INVALID | The specified webdocument URL is invalid. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md)
Button to switch the user to inline mode

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must insert the bot's username and `query` into the chat input field, triggering an [inline query](/api/bots/inline.md).

If `same_peer` is set, clients use the current chat. Otherwise, clients prompt the user to select a chat, filtered by `peer_types` if specified.