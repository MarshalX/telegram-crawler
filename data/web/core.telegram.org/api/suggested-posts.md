# Suggested posts


Telegram offers a powerful monetization feature to channel administrators: **suggested posts**.  

    suggestedPost#e8e37e5 flags:# accepted:flags.1?true rejected:flags.2?true price:flags.3?StarsAmount schedule_date:flags.0?int = SuggestedPost;
    
    draftMessage#96eaa5eb flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia date:int effect:flags.7?long suggested_post:flags.8?SuggestedPost = DraftMessage;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    messageActionSuggestedPostApproval#ee7a1596 flags:# rejected:flags.0?true balance_too_low:flags.1?true reject_comment:flags.2?string schedule_date:flags.3?int price:flags.4?StarsAmount = MessageAction;
    messageActionSuggestedPostSuccess#95ddcf69 price:StarsAmount = MessageAction;
    messageActionSuggestedPostRefund#69f916f8 flags:# payer_initiated:flags.0?true = MessageAction;
    
    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

    messages.toggleSuggestedPostApproval#8107455c flags:# reject:flags.1?true peer:InputPeer msg_id:int schedule_date:flags.0?int reject_comment:flags.2?string = Updates;

Subscribers are now able to submit content to their favorite channels as suggested posts through a transparent and automated interface: simply populate the `suggested_post` flag of [messages.sendMessage](/method/messages.sendMessage.md) (or any other message-sending related method) with a [suggestedPost](/constructor/suggestedPost.md) constructor, and send the message to the [monoforum &raquo;](/api/monoforum.md) associated with the channel.  

In this context, the sender can only (optionally) populate the following flags of [suggestedPost](/constructor/suggestedPost.md):

* `price` - To offer payment for the suggested post (posts can also be suggested for free, without setting this flag).  
  If set and specified in [Stars](/api/stars.md)
  * The price must range between [stars_suggested_post_amount_min](/api/config.md#stars-suggested-post-amount-min) and [stars_suggested_post_amount_max](/api/config.md#stars-suggested-post-amount-max),
  * Upon successful completion, the channel will get `price*stars_suggested_post_commission_permille/1000` stars, [see stars_suggested_post_commission_permille &raquo;](/api/config.md#stars-suggested-post-commission-permille).
  
  If set and specified in nanograms (Gram):
  * The price must range between [ton_suggested_post_amount_min](/api/config.md#ton-suggested-post-amount-min) and [ton_suggested_post_amount_max](/api/config.md#ton-suggested-post-amount-max).  
  * Upon successful completion, the channel will get `price*ton_suggested_post_commission_permille/1000` nanograms, [see ton_suggested_post_commission_permille &raquo;](/api/config.md#ton-suggested-post-commission-permille).
* `schedule_date` - To specify when should the message be posted (optional, can be omitted if the message can be posted at any time); in this case, upon approval, the post will be automatically [scheduled &raquo;](/api/scheduled-messages.md).  
  The allowed range for this value, if specified, is between [stars_suggested_post_future_min](/api/config.md#stars-suggested-post-future-min) and [stars_suggested_post_future_max](/api/config.md#stars-suggested-post-future-max) seconds in the future.  

The channel administrator (or the user, for posts suggested by the channel to the user; in any case, for paid suggested posts, it's always the user that pays the channel, never the other way around) can then choose to:

* Accept the suggested post by invoking [messages.toggleSuggestedPostApproval](/method/messages.toggleSuggestedPostApproval.md), setting **only** `peer`, `msg_id` and optionally `schedule_date`, to modify the scheduling date.  
  This will emit a [messageActionSuggestedPostApproval](/constructor/messageActionSuggestedPostApproval.md) service message in reply to the suggestion (if not deleted) with the `schedule_date` and `price` flags populated accordingly, and the `reject` flag **not** set.  
  If the user's balance is too low for the suggested price, the message will not be scheduled/posted until enough stars are added to the user's balance, and a [messageActionSuggestedPostApproval](/constructor/messageActionSuggestedPostApproval.md) service message in reply to the suggestion (if not deleted) will be emitted with the `balance_too_low` and `price` flags populated, and the `reject` flag **not** set.  
  Once more stars are added to the user's balance, whoever is in charge of approval must re-invoke [messages.toggleSuggestedPostApproval](/method/messages.toggleSuggestedPostApproval.md).  

  The channel will receive the payment (for paid suggested posts) after the post is live on the channel for the number of seconds specified in the [stars_suggested_post_age_min client configuration parameter &raquo;](/api/config.md#stars-suggested-post-age-min) (i.e. starting from when it's actually posted, not from when it's added to the schedule queue): if the post is deleted before the required amount of seconds have elapsed, a [messageActionSuggestedPostRefund](/constructor/messageActionSuggestedPostRefund.md) will be emitted with **no** flags set in reply to the suggestion (if not deleted).  

  A [messageActionSuggestedPostRefund](/constructor/messageActionSuggestedPostRefund.md) with the `payer_initiated` flag set will also be emitted if the payer refunds the payment for the Stars that were used to pay for the post.  

  If everything goes well, after the amount of time specified above has elapsed a [messageActionSuggestedPostSuccess](/constructor/messageActionSuggestedPostSuccess.md) will be emitted.  

* Request a modification to the price, to the contents of the message or the scheduling date, by replying to the message with the same message, tweaked as needed; it's mandatory to also pass the same or a modified [suggestedPost](/constructor/suggestedPost.md) constructor to `suggested_post`.  
  In this case, it will be up to the receiver to accept, request a modification or reject the suggested post, using the same flow previously used by the channel administrator (in case of a further modification, it will be the channel's turn again, and so on).  
  Note that the channel may also suggest a post to the user unprompted (i.e. without replying to a post suggested by the user).  
* Reject the suggested post by invoking [messages.toggleSuggestedPostApproval](/method/messages.toggleSuggestedPostApproval.md), setting **only** `peer`, `msg_id`, `reject` and optionally `reject_comment`, to specify a reason for the rejection.  
  This will emit a [messageActionSuggestedPostApproval](/constructor/messageActionSuggestedPostApproval.md) service message in reply to the suggestion (if not deleted) with the `rejected` and `reject_comment` flags populated accordingly.  

The `accepted/rejected/schedule_date` flags of an approved/rejected [suggestedPost](/constructor/suggestedPost.md) will be updated accordingly within the message history.  

Once posted, the suggested channel post will have either the [message](/constructor/message.md).`paid_suggested_post_stars` or the [message](/constructor/message.md).`paid_suggested_post_ton` flag set, indicating that the specified post was a suggested post paid using Telegram Stars or Gram (in nanograms).