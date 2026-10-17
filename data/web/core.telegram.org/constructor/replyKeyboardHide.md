# replyKeyboardHide

Hide sent reply keyboard

```tl
replyKeyboardHide#a03e5b85 flags:# selective:flags.2?true = ReplyMarkup;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **selective** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Use this flag if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply\_to\_message\_id), sender of the original message.\
\
Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet |

### Type
[ReplyMarkup](/type/ReplyMarkup.md)