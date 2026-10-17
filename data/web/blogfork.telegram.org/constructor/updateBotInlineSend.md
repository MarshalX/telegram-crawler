# updateBotInlineSend

The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the [feedback collecting](/bots/inline.md#collecting-feedback) for details on how to enable these updates for your bot.

```tl
updateBotInlineSend#12f12a07 flags:# user_id:long query:string geo:flags.0?GeoPoint id:string msg_id:flags.1?InputBotInlineMessageID = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [long](/type/long.md) | The user that chose the result |
| **query** | [string](/type/string.md) | The query that was used to obtain the result |
| **geo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[GeoPoint](/type/GeoPoint.md) | Optional. Sender location, only for bots that require user location |
| **id** | [string](/type/string.md) | The unique identifier for the result that was chosen |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputBotInlineMessageID](/type/InputBotInlineMessageID.md) | Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message. |

### Type
[Update](/type/Update.md)