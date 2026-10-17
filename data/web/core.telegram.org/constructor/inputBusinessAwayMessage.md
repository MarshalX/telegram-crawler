# inputBusinessAwayMessage

Describes a [Telegram Business away message](/api/business.md#away-messages), automatically sent to users writing to us when we're offline, during closing hours, while we're on vacation, or in some other custom time period when we cannot immediately answer to the user.

```tl
inputBusinessAwayMessage#832175e0 flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:InputBusinessRecipients = InputBusinessAwayMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **offline\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the messages will not be sent if the account was online in the last 10 minutes. |
| **shortcut\_id** | [int](/type/int.md) | ID of a [quick reply shorcut, containing the away messages to send, see here » for more info](/api/business.md#quick-reply-shortcuts). |
| **schedule** | [BusinessAwayMessageSchedule](/type/BusinessAwayMessageSchedule.md) | Specifies when should the away messages be sent. |
| **recipients** | [InputBusinessRecipients](/type/InputBusinessRecipients.md) | Allowed recipients for the away messages. |

### Type
[InputBusinessAwayMessage](/type/InputBusinessAwayMessage.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.