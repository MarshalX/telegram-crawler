# sponsoredMessage

A [sponsored message](/api/sponsored-messages.md).

```tl
sponsoredMessage#7dbf8673 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo media:flags.14?MessageMedia color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string min_display_duration:flags.15?int max_display_duration:flags.15?int = SponsoredMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **recommended** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the message needs to be labeled as "recommended" instead of "sponsored" |
| **can\_report** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether this message can be [reported as specified here »](/api/sponsored-messages.md#reporting-sponsored-messages). |
| **random\_id** | [bytes](/type/bytes.md) | Message ID. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **url** | [string](/type/string.md) | Contains the URL to open when the user clicks on the sponsored message. |
| **title** | [string](/type/string.md) | Contains the title of the sponsored message. |
| **message** | [string](/type/string.md) | Sponsored message |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) in `message`. |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Photo](/type/Photo.md) | If set, contains a custom profile photo bubble that should be displayed for the sponsored message, like for messages sent in groups. |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[MessageMedia](/type/MessageMedia.md) | If set, contains some media. |
| **color** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[PeerColor](/type/PeerColor.md) | If set, the sponsored message should use the [message accent color »](/api/colors.md) specified in `color`. |
| **button\_text** | [string](/type/string.md) | Label of the sponsored message button. |
| **sponsor\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[string](/type/string.md) | If set, contains additional information about the sponsor to be shown along with the message. |
| **additional\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[string](/type/string.md) | If set, contains additional information about the sponsored message to be shown along with the message. |
| **min\_display\_duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | For [sponsored messages to show on channel videos »](/api/sponsored-messages.md#getting-sponsored-video-advertisements), allow the user to hide the ad only after the specified amount of seconds. |
| **max\_display\_duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | For [sponsored messages to show on channel videos »](/api/sponsored-messages.md#getting-sponsored-video-advertisements), autohide the ad after after the specified amount of seconds. |

### Type
[SponsoredMessage](/type/SponsoredMessage.md)

### Related pages

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!