# messages.editMessage

Edit message

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.editMessage#51e842e1 flags:# no_webpage:flags.1?true invert_media:flags.16?true peer:InputPeer id:int message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.15?int schedule_repeat_period:flags.18?int quick_reply_shortcut_id:flags.17?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_webpage** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Disable webpage preview |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **peer** | [InputPeer](/type/InputPeer.md) | Where was the message sent |
| **id** | [int](/type/int.md) | ID of the message to edit |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | New message |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[InputMedia](/type/InputMedia.md) | New attached media |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Reply markup for inline keyboards |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | Scheduled message date for [scheduled messages](/api/scheduled-messages.md) |
| **schedule\_repeat\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[int](/type/int.md) | Once sent, this message will be automatically re-scheduled to be re-sent again this many seconds in the future, see [here »](/api/scheduled-messages.md#repeating-scheduled-messages) for more info on repeating scheduled messages. |
| **quick\_reply\_shortcut\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[int](/type/int.md) | If specified, edits a [quick reply shortcut message, instead »](/api/business.md#quick-reply-shortcuts). |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_DOMAIN\_INVALID | Bot domain invalid. |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | BUSINESS\_PEER\_INVALID | Messages can't be set to the specified peer through the current [business connection](/api/business.md#connected-bots). |
| 400 | BUTTON\_COPY\_TEXT\_INVALID | The specified [keyboardButtonCopy](/constructor/keyboardButtonCopy.md).`copy_text` is invalid. |
| 400 | BUTTON\_DATA\_INVALID | The data of one or more of the buttons you provided is invalid. |
| 400 | BUTTON\_TYPE\_INVALID | The type of one or more of the buttons you provided is invalid. |
| 400 | BUTTON\_URL\_INVALID | Button URL invalid. |
| 400 | BUTTON\_USER\_PRIVACY\_RESTRICTED | The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](/constructor/inputKeyboardButtonUserProfile.md) button do not allow creating such a button. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_FORWARDS\_RESTRICTED | You can't forward messages from a protected chat. |
| 403 | CHAT\_SEND\_GIFS\_FORBIDDEN | You can't send gifs in this chat. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 406 | EDIT\_MESSAGE\_TEMP\_RESTRICTED | Message editing is temporarily forbidden for this user due to regulatory restrictions. |
| 400 | ENTITIES\_TOO\_LONG | You provided too many styled message entities. |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | FILE\_PARTS\_INVALID | The number of file parts is invalid. |
| 400 | IMAGE\_PROCESS\_FAILED | Failure while processing image. |
| 403 | INLINE\_BOT\_REQUIRED | Only the inline bot can edit message. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MEDIA\_CAPTION\_TOO\_LONG | The caption is too long. |
| 400 | MEDIA\_EMPTY | The provided media object is invalid. |
| 400 | MEDIA\_GROUPED\_INVALID | You tried to send media of different types in an album. |
| 400 | MEDIA\_INVALID | Media invalid. |
| 400 | MEDIA\_NEW\_INVALID | The new media is invalid. |
| 400 | MEDIA\_PREV\_INVALID | Previous media invalid. |
| 400 | MEDIA\_TTL\_INVALID | The specified media TTL is invalid. |
| 403 | MESSAGE\_AUTHOR\_REQUIRED | Message author required. |
| 400 | MESSAGE\_EDIT\_TIME\_EXPIRED | You can't edit this message anymore, too much time has passed since its creation. |
| 400 | MESSAGE\_EMPTY | The provided message is empty. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MESSAGE\_NOT\_MODIFIED | The provided message data is identical to the previous message data, the message wasn't modified. |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 500 | MSG\_WAIT\_FAILED | A waiting call returned an error. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PEER\_TYPES\_INVALID | The passed [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md).`peer_types` field is invalid. |
| 400 | PHOTO\_EXT\_INVALID | The extension of the photo is invalid. |
| 400 | PHOTO\_INVALID\_DIMENSIONS | The photo dimensions are invalid. |
| 400 | PHOTO\_SAVE\_FILE\_INVALID | Internal issues, try again later. |
| 400 | REPLY\_MARKUP\_INVALID | The provided reply markup is invalid. |
| 400 | REPLY\_MARKUP\_TOO\_LONG | The specified reply_markup is too long. |
| 400 | SCHEDULE\_DATE\_INVALID | Invalid schedule date provided. |
| 400 | TODO\_ITEMS\_EMPTY | A checklist was specified, but no [checklist items](/api/todo.md) were passed. |
| 400 | TODO\_ITEM\_DUPLICATE | Duplicate [checklist items](/api/todo.md) detected. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | WEBPAGE\_NOT\_FOUND | A preview for the specified webpage `url` could not be generated. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Scheduled messages](/api/scheduled-messages.md)
Telegram allows scheduling messages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [keyboardButtonCopy](/constructor/keyboardButtonCopy.md)
Clipboard button

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must copy `copy_text` to the clipboard.

#### [inputKeyboardButtonUserProfile](/constructor/inputKeyboardButtonUserProfile.md)
Button that links directly to a user profile

Use this constructor to send a [keyboardButtonUserProfile](/constructor/keyboardButtonUserProfile.md) button in an [inline keyboard](/bots/features.md#inline-keyboards).

#### [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md)
Button to switch the user to inline mode

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must insert the bot's username and `query` into the chat input field, triggering an [inline query](/api/bots/inline.md).

If `same_peer` is set, clients use the current chat. Otherwise, clients prompt the user to select a chat, filtered by `peer_types` if specified.

#### [Checklists and to-do lists](/api/todo.md)
Premium users can now create collaborative checklists in any chat to track tasks and coordinate teams — or manage shopping and to-do lists.