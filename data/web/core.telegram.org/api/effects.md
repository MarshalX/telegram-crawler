# Animated message effects


Telegram allows adding spectacular **animated effects** to messages you send in 1-on-1 chats.  

    availableEffect#93c3e27e flags:# premium_required:flags.2?true id:long emoticon:string static_icon_id:flags.0?long effect_sticker_id:long effect_animation_id:flags.1?long = AvailableEffect;

    messages.availableEffectsNotModified#d1ed9a5b = messages.AvailableEffects;
    messages.availableEffects#bddb616e hash:int effects:Vector<AvailableEffect> documents:Vector<Document> = messages.AvailableEffects;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    draftMessage#96eaa5eb flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia date:int effect:flags.7?long suggested_post:flags.8?SuggestedPost = DraftMessage;
    
    ---functions---

    messages.getAvailableEffects#dea20a39 hash:int = messages.AvailableEffects;
    
    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

    messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;

    messages.saveDraft#54ae308e flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo peer:InputPeer message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia effect:flags.7?long suggested_post:flags.8?SuggestedPost = Bool;

Use [messages.getAvailableEffects](/method/messages.getAvailableEffects.md) to fetch the full list of message effects that may be used.  

Clients should re-invoke the method (re-using the `hash` returned from the previous method call) to check for updates in the effects list at most once an hour (or if a [message](/constructor/message.md) with an unknown `effect` is received).  

Info about each effect is stored in the [availableEffect](/constructor/availableEffect.md) constructor, identified by its `id` field: this ID should then be passed to the `effect` field of [messages.sendMessage](/method/messages.sendMessage.md), [messages.sendMedia](/method/messages.sendMedia.md), [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) to attach the effect to the [message](/constructor/message.md), in the `effect` field.  

All `long` IDs of [availableEffect](/constructor/availableEffect.md) except for `id` are [document](/constructor/document.md).`id`s from the containing [messages.availableEffects](/constructor/messages.availableEffects.md) constructor.  

Each effect has the following info, described by the fields of [availableEffect](/constructor/availableEffect.md) as follows:
- Emoji: specified in `emoticon`, used to quickly search for effects.  
- Preview icon: the webp image from `static_icon_id` if set, otherwise the emoji specified in `emoticon`.  
  Shown in the right bottom corner of the preview animation as a quick way for the user to classify effects.
  Must also be shown in messages with this effect, near the message date: clicking on this icon should re-trigger the effect.  
- Preview animation: the [animated sticker](/api/stickers.md#animated-stickers) specified in `effect_sticker_id`.  
  Used for the effect selection menu.  
- Effect animation: a different [animated sticker](/api/stickers.md#animated-stickers), specified either by `effect_animation_id` (if set) or by the [premium animated sticker effect](/api/stickers.md#premium-animated-sticker-effects) associated to the animated sticker specified in `effect_sticker_id` (always different from the animated sticker itself, fetched thanks to the [videoSize](/constructor/videoSize.md) of type `f` as specified [here&nbsp;&raquo;](/api/stickers.md#premium-animated-sticker-effects)).  
  The effect animation should be only played once, when first receiving or sending the message.  
  Clicking on the preview icon near the message date should re-trigger the effect.  
