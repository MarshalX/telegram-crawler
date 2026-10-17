# botInlineMessageMediaContact

Send a contact

```tl
botInlineMessageMediaContact#18d1cdc2 flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **phone\_number** | [string](/type/string.md) | Phone number |
| **first\_name** | [string](/type/string.md) | First name |
| **last\_name** | [string](/type/string.md) | Last name |
| **vcard** | [string](/type/string.md) | VCard info |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Inline keyboard |

### Type
[BotInlineMessage](/type/BotInlineMessage.md)