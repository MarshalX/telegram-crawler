# InputBotInlineMessage

Represents a sent inline message from the perspective of a bot

```tl
inputBotInlineMessageMediaAuto#3380c786 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageText#3dcd7a87 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaGeo#96929a85 flags:# geo_point:InputGeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaVenue#417bbf11 flags:# geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaContact#a6edbffd flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageGame#4b425864 flags:# reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaInvoice#d7e78225 flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:string provider_data:DataJSON reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaWebPage#bddcc510 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true optional:flags.6?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputBotInlineMessageMediaAuto](/constructor/inputBotInlineMessageMediaAuto.md) | A media |
| [inputBotInlineMessageText](/constructor/inputBotInlineMessageText.md) | Simple text message |
| [inputBotInlineMessageMediaGeo](/constructor/inputBotInlineMessageMediaGeo.md) | Geolocation |
| [inputBotInlineMessageMediaVenue](/constructor/inputBotInlineMessageMediaVenue.md) | Venue |
| [inputBotInlineMessageMediaContact](/constructor/inputBotInlineMessageMediaContact.md) | A contact |
| [inputBotInlineMessageGame](/constructor/inputBotInlineMessageGame.md) | A game |
| [inputBotInlineMessageMediaInvoice](/constructor/inputBotInlineMessageMediaInvoice.md) | An invoice |
| [inputBotInlineMessageMediaWebPage](/constructor/inputBotInlineMessageMediaWebPage.md) | Specifies options that will be used to generate the link preview for the message, or even a standalone link preview without an attached message. |