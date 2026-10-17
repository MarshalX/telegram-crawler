# inputBusinessIntro

[Telegram Business introduction »](/api/business.md#business-introduction).

```tl
inputBusinessIntro#9c469cd flags:# title:string description:string sticker:flags.0?InputDocument = InputBusinessIntro;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title** | [string](/type/string.md) | Title of the introduction message |
| **description** | [string](/type/string.md) | Profile introduction |
| **sticker** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputDocument](/type/InputDocument.md) | Optional introduction [sticker](/api/stickers.md). |

### Type
[InputBusinessIntro](/type/InputBusinessIntro.md)

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.