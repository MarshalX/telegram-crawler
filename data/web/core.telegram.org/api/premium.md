# Telegram Premium


Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app. It is a part of Telegram’s **sustainable monetization** – driven by our users, rather than advertisers or shareholders. This way, Telegram can remain independent and prioritize its users first.  

>This page describes how client apps should handle Premium features: for a user-friendly overview of Telegram Premium features, see the [Telegram Premium FAQ](https://telegram.org/faq_premium).

### Telegram Premium users

    inputUserSelf#f7c1b13f = InputUser;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    help.premiumPromo#5334759c status_text:string status_entities:Vector<MessageEntity> video_sections:Vector<string> videos:Vector<Document> period_options:Vector<PremiumSubscriptionOption> users:Vector<User> = help.PremiumPromo;

    ---functions---

    users.getUsers#d91a548 id:Vector<InputUser> = Vector<User>;
    help.getPremiumPromo#b81b93d4 = help.PremiumPromo;

Premium users will have the `premium` flag of the [user](/constructor/user.md) set.  

Use [users.getUsers](/method/users.getUsers.md) with [inputUserSelf](/constructor/inputUserSelf.md) to fetch info about the current subscription status of the current user.  
You can also directly use [help.getPremiumPromo](/method/help.getPremiumPromo.md), as it will return info about the current user in the `users` field.  

### Telegram Premium features

Telegram Premium offers a set of additional features and raised limits: clients should be aware of the current subscription status to accordingly modify client behavior.  

#### Promo page

    help.premiumPromo#5334759c status_text:string status_entities:Vector<MessageEntity> video_sections:Vector<string> videos:Vector<Document> period_options:Vector<PremiumSubscriptionOption> users:Vector<User> = help.PremiumPromo;

    ---functions---
    
    help.getPremiumPromo#b81b93d4 = help.PremiumPromo;
    help.getAppConfig#61e3f854 hash:int = help.AppConfig;

The [help.premiumPromo](/constructor/help.premiumPromo.md) constructor returned by [help.getPremiumPromo](/method/help.getPremiumPromo.md) contains various info about the subscription, as described in the [constructor page](/constructor/help.premiumPromo.md).

Clients should show a Telegram Premium button in the settings.  
Clicking on this button in the settings, clicking on the [badge](#badge) of a Premium user or hitting one of the Premium limits listed below should open a Telegram Premium modal.  

Call [help.getPremiumPromo](/method/help.getPremiumPromo.md) and [help.getAppConfig](/method/help.getAppConfig.md) to fetch info on how to build the premium modal.  

[help.getAppConfig](/method/help.getAppConfig.md) will return a list of Premium feature identifiers in the [`premium_promo_order` appConfig field](/api/config.md#premium-promo-order): the modal should contain a row for each returned feature, ordered as specified in the returned array.  

These feature identifiers must be used when [subscribing to Telegram Premium](#subscribing-to-telegram-premium) if the related limit was hit.  

Possible feature identifiers:

<!-- start premium features 5 -->

##### `stories`

[Telegram Premium](/api/premium.md) adds some [story-related](/api/stories.md) features.

Story-related Premium features also have certain sub-identifiers, which are used if the user chooses to [subscribe to Telegram Premium](/api/premium.md#subscribing-to-telegram-premium) after hitting one of the following story-related limitations.  

If the user instead signs up simply after reading the promo page for story-related features, pass just `stories` as feature identifier.  

Here's the full list of story-related features and their sub-identifiers (contained in the title header):

<!-- start premium story features 6 -->

###### `stories__priority_order`

Stories posted by Premium users are shown first to users when fetching the list of active stories with [stories.getAllStories&nbsp;&raquo;](/method/stories.getAllStories.md).

###### `stories__stealth_mode`

Premium users can activate [stealth mode&nbsp;&raquo;](/api/stories.md#stealth-mode).

###### `stories__permanent_views_history`

Premium users can [fetch the full viewer list of stories, even after they expire&nbsp;&raquo;](/api/stories.md#fetching-the-interaction-list)

###### `stories__expiration_durations`

Premium users can set [custom expiration options when posting stories&nbsp;&raquo;](/api/stories.md)

###### `stories__save_stories_to_gallery`

Premium users can save other users' unprotected stories.

###### `stories__links_and_formatting`

Premium users can use [styled text entities](/api/entities.md) and links in story captions and [URL media areas](/api/stories.md#urls), as specified by the [stories_entities&nbsp;&raquo;](/api/config.md#stories-entities) config key.

###### `stories__quality`

Premium users can view stories in a higher quality.

<!-- end premium story features -->

There are a few more Premium story features that are listed in the [limits &raquo;](#double-limits) section.  

See the [stories documentation&nbsp;&raquo;](/api/stories.md) for more information on stories.

##### `double_limits`

Clicking on this entry should open a secondary popup with a list of the improved Premium limits, as follows.

Limit-related Premium features also have certain sub-identifiers, which are used if the user chooses to [subscribe to Telegram Premium](/api/premium.md#subscribing-to-telegram-premium) after hitting one of the following limitations.  

If the user instead signs up simply after reading the promo page for limits, pass just `double_limits` as feature identifier.  

Here's the full list of improved limits and their sub-identifiers (contained in the title header):

<!-- start premium limits 6 -->

###### `double_limits__channels`

Config keys: [channels_limit_premium &raquo;](/api/config.md#channels-limit-premium)/[channels_limit_default &raquo;](/api/config.md#channels-limit-default)

The maximum number of [channels and supergroups](/api/channel.md) a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may join (integer)

###### `double_limits__saved_gifs`

Config keys: [saved_gifs_limit_premium &raquo;](/api/config.md#saved-gifs-limit-premium)/[saved_gifs_limit_default &raquo;](/api/config.md#saved-gifs-limit-default)

The maximum number of GIFs a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may save (integer)

###### `double_limits__stickers_faved`

Config keys: [stickers_faved_limit_premium &raquo;](/api/config.md#stickers-faved-limit-premium)/[stickers_faved_limit_default &raquo;](/api/config.md#stickers-faved-limit-default)

The maximum number of stickers a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may [add to Favorites&nbsp;&raquo;](/api/stickers.md#favorite-stickersets) (integer)

###### `double_limits__dialog_filters`

Config keys: [dialog_filters_limit_premium &raquo;](/api/config.md#dialog-filters-limit-premium)/[dialog_filters_limit_default &raquo;](/api/config.md#dialog-filters-limit-default)

The maximum number of [folders](/api/folders.md) a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may create (integer)

###### `double_limits__dialog_filters_chats`

Config keys: [dialog_filters_chats_limit_premium &raquo;](/api/config.md#dialog-filters-chats-limit-premium)/[dialog_filters_chats_limit_default &raquo;](/api/config.md#dialog-filters-chats-limit-default)

The maximum number of chats a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may add to a [folder](/api/folders.md) (integer)

###### `double_limits__dialogs_pinned`

Config keys: [dialogs_pinned_limit_premium &raquo;](/api/config.md#dialogs-pinned-limit-premium)/[dialogs_pinned_limit_default &raquo;](/api/config.md#dialogs-pinned-limit-default)

The maximum number of chats a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may pin (integer)

###### `double_limits__dialogs_folder_pinned`

Config keys: [dialogs_folder_pinned_limit_premium &raquo;](/api/config.md#dialogs-folder-pinned-limit-premium)/[dialogs_folder_pinned_limit_default &raquo;](/api/config.md#dialogs-folder-pinned-limit-default)

The maximum number of chats a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may pin in a folder (integer)

###### `double_limits__channels_public`

Config keys: [channels_public_limit_premium &raquo;](/api/config.md#channels-public-limit-premium)/[channels_public_limit_default &raquo;](/api/config.md#channels-public-limit-default)

The maximum number of public [channels or supergroups](/api/channel.md) a [Premium](/api/premium.md)/non-[Premium](/api/premium.md) user may create (integer)

###### `double_limits__caption_length`

Config keys: [caption_length_limit_premium &raquo;](/api/config.md#caption-length-limit-premium)/[caption_length_limit_default &raquo;](/api/config.md#caption-length-limit-default)

The maximum UTF-8 length of media captions sendable by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users (integer)

###### `double_limits__about_length`

Config keys: [about_length_limit_premium &raquo;](/api/config.md#about-length-limit-premium)/[about_length_limit_default &raquo;](/api/config.md#about-length-limit-default)

The maximum UTF-8 length of bios of [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users (integer)

###### `double_limits__chatlist_invites`

Config keys: [chatlist_invites_limit_premium &raquo;](/api/config.md#chatlist-invites-limit-premium)/[chatlist_invites_limit_default &raquo;](/api/config.md#chatlist-invites-limit-default)

Maximum number of per-folder [chat folder deep links »](/api/links.md#chat-folder-links) that can be created by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users. (integer)

###### `double_limits__chatlists_joined`

Config keys: [chatlists_joined_limit_premium &raquo;](/api/config.md#chatlists-joined-limit-premium)/[chatlists_joined_limit_default &raquo;](/api/config.md#chatlists-joined-limit-default)

Maximum number of [shareable folders](/api/links.md#chat-folder-links) [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users may have. (integer)

###### `double_limits__story_expiring`

Config keys: [story_expiring_limit_premium &raquo;](/api/config.md#story-expiring-limit-premium)/[story_expiring_limit_default &raquo;](/api/config.md#story-expiring-limit-default)

The maximum number of active [stories](/api/stories.md) for [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users (integer).

###### `double_limits__story_caption_length`

Config keys: [story_caption_length_limit_premium &raquo;](/api/config.md#story-caption-length-limit-premium)/[story_caption_length_limit_default &raquo;](/api/config.md#story-caption-length-limit-default)

The maximum UTF-8 length of story captions for [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users. (integer)

###### `double_limits__stories_sent_weekly`

Config keys: [stories_sent_weekly_limit_premium &raquo;](/api/config.md#stories-sent-weekly-limit-premium)/[stories_sent_weekly_limit_default &raquo;](/api/config.md#stories-sent-weekly-limit-default)

Maximum number of stories that can be sent in a week by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users. (integer)

###### `double_limits__stories_sent_monthly`

Config keys: [stories_sent_monthly_limit_premium &raquo;](/api/config.md#stories-sent-monthly-limit-premium)/[stories_sent_monthly_limit_default &raquo;](/api/config.md#stories-sent-monthly-limit-default)

Maximum number of stories that can be sent in a month by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users. (integer)

###### `double_limits__stories_suggested_reactions`

Config keys: [stories_suggested_reactions_limit_premium &raquo;](/api/config.md#stories-suggested-reactions-limit-premium)/[stories_suggested_reactions_limit_default &raquo;](/api/config.md#stories-suggested-reactions-limit-default)

Maximum number of [story reaction media areas&nbsp;&raquo;](/api/stories.md#media-areas) that can be added to a story by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users. (integer)

###### `double_limits__recommended_channels`

Config keys: [recommended_channels_limit_premium &raquo;](/api/config.md#recommended-channels-limit-premium)/[recommended_channels_limit_default &raquo;](/api/config.md#recommended-channels-limit-default)

The maximum number of similar channels that can be recommended by [channels.getChannelRecommendations&raquo;](/method/channels.getChannelRecommendations.md) to [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users. (integer)

###### `double_limits__saved_dialogs_pinned`

Config keys: [saved_dialogs_pinned_limit_premium &raquo;](/api/config.md#saved-dialogs-pinned-limit-premium)/[saved_dialogs_pinned_limit_default &raquo;](/api/config.md#saved-dialogs-pinned-limit-default)

Maximum number of pinned dialogs in [saved messages](/api/saved-messages.md) for [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users.  (integer)

###### `double_limits__bots_create`

Config keys: [bots_create_limit_default &raquo;](/api/config.md#bots-create-limit-premium)/[bots_create_limit_premium &raquo;](/api/config.md#bots-create-limit-default)

Maximum number of [bots](/api/bots.md) that can be owned by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users.  (integer)

###### `double_limits__aicompose_tone_saved`

Config keys: [aicompose_tone_saved_limit_premium &raquo;](/api/config.md#aicompose-tone-saved-limit-premium)/[aicompose_tone_saved_limit_default &raquo;](/api/config.md#aicompose-tone-saved-limit-default)

Maximum number of [custom AI composer tones &raquo;](/api/ai.md#ai-compose-tones) that can be installed by [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users.  (integer)

<!-- end premium limits -->

##### `business`

Premium users currently have access to subscription-gated [Telegram Business features&nbsp;&raquo;](/api/business.md); [connected business bots&nbsp;&raquo;](/api/bots/connected-business-bots.md) are also available to non-Premium users.

##### `last_seen`

Premium users can view the last seen and message read times of other users even if they can't view the last seen or read time for the current user.

##### `message_privacy`

Premium users can disallow incoming voice and video note messages in private chats using [inputPrivacyKeyVoiceMessages](/constructor/inputPrivacyKeyVoiceMessages.md) and [restrict incoming messages from non-contacts](/api/privacy.md#require-premium-for-new-non-contact-users).

##### `more_upload`

Premium users can upload bigger files, as specified by the [upload_max_fileparts_default](/api/config.md#upload-max-fileparts-default) vs [upload_max_fileparts_premium](/api/config.md#upload-max-fileparts-premium) config keys.

##### `faster_download`

Premium users have no download speed limits (i.e. they can't receive `FLOOD_PREMIUM_WAIT_X` errors when downloading files, see [here&nbsp;&raquo;](/api/files.md) for more info).

##### `wallpapers`

Premium users [can set custom chat wallpapers both for them and the other user in the chat](/api/wallpapers.md#installing-wallpapers-in-a-specific-chat-or-channel).

##### `peer_colors`

Premium users can [choose a custom color and background emoji for their profile background and messages](/api/colors.md).

##### `voice_to_text`

Premium users can [transcribe voice messages without limits](/api/transcribe.md).

##### `translations`

Premium users can enable [real-time chat translation](/api/translation.md).

##### `no_ads`

Premium users see no [sponsored messages](/api/sponsored-messages.md).

##### `unique_reactions`

Premium users have access to more [message reactions](/api/reactions.md).

##### `premium_stickers`

Premium users have access to premium [stickersets](/api/stickers.md).

##### `animated_emoji`

Premium users can send custom [animated emojis](/api/custom-emoji.md).

##### `advanced_chat_management`

Premium users can [reorder the default folder](/api/folders.md), auto-archive and hide new chats from non-contacts.

##### `profile_badge`

Premium users have a [badge](#badge) next to their name, showing that they are helping support Telegram.

##### `animated_userpics`

[Animated profile pictures](/api/files.md#animated-profile-pictures) of Premium users will play in-chat and when browsing the dialog list.

##### `app_icons`

Premium users can change the default icon of the Telegram app.

##### `infinite_reactions`

Premium users can use [custom emojis](/api/custom-emoji.md) when [reacting to messages](/api/reactions.md).

##### `emoji_status`

Premium users can set a [status emoji](/api/emoji-status.md).

##### `saved_tags`

Premium users can use [saved message tags](/api/saved-messages.md#tags).

##### `effects`

Premium users can use [message effects](/api/effects.md).

##### `channel_boost`

Premium users can [boost chats and channels](/api/boost.md).

##### `forum_topic_icon`

Premium users can set a [custom emoji](/api/custom-emoji.md) as a [forum topic icon](/api/forum.md)

##### `todo`

Premium users can [post todo lists &raquo;](/api/todo.md)

##### `paid_messages`

Premium users can [require payment in Telegram stars in order to receive messages from new users &raquo;](/api/paid-messages.md).

##### `pm_noforwards`

Premium users can [enable content protection in private chats &raquo;](/api/content-protection.md#for-users).

##### `ai_compose`

Premium users have **50x** more [AI text transformations &raquo;](/api/ai.md#compose-messages) per day.

<!-- end premium features -->

#### Badge

Users with a Telegram Premium subscription ([user](/constructor/user.md).`premium` is set) should have a Telegram Premium badge next to their name.  

#### Animated profile pictures

The [animated profile pictures](/api/files.md#animated-profile-pictures) of Premium users should play inside of chats and dialog lists, and not just when opening the profile page.

#### Sticker suggestions

The suggested sticker selection logic is slightly different for Premium users, see [here for more info&nbsp;&raquo;](/api/stickers.md#sticker-suggestions).

### Subscribing to Telegram Premium

Here's how to activate a Telegram Premium subscription, when the user clicks on the subscribe button:

* If the `premium_bot_username` field is set, call [messages.startBot](/method/messages.startBot.md), specifying the following parameters:
  * `peer` and `bot`: The bot mentioned in `premium_bot_username`
  * `start_param`: One of the following values:
    * If the user clicks on the subscribe button when viewing the promo page for a specific Premium feature, provide the [feature identifier](#telegram-premium-features) (or an empty string if opened from the main promo page).
    * If the user clicks on the subscribe button when viewing the promo page for a specific [Telegram Business](/api/business.md#business-features-promo-page) feature, provide the business [feature identifier](/api/business.md#business-features-promo-page) (or `business` if opened from the main business promo page).
    * If the user clicks on the subscribe button after hitting a limit that Telegram Premium raises, provide one of the [limit identifiers](#double-limits)
    * If the user clicks on the subscribe button after hitting a [story-related](/api/stories.md) limit that Telegram Premium raises, provide one of the [story feature identifiers](#stories)
    * If the user clicks on the subscribe button from the Telegram Premium button in the settings, provide `settings`
    * If the user clicks on the subscribe button from the Telegram Premium star in a profile page, provide `profile`
    * If the user opened a [premium referrer link](/api/links.md#premium-referrer-links), provide `deeplink` if the `referrer` is empty, and `deeplink_$referrer` if non-empty.
  Then, when the user clicks on the subscribe button in the sent invoice, follow the [usual payment flow for message invoices](/api/payments.md).  
* Otherwise, if the `premium_invoice_slug` field is set, handle the payment as you would handle a `t.me/$premium_invoice_slug` [invoice deep link](/api/links.md#invoice-links).

There is also a store-based subscription flow based on [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md)/[payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md), but it's currently not available to third-party apps (unlike the flow described above, which can be used by all clients).

### Gifting Telegram Premium

Note: to gift Premium subscriptions to multiple friends, the alternative payment flow [described here&nbsp;&raquo;](/api/giveaways.md) ([inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md) without setting `boost_peer`) must be used, instead.  

    premiumGiftCodeOption#257e962b flags:# users:int months:int store_product:flags.0?string store_quantity:flags.1?int currency:string amount:long = PremiumGiftCodeOption;

    inputInvoicePremiumGiftStars#dabab2ef flags:# user_id:InputUser months:int message:flags.0?TextWithEntities = InputInvoice;

    messageActionGiftPremium#48e91302 flags:# currency:string amount:long days:int crypto_currency:flags.0?string crypto_amount:flags.0?long message:flags.1?TextWithEntities = MessageAction;

    inputStickerSetPremiumGifts#c88b3b02 = InputStickerSet;

    ---functions---

    payments.getPremiumGiftCodeOptions#2757ba54 flags:# boost_peer:flags.0?InputPeer = Vector<PremiumGiftCodeOption>;

If the other user in a private chat doesn't have a Premium subscription, we can gift them a non-recurring Telegram Premium subscription.  

If the [userFull](/constructor/userFull.md).`display_gifts_button` flag of both us and another user is set (changed through [globalPrivacySettings](/constructor/globalPrivacySettings.md)), a gift button should always be displayed in the text field in private chats with the other user: once clicked, the gift UI should be displayed, offering the user options to gift [Telegram Premium &raquo;](/api/premium.md#gifting-telegram-premium) subscriptions or [Telegram Gifts &raquo;](/api/gifts.md). 

The same gifting UI should always be (unconditionally) available through a chat picker, activated by a "Send a Gift" entry in the app's settings.  

Users may disallow the reception of specific gift types by populating the [globalPrivacySettings](/constructor/globalPrivacySettings.md).`disallowed_gifts` flag, visible to other users in [userFull](/constructor/userFull.md).`disallowed_gifts`.  

To obtain available gift options for Telegram Premium, invoke [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md).  

The returned [premiumGiftCodeOption](/constructor/premiumGiftCodeOption.md) constructors are an ordered list of Premium gift offers with discounts over the base price, according to the subscription duration.  

Filter out only options where `users == 1` (options where `users > 1` are used for [giveaways](/api/giveaways.md)).  

Each `users/months` combo can have up to two options: one in the user's native currency, and the other (optionally) in [Telegram Stars](/api/stars.md) (`currency == "XTR"`).  

Unofficial clients should display and use only the options where `currency`=`XTR`.  

To gift a Telegram Premium subscription paying with [Telegram Stars](/api/stars.md), create an [inputInvoicePremiumGiftStars](/constructor/inputInvoicePremiumGiftStars.md), then follow the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

Once the payment is successfully processed, the user to which the gift was sent will automatically receive a [messageService](/constructor/messageService.md) from the user that sent the gift, containing a [messageActionGiftPremium](/constructor/messageActionGiftPremium.md) constructor with further info about the price and duration of the gifted Telegram Premium subscription.  
Clients should display this message, along with a sticker from the [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md) [stickerset](/api/stickers.md): here's an [example](https://telegram.org/blog/custom-emoji#gifting-telegram-premium).  

Note that if the `premium_gift_attach_menu_icon` [app configuration parameter](/api/config.md#client-configuration) is `true`, a gift icon should be shown in the attachment menu in private chats with users, offering the current user to gift a [Telegram Premium](/api/premium.md) subscription to the other user in the chat.  

If the `premium_gift_text_field_icon` parameter is also set, a gift icon should be shown in the text bar in private chats with users (i.e. like the `/` icon in chats with bots), offering the current user to gift a [Telegram Premium](/api/premium.md) subscription to the other user in the chat. Can only be true if `premium_gift_attach_menu_icon` is also true.

Note that even if the `premium_gifts` field is not set, we can still gift one (or more!) Premium subscriptions using the alternative payment flow [described here&nbsp;&raquo;](/api/giveaways.md) ([inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md) without setting `boost_peer`).  

Gifting a [Telegram Premium](/api/premium.md) subscription to another user will create [boosts_per_sent_gift](/api/config.md#boosts-per-sent-gift) [boost slots&nbsp;&raquo;](/api/boost.md) for us, and one boost slot for the destination user.  

### Blocked Telegram Premium

If the `premium_purchase_blocked` [app configuration parameter](/api/config.md#client-configuration) is set, the user can't purchase a Premium account, and all Telegram Premium features must be hidden (like the [badges](#badge) of Premium users, Telegram Premium purchase buttons, and so on).  

