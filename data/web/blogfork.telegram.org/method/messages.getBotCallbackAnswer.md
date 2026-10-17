# messages.getBotCallbackAnswer

Press an inline callback button and get a callback answer from the bot

```tl
messages.botCallbackAnswer#36585ea4 flags:# alert:flags.1?true has_url:flags.3?true native_ui:flags.4?true message:flags.0?string url:flags.2?string cache_time:int = messages.BotCallbackAnswer;
---functions---
messages.getBotCallbackAnswer#9342ca07 flags:# game:flags.1?true peer:InputPeer msg_id:int data:flags.0?bytes password:flags.2?InputCheckPasswordSRP = messages.BotCallbackAnswer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **game** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is a "play game" button |
| **peer** | [InputPeer](/type/InputPeer.md) | Where was the inline keyboard sent |
| **msg\_id** | [int](/type/int.md) | ID of the Message with the inline keyboard |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | Callback data |
| **password** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | For buttons [requiring you to verify your identity with your 2FA password](/constructor/keyboardButtonCallback.md), the SRP payload generated using [SRP](/api/srp.md). |

### Result
[messages.BotCallbackAnswer](/type/messages.BotCallbackAnswer.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_RESPONSE\_TIMEOUT | A timeout occurred while fetching data from the bot. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | DATA\_INVALID | Encrypted data invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PASSWORD\_MISSING | You must [enable 2FA](/api/srp.md) before executing this operation. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| -503 | Timeout | Timeout while fetching data. |

### Related pages

#### [keyboardButtonCallback](/constructor/keyboardButtonCallback.md)
Callback button

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients send `data` to the bot, optionally providing the user's [2FA SRP parameters](/api/srp.md) for identity verification, as described in [callback queries](/api/bots/buttons.md#callback-queries).

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.