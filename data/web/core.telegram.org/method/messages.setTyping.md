# messages.setTyping

Sends a current user typing event (see [SendMessageAction](/type/SendMessageAction.md) for all event types) to a conversation partner or group.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setTyping#58943ee2 flags:# peer:InputPeer top_msg_id:flags.0?int action:SendMessageAction = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Target user or group |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Topic ID](/api/threads.md) |
| **action** | [SendMessageAction](/type/SendMessageAction.md) | Type of action |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | BUSINESS\_PEER\_INVALID | Messages can't be set to the specified peer through the current [business connection](/api/business.md#connected-bots). |
| 400 | BUSINESS\_PEER\_USAGE\_MISSING | You cannot send a message to a user through a [business connection](/api/business.md#connected-bots) if the user hasn't recently contacted us. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 403 | GROUPCALL\_FORBIDDEN | The specified group call cannot be used in this context. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 406 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TEXTDRAFT\_PEER\_INVALID | sendMessageTextDraftAction can only be used in private 1-on-1 chats. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |
| 400 | USER\_IS\_BOT | Bots can't send messages to other bots. |

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [SendMessageAction](/type/SendMessageAction.md)
User actions. Use this to provide users with detailed info about their chat partner's actions: typing or sending attachments of all kinds.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.