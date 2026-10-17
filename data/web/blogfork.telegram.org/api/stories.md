# Telegram Stories


Telegram users and channels can easily post and view [stories](https://telegram.org/blog/stories) through the API.

### Posting stories

Schema:

    inputPeerSelf#7da07ec9 = InputPeer;
    inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;
    
    boolFalse#bc799737 = Bool;
    boolTrue#997275b5 = Bool;

    updateStory#75b3b798 peer:Peer story:StoryItem = Update;

    updateStoryID#1bf335b9 id:int random_id:long = Update;

    ---functions---

    stories.canSendStory#30eb63f0 peer:InputPeer = stories.CanSendStoryCount;
    stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;
    
    stories.getChatsToSend#a56a8b60 = messages.Chats;

Before posting a story, clients should invoke [stories.canSendStory](/method/stories.canSendStory.md), to make sure they can send stories to the specified `peer` (which can be [inputPeerSelf](/constructor/inputPeerSelf.md) to send the story as a normal user and [inputPeerChannel](/constructor/inputPeerChannel.md) to send a story as a channel or supergroup).  

Use [stories.getChatsToSend](/method/stories.getChatsToSend.md) to obtain a list of channels/supergroups where the user can post stories; [stories.canSendStory](/method/stories.canSendStory.md) must still be used before uploading a story to make sure no other limit was reached, as described in the [main documentation&nbsp;&raquo;](/api/stories.md#posting-stories).
Note that in order to obtain permission to post stories as a channel/supergroup, it must be boosted, first, see [here&nbsp;&raquo;](/api/boost.md) for more info.  

[stories.canSendStory](/method/stories.canSendStory.md) returns a [stories.canSendStoryCount](/constructor/stories.canSendStoryCount.md) with the number of available active story slots (equal to the value of the [`story_expiring_limit_*` client configuration parameter](/api/config.md#story-expiring-limit-default) minus the number of currently active stories) only if:

- If we're trying to send a story as a channel/supergroup:
  - The current user is an administrator of the channel/supergroup and has [`post_stories` admin rights](/constructor/chatAdminRights.md); otherwise, a `CHAT_ADMIN_REQUIRED` error is returned.
  - AND the channel/supergroup has [received enough boosts to post the story&nbsp;&raquo;](/api/boost.md); otherwise, a `BOOSTS_REQUIRED` error is returned.
- If we're trying to send a story as the current user:
  - The user can post stories according to the [`stories_posting` client configuration parameter](/api/config.md#stories-posting); otherwise, a `PREMIUM_ACCOUNT_REQUIRED` error is returned.
  - AND The user hasn't hit the maximum active stories limit specified by the [`story_expiring_limit_*` client configuration parameters](/api/config.md#story-expiring-limit-default); otherwise a `STORIES_TOO_MUCH` error is returned, indicating that the user should buy a [Premium](/api/premium.md) subscription, delete an active story, or wait for the oldest story to expire.
  - AND The user hasn't hit the weekly story limit specified by the [`stories_sent_weekly_limit_*` client configuration parameters](/api/config.md#stories-sent-weekly-limit-default); otherwise, a `STORY_SEND_FLOOD_WEEKLY_%d` error is returned, indicating the number of seconds to wait before posting a new story.
  - AND The user hasn't hit the monthly story limit specified by the [`stories_sent_monthly_limit_*` client configuration parameters](/api/config.md#stories-sent-monthly-limit-default); otherwise, a `STORY_SEND_FLOOD_MONTHLY_%d` error is returned, indicating the number of seconds to wait before posting a new story.

After checking if a story can be posted, the client may invoke [stories.sendStory](/method/stories.sendStory.md) to upload the story.  
Note that if any of the conditions changes in the period between the call to [stories.canSendStory](/method/stories.canSendStory.md) and [stories.sendStory](/method/stories.sendStory.md) (for example, the user uploads a story from another client, reaching the weekly limit), the same errors listed above for [stories.canSendStory](/method/stories.canSendStory.md) will be emitted by [stories.sendStory](/method/stories.sendStory.md).  

The parameters of [stories.sendStory](/method/stories.sendStory.md) are fully described on the [method page&nbsp;&raquo;](/method/stories.sendStory.md), here are some of the most important ones:

- `peer`: The peer to send the story as.
- `media`:  The story media (a vertical photo or a vertical video, max 30 MB).
- `media_areas`: [Media areas](/api/stories.md#media-areas) associated to the story, see [here&nbsp;&raquo;](/api/stories.md#media-areas) for more info.
- `privacy_rules`: A set of [privacy rules&nbsp;&raquo;](/api/privacy.md#privacy-rules) for the story as an array of [InputPrivacyRule](/type/InputPrivacyRule.md) constructors, indicating who can or can't view the story.
- `expire`: Period after which the story is moved to [archive](#pinned-or-archived-stories) (and [to the profile](#pinned-or-archived-stories) if `pinned` is set), in seconds; must be one of `6 * 3600`, `12 * 3600`, `86400`, or `2 * 86400` for Telegram Premium users, and `86400` otherwise.
- `pinned`: Whether to also [add the story to the profile](#pinned-or-archived-stories) automatically upon expiration. If not set, the story will only be added to the [archive](#pinned-or-archived-stories). 
- `caption` and `entities`: The story caption, and related [styled text entities](/api/entities.md); note that the story caption length is limited by the [`story_caption_length_limit_*`&nbsp;&raquo;](/api/config.md#story-caption-length-limit-default) config keys, and story entities should only be sent and displayed according to the value of the [stories_entities&nbsp;&raquo;](/api/config.md#stories-entities) config key.

Once a story is successfully uploaded, an [updateStoryID](/constructor/updateStoryID.md) will be returned, indicating the story ID (`id`) that was attributed to the story (like for messages, `random_id` indicates the `random_id` that was passed to [stories.sendStory](/method/stories.sendStory.md): this way, you can tell which story was assigned a specific `id` by checking which [stories.sendStory](/method/stories.sendStory.md) call has the returned `random_id`).  

Also, posting a story will emit an [updateStory](/constructor/updateStory.md) both for us, and for our subscribers/contacts (even if they have [hidden](#hiding-stories-of-other-users) our stories).  

Additionally, a message containing a [messageMediaStory](/constructor/messageMediaStory.md) with the `via_mention` flag coming from the story poster will also be generated automatically if the poster mentions us in the story's caption.  

[Mini apps](/api/bots/webapps.md) may also request to share a story on the user's profile using the [web_app_share_to_story event &raquo;](/api/web-events.md#web-app-share-to-story).

#### Editing stories

    inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;
    inputFileBig#fa4f0bb5 id:long parts:int name:string = InputFile;
    inputFileStoryDocument#62dc8b48 id:InputDocument = InputFile;

    inputMediaUploadedPhoto#7d8375da flags:# spoiler:flags.2?true live_photo:flags.3?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int video:flags.3?InputDocument = InputMedia;
    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;

    inputMediaPhoto#e3af4434 flags:# spoiler:flags.1?true live_photo:flags.2?true id:InputPhoto ttl_seconds:flags.0?int video:flags.2?InputDocument = InputMedia;
    inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;

    ---functions---

    stories.editStory#2c63a72b flags:# peer:InputPeer id:int media:flags.0?InputMedia media_areas:flags.3?Vector<MediaArea> caption:flags.1?string entities:flags.1?Vector<MessageEntity> privacy_rules:flags.2?Vector<InputPrivacyRule> music:flags.4?InputDocument = Updates;

A story may also be edited using [stories.editStory](/method/stories.editStory.md).  

**Note**: [usually](/api/files.md#editing-uploaded-files), when editing just the [DocumentAttribute](/type/DocumentAttribute.md)s of files (like the file name through [documentAttributeFilename](/constructor/documentAttributeFilename.md), the timestamp of a video thumbnail through [documentAttributeVideo](/constructor/documentAttributeVideo.md).`preload_prefix_size`, etc) without editing the media itself, a full download+reupload of the underlying media is required, as the attributes are baked into the media and cannot be modified through [inputMediaDocument](/constructor/inputMediaDocument.md) (unlike some other attributes like `spoiler`, which may be edited without a reupload, simply by passing the old media in [inputMediaDocument](/constructor/inputMediaDocument.md).`id` and tweaking the appropriate flags of [inputMediaDocument](/constructor/inputMediaDocument.md)).  

However, a full download+reupload can be avoided **just for video stories**, when editing only the [documentAttributeVideo](/constructor/documentAttributeVideo.md).`video_start_ts` attribute: in this case, [inputMediaUploadedDocument](/constructor/inputMediaUploadedDocument.md) should be used, passing to `file` an [inputFileStoryDocument](/constructor/inputFileStoryDocument.md) with the old story media instead of the re-uploaded [inputFile](/constructor/inputFile.md), and populating the remaining fields and attributes with exactly the same values used previously, except for the [documentAttributeVideo](/constructor/documentAttributeVideo.md).`video_start_ts` attribute, which should contain the new value.  

#### Pinned or archived stories

    stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;

    ---functions---

    stories.togglePinned#9a75a1ef peer:InputPeer id:Vector<int> pinned:Bool = Vector<int>;
    stories.togglePinnedToTop#b297e9b peer:InputPeer id:Vector<int> = Bool;

    stories.getStoriesArchive#b4352016 peer:InputPeer offset_id:int limit:int = stories.Stories;

    stories.getPinnedStories#5821a5dc peer:InputPeer offset_id:int limit:int = stories.Stories;

After an active story expires, it is automatically added to the story archive: stories in the story archive are only visible to the poster, or to channel/supergroup admins with [`edit_stories` admin rights](/constructor/chatAdminRights.md) rights.  

Use [stories.getStoriesArchive](/method/stories.getStoriesArchive.md) to fetch stories in the story archive.  

Archived stories may then be pinned on the profile, where they may be fetched using [stories.getPinnedStories](/method/stories.getPinnedStories.md) by users who explicitly open your profile: use [stories.togglePinned](/method/stories.togglePinned.md) to pin or unpin one or more stories to your profile.  

Stories may also be auto-pinned upon expiration if the `pinned` flag is set [when posting them](#posting-stories).  

Additionally, stories pinned to a profile may **also** be pinned **to the top of the profile** using [stories.togglePinnedToTop](/method/stories.togglePinnedToTop.md); stories that are pinned to the top of the profile (max [stories_pinned_to_top_count_max](/api/config.md#stories-pinned-to-top-count-max)) should be displayed first when opening the profile.  
Stories pinned to the top of the profile will be returned first when invoking [stories.getPinnedStories](/method/stories.getPinnedStories.md) with `offset_id=0`, and their IDs will also be contained in [stories.stories](/constructor/stories.stories.md).`pinned_to_top`.  

#### Deleting stories

    ---functions---
    
    stories.deleteStories#ae59db5f peer:InputPeer id:Vector<int> = Vector<int>;

Use the [stories.deleteStories](/method/stories.deleteStories.md) method to delete one or more active, pinned or archived stories by their IDs, passed in `id`.  

#### Preventing users from seeing your stories

Users may be individually blocked from seeing all of your stories by adding them to the [story blocklist&nbsp;&raquo;](/api/block.md).  

### Live stories

    ---functions---

    stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;

A live story is a live group call associated with a story posted by a user, supergroup or channel. Each peer can have only one active live story.  

Live stories have a single publisher, other participants join as listeners.  

Live stories are displayed in the story list, support messages, reactions, paid comments and donations, and are replaced by their video recording after they end.

See [Live stories &raquo;](/api/group-calls.md#live-stories) for the detailed API flow used to create, publish, join and interact with live stories.

### Story albums
    
    storyAlbum#9325705a flags:# album_id:int title:string icon_photo:flags.0?Photo icon_video:flags.1?Document = StoryAlbum;

    stories.albumsNotModified#564edaeb = stories.Albums;
    stories.albums#c3987a3a hash:long albums:Vector<StoryAlbum> = stories.Albums;

    ---functions---

    stories.createAlbum#a36396e5 peer:InputPeer title:string stories:Vector<int> = StoryAlbum;
    stories.getAlbums#25b3eac7 peer:InputPeer hash:long = stories.Albums;
    stories.updateAlbum#5e5259b6 flags:# peer:InputPeer album_id:int title:flags.0?string delete_stories:flags.1?Vector<int> add_stories:flags.2?Vector<int> order:flags.3?Vector<int> = StoryAlbum;
    stories.reorderAlbums#8535fbd9 peer:InputPeer order:Vector<int> = Bool;
    stories.deleteAlbum#8d3456d0 peer:InputPeer album_id:int = Bool;

    stories.getAlbumStories#ac806d61 peer:InputPeer album_id:int offset:int limit:int = stories.Stories;

Stories may be organized in albums.  

Use [stories.createAlbum](/method/stories.createAlbum.md) to create a story album.

Use [stories.getAlbums](/method/stories.getAlbums.md) to get all story albums owned by a user.  

Use [stories.getAlbumStories](/method/stories.getAlbumStories.md) to fetch the stories added to an album.  

Use the **albums** parameter of [stories.sendStory](/method/stories.sendStory.md) to add a newly posted story to one or more albums.  

Use [stories.updateAlbum](/method/stories.updateAlbum.md) to rename an album, or add, delete and reorder stories in an album.  

Use [stories.reorderAlbums](/method/stories.reorderAlbums.md) to reorder albums on the profile.  

Use [stories.deleteAlbum](/method/stories.deleteAlbum.md) to delete an album.

A profile can contain a maximum of [stories_albums_limit &raquo;](/api/config.md#stories-albums-limit) albums, each containing a maximum of [stories_album_stories_limit](/api/config.md#stories-album-stories-limit) stories.  

[Story album deep links &raquo;](/api/links.md#story-album-links) can be used to share an album.  

### Watching stories

    storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;
    storyItemSkipped#ffadc913 flags:# close_friends:flags.8?true live:flags.9?true id:int date:int expire_date:int = StoryItem;
    storyItemDeleted#51e6ee4f id:int = StoryItem;

    peerStories#9a35e999 flags:# peer:Peer max_read_id:flags.0?int stories:Vector<StoryItem> = PeerStories;
    
    storiesStealthMode#712e27fd flags:# active_until_date:flags.0?int cooldown_until_date:flags.1?int = StoriesStealthMode;

    stories.allStories#6efc5e81 flags:# has_more:flags.0?true count:int state:string peer_stories:Vector<PeerStories> chats:Vector<Chat> users:Vector<User> stealth_mode:StoriesStealthMode = stories.AllStories;
    stories.allStoriesNotModified#1158fe3e flags:# state:string stealth_mode:StoriesStealthMode = stories.AllStories;
    
    stories.peerStories#cae68768 stories:PeerStories chats:Vector<Chat> users:Vector<User> = stories.PeerStories;

    updateReadStories#f74e932b peer:Peer max_id:int = Update;

    ---functions---

    stories.getAllStories#eeb0d625 flags:# next:flags.1?true hidden:flags.2?true state:flags.0?string = stories.AllStories;

    stories.getStoriesByID#5774ca74 peer:InputPeer id:Vector<int> = stories.Stories;
    stories.getPeerStories#2c4ada50 peer:InputPeer = stories.PeerStories;

    stories.readStories#a556dac8 peer:InputPeer max_id:int = Vector<int>;
    stories.incrementStoryViews#b2028afb peer:InputPeer id:Vector<int> = Bool;

    stories.getAllReadPeerStories#9b5ae7f9 = Updates;

Active stories of contacts, subscribed channels/supergroups and the [changelog user](/api/config.md#stories-changelog-user-id) should be shown in the action bar of the home screen.  
Use [stories.getAllStories](/method/stories.getAllStories.md) to fetch the full list of active stories. 

Optionally, the `hidden` flag can be set to fetch the [hidden stories to be shown in the archived tab](#hiding-stories-of-other-users), instead of the main story list.  

Pagination using this method is a bit different from usual: a `state` string is used to maintain the pagination state.  

* Initially, neither the `next` or `state` flags should be set: upon completion of the RPC call, a new `state` string is returned and should be stored locally, associated either to the main or hidden story list (depending on the value of `hidden` we passed); pass the locally stored `state` to all future calls of the method.  
* If more stories are available, the returned [stories.allStories](/constructor/stories.allStories.md).`has_more` flag will be set: in this case, the client should re-call the method with the newly returned `state` **and** the `next` flag set to fetch a new `state` and the remaining stories from the chosen story list; the process should be repeated until no more stories are available (`has_more` will **not** be set).  

Once the full story list is fetched, [stories.allStories](/constructor/stories.allStories.md) can be called with the stored `state` **without** setting the `next` flag to check for updates in an active story list: if no changes have occurred since our last call, [stories.allStoriesNotModified](/constructor/stories.allStoriesNotModified.md) is returned, otherwise [stories.allStories](/constructor/stories.allStories.md) is returned (possibly requiring further pagination as described above).  
Note that a change is currently only defined as an addition or removal (i.e. by moving it to the hidden list or vice versa) of a peer to/from a story list, not as a new story being posted; those changes are received as simple [updateStory](/constructor/updateStory.md) updates.  

Changes to the active stories list are contained in the [stories.allStories](/constructor/stories.allStories.md).`peer_stories` field: this field contains a vector of [peerStories](/constructor/peerStories.md) constructors, one for each peer, containing the peer ID, the ID of the maximum read story (if any), and a list of [StoryItem](/type/StoryItem.md) constructors of type:

- [storyItem](/constructor/storyItem.md) - Represents an active story
- [storyItemSkipped](/constructor/storyItemSkipped.md) - Represents an active story, whose full information was omitted for space and performance reasons; use [stories.getStoriesByID](/method/stories.getStoriesByID.md) to fetch full info about the skipped story/stories when and if needed.
- [storyItemDeleted](/constructor/storyItemDeleted.md) - Represents a previously active story, that was now deleted

Use [stories.getPeerStories](/method/stories.getPeerStories.md) may also be used to fetch the full active story list of a specific peer.  

Use [stories.readStories](/method/stories.readStories.md) to mark all stories up to a certain ID as read, for a given peer: using this method will emit an [updateReadStories](/constructor/updateReadStories.md) update to all logged-in sessions if a newer ID is marked as read.  
Use [stories.getAllReadPeerStories](/method/stories.getAllReadPeerStories.md) to obtain the latest read story ID for all peers when first logging in, returned as a list of [updateReadStories](/constructor/updateReadStories.md) updates: further calls to this method are not needed after login, as updates to the latest read story ID will be sent using [updateReadStories](/constructor/updateReadStories.md) updates, with the usual [update delivering methods](/api/updates.md).  

Use [stories.incrementStoryViews](/method/stories.incrementStoryViews.md) to actually increment the view counter of stories the user has seen (pass max 200 story IDs at a time).  

#### Recent story summaries

    recentStory#711d692d flags:# live:flags.0?true max_id:flags.1?int = RecentStory;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;
    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;
    
    updateReadStories#f74e932b peer:Peer max_id:int = Update;

    ---functions---

    stories.getPeerMaxIDs#78499170 id:Vector<InputPeer> = Vector<RecentStory>;

The `stories_max_id` field of [user](/constructor/user.md) and [channel](/constructor/channel.md) contains a [recentStory](/constructor/recentStory.md) summary of the peer's active stories.

If the summary has `live` set, `max_id` identifies the peer's active [live story &raquo;](#live-stories).

Otherwise, `max_id` is the maximum ID among the peer's active stories.  

In any case, when `max_id` it is greater than the locally stored maximum read story ID for the peer, the peer has unread active stories. The maximum read story ID is stored in [peerStories](/constructor/peerStories.md).`max_read_id` and updated by [updateReadStories](/constructor/updateReadStories.md).

Use [stories.getPeerMaxIDs](/method/stories.getPeerMaxIDs.md) to refresh these compact summaries for a list of peers without fetching full [StoryItem](/type/StoryItem.md) constructors. In the result of [stories.getPeerMaxIDs](/method/stories.getPeerMaxIDs.md), a [recentStory](/constructor/recentStory.md) without any flag set means the peer has no active stories.

#### Hiding stories of other users

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    ---functions---

    stories.togglePeerStoriesHidden#bd0415c4 peer:InputPeer hidden:Bool = Bool;

    stories.toggleAllStoriesHidden#7c2557c4 hidden:Bool = Bool;

Use [stories.togglePeerStoriesHidden](/method/stories.toggleAllStoriesHidden.md) to hide the active stories of a specific peer, preventing them from being displayed on the action bar on the home screen.  
When the stories of a user are marked as hidden, the `stories_hidden` flag is set on the related [user](/constructor/user.md) constructor, and they should only be visible on the action bar when opening the [archive folder](/api/folders.md#peer-folders), by setting the `hidden` flag when calling [stories.getAllStories](/method/stories.getAllStories.md), see [here](#watching-stories) for more info.  

Note that the [archive folder is the peer folder used for archived chats](/api/folders.md#peer-folders): hidden stories are displayed there purely due to a UI implementation detail, not because they're actually added to the [archive peer folder&nbsp;&raquo;](/api/folders.md#peer-folders) or the [story archive&nbsp;&raquo;](#pinned-or-archived-stories), which are different things.  

### Sharing stories

    inputMediaStory#89fdd778 peer:InputPeer id:int = InputMedia;
    
    messageMediaStory#68cb6283 flags:# via_mention:flags.1?true peer:Peer id:int story:flags.0?StoryItem = MessageMedia;

    ---functions---

    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

Stories can be shared as messages to any chat by simply using [messages.sendMedia](/method/messages.sendMedia.md), passing an [inputMediaStory](/constructor/inputMediaStory.md) referencing the shared story.  

The story will be shared as a [messageMediaStory](/constructor/messageMediaStory.md), and should be displayed as a message forwarded from the poster of the story (even though [messages.forwardMessages](/method/messages.forwardMessages.md) was not used an the `fwd_from` field of the [message](/constructor/message.md) **won't** be set).  

A message containing a [messageMediaStory](/constructor/messageMediaStory.md) with the `via_mention` flag coming from the story poster will also be generated automatically if the poster mentions us in the story's caption.  

### Fetching the interaction list

    storyView#b0bdeac5 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true user_id:long date:int reaction:flags.2?Reaction = StoryView;
    storyViewPublicForward#9083670b flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true message:Message = StoryView;
    storyViewPublicRepost#bd74cf49 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer story:StoryItem = StoryView;

    stories.storyViewsList#59d78fc5 flags:# count:int views_count:int forwards_count:int reactions_count:int views:Vector<StoryView> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryViewsList;

    storyReaction#6090d6d5 peer_id:Peer date:int reaction:Reaction = StoryReaction;
    storyReactionPublicForward#bbab2643 message:Message = StoryReaction;
    storyReactionPublicRepost#cfcd0f13 peer_id:Peer story:StoryItem = StoryReaction;

    stories.storyReactionsList#aa5f789c flags:# count:int reactions:Vector<StoryReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryReactionsList;

    storyViews#8d595cd6 flags:# has_viewers:flags.1?true views_count:int forwards_count:flags.2?int reactions:flags.3?Vector<ReactionCount> reactions_count:flags.4?int recent_viewers:flags.0?Vector<long> = StoryViews;
    stories.storyViews#de9eed1d views:Vector<StoryViews> users:Vector<User> = stories.StoryViews;

    ---functions---

    stories.getStoryViewsList#7ed23c57 flags:# just_contacts:flags.0?true reactions_first:flags.2?true forwards_first:flags.3?true peer:InputPeer q:flags.1?string id:int offset:string limit:int = stories.StoryViewsList;

    stories.getStoryReactionsList#b9b2881f flags:# forwards_first:flags.2?true peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = stories.StoryReactionsList;

    stories.getStoriesViews#28e16cc8 peer:InputPeer id:Vector<int> = stories.StoryViews;

Use [stories.getStoryViewsList](/method/stories.getStoryViewsList.md) to obtain the full list of users that have interacted with a specific story we posted as a user, returned as a list of [StoryView](/type/StoryView.md) constructors; pass the returned `next_offset` (if present) to `offset` to paginate through the results; the full list is available at all times only to [Premium](/api/premium.md) users, and will be deleted on stories posted by non-[Premium](/api/premium.md) users [story_viewers_expire_period&nbsp;&raquo;](/api/config.md#story-viewers-expire-period) seconds after the story expires; if it's still viewable, the `has_viewers` flag will be set.  

The above method can only be used for stories posted by users, to fetch almost the exact same information for stories posted by channels/supergroups, use [stories.getStoryReactionsList](/method/stories.getStoryReactionsList.md): the data returned by both methods is actually almost exactly the same, the only difference is that:

* [stories.getStoryViewsList](/method/stories.getStoryViewsList.md) can only be used for stories posted by the current user and also contains view and [blocklist](/api/block.md) information.  
* [stories.getStoryReactionsList](/method/stories.getStoryReactionsList.md) can only be used for stories posted by channels/supergroups we're an admin of and does not contain view information

For the rest, both methods return information about:

* Story reactions: [storyView](/constructor/storyView.md)/[storyReaction](/constructor/storyReaction.md)
* Story forwards as a message to a public chat/channel: [storyViewPublicForward](/constructor/storyViewPublicForward.md)/[storyReactionPublicForward](/constructor/storyReactionPublicForward.md)
* Story reposts (as a story to a public channel/supergroup/user): [storyViewPublicRepost](/constructor/storyViewPublicRepost.md)/[storyReactionPublicRepost](/constructor/storyReactionPublicRepost.md)

Additionally, [stories.getStoriesViews](/method/stories.getStoriesViews.md) can be used to obtain info about the view count, forward count, reactions and recent viewers list of one or more stories, using a single, unpaginated method call, obviously potentially returning less info than [stories.getStoryViewsList](/method/stories.getStoryViewsList.md).  

### Replying to stories

    inputReplyToStory#5881323a peer:InputPeer story_id:int = InputReplyTo;

    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

You may reply to stories posted by users and supergroups by using [messages.sendMessage](/method/messages.sendMessage.md), [messages.sendMedia](/method/messages.sendMedia.md) or any other method used to send messages, passing an [inputReplyToStory](/constructor/inputReplyToStory.md) to `reply_to`, with the ID of the user that posted the story (which must also be the destination `peer` of the message) and the story ID.  

### Reposting stories

    storyFwdHeader#b826e150 flags:# modified:flags.3?true from:flags.0?Peer from_name:flags.1?string story_id:flags.2?int = StoryFwdHeader;

    storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;

    ---functions---

    stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;

Stories may be reposted by using [stories.sendStory](/method/stories.sendStory.md), populating the `fwd_from_story` field with the original story ID and the `fwd_from_id` with the peer that posted the original story.  

The user may modify the story (for example by overlaying a round video reaction on top of the media); either way, the modified or the original media must be passed to the `media` field as usual, and the `fwd_modified` flag must be set if the media was modified.  

Reposted stories will have the [storyItem](/constructor/storyItem.md) set and populated with a [storyFwdHeader](/constructor/storyFwdHeader.md) constructor, containing info about the original story.

### Searching stories

    foundStory#e87acbc0 peer:Peer story:StoryItem = FoundStory;

    stories.foundStories#e2de7737 flags:# count:int stories:Vector<FoundStory> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stories.FoundStories;

    ---functions---
    
    stories.searchPosts#d1810907 flags:# hashtag:flags.0?string area:flags.1?MediaArea peer:flags.2?InputPeer offset:string limit:int = stories.FoundStories;

[stories.searchPosts](/method/stories.searchPosts.md) may be used to globally search for stories from all users (even non-contacts and other peers we've never seen before) using either a hashtag passed to `hashtag` (without the `#`) or a [location tag](#location-tags) passed to `area`.  

Global search should be automatically triggered when clicking on a hashtag in the description of a story, or when clicking on a [location tag](#location-tags) (results displayed under the map).  

Note [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md) areas may be searched only if they have an associated `address`.  

Either `hashtag` or `area` must always be set when invoking the method, `offset` must initially be an empty string.  
Paginate the results by re-calling the method, passing to `offset` the [stories.foundStories](/constructor/stories.foundStories.md).`next_offset` field returned by the previous call.  

### Reporting stories

    inputReportReasonSpam#58dbcab8 = ReportReason;
    inputReportReasonViolence#1e22c78d = ReportReason;
    inputReportReasonPornography#2e59d922 = ReportReason;
    inputReportReasonChildAbuse#adf44ee3 = ReportReason;
    inputReportReasonOther#c1e4a2b1 = ReportReason;
    inputReportReasonCopyright#9b89f93a = ReportReason;
    inputReportReasonGeoIrrelevant#dbd4feed = ReportReason;
    inputReportReasonFake#f5ddd6e7 = ReportReason;
    inputReportReasonIllegalDrugs#a8eb2be = ReportReason;
    inputReportReasonPersonalDetails#9ec7863d = ReportReason;

    ---functions---

    stories.report#19d8eb45 peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;

Use [stories.report](/method/stories.report.md) to report one or more stories.  

### Story links

    exportedStoryLink#3fc9053b link:string = ExportedStoryLink;

    ---functions---

    stories.exportStoryLink#7b8def20 peer:InputPeer id:int = ExportedStoryLink;

Use [stories.exportStoryLink](/method/stories.exportStoryLink.md) to generate a [story deep link](/api/links.md#story-links) for a specific story.  

Upon encountering a story deep link, clients should open the specified story as [specified here&nbsp;&raquo;](#watching-stories).  

See [here&nbsp;&raquo;](/api/links.md#story-links) for more info on story deep links.  

A [live story deep link&nbsp;&raquo;](/api/links.md#live-story-links) can be used to open the currently ongoing live story of a user or channel, and a [post story deep link&nbsp;&raquo;](/api/links.md#post-story-links) can be used to open the story composer.

### Media areas

Schema:

    mediaAreaCoordinates#cfc9e002 flags:# x:double y:double w:double h:double rotation:double radius:flags.0?double = MediaAreaCoordinates;

    storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;

    ---functions---

    stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;
    stories.editStory#2c63a72b flags:# peer:InputPeer id:int media:flags.0?InputMedia media_areas:flags.3?Vector<MediaArea> caption:flags.1?string entities:flags.1?Vector<MessageEntity> privacy_rules:flags.2?Vector<InputPrivacyRule> music:flags.4?InputDocument = Updates;

Stories can have so-called "media areas": clickable rectangular areas with animated overlays on top of the story offering functionality like location tags or reactions.  

The coordinates and size of each media area is specified in a [mediaAreaCoordinates](/constructor/mediaAreaCoordinates.md) constructor attached to each [MediaArea](/type/MediaArea.md), see [the constructor page&nbsp;&raquo;](/constructor/mediaAreaCoordinates.md) for more info.  

After construction, the vector of [MediaArea](/type/MediaArea.md) constructors can be passed to [stories.sendStory](/method/stories.sendStory.md) or [stories.editStory](/method/stories.editStory.md).

#### Channel posts

Schema:

    inputMediaAreaChannelPost#2271f2bf coordinates:MediaAreaCoordinates channel:InputChannel msg_id:int = MediaArea;

    mediaAreaChannelPost#770416af coordinates:MediaAreaCoordinates channel_id:long msg_id:int = MediaArea;

Messages from channels can be reposted to stories using [inputMediaAreaChannelPost](/constructor/inputMediaAreaChannelPost.md)/[mediaAreaChannelPost](/constructor/mediaAreaChannelPost.md).

Clients should fetch and display a copy of the channel post on top of the story according to the [media area](#media-areas) `coordinates`: clicking on the media area should open the linked post.

#### Location tags

Schema:

    geoPoint#b2a2f663 flags:# long:double lat:double access_hash:long accuracy_radius:flags.0?int = GeoPoint;
    geoPointAddress#de4c5d93 flags:# country_iso2:string state:flags.0?string city:flags.1?string street:flags.2?string = GeoPointAddress;

    mediaAreaGeoPoint#cad5452d flags:# coordinates:MediaAreaCoordinates geo:GeoPoint address:flags.0?GeoPointAddress = MediaArea;
    mediaAreaVenue#be82db9c coordinates:MediaAreaCoordinates geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MediaArea;

    inputMediaAreaVenue#b282217f coordinates:MediaAreaCoordinates query_id:long result_id:string = MediaArea;

Location tags are represented by a [mediaAreaVenue](/constructor/mediaAreaVenue.md) or [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md), associated to a location sticker on top of the story media with an associated [clickable media area](#media-areas).  

Both constructors have an associated geolocation represented as a [geoPoint](/constructor/geoPoint.md), and information about the clickable media area on top of the story media as a [mediaAreaCoordinates](/constructor/mediaAreaCoordinates.md) constructor.  

[mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md) is used to represent a simple geolocation with an *optional* textual address.  
[mediaAreaVenue](/constructor/mediaAreaVenue.md) is used to represent the location of a specific venue (i.e. a mall, a shop, a dance school, etc.), and apart from the venue's coordinates, it also contains a textual representation of the address, the venue name (`title`) and a venue type/ID (`venue_id`/`venue_type`) in a format supported by the venue provider specified in `provider`.   

Currently, the only provider that needs to be supported is `foursquare`.  

To send a [mediaAreaVenue](/constructor/mediaAreaVenue.md), clients should use [inputMediaAreaVenue](/constructor/inputMediaAreaVenue.md), constructed as follows:

* If the user gives permission to share their location with the location provider, query the inline bot specified in the [`stories_venue_search_username` client configuration parameter&nbsp;&raquo;](/api/config.md#stories-venue-search-username), as described as the [inline queries documentation&nbsp;&raquo;](/api/bots/inline.md), populating the `geo_point`.  
  Note that this should be done transparently in a map UI, not in the usual inline query UI in the chat text bar.  
* The results returned by the bot, containing a list of venues close to the specified `geo_point`, should be listed in the lower section of the map UI: upon selection, construct the [inputMediaAreaVenue](/constructor/inputMediaAreaVenue.md) with:
  * `query_id`: the `query_id` from [messages.botResults](/constructor/messages.botResults.md).
  * `result_id`: the `id` of the chosen result.

Clients may only re-use existing [mediaAreaVenue](/constructor/mediaAreaVenue.md)s when repositioning a pre-existing location tag when editing a story; use [inputMediaAreaVenue](/constructor/inputMediaAreaVenue.md) when posting a new story or adding a new location tag to an existing story.

[Global story search&nbsp;&raquo;](#searching-stories) should be automatically triggered when clicking on a location, passing the [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md)/[mediaAreaVenue](/constructor/mediaAreaVenue.md) to [stories.searchPosts](/method/stories.searchPosts.md), with results displayed under the map.  

Note [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md) areas may be searched only if they have an associated `address`.  

#### Reactions

Schema:

    reactionEmoji#1b2286b8 emoticon:string = Reaction;
    reactionCustomEmoji#8935fc73 document_id:long = Reaction;

    mediaAreaSuggestedReaction#14455871 flags:# dark:flags.0?true flipped:flags.1?true coordinates:MediaAreaCoordinates reaction:Reaction = MediaArea;

    updateSentStoryReaction#7d627683 peer:Peer story_id:int reaction:Reaction = Update;

    updateNewStoryReaction#1824e40b story_id:int peer:Peer reaction:Reaction = Update;

    ---functions---

    stories.sendReaction#7fd736b2 flags:# add_to_recent:flags.0?true peer:InputPeer story_id:int reaction:Reaction = Updates;

Story [reactions](/api/reactions.md) are implemented using a simple in-UI button that allows the user to send any reaction using [stories.sendReaction](/method/stories.sendReaction.md).  

Sending this method will return an [updateSentStoryReaction](/constructor/updateSentStoryReaction.md) update to all logged-in sessions.  
The story poster will also receive an [updateNewStoryReaction](/constructor/updateNewStoryReaction.md) update when a user reacts to their story, if enabled as specified [here&nbsp;&raquo;](/api/reactions.md#notifications-about-reactions).  

However, the poster of a story may also use [mediaAreaSuggestedReaction](/constructor/mediaAreaSuggestedReaction.md) [media areas&nbsp;&raquo;](#media-areas) to suggest some specific reactions as simple clickable buttons: they're rendered as a round comic-style thought bubble with its "tail" on the right, white background and the [reaction&nbsp;&raquo;](/api/reactions.md) from the `reaction` field located in its center.  
If the `dark` flag is set, the background should be black.  
If the `flipped` flag is set, the "tail" should be located on the left.
The maximum number of story reaction media areas that can be added to a story is specified by the [`stories_suggested_reactions_limit_*`&nbsp;&raquo;](/api/config.md#stories-suggested-reactions-limit-default) config keys.  
Clicking it should invoke [stories.sendReaction](/method/stories.sendReaction.md) as usual.

See [here&nbsp;&raquo;](#fetching-the-interaction-list) to get more info on how to fetch the reaction list of a [story](/api/stories.md).

#### URLs

    mediaAreaUrl#37381085 coordinates:MediaAreaCoordinates url:string = MediaArea;

URL media areas offer stickers that when clicked, should offer the user a prompt (implemented as a tooltip on the sticker) to open the specified `url`.  

The maximum number of URL media areas that can be added to a story is specified by the [`stories_area_url_max`&nbsp;&raquo;](/api/config.md#stories-area-url-max) config key.  

#### Weather

    mediaAreaWeather#49a6549c coordinates:MediaAreaCoordinates emoji:string temperature_c:double color:int = MediaArea;

    ---functions---

    messages.getInlineBotResults#514e999d flags:# bot:InputUser peer:InputPeer geo_point:flags.0?InputGeoPoint query:string offset:string = messages.BotResults;

Users can now share the weather in their stories by adding one weather media area represented by [mediaAreaWeather](/constructor/mediaAreaWeather.md) to their stories.  

The weather media area should be rendered using the background ARGB color specified in `color`, and should contain the emoji specified in `emoji` (rendered as an [animated emoji](/api/animated-emojis.md)), followed by the temperature specified in `temperature_c` (Celsius, which should be converted by the client to Fahrenheit if required by the device's settings), followed by `°C` or `°F` depending on the unit used.  

To fetch the current temperature and emoji to use when *creating* a weather media area when posting a story, clients should internally make an [inline query](/api/bots/inline.md) with [messages.getInlineBotResults](/method/messages.getInlineBotResults.md) to the `bot` specified in the [weather_search_username](/api/config.md#weather-search-username) client configuration parameter, passing the user's current location in `geo_point` and [inputPeerEmpty](/constructor/inputPeerEmpty.md) in `peer`.  
This query will return a single [botInlineResult](/constructor/botInlineResult.md): the `emoji` to use will be contained in the [botInlineResult](/constructor/botInlineResult.md).`title` and the temperature (always in Celsius) will be contained in [botInlineResult](/constructor/botInlineResult.md).`description` (it will contain just the value without the unit, so it can be easily cast to a double).  

The inline query should be made internally by the client when the user creates a new weather media area, not by showing the usual inline query UI, but by treating the inline query as an API call to fetch the weather for the current user's location.  

If the [story_weather_preload](/api/config.md#story-weather-preload) client configuration parameter is equal to true, clients should preload the weather using the flow specified above on startup (as opposed to only doing it when creating a weather media area).  

#### Collectible gifts

Schema:

    mediaAreaStarGift#5787686d coordinates:MediaAreaCoordinates slug:string = MediaArea;

Owned [collectible gifts &raquo;](/api/gifts.md#collectible-gifts) may be shared in a story using a [mediaAreaStarGift](/constructor/mediaAreaStarGift.md), containing the `slug` from [starGiftUnique](/constructor/starGiftUnique.md).`slug`, that can be resolved as [specified here &raquo;](/api/gifts.md#sharing-and-getting-info-about-a-collectible-gift).

### Stealth mode

[Premium users](/api/premium.md) may enable [stealth mode](https://telegram.org/tour/stories#stealth-mode), erasing their views from any stories they opened in the past [`stories_stealth_past_period` seconds&nbsp;&raquo;](/api/config.md#stories-stealth-past-period), and hiding their views on stories for the next [`stories_stealth_future_period` seconds&nbsp;&raquo;](/api/config.md#stories-stealth-future-period), as specified by the [client configuration&nbsp;&raquo;](/api/config.md#client-configuration).

Schema:

    storiesStealthMode#712e27fd flags:# active_until_date:flags.0?int cooldown_until_date:flags.1?int = StoriesStealthMode;

    updateStoriesStealthMode#2c084dc1 stealth_mode:StoriesStealthMode = Update;

    ---functions---

    stories.activateStealthMode#57bbd166 flags:# past:flags.0?true future:flags.1?true = Updates;

Invoke [stories.activateStealthMode](/method/stories.activateStealthMode.md) to activate stealth mode, passing the `past` flag to erase views from any stories opened in the past [`stories_stealth_past_period` seconds&nbsp;&raquo;](/api/config.md#stories-stealth-past-period) and/or the `future` flag to hide future story views for the next [`stories_stealth_future_period` seconds&nbsp;&raquo;](/api/config.md#stories-stealth-future-period).  

Clients can only invoke this method every [`stories_stealth_cooldown_period` seconds](/api/config.md#stories-stealth-cooldown-period) as specified by the [client configuration](/api/config.md#client-configuration): invoking the method before the cooldown period has expired will trigger a `FLOOD_WAIT_X` error, with `X` being the number of seconds left before the cooldown period expires.  

An [updateStoriesStealthMode](/constructor/updateStoriesStealthMode.md) constructor will be returned, containing the following fields:

- `active_until_date` - the date up to which stealth mode will be active
- `cooldown_until_date` - the date starting from which the user will be allowed to call [stories.activateStealthMode](/method/stories.activateStealthMode.md) again; calling the method earlier will return a `FLOOD_WAIT_X` error as specified above.

### Statistics

    stats.storyStats#50cd067c views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.StoryStats;

    publicForwardMessage#1f2bf4a message:Message = PublicForward;
    publicForwardStory#edf3add0 peer:Peer story:StoryItem = PublicForward;

    stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;

    ---functions---

    stats.getStoryStats#374fef40 flags:# dark:flags.0?true peer:InputPeer id:int = stats.StoryStats;

    stats.getStoryPublicForwards#a6437ef6 peer:InputPeer id:int offset:string limit:int = stats.PublicForwards;

Use [stats.getStoryStats](/method/stats.getStoryStats.md) to obtain statistics about a story; the returned [StatsGraph](/type/StatsGraph.md) graphs can be rendered [as described here&nbsp;&raquo;](/api/stats.md#graph-visualization).  

Use [stats.getStoryPublicForwards](/method/stats.getStoryPublicForwards.md) to obtain forwards of a story as a message to public chats and reposts by public channels.  
