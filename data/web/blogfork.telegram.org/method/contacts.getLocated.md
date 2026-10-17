# contacts.getLocated

Get users and geochats near you, see [here »](/api/nearby.md) for more info.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
contacts.getLocated#d348bc44 flags:# background:flags.1?true geo_point:InputGeoPoint self_expires:flags.0?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **background** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | While the geolocation of the current user is public, clients should update it in the background every half-an-hour or so, while setting this flag. \
Do this only if the new location is more than 1 KM away from the previous one, or if the previous location is unknown. |
| **geo\_point** | [InputGeoPoint](/type/InputGeoPoint.md) | Geolocation |
| **self\_expires** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, the geolocation of the current user will be public for the specified number of seconds; pass 0x7fffffff to disable expiry, 0 to make the current geolocation private; if the flag isn't set, no changes will be applied. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | BUSINESS\_ADDRESS\_ACTIVE | The user is currently advertising a [Business Location](/api/business.md#location), the location may only be changed (or removed) using [account.updateBusinessLocation&nbsp;&raquo;](/method/account.updateBusinessLocation.md).  . |
| 400 | GEO\_POINT\_INVALID | Invalid geoposition provided. |
| 406 | USERPIC\_PRIVACY\_REQUIRED | You need to disable privacy settings for your profile picture in order to make your geolocation public. |
| 406 | USERPIC\_UPLOAD\_REQUIRED | You must have a profile picture to publish your geolocation. |

### Related pages

#### [Nearby users&chats](/api/nearby.md)
How to work with geolocation-based features like geochats and the nearby users feature.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [account.updateBusinessLocation](/method/account.updateBusinessLocation.md)
[Businesses »](/api/business.md#location) may advertise their location using this method, see [here »](/api/business.md#location) for more info.

To remove business location information invoke the method without setting any of the parameters.