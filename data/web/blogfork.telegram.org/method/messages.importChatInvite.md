# messages.importChatInvite

Import a chat invite and join a private chat/supergroup/channel

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.importChatInvite#6c50051c hash:string = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [string](/type/string.md) | `hash` from a [chat invite deep link](/api/links.md#chat-invite-links) |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNELS\_TOO\_MUCH | You have joined too many channels/supergroups. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_INVALID | Invalid chat. |
| 400 | INVITE\_HASH\_EMPTY | The invite hash is empty. |
| 406 | INVITE\_HASH\_EXPIRED | The invite link has expired. |
| 400 | INVITE\_HASH\_INVALID | The invite hash is invalid. |
| 400 | INVITE\_REQUEST\_SENT | You have successfully requested to join this chat or channel. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STARS\_PAYMENT\_REQUIRED | To import this chat invite link, you must first [pay for the associated Telegram Star subscription&nbsp;&raquo;](/api/subscriptions.md#channel-subscriptions). |
| 400 | USERS\_TOO\_MUCH | The maximum number of users has been exceeded (to create a chat, for example). |
| 400 | USER\_ALREADY\_PARTICIPANT | The user is already in the group. |
| 400 | USER\_CHANNELS\_TOO\_MUCH | One of the users you tried to add is already in too many channels/supergroups. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Star subscriptions](/api/subscriptions.md)
Bots and channels may create subscriptions, periodically charging users a certain amount of Telegram Stars in exchange for content and services.