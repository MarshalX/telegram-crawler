# message

A message

```tl
message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **out** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Is this an outgoing message |
| **mentioned** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether we were [mentioned](/api/mentions.md) in this message |
| **media\_unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether there are unread media attachments in this message, see [here »](/api/views.md#read-message-contents) for more info on how to clear this flag. |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether this is a silent message (no notification triggered) |
| **post** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Whether this is a channel post |
| **from\_scheduled** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | Whether this is a [scheduled message](/api/scheduled-messages.md) |
| **legacy** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | This is a legacy message: it has to be refetched with the new layer |
| **edit\_hide** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[true](/constructor/true.md) | Whether the message should be shown as not modified to the user, even if an edit date is present |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | Whether this message is [pinned](/api/pin.md) |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | Whether this message is [protected](https://telegram.org/blog/content-protection-delete-by-date-and-more) and thus cannot be forwarded; clients should also prevent users from saving attached media (i.e. videos should only be streamed, photos should be kept in RAM, et cetera). |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **flags2** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **offline** | [flags2](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the message was sent because of a scheduled action by the message sender, for example, as away, or a greeting service message. |
| **video\_processing\_pending** | [flags2](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | The video contained in the message is currently being processed by the server (i.e. to generate alternative qualities, that will be contained in the final [messageMediaDocument](/constructor/messageMediaDocument.md).`alt_document`), and will be sent once the video is processed, which will happen approximately at the specified `date` (i.e. messages with this flag set should be treated similarly to [scheduled messages](/api/scheduled-messages.md), but instead of the scheduled date, `date` contains the estimated conversion date). \
See [here »](/api/files.md#video-qualities) for more info. |
| **paid\_suggested\_post\_stars** | [flags2](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Set if this is a [suggested channel post »](/api/suggested-posts.md) that was paid using [Telegram Stars](/api/stars.md). |
| **paid\_suggested\_post\_ton** | [flags2](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Set if this is a [suggested channel post »](/api/suggested-posts.md) that was paid using Grams. |
| **id** | [int](/type/int.md) | ID of the message |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[Peer](/type/Peer.md) | ID of the sender of the message |
| **from\_boosts\_applied** | [flags](/mtproto/TL-combinators.md#conditional-fields).29?[int](/type/int.md) | Supergroups only, contains the number of [boosts](/api/boost.md) this user has given the current supergroup, and should be shown in the UI in the header of the message. \
Only present for incoming messages from non-anonymous supergroup members that have boosted the supergroup. \
Note that this counter should be locally overridden for non-anonymous *outgoing* messages, according to the current value of [channelFull](/constructor/channelFull.md).`boosts_applied`, to ensure the value is correct even for messages sent by the current user before a supergroup was boosted (or after a boost has expired or the number of boosts has changed); do not update this value for incoming messages from other users, even if their boosts have changed. |
| **from\_rank** | [flags2](/mtproto/TL-combinators.md#conditional-fields).12?[string](/type/string.md) | Only in [supergroups »](/api/channel.md#supergroups) (never basic groups, where this information is contained [elsewhere »](/api/rank.md)), contains the sender's [tag »](/api/rank.md). |
| **peer\_id** | [Peer](/type/Peer.md) | Peer ID, the chat where this message was sent |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[Peer](/type/Peer.md) | Messages from a [saved messages dialog »](/api/saved-messages.md) will have `peer`=[inputPeerSelf](/constructor/inputPeerSelf.md) and the `saved_peer_id` flag set to the ID of the saved dialog.\
Messages from a [monoforum »](/api/monoforum.md) will have `peer`=ID of the monoforum and the `saved_peer_id` flag set to the ID of a topic. |
| **fwd\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[MessageFwdHeader](/type/MessageFwdHeader.md) | Info about forwarded messages |
| **via\_bot\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[long](/type/long.md) | ID of the inline bot that generated the message |
| **via\_business\_bot\_id** | [flags2](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Whether the message was sent by the [business bot](/api/bots/connected-business-bots.md) specified in `via_bot_id` on behalf of the user. |
| **guestchat\_via\_from** | [flags2](/mtproto/TL-combinators.md#conditional-fields).19?[Peer](/type/Peer.md) | If the message was posted by a [guest bot »](/api/bots/guest-mode.md#guest-messages), the peer on whose behalf the bot sent the message. |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[MessageReplyHeader](/type/MessageReplyHeader.md) | Reply information |
| **date** | [int](/type/int.md) | Date of the message |
| **message** | [string](/type/string.md) | The message |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[MessageMedia](/type/MessageMedia.md) | Media attachment |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[ReplyMarkup](/type/ReplyMarkup.md) | Reply markup (bot/inline keyboards) |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | Message [entities](/api/entities.md) for styled text |
| **views** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | View count for channel posts |
| **forwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Forward counter |
| **replies** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[MessageReplies](/type/MessageReplies.md) | Info about [post comments (for channels) or message replies (for groups)](/api/threads.md) |
| **edit\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | Last edit date of this message |
| **post\_author** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | Name of the author of this message for channel posts (with signatures enabled) |
| **grouped\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[long](/type/long.md) | Multiple media messages sent using [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) with the same grouped ID indicate an [album or media group](/api/files.md#albums-grouped-media) |
| **reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[MessageReactions](/type/MessageReactions.md) | Reactions to this message |
| **restriction\_reason** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[Vector](/type/Vector%20t)&lt;[RestrictionReason](/type/RestrictionReason.md)&gt; | Contains the reason why access to this message must be restricted. |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[int](/type/int.md) | Time To Live of the message, once message.date+message.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. |
| **quick\_reply\_shortcut\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).30?[int](/type/int.md) | If set, this message is a [quick reply shortcut message »](/api/business.md#quick-reply-shortcuts) (note that quick reply shortcut messages *sent* to a private chat will *not* have this field set). |
| **effect** | [flags2](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | A [message effect that should be played as specified here »](/api/effects.md). |
| **factcheck** | [flags2](/mtproto/TL-combinators.md#conditional-fields).3?[FactCheck](/type/FactCheck.md) | Represents a [fact-check »](/api/factcheck.md). |
| **report\_delivery\_until\_date** | [flags2](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Used for [Telegram Gateway verification messages](https://telegram.org/blog/star-messages-gateway-2-0-and-more#save-even-more-on-user-verification): if set and the current unixtime is bigger than the specified unixtime, invoke [messages.reportMessagesDelivery](/method/messages.reportMessagesDelivery.md) passing the ID and the peer of this message as soon as it is received by the client (optionally batching requests for the same peer). |
| **paid\_message\_stars** | [flags2](/mtproto/TL-combinators.md#conditional-fields).6?[long](/type/long.md) | The amount of stars the **sender** has paid to send the message, see [here »](/api/paid-messages.md) for more info. |
| **suggested\_post** | [flags2](/mtproto/TL-combinators.md#conditional-fields).7?[SuggestedPost](/type/SuggestedPost.md) | Used to [suggest a post to a channel, see here »](/api/suggested-posts.md) for more info on the full flow. |
| **schedule\_repeat\_period** | [flags2](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Once sent, this message will be automatically re-scheduled to be re-sent again this many seconds in the future, see [here »](/api/scheduled-messages.md#repeating-scheduled-messages) for more info on repeating scheduled messages. |
| **summary\_from\_language** | [flags2](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | If set, clients should offer a [summarization button »](/api/ai.md#summarize-messages) for this message; contains the two-letter ISO 639-1 language code of the inferred language of the current message. |

### Type
[Message](/type/Message.md)

### Related pages

#### [Mentions and replies](/api/mentions.md)
Telegram allows mentioning other users in case of urgent duckling matters, and quickly navigating to those mentions in order to read them as swiftly as possible.

#### [Views and read metrics](/api/views.md)
Clients should report read state, message views and music listens using a specific set of methods.

#### [Scheduled messages](/api/scheduled-messages.md)
Telegram allows scheduling messages

#### [Pinned messages](/api/pin.md)
Telegram allows pinning multiple messages on top of a specific chat.

#### [messageMediaDocument](/constructor/messageMediaDocument.md)
Document (video, audio, voice, sticker, any media type except photo)

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [channelFull](/constructor/channelFull.md)
Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Guest mode for bots](/api/bots/guest-mode.md)
Guest bots can be queried by username from **any** non-secret private chat, group and supergroup (except for groups/supergroups with [content protection &raquo;](/api/content-protection.md#for-groups-and-channels) enabled), posting their results directly into the chat, even if they're not a member.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [messages.sendMultiMedia](/method/messages.sendMultiMedia.md)
Send an [album or grouped media](/api/files.md#albums-grouped-media)

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.

#### [Fact checks](/api/factcheck.md)
Telegram clients support displaying fact-checks added to messages by independent fact-checkers.

#### [messages.reportMessagesDelivery](/method/messages.reportMessagesDelivery.md)
Used for [Telegram Gateway verification messages »](https://telegram.org/blog/star-messages-gateway-2-0-and-more#save-even-more-on-user-verification): indicate to the server that one or more [message](/constructor/message.md)s were received by the client, if requested by the [message](/constructor/message.md).**report\_delivery\_until\_date** flag or the equivalent flag in [push notifications](/api/push-updates.md).

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.