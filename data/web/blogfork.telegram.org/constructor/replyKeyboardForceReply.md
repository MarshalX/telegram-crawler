# replyKeyboardForceReply

Force the user to send a reply

```tl
replyKeyboardForceReply#86b40b08 flags:# single_use:flags.1?true selective:flags.2?true placeholder:flags.3?string = ReplyMarkup;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **single\_use** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. |
| **selective** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply\_to\_message\_id), sender of the original message. \
Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. |
| **placeholder** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | The placeholder to be shown in the input field when the keyboard is active; 1-64 characters. |

### Type
[ReplyMarkup](/type/ReplyMarkup.md)