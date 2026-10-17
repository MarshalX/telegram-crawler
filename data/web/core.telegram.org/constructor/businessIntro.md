# businessIntro

[Telegram Business introduction »](/api/business.md#business-introduction).

```tl
businessIntro#5a0a066d flags:# title:string description:string sticker:flags.0?Document = BusinessIntro;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title** | [string](/type/string.md) | Title of the introduction message (max [intro\_title\_length\_limit »](/api/config.md#intro-title-length-limit) UTF-8 characters). |
| **description** | [string](/type/string.md) | Profile introduction (max [intro\_description\_length\_limit »](/api/config.md#intro-description-length-limit) UTF-8 characters). |
| **sticker** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Document](/type/Document.md) | Optional introduction [sticker](/api/stickers.md). |

### Type
[BusinessIntro](/type/BusinessIntro.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.