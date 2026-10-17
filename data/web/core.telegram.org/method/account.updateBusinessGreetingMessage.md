# account.updateBusinessGreetingMessage

Set a list of [Telegram Business greeting messages](/api/business.md#greeting-messages).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateBusinessGreetingMessage#66cdafc4 flags:# message:flags.0?InputBusinessGreetingMessage = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputBusinessGreetingMessage](/type/InputBusinessGreetingMessage.md) | Greeting message configuration and contents. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.