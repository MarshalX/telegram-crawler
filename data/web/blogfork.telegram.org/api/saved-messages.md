# Saved messages


The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.  

Internally, the Saved Messages chat is simply the private chat with ourselves (i.e. the chat with [inputPeerSelf](/constructor/inputPeerSelf.md)): the only difference between the Saved Messages chat and a chat with any other user, is that additional features are available to better organize messages and media sent to it.  

### Saved message dialogs

Schema:

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;

    savedDialog#bd87cb6c flags:# pinned:flags.2?true peer:Peer top_message:int = SavedDialog;

    updateSavedDialogPinned#aeaf9e74 flags:# pinned:flags.0?true peer:DialogPeer = Update;
    updatePinnedSavedDialogs#686c85a6 flags:# order:flags.0?Vector<DialogPeer> = Update;

    messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
    messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
    messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;

    savedDialog#bd87cb6c flags:# pinned:flags.2?true peer:Peer top_message:int = SavedDialog;

    ---functions---

    messages.getSavedDialogs#1e91fc99 flags:# exclude_pinned:flags.0?true parent_peer:flags.1?InputPeer offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.SavedDialogs;
    messages.getSavedDialogsByID#6f6f9c96 flags:# parent_peer:flags.1?InputPeer ids:Vector<InputPeer> = messages.SavedDialogs;
    messages.getSavedHistory#998ab009 flags:# parent_peer:flags.0?InputPeer peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
    messages.deleteSavedHistory#4dc5085f flags:# parent_peer:flags.0?InputPeer peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
    messages.getPinnedSavedDialogs#d63d94e0 = messages.SavedDialogs;
    messages.toggleSavedDialogPin#ac81bbde flags:# pinned:flags.0?true peer:InputDialogPeer = Bool;
    messages.reorderPinnedSavedDialogs#8b716587 flags:# force:flags.0?true order:Vector<InputDialogPeer> = Bool;

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
    messages.getSearchCounters#1bbcf300 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer top_msg_id:flags.0?int filters:Vector<MessagesFilter> = Vector<messages.SearchCounter>;
    messages.getSearchResultsCalendar#6aa3f6bd flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int offset_date:int = messages.SearchResultsCalendar;
    messages.getSearchResultsPositions#9c7f2f10 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int limit:int = messages.SearchResultsPositions;

Messages sent and forwarded from various users (including ourselves) to Saved Messages are automatically categorized by their original dialog into a saved dialog list, quite similar to the normal dialog list used to normally interact with chats.  

To add new dialogs to the normal dialog list a user has to write to them (or join a channel/chat, etc.).  
To add new dialogs to the saved dialog list, simply forward messages from any normal dialog to [inputPeerSelf](/constructor/inputPeerSelf.md) (the current user): the forwarded messages (including outgoing ones) will be added to a saved dialog with the same ID of the original dialog.

This includes outgoing messages, for example assume the following:

* Our user `id` is equal to `11111111`
* We send a message A with ID `10` to a [supergroup](/api/channel.md) with `id=-100122222222` (bot API format, equivalent to a [peerChannel](/constructor/peerChannel.md) with ID `122222222`) 
* Another user with `id=133333333` replies `B` to our previous message, message ID `11`
* We forward both messages `A` and `B` with IDs `10` and `11` to [inputPeerSelf](/constructor/inputPeerSelf.md), which will:
  * Create a new [savedDialog](/constructor/savedDialog.md) with `peer=-100122222222` (if it doesn't exist already because we already forwarded messages from that supergroup)
  * Generate two messages:
    * Message `A`:
      * `id`: an unrelated message ID, the next one in the common ID sequence, for example `1234`
      * `peer_id`: `11111111`
      * `saved_peer_id`: `-100122222222`
      * `fwd_from.from_id`: `11111111`
      * `fwd_from.saved_from_peer`: `-100122222222`
      * `fwd_from.saved_from_msg_id`: `10`
    * Message `B`:
      * `id`: an unrelated message ID, the next one in the common ID sequence, for example `1235`
      * `reply_to.reply_to_msg_id`: `1234`
      * `peer_id`: `11111111`
      * `saved_peer_id`: `-100122222222`
      * `fwd_from.from_id`: `133333333`
      * `fwd_from.saved_from_peer`: `-100122222222`
      * `fwd_from.saved_from_msg_id`: `11`

Saving messages from private chats with users with forward privacy enabled will add them to a saved dialog entry of a special anonymous user with `id=2666000`.  

Clients may use the following pseudocode to manually populate the `saved_peer_id` of old `layer < 170` [message](/constructor/message.md)s stored in the **local** database.  

```
// user_id is the ID of the current user.

if (message.peer_id == user_id) {
  if (message.fwd_from.saved_from_peer) {
    message.saved_peer_id = message.fwd_from.saved_from_peer
  } elseif (message.fwd_from.from_id) {
    message.saved_peer_id = user_id;
  } elseif (message.fwd_from.from_name) {
    message.saved_peer_id = 2666000;
  } else {
    message.saved_peer_id = user_id;
  }
}
```

Sending (not forwarding from another dialog) new messages directly to ourselves will add them to a saved dialog entry with ourselves.  

**Note**: the `saved_peer_id` field of messages is also used to implement a distinct feature, [direct channel messages &raquo;](/api/monoforum.md): in this case, the `peer_id` will be equal to the ID of the direct channel messages monoforum.  

A set of methods can then be used to obtain this dialog list, pin/unpin dialogs inside of it, view and remove messages from saved dialogs: [messages.getSavedDialogs](/method/messages.getSavedDialogs.md), [messages.getSavedDialogsByID](/method/messages.getSavedDialogsByID.md), [messages.getSavedHistory](/method/messages.getSavedHistory.md), [messages.deleteSavedHistory](/method/messages.deleteSavedHistory.md), [messages.getPinnedSavedDialogs](/method/messages.getPinnedSavedDialogs.md), [messages.toggleSavedDialogPin](/method/messages.toggleSavedDialogPin.md), [messages.reorderPinnedSavedDialogs](/method/messages.reorderPinnedSavedDialogs.md) work just like their counterparts [messages.getDialogs](/method/messages.getDialogs.md), [messages.getHistory](/method/messages.getHistory.md), [messages.deleteHistory](/method/messages.deleteHistory.md), [messages.getPinnedDialogs](/method/messages.getPinnedDialogs.md), [messages.toggleDialogPin](/method/messages.toggleDialogPin.md), [messages.reorderPinnedDialogs](/method/messages.reorderPinnedDialogs.md), with the sole difference that they affect the saved dialog list, instead of the main dialog list.  

Some of the methods listed above have an optional `parent_peer` parameter, which should only be populated when working with [monoforums](/api/monoforum.md), not when working with saved messages.  

To search for messages within a saved dialog, use the usual [messages.search](/method/messages.search.md), [messages.getSearchCounters](/method/messages.getSearchCounters.md), [messages.getSearchResultsCalendar](/method/messages.getSearchResultsCalendar.md), [messages.getSearchResultsPositions](/method/messages.getSearchResultsPositions.md) methods with `peer`=[inputPeerSelf](/constructor/inputPeerSelf.md) and `saved_peer_id`=id of the saved dialog.  

The API also offers a [messages.readSavedHistory](/method/messages.readSavedHistory.md) method, but unlike what the name suggests, it can only be used for [monoforum](/api/monoforum.md) topics.  

### Tags

For even more organization, [Premium users](/api/premium.md) can add **multiple tags** to your Saved Messages that let you quickly **filter** them in Search.

    messageReactions#a339f0b flags:# min:flags.0?true can_see_list:flags.2?true reactions_as_tags:flags.3?true results:Vector<ReactionCount> recent_reactions:flags.1?Vector<MessagePeerReaction> top_reactors:flags.4?Vector<MessageReactor> = MessageReactions;

    savedReactionTag#cb6ff828 flags:# reaction:Reaction title:flags.0?string count:int = SavedReactionTag;

    messages.savedReactionTagsNotModified#889b59ef = messages.SavedReactionTags;
    messages.savedReactionTags#3259950a tags:Vector<SavedReactionTag> hash:long = messages.SavedReactionTags;

    updateSavedReactionTags#39c67432 = Update;

    ---functions---
    
    messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

    messages.getDefaultTagReactions#bdf93428 hash:long = messages.Reactions;

    messages.updateSavedReactionTag#60297dec flags:# reaction:Reaction title:flags.0?string = Bool;
    messages.getSavedReactionTags#3637e05b flags:# peer:flags.0?InputPeer hash:long = messages.SavedReactionTags;

Tags are based on [reactions&nbsp;&raquo;](/api/reactions.md): adding a tag to a saved message is as easy as [reacting to it&nbsp;&raquo;](/api/reactions.md) using [messages.sendReaction](/method/messages.sendReaction.md).  

Reactions are considered as tags only for saved messages, if the following conditions are met:

- The saved message did not previously have any reaction,
- OR if the saved message already has some reactions *and* the [messageReactions](/constructor/messageReactions.md).`reactions_as_tags` flag is set.  
  If the `reactions_as_tags` flag is not set on a saved message with at least one reaction, the reaction was added before tags were introduced (before layer 171).  In this case, to enable adding reaction tags, the user must first remove all existing reactions on the message, and then re-add the appropriate reaction tags.  

You may search for saved messages tagged with one or more reactions using the `saved_reaction` parameter of [messages.search](/method/messages.search.md).  

[messages.getDefaultTagReactions](/method/messages.getDefaultTagReactions.md) can be used to fetch a default recommended list of tag reactions.  

The user may also assign a name (max 12 UTF-8 chars) to a tag reaction using [messages.updateSavedReactionTag](/method/messages.updateSavedReactionTag.md); to remove the name, call the same method without setting the `title` flag.  

[messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) can be used to fetch and locally cache the full list of reaction tag names assigned by the user; a `peer` may be optionally specified, to fetch only reaction tags used on messages of a specific [saved message dialog](#saved-message-dialogs).  
Updating the name of a reaction tag will emit an [updateSavedReactionTags](/constructor/updateSavedReactionTags.md) update to all logged-in sessions except for the current one; this update should trigger a call to [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) *without* setting the `peer` flag to refresh the locally cached list.  

The client that updated the reaction tag won't get an [updateSavedReactionTags](/constructor/updateSavedReactionTags.md): in this case, the client can choose to manually invoke [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) every time it updates the reaction tags, or, to avoid making the extra call, it can choose to manually update the cached list, in this case the `hash` should be regenerated using the following algorithm:

```
string remove_emoji_selectors(string emoji) {
  string str;
  for (i = 0; i < len(emoji); i++) {
    if (i + 3 <= len(emoji) && emoji[i] == '\xEF' && emoji[i + 1] == '\xB8' && emoji[i + 2] == '\x8F') {
      // skip \uFE0F
      i += 2;
    } else {
      str += emoji[i];
    }
  }
  return str;
}

uint64 get_md5_string_hash(string str) {
  // Binary md5 hash, not hex
  string hash = md5(str);

  uint64 result = 0;
  for (int i = 0; i <= 7; i++) {
    result += ((uint64)hash[i]) << (56 - 8 * i);
  }
  return result;
}

vector<uint64> numbers = [];

// tags is an array of savedReactionTag constructors
foreach (tags as tag) {
  if tag.reaction instanceof reactionEmoji {
    numbers.append(get_md5_string_hash(remove_emoji_selectors(tag.reaction.emoticon)))
  } else if reaction instanceof reactionCustomEmoji {
    numbers.append(tag.reaction.document_id)
  }
  if (len(tag.title) > 0) {
    numbers.append(get_md5_string_hash(tag.title));
  }
  numbers.append(tag.count);
}
```

The generated list of 64-bit integers must then be passed to the [usual hashing algorithm](/api/offsets.md#hash-generation).  

If non-empty, the list of saved reaction tags returned by [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) should be shown in the UI just below the search input bar, in descending order by `count`; if searching within a specific [saved message dialog](#saved-message-dialogs), use `peer` to only return tags used in a specific saved message dialog.  

The tag reaction selection UI, on the other hand, should first display the reactions returned by [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) (global tag list, i.e. without `peer` regardless of the current saved message dialog) in descending order by `count`, then the reactions returned by [messages.getDefaultTagReactions](/method/messages.getDefaultTagReactions.md) that weren't already returned by [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md), then any installed [custom emoji packs](/api/custom-emoji.md).  