# messages.uploadMedia

Upload a file and associate it to a chat (without actually sending it to the chat)

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the business connection ID in the `business_connection_id` parameter.

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
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **business\_connection\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Whether the media will be used only in the specified [business connection »](/api/bots/connected-business-bots.md), and not directly by the bot. |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat, can be [inputPeerEmpty](/constructor/inputPeerEmpty.md) for bots and [inputPeerSelf](/constructor/inputPeerSelf.md) for users. |
| **media** | [InputMedia](/type/InputMedia.md) | File uploaded in chunks as described in [files »](/api/files.md) |

### Result
[MessageMedia](/type/MessageMedia.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_RESTRICTED | You can't send messages in this chat, you were restricted. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | FILE\_PARTS\_INVALID | The number of file parts is invalid. |
| 400 | FILE\_PART\_LENGTH\_INVALID | The length of a file part is invalid. |
| 400 | IMAGE\_PROCESS\_FAILED | Failure while processing image. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MEDIA\_INVALID | Media invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PHOTO\_EXT\_INVALID | The extension of the photo is invalid. |
| 400 | PHOTO\_INVALID\_DIMENSIONS | The photo dimensions are invalid. |
| 400 | PHOTO\_SAVE\_FILE\_INVALID | Internal issues, try again later. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | VOICE\_MESSAGES\_FORBIDDEN | This user's privacy settings forbid you from sending voice messages. |
| 400 | WEBPAGE\_CURL\_FAILED | Failure while fetching the webpage with cURL. |

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [inputPeerEmpty](/constructor/inputPeerEmpty.md)
An empty constructor, no user or chat is defined.

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md)
Invoke a method using a [Telegram Business Bot connection, see here » for more info, including a list of the methods that can be wrapped in this constructor](/api/bots/connected-business-bots.md).

Make sure to always send queries wrapped in a `invokeWithBusinessConnection` to the datacenter ID, specified in the `dc_id` field of the [botBusinessConnection](/constructor/botBusinessConnection.md) that is being used.