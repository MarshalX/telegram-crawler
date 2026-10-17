# inputBusinessGreetingMessage

Describes a [Telegram Business greeting](/api/business.md#greeting-messages), automatically sent to new users writing to us in private for the first time, or after a certain inactivity period.

```tl
inputBusinessGreetingMessage#194cb3b shortcut_id:int recipients:InputBusinessRecipients no_activity_days:int = InputBusinessGreetingMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | ID of a [quick reply shorcut, containing the greeting messages to send, see here » for more info](/api/business.md#quick-reply-shortcuts). |
| **recipients** | [InputBusinessRecipients](/type/InputBusinessRecipients.md) | Allowed recipients for the greeting messages. |
| **no\_activity\_days** | [int](/type/int.md) | The number of days after which a private chat will be considered as inactive; currently, must be one of 7, 14, 21, or 28. |

### Type
[InputBusinessGreetingMessage](/type/InputBusinessGreetingMessage.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.