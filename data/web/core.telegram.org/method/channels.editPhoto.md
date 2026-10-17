# channels.editPhoto

Change the photo of a [channel/supergroup](/api/channel.md)

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
channels.editPhoto#f12e57c9 channel:InputChannel photo:InputChatPhoto = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel/supergroup whose photo should be edited |
| **photo** | [InputChatPhoto](/type/InputChatPhoto.md) | New photo |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_INVALID | Invalid chat. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | FILE\_PARTS\_INVALID | The number of file parts is invalid. |
| 400 | FILE\_REFERENCE\_INVALID | The specified [file reference](/api/file-references.md) is invalid. |
| 400 | IMAGE\_PROCESS\_FAILED | Failure while processing image. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PHOTO\_CROP\_SIZE\_SMALL | Photo is too small. |
| 400 | PHOTO\_EXT\_INVALID | The extension of the photo is invalid. |
| 400 | PHOTO\_FILE\_MISSING | Profile photo file missing. |
| 400 | PHOTO\_INVALID | Photo invalid. |
| 400 | STICKER\_MIME\_INVALID | The specified sticker MIME type is invalid. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [File references](/api/file-references.md)
How to handle file references.