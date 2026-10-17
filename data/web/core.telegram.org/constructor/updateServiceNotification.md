# updateServiceNotification

A service message for the user.

The app must show the message to the user upon receiving this update. In case the **popup** parameter was passed, the text message must be displayed in a popup alert immediately upon receipt. It is recommended to handle the text as you would an ordinary message in terms of highlighting links, etc. The message must also be stored locally as part of the message history with the user id `777000` (Telegram Notifications).

```tl
updateServiceNotification#ebe46819 flags:# popup:flags.0?true invert_media:flags.2?true inbox_date:flags.1?int type:string message:string media:MessageMedia entities:Vector<MessageEntity> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **popup** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the message must be displayed in a popup. |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **inbox\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | When was the notification received\
The message must also be stored locally as part of the message history with the user id `777000` (Telegram Notifications). |
| **type** | [string](/type/string.md) | String, identical in format and contents to the [**type**](/api/errors.md#error-type) field in API errors. Describes type of service message. It is acceptable to ignore repeated messages of the same **type** within a short period of time (15 minutes). |
| **message** | [string](/type/string.md) | Message text |
| **media** | [MessageMedia](/type/MessageMedia.md) | Media content (optional) |
| **entities** | [Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Error handling ](/api/errors.md)
How to handle API return errors correctly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities