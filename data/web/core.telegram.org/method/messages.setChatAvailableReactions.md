# messages.setChatAvailableReactions

Change the set of [message reactions »](/api/reactions.md) that can be used in a certain group, supergroup or channel

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.setChatAvailableReactions#864b2581 flags:# peer:InputPeer available_reactions:ChatReactions reactions_limit:flags.0?int paid_enabled:flags.1?Bool = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Group where to apply changes |
| **available\_reactions** | [ChatReactions](/type/ChatReactions.md) | Allowed reaction emojis |
| **reactions\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | This flag may be used to impose a custom limit of unique reactions (i.e. a customizable version of [appConfig.reactions\_uniq\_max](/api/config.md#reactions-uniq-max)); this field and the other info set by the method will then be available to users in [channelFull](/constructor/channelFull.md) and [chatFull](/constructor/chatFull.md). \
If this flag is not set, the previously configured `reactions_limit` will not be altered. |
| **paid\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Bool](/type/Bool.md) | If this flag is set and a [Bool](/type/Bool.md) is passed, the method will enable or disable [paid message reactions »](/api/reactions.md#paid-reactions). If this flag is not set, the previously stored setting will not be changed. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 400 | LIMIT\_PER\_POST\_INVALID | The specified reactions_limit value is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | REACTION\_INVALID | The specified reaction is invalid. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [channelFull](/constructor/channelFull.md)
Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [chatFull](/constructor/chatFull.md)
Full info about a [basic group](/api/channel.md#basic-groups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Bool](/type/Bool.md)
Boolean type.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.