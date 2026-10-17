# BotInlineMessage

Inline message

```tl
botInlineMessageMediaAuto#764cf810 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageText#8c7f65e2 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaGeo#51846fd flags:# geo:GeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaVenue#8a86659c flags:# geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaContact#18d1cdc2 flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaInvoice#354a9b09 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument currency:string total_amount:long reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaWebPage#809ad9a6 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true manual:flags.7?true safe:flags.8?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [botInlineMessageMediaAuto](/constructor/botInlineMessageMediaAuto.md) | Send whatever media is attached to the [botInlineMediaResult](/constructor/botInlineMediaResult.md) |
| [botInlineMessageText](/constructor/botInlineMessageText.md) | Send a simple text message |
| [botInlineMessageMediaGeo](/constructor/botInlineMessageMediaGeo.md) | Send a geolocation |
| [botInlineMessageMediaVenue](/constructor/botInlineMessageMediaVenue.md) | Send a venue |
| [botInlineMessageMediaContact](/constructor/botInlineMessageMediaContact.md) | Send a contact |
| [botInlineMessageMediaInvoice](/constructor/botInlineMessageMediaInvoice.md) | Send an invoice |
| [botInlineMessageMediaWebPage](/constructor/botInlineMessageMediaWebPage.md) | Specifies options that must be used to generate the link preview for the message, or even a standalone link preview without an attached message. |