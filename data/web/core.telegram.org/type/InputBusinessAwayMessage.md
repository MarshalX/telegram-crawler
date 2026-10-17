# InputBusinessAwayMessage

Describes a [Telegram Business away message](/api/business.md#away-messages), automatically sent to users writing to us when we're offline, during closing hours, while we're on vacation, or in some other custom time period when we cannot immediately answer to the user.

```tl
inputBusinessAwayMessage#832175e0 flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:InputBusinessRecipients = InputBusinessAwayMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputBusinessAwayMessage](/constructor/inputBusinessAwayMessage.md) | Describes a [Telegram Business away message](/api/business.md#away-messages), automatically sent to users writing to us when we're offline, during closing hours, while we're on vacation, or in some other custom time period when we cannot immediately answer to the user. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.