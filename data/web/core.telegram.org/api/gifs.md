# Working with GIFs


Telegram clients support displaying GIFs.

On Telegram, GIFs are actually MPEG4 (h264) videos without sound; if the user tries to upload an actual GIF file, it will be automatically converted to an MPEG4 file by the server.  

### Uploading GIFs
    
    documentAttributeAnimated#11b58939 = DocumentAttribute;

    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;

    ---functions---

    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

On Telegram, GIFs are actually MPEG4 videos without sound; if the user tries to upload an actual GIF file, it will be automatically converted to an MPEG4 file by the server.  

To upload a GIF, follow the usual [file upload procedure&nbsp;&raquo;](/api/files.md#uploading-files), specifying the [documentAttributeAnimated](/constructor/documentAttributeAnimated.md).  

Uploading a GIF will automatically add it to the user's [saved GIFs list&nbsp;&raquo;](#saved-gifs).  

#### Uploading by hash

For some types of documents like GIFs, [messages.getDocumentByHash](/method/messages.getDocumentByHash.md) can be used to search for the document on Telegram servers, instead of uploading it from scratch.  
See [here&nbsp;&raquo;](/api/files.md#uploading-by-hash) for the full procedure.  

### Saved GIFs

    updateSavedGifs#9375341e = Update;

    messages.savedGifsNotModified#e8025ca2 = messages.SavedGifs;
    messages.savedGifs#84a02a0d hash:long gifs:Vector<Document> = messages.SavedGifs;

    ---functions---

    messages.saveGif#327a30cb id:InputDocument unsave:Bool = Bool;
    messages.getSavedGifs#5cf09635 hash:long = messages.SavedGifs;

GIFs received in a chat may be added to (or removed from) the saved gifs list using [messages.saveGif](/method/messages.saveGif.md).  

Modifying the saved gifs list with the method indicated above will emit an [updateSavedGifs](/constructor/updateSavedGifs.md) update to other currently logged in sessions, which should trigger a call to [messages.getSavedGifs](/method/messages.getSavedGifs.md), to refresh the locally cached list.  

[messages.getSavedGifs](/method/messages.getSavedGifs.md) should also be called when first logging in.  

[Uploading&nbsp;&raquo;](#uploading-gifs) a GIF will automatically add it to the saved gifs list.  

The saved GIFs list should be displayed in the [GIF selection UI&nbsp;&raquo;](#searching-gifs).  

The maximum number of GIFs that may be added to the saved GIF list is specified by [appConfig.saved_gifs_limit_default](/api/config.md#saved-gifs-limit-default)/[appConfig.saved_gifs_limit_premium](/api/config.md#saved-gifs-limit-premium) for non-[Premium](/api/premium.md)/[Premium](/api/premium.md) users.  

Trying to add one more GIF after the non-Premium limit is reached should open the Premium subscription modal.  
If the user adds one more GIF even after the non-Premium/Premium limit is reached, the server will automatically delete the oldest GIF, and the client should display a toast, notifying the user of this deletion.  

### Searching GIFs

    config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;

Clients should implement a GIF selection/search UI that is almost identical to the [sticker](/api/stickers.md) search UI, featuring a search bar (with a list of [emoji categories](/api/emoji-categories.md)) followed (initially) by the list of [saved GIFs](#saved-gifs) that may be selected and sent by the user to the current chat.  

Entering text in the search bar should replace the saved GIFs list with the results of the GIF search, which must be implemented as an [inline query&nbsp;&raquo;](/api/bots/inline.md) to the bot specified in [config](/constructor/config.md).`gif_search_username`, with `peer`=[inputPeerEmpty](/constructor/inputPeerEmpty.md) and `query` set equal to the input of the user.  
Again, the GIF search UI should be almost identical to the [sticker](/api/stickers.md) search UI: even if inline bot queries are used, the usual inline query UI should **not** be used for the GIF search UI.  

As mentioned above, the GIF search bar should also offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria, see [here&nbsp;&raquo;](/api/emoji-categories.md) for more info.  

When an emoji category is selected, the search input bar should be disabled, and a search should be made, passing to `query` the first emoji of the selected emoji group.  