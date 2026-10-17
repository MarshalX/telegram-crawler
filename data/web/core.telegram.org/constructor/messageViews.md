# messageViews

View, forward counter + info about replies of a specific message

```tl
messageViews#455b853d flags:# views:flags.0?int forwards:flags.1?int replies:flags.2?MessageReplies = MessageViews;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **views** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | View count of message |
| **forwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Forward count of message |
| **replies** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[MessageReplies](/type/MessageReplies.md) | Reply and [thread](/api/threads.md) information of message |

### Type
[MessageViews](/type/MessageViews.md)

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.