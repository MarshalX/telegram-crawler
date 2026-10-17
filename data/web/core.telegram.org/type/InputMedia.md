# InputMedia

Defines media content of a message.

```tl
inputMediaEmpty#9664f57f = InputMedia;
inputMediaUploadedPhoto#7d8375da flags:# spoiler:flags.2?true live_photo:flags.3?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int video:flags.3?InputDocument = InputMedia;
inputMediaPhoto#e3af4434 flags:# spoiler:flags.1?true live_photo:flags.2?true id:InputPhoto ttl_seconds:flags.0?int video:flags.2?InputDocument = InputMedia;
inputMediaGeoPoint#f9c44144 geo_point:InputGeoPoint = InputMedia;
inputMediaContact#f8ab7dfb phone_number:string first_name:string last_name:string vcard:string = InputMedia;
inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;
inputMediaVenue#c13d1c11 geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string = InputMedia;
inputMediaPhotoExternal#e5bbfe1a flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int = InputMedia;
inputMediaDocumentExternal#779600f9 flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int video_cover:flags.2?InputPhoto video_timestamp:flags.3?int = InputMedia;
inputMediaGame#d33f43f3 id:InputGame = InputMedia;
inputMediaInvoice#405fef0d flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:flags.3?string provider_data:DataJSON start_param:flags.1?string extended_media:flags.2?InputMedia = InputMedia;
inputMediaGeoLive#971fa843 flags:# stopped:flags.0?true geo_point:InputGeoPoint heading:flags.2?int period:flags.1?int proximity_notification_radius:flags.3?int = InputMedia;
inputMediaPoll#883a4108 flags:# poll:Poll correct_answers:flags.0?Vector<int> attached_media:flags.3?InputMedia solution:flags.1?string solution_entities:flags.1?Vector<MessageEntity> solution_media:flags.2?InputMedia = InputMedia;
inputMediaDice#e66fbf7b emoticon:string = InputMedia;
inputMediaStory#89fdd778 peer:InputPeer id:int = InputMedia;
inputMediaWebPage#c21b8849 flags:# force_large_media:flags.0?true force_small_media:flags.1?true optional:flags.2?true url:string = InputMedia;
inputMediaPaidMedia#c4103386 flags:# stars_amount:long extended_media:Vector<InputMedia> payload:flags.0?string = InputMedia;
inputMediaTodo#9fc55fde todo:TodoList = InputMedia;
inputMediaStakeDice#f3a9244a game_hash:string ton_amount:long client_seed:bytes = InputMedia;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputMediaEmpty](/constructor/inputMediaEmpty.md) | Empty media content of a message. |
| [inputMediaUploadedPhoto](/constructor/inputMediaUploadedPhoto.md) | Photo |
| [inputMediaPhoto](/constructor/inputMediaPhoto.md) | Forwarded photo |
| [inputMediaGeoPoint](/constructor/inputMediaGeoPoint.md) | Map. |
| [inputMediaContact](/constructor/inputMediaContact.md) | Phone book contact |
| [inputMediaUploadedDocument](/constructor/inputMediaUploadedDocument.md) | New document |
| [inputMediaDocument](/constructor/inputMediaDocument.md) | Forwarded document |
| [inputMediaVenue](/constructor/inputMediaVenue.md) | Can be used to send a venue geolocation. |
| [inputMediaPhotoExternal](/constructor/inputMediaPhotoExternal.md) | New photo that will be uploaded by the server using the specified URL |
| [inputMediaDocumentExternal](/constructor/inputMediaDocumentExternal.md) | Document that will be downloaded by the telegram servers |
| [inputMediaGame](/constructor/inputMediaGame.md) | A game |
| [inputMediaInvoice](/constructor/inputMediaInvoice.md) | Generated invoice of a [bot payment](/bots/payments.md) |
| [inputMediaGeoLive](/constructor/inputMediaGeoLive.md) | [Live geolocation](/api/live-location.md) |
| [inputMediaPoll](/constructor/inputMediaPoll.md) | A poll |
| [inputMediaDice](/constructor/inputMediaDice.md) | Send a [dice-based animated sticker](/api/dice.md) |
| [inputMediaStory](/constructor/inputMediaStory.md) | Forwarded story |
| [inputMediaWebPage](/constructor/inputMediaWebPage.md) | Specifies options that will be used to generate the link preview for the caption, or even a standalone link preview without an attached message. |
| [inputMediaPaidMedia](/constructor/inputMediaPaidMedia.md) | [Paid media, see here »](/api/paid-media.md) for more info. |
| [inputMediaTodo](/constructor/inputMediaTodo.md) | Creates a [todo list »](/api/todo.md). |
| [inputMediaStakeDice](/constructor/inputMediaStakeDice.md) | Dice game media. |