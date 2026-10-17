# MessageMedia

Media

```tl
messageMediaEmpty#3ded6320 = MessageMedia;
messageMediaPhoto#e216eb63 flags:# spoiler:flags.3?true live_photo:flags.4?true photo:flags.0?Photo ttl_seconds:flags.2?int video:flags.4?Document = MessageMedia;
messageMediaGeo#56e0d474 geo:GeoPoint = MessageMedia;
messageMediaContact#70322949 phone_number:string first_name:string last_name:string vcard:string user_id:long = MessageMedia;
messageMediaUnsupported#9f84f49e = MessageMedia;
messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;
messageMediaWebPage#ddf10c3b flags:# force_large_media:flags.0?true force_small_media:flags.1?true manual:flags.3?true safe:flags.4?true webpage:WebPage = MessageMedia;
messageMediaVenue#2ec0533f geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MessageMedia;
messageMediaGame#fdb19008 game:Game = MessageMedia;
messageMediaInvoice#f6a548d3 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument receipt_msg_id:flags.2?int currency:string total_amount:long start_param:string extended_media:flags.4?MessageExtendedMedia = MessageMedia;
messageMediaGeoLive#b940c666 flags:# geo:GeoPoint heading:flags.0?int period:int proximity_notification_radius:flags.1?int = MessageMedia;
messageMediaPoll#773f4e66 flags:# poll:Poll results:PollResults attached_media:flags.0?MessageMedia = MessageMedia;
messageMediaDice#8cbec07 flags:# value:int emoticon:string game_outcome:flags.0?messages.EmojiGameOutcome = MessageMedia;
messageMediaStory#68cb6283 flags:# via_mention:flags.1?true peer:Peer id:int story:flags.0?StoryItem = MessageMedia;
messageMediaGiveaway#aa073beb flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.2?true channels:Vector<long> countries_iso2:flags.1?Vector<string> prize_description:flags.3?string quantity:int months:flags.4?int stars:flags.5?long until_date:int = MessageMedia;
messageMediaGiveawayResults#ceaa3ea1 flags:# only_new_subscribers:flags.0?true refunded:flags.2?true channel_id:long additional_peers_count:flags.3?int launch_msg_id:int winners_count:int unclaimed_count:int winners:Vector<long> months:flags.4?int stars:flags.5?long prize_description:flags.1?string until_date:int = MessageMedia;
messageMediaPaidMedia#a8852491 stars_amount:long extended_media:Vector<MessageExtendedMedia> = MessageMedia;
messageMediaToDo#8a53b014 flags:# todo:TodoList completions:flags.0?Vector<TodoCompletion> = MessageMedia;
messageMediaVideoStream#ca5cab89 flags:# rtmp_stream:flags.0?true call:InputGroupCall = MessageMedia;

---functions---

messages.uploadMedia#14967978 flags:# business_connection_id:flags.0?string peer:InputPeer media:InputMedia = MessageMedia;
messages.uploadImportedMedia#2a862092 peer:InputPeer import_id:long file_name:string media:InputMedia = MessageMedia;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messageMediaEmpty](/constructor/messageMediaEmpty.md) | Empty constructor. |
| [messageMediaPhoto](/constructor/messageMediaPhoto.md) | Attached photo. |
| [messageMediaGeo](/constructor/messageMediaGeo.md) | Attached map. |
| [messageMediaContact](/constructor/messageMediaContact.md) | Attached contact. |
| [messageMediaUnsupported](/constructor/messageMediaUnsupported.md) | Current version of the client does not support this media type. |
| [messageMediaDocument](/constructor/messageMediaDocument.md) | Document (video, audio, voice, sticker, any media type except photo) |
| [messageMediaWebPage](/constructor/messageMediaWebPage.md) | Preview of webpage |
| [messageMediaVenue](/constructor/messageMediaVenue.md) | Venue |
| [messageMediaGame](/constructor/messageMediaGame.md) | Telegram game |
| [messageMediaInvoice](/constructor/messageMediaInvoice.md) | Invoice |
| [messageMediaGeoLive](/constructor/messageMediaGeoLive.md) | Indicates a [live geolocation](/api/live-location.md) |
| [messageMediaPoll](/constructor/messageMediaPoll.md) | Poll |
| [messageMediaDice](/constructor/messageMediaDice.md) | [Dice-based animated sticker](/api/dice.md) |
| [messageMediaStory](/constructor/messageMediaStory.md) | Represents a forwarded [story](/api/stories.md) or a story mention. |
| [messageMediaGiveaway](/constructor/messageMediaGiveaway.md) | Contains info about a [giveaway, see here »](/api/giveaways.md) for more info. |
| [messageMediaGiveawayResults](/constructor/messageMediaGiveawayResults.md) | A [giveaway](/api/giveaways.md) with public winners has finished, this constructor contains info about the winners. |
| [messageMediaPaidMedia](/constructor/messageMediaPaidMedia.md) | [Paid media, see here »](/api/paid-media.md) for more info. |
| [messageMediaToDo](/constructor/messageMediaToDo.md) | Represents a [todo list »](/api/todo.md). |
| [messageMediaVideoStream](/constructor/messageMediaVideoStream.md) | Identifies the active group call associated with a [live story »](/api/group-calls.md#live-stories). |

### Methods

| Method | Description |
| --- | --- |
| [messages.uploadMedia](/method/messages.uploadMedia.md) | Upload a file and associate it to a chat (without actually sending it to the chat)\
\
May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the business connection ID in the `business_connection_id` parameter. |
| [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md) | Upload a media file associated with an [imported chat, click here for more info »](/api/import.md). |