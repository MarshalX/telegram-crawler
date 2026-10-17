# Takeout API


<!-- ref: 57411b962f2192b288641dccdf842a3b1b59f5ef -->

Telegram's API allows users to export all of their information through the takeout API.

    account.takeout#4dba4501 id:long = account.Takeout;

    inputTakeoutFileLocation#29be5899 = InputFileLocation;

    ---functions---
    
    account.initTakeoutSession#8ef3eab0 flags:# contacts:flags.0?true message_users:flags.1?true message_chats:flags.2?true message_megagroups:flags.3?true message_channels:flags.4?true files:flags.5?true file_max_size:flags.5?long = account.Takeout;

    invokeWithTakeout#aca9fd2e {X:Type} takeout_id:long query:!X = X;
    
    account.finishTakeoutSession#1d2652ee flags:# success:flags.0?true = Bool;

Use [account.initTakeoutSession](/method/account.initTakeoutSession.md) to initialize a takeout session: pass the appropriate flags to enable usage of the corresponding methods, as described below.  

When invoking the methods described below, each query must be wrapped using [invokeWithTakeout](/method/invokeWithTakeout.md), with the `id` returned by [account.initTakeoutSession](/method/account.initTakeoutSession.md).  

After finishing the export, terminate the session using [account.finishTakeoutSession](/method/account.finishTakeoutSession.md) (wrapping it in an [invokeWithTakeout](/method/invokeWithTakeout.md) as usual).  

### Session flags

The flags passed to [account.initTakeoutSession](/method/account.initTakeoutSession.md) must enable exactly the data the user chose to export:

* `contacts` => the user wants to export their [contact list](#contacts).
* `message_users` => the user wants to export messages from private chats with users and/or bots.
* `message_chats` => the user wants to export messages from basic groups ([chat](/constructor/chat.md)s).
* `message_megagroups` => the user wants to export messages from supergroups; also set this flag together with `message_chats` when exporting basic group messages, to fetch messages of supergroups [migrated](#left-channels) from a basic group.
* `message_channels` => the user wants to export messages from channels.
* `files` => the user wants to download media: set it if any media type is to be downloaded with a non-zero per-file size limit, or if [profile pictures](#profile-pictures) or [stories](#stories) are to be exported.
* `file_max_size` => the maximum size in bytes of files to download, always populated when `files` is populated.

Before starting, invoke [users.getUsers](/method/users.getUsers.md) with [inputUserSelf](/constructor/inputUserSelf.md) to fetch the current user's ID: it is used to tell apart incoming and outgoing messages, and to export [only the user's own messages](#chats-groups-and-channels) when requested.  

To complete an export, invoke [account.finishTakeoutSession](/method/account.finishTakeoutSession.md) with the `success` flag set.  
When aborting an export, invoke [account.finishTakeoutSession](/method/account.finishTakeoutSession.md) without setting the `success` flag.  

### Procedure

Example implementation: [tdesktop](https://github.com/telegramdesktop/tdesktop/tree/dev/Telegram/SourceFiles/export).  

Here's an overview of the steps required to export account information.  

All requests must be wrapped in an [invokeWithTakeout](/method/invokeWithTakeout.md) constructor, including [upload.getFile](/method/upload.getFile.md) calls to save files.  

### Chats, groups and channels

#### Split ranges

    messageRange#ae30253 min_id:int max_id:int = MessageRange;

    ---functions---

    messages.getSplitRanges#1cff7e08 = Vector<MessageRange>;

    invokeWithMessagesRange#365275f2 {X:Type} range:MessageRange query:!X = X;

**Only** [private chat, basic group, supergroup and channel exports &raquo;](#dialog-and-message-export) require pagination using message ranges.  

First of all, obtain a list of message ranges by invoking [messages.getSplitRanges](/method/messages.getSplitRanges.md) (wrapping it in an [invokeWithTakeout](/method/invokeWithTakeout.md) as usual).  

Then, when invoking [messages.getDialogs](/method/messages.getDialogs.md), [messages.getHistory](/method/messages.getHistory.md) and [messages.getMessages](/method/messages.getMessages.md) as specified [below](#dialog-and-message-export), wrap the method using [invokeWithMessagesRange](/method/invokeWithMessagesRange.md), before also wrapping it in an [invokeWithTakeout](/method/invokeWithTakeout.md) as usual.  

Start by passing the first message range; continue passing the same message range while paginating using the [usual `offset_*`, `limit`, etc parameters&nbsp;&raquo;](/api/offsets.md); once there are no more results left, switch to the next message range, re-starting `offset_*`, `limit` pagination from the beginning.  
Repeat until you've finished all the message ranges that were returned by [messages.getSplitRanges](/method/messages.getSplitRanges.md).  

If the selected chat types are limited to public supergroups and channels, i.e. they do not include private chats with users, bot chats or basic groups, it is enough to use only the last returned message range for dialog and message pagination.  

#### Dialog and message export

    ---functions---

    messages.getDialogs#a0f4cb4f flags:# exclude_pinned:flags.0?true folder_id:flags.1?int offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.Dialogs;

    messages.getHistory#4423e6c5 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

If the user wants to download messages from private chats, basic groups, supergroups or channels, first fetch and save the dialog list using [split ranges](#split-ranges) and [messages.getDialogs](/method/messages.getDialogs.md); at the beginning of each used split range, make an initial request with all offsets set to `0` and `limit=1` to fetch total dialog `count` to display a proper progress bar.  

[Request and save info about left channels and supergroups](#left-channels) if the user wants to export channel and group messages.  

For every dialog returned by [messages.getDialogs](/method/messages.getDialogs.md), remember the message range used for the request that returned it; if the same dialog is returned in multiple ranges, keep all of those ranges.  
For all dialogs matching the dialog types chosen by the user, download all messages using [messages.getHistory](/method/messages.getHistory.md), wrapped in each remembered [split range](#split-ranges); for each such range, make an initial request with all offsets set to `0` and `limit=1` to fetch the initial message count to display a proper progress bar.  
Use the single message returned by the initial `limit=1` request to also skip ranges that don't have any messages, because an empty `messages` vector or a single [messageEmpty](/constructor/messageEmpty.md) is returned.  
If the user also chose to download only messages within a specific date interval, skip ranges whose:

* Last message (returned by that same initial `limit=1` call) has a `date` bigger than the top of the specified date interval.
* First message (returned by a new call to [messages.getHistory](/method/messages.getHistory.md) with `limit=1`, `offset_id=1`, `add_offset=-1`) has a `date` smaller than the bottom of the specified date interval.   

For each downloaded and saved message, also download and save all attached media, including [custom emojis](#custom-emojis) present in messages and captions, respecting the per-file download file size limits imposed by the user.  
Messages belonging to [forum topics](#forum-topics) may be fetched separately, topic by topic.  

If the user chose to download only their own messages, not messages sent by other users, use [messages.search](/method/messages.search.md) instead of [messages.getHistory](/method/messages.getHistory.md): set `peer` to the chat being exported and `from_id` to [inputPeerSelf](/constructor/inputPeerSelf.md) (for [monoforums&nbsp;&raquo;](/api/monoforum.md), set `from_id` to the [linked broadcast channel&nbsp;&raquo;](/api/monoforum.md) instead).  
If a [messages.getHistory](/method/messages.getHistory.md) call fails with a `CHANNEL_PRIVATE` error (for example because the user left or was removed from the channel), switch to the `from_id` [messages.search](/method/messages.search.md) variant to fetch the user's own messages.  

### Stories

    ---functions---

    stories.getStoriesArchive#b4352016 peer:InputPeer offset_id:int limit:int = stories.Stories;

If the user wants to export their [stories&nbsp;&raquo;](/api/stories.md), use [stories.getStoriesArchive](/method/stories.getStoriesArchive.md) with [inputPeerSelf](/constructor/inputPeerSelf.md) to fetch, download and store all posted stories.  
Paginate by passing the `id` of the last fetched story as the `offset_id` of the next request, with `limit=100`, until an empty page is returned; the `count` field indicates the total number of stories, for displaying a progress bar.  

### Personal info

    ---functions---

    users.getFullUser#b60f5918 id:InputUser = users.UserFull;

If the user wants to export personal info, invoke and store the result of [users.getFullUser](/method/users.getFullUser.md) with [inputUserSelf](/constructor/inputUserSelf.md).  

### Profile pictures

    ---functions---

    photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;

If the user wants to export their own profile pictures, invoke [photos.getUserPhotos](/method/photos.getUserPhotos.md) with [inputUserSelf](/constructor/inputUserSelf.md) to fetch the list of and download all profile pictures.  
Paginate by passing the `id` of the last fetched photo as the `max_id` of the next request, with `offset=0` and `limit=100`, until an empty page is returned; the `count` field of [photos.photosSlice](/constructor/photos.photosSlice.md) indicates the total number of photos.  

### Sessions

    ---functions---

    account.getAuthorizations#e320c158 = account.Authorizations;

    account.getWebAuthorizations#182e6d6f = account.WebAuthorizations;

If the user wants to export their sessions, invoke and store the result of [account.getAuthorizations](/method/account.getAuthorizations.md) and [account.getWebAuthorizations](/method/account.getWebAuthorizations.md).  

See [here&nbsp;&raquo;](#downloading-files) for more info on how to download all media and files referenced by the exported data.  

### Contacts

    savedPhoneContact#1142bd56 phone:string first_name:string last_name:string date:int = SavedContact;

    ---functions---

    contacts.getSaved#82f1e39f = Vector<SavedContact>;

Use [contacts.getSaved](/method/contacts.getSaved.md) to export the full contact list, see [here&nbsp;&raquo;](/api/contacts.md#fetching-the-contact-list) for another alternative method that may be used to fetch the full list of all contacts with a Telegram account, without using a takeout session.

Optionally, the phone number of each saved contact may be resolved to a user ID using [contacts.resolvePhone](/method/contacts.resolvePhone.md).  

Then, also export the user's top peers by invoking [contacts.getTopPeers](/method/contacts.getTopPeers.md) with the `correspondents`, `bots_inline` and `phone_calls` flags set, paginating with `offset` and `limit=100` (`hash=0`) until, for every returned [topPeerCategoryPeers](/constructor/topPeerCategoryPeers.md) category, `offset + len(peers) >= count` (i.e. all categories are fully loaded).  
A [contacts.topPeersDisabled](/constructor/contacts.topPeersDisabled.md) result indicates there is nothing more to fetch.  

### Left channels

    messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
    messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;

    ---functions---

    channels.getLeftChannels#8341ecc0 offset:int = messages.Chats;

Use [channels.getLeftChannels](/method/channels.getLeftChannels.md) to get a list of channels or supergroups we left, paginating with `offset` (incremented by the number of returned [chat](/constructor/chat.md)s) until [messages.chats](/constructor/messages.chats.md) is returned or until an empty [messages.chatsSlice](/constructor/messages.chatsSlice.md) page is returned; the `count` field of [messages.chatsSlice](/constructor/messages.chatsSlice.md) indicates the total number of left channels.  

When exporting group messages, a supergroup that was [migrated&nbsp;&raquo;](/api/channel.md) from a basic group also carries the history of the original basic group: a supergroup [channel](/constructor/channel.md) with a `migrated_from_chat_id` should have the messages of that basic group appended to it, and the corresponding standalone basic group should be skipped to avoid duplicating the history.  

### Profile music

    document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;

    users.savedMusic#34a2f297 count:int documents:Vector<Document> = users.SavedMusic;
    users.savedMusicNotModified#e3878aa4 count:int = users.SavedMusic;

    ---functions---

    users.getSavedMusic#788d7fe3 id:InputUser offset:int limit:int hash:long = users.SavedMusic;

Use [users.getSavedMusic](/method/users.getSavedMusic.md) with [inputUserSelf](/constructor/inputUserSelf.md) to fetch the list of music documents the user pinned to their profile; export only the returned audio documents and their thumbnails.  
Paginate using `offset`, `limit=100` and `hash=0`.  
Stop when fewer than `limit` documents are returned.  

### Forum topics

    ---functions---

    channels.getMessages#ad8c9a23 channel:InputChannel id:Vector<InputMessage> = messages.Messages;

    messages.getReplies#22ddd30c peer:InputPeer msg_id:int offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

Messages of a [forum topic&nbsp;&raquo;](/api/forum.md) can be exported separately from the rest of the supergroup history.  

First, fetch the topic's root message by invoking [channels.getMessages](/method/channels.getMessages.md) passing an [inputMessageID](/constructor/inputMessageID.md) with the topic's root message ID.  

Then, fetch all replies in the topic using [messages.getReplies](/method/messages.getReplies.md), passing the topic's root message ID as `msg_id`; make an initial request with `offset_id=0`, `add_offset=0`, `limit=100` to obtain the total `count`, then paginate by setting `offset_id` to the ID of the last fetched message plus one, with `add_offset=-100` and `limit=100`, until an empty page is returned or the total `count` of messages is reached.  

Download and save the media and [custom emojis](#custom-emojis) of each topic message as for normal messages.  

### Custom emojis

    ---functions---

    messages.getCustomEmojiDocuments#d9ab0f54 document_id:Vector<long> = Vector<Document>;

Messages, captions and [reactions&nbsp;&raquo;](/api/reactions.md) may contain [custom emojis&nbsp;&raquo;](/api/custom-emoji.md), referenced only by their document ID through [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md) entities and [reactionCustomEmoji](/constructor/reactionCustomEmoji.md) reactions.  

Collect all referenced custom emoji document IDs and resolve them to [document](/constructor/document.md)s by invoking [messages.getCustomEmojiDocuments](/method/messages.getCustomEmojiDocuments.md) (at most 100 IDs per request), then download and store each resolved document as a file alongside the message.  
Document IDs that cannot be resolved (not returned by the method, or for which the request fails) should be treated as unavailable.  

### Downloading files

    ---functions---

    upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;

All media — message attachments, profile pictures, stories, profile music, custom emojis and thumbnails — is downloaded using [upload.getFile](/method/upload.getFile.md), wrapped in [invokeWithTakeout](/method/invokeWithTakeout.md) like every other request and sent to the appropriate media DC.  

Download files, respecting the per-file size limit chosen by the user, skipping files bigger than the limit.  

Handle the following errors:

* `TAKEOUT_FILE_EMPTY` => returned for the [inputTakeoutFileLocation](/constructor/inputTakeoutFileLocation.md) JSON dump (see [below](#other-data)) when there is no additional data to export: treat the file as empty.
* `LOCATION_INVALID`, `VERSION_INVALID`, `LOCATION_NOT_AVAILABLE` => the file is no longer available, skip it.
* `FILE_REFERENCE_*` (a `400` error whose type starts with `FILE_REFERENCE_`) => the [file reference&nbsp;&raquo;](/api/file-references.md) expired and must be refreshed by re-fetching the source object, then the [upload.getFile](/method/upload.getFile.md) call must be retried from the same `offset` with the new reference:
  * For files attached to a [story&nbsp;&raquo;](/api/stories.md), re-fetch it with [stories.getStoriesByID](/method/stories.getStoriesByID.md).
  * For files attached to a message in a channel or supergroup, re-fetch it with [channels.getMessages](/method/channels.getMessages.md).
  * For files attached to any other message, re-fetch it with [messages.getMessages](/method/messages.getMessages.md), wrapped in the [split range](#split-ranges) the message belongs to.

  If the refreshed object does not yield a new file reference, the file should be treated as unavailable.

### Other data

    inputTakeoutFileLocation#29be5899 = InputFileLocation;

Any personal data related to features that do not have a dedicated takeout method yet (for example, data related to newly introduced Telegram features) can be exported by invoking [upload.getFile](/method/upload.getFile.md) with an [inputTakeoutFileLocation](/constructor/inputTakeoutFileLocation.md): this downloads a single JSON file containing all such data, or fails with `TAKEOUT_FILE_EMPTY` if there is nothing to export.  
