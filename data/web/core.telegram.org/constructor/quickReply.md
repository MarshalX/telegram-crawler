# quickReply

A [quick reply shortcut](/api/business.md#quick-reply-shortcuts).

```tl
quickReply#697102b shortcut_id:int shortcut:string top_message:int count:int = QuickReply;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | Unique shortcut ID. |
| **shortcut** | [string](/type/string.md) | Shortcut name. |
| **top\_message** | [int](/type/int.md) | ID of the last message in the shortcut. |
| **count** | [int](/type/int.md) | Total number of messages in the shortcut. |

### Type
[QuickReply](/type/QuickReply.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.