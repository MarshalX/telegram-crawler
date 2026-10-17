# account.updateBusinessIntro

Set or remove the [Telegram Business introduction »](/api/business.md#business-introduction).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateBusinessIntro#a614d034 flags:# intro:flags.0?InputBusinessIntro = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **intro** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputBusinessIntro](/type/InputBusinessIntro.md) | Telegram Business introduction, to remove it call the method without setting this flag. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.