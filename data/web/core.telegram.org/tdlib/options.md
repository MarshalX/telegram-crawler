# TDLib options

[TDLib](/tdlib.md) has many options that affect the behavior of the library. Each option has a **name** and a **value**. **Value** may be of one of the following types:

|---|---|---|
|**Type of value**|**Default value**|**Value range**|
|Integer|0|64-bit integer|
|Boolean|false|True or false|
|String||Any Unicode string|

#List of options supported by TDLib#
Options not mentioned in this list may be safely ignored.

|---|---|---|
|**Name**|**Type**|**Writable**|**Description**|
|always_parse_markdown|Boolean|Yes|If true, text entities will be automatically parsed in all `inputMessageText` objects|
|disable_animated_emoji|Boolean|Yes|If true, animated emoji will be disabled and shown as plain emoji|
|disable_contact_registered_notifications|Boolean|Yes|If true, notifications about the user's contacts who have joined Telegram will be disabled. User will still receive the corresponding message in the private chat. `getOption` needs to be called explicitly to fetch the latest value of the option, changed from another device|
|disable_network_statistics|Boolean|Yes|*Since TDLib 1.8.24*. If true, then network statistics will be completely disabled|
|disable_persistent_network_statistics|Boolean|Yes|If true, persistent network statistics will be disabled, which significantly reduces disk usage|
|disable_sent_scheduled_message_notifications|Boolean|Yes|If true, notifications about outgoing scheduled messages that were sent will be disabled|
|disable_time_adjustment_protection|Boolean|Yes|If true, protection from external time adjustment will be disabled, which significantly reduces disk usage|
|disable_top_chats|Boolean|Yes|If true, support for top chats and statistics collection is disabled|
|ignore_background_updates|Boolean|Yes|If true, allows to skip all updates received while the TDLib instance was not running. The option does nothing if the database or secret chats are used|
|ignore_default_disable_notification|Boolean|Yes|If true, the `disable_notification` value specified in the request will be always used instead of the default value|
|ignore_file_names|Boolean|Yes|*Since TDLib 1.8.24*. If true, document file names will be ignored and numerical names will be used instead|
|ignore_inline_thumbnails|Boolean|Yes|If true, prevents file thumbnails sent by the server along with messages from being saved on the disk|
|ignore_platform_restrictions|Boolean|Yes|If true, chat and message restrictions specific to the currently used operating system will be ignored|
|ignore_sensitive_content_restrictions|Boolean|Yes|If true, sensitive content will be shown on all user devices. `getOption` needs to be called explicitly to fetch the latest value of the option, changed from another device|
|is_paid_reaction_anonymous|Boolean|Yes|*TDLib 1.8.36-1.8.44*. If true, added paid reactions are anonymous by default. If false, they are non-anonymous.|
|language_pack_database_path|String|Yes|Path to a database for storing language pack strings, so that this database can be shared between different accounts. By default, language pack strings are stored only in memory. Changes of value of this option will be applied only after TDLib restart, so it should be set before call to `setTdlibParameters`.|
|language_pack_id|String|Yes|Identifier of the currently used language pack from the current localization target|
|localization_target|String|Yes|Name for the current localization target (for example, "android", "android_x", "ios", "macos", "tdesktop", "unigram", "web", "webz")|
|message_unload_delay|Integer|Yes|The maximum time messages are stored in memory before they are unloaded, 60-86400; in seconds. Defaults to 60 for users and 1800 for bots|
|notification_group_count_max|Integer|Yes|The maximum number of notification groups to be shown simultaneously, 0-25|
|notification_group_size_max|Integer|Yes|The maximum number of simultaneously shown notifications in a group, 1-25. Defaults to 10|
|online|Boolean|Yes|Online status of the current user|
|prefer_ipv6|Boolean|Yes|If true, IPv6 addresses will be preferred over IPv4 addresses|
|process_pinned_messages_as_mentions|Boolean|Yes|*Since TDLib 1.8.24*. If true, then all pinned messages will be treated as mentions even posted without notification of chat members|
|use_pfs|Boolean|Yes|If true, Perfect Forward Secrecy will be enabled for interaction with the Telegram servers for cloud chats|
|use_quick_ack|Boolean|Yes|If true, quick acknowledgement will be enabled for outgoing messages|
|use_storage_optimizer|Boolean|Yes|If true, the background storage optimizer will be enabled|
|utc_time_offset|Integer|Yes|A UTC time offset used for splitting messages by days. The option is reset automatically on each TDLib instance launch, so it needs to be set manually only if the time offset is changed during execution.|
|active_story_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of active stories posted by the current user|
|added_shareable_chat_folder_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of added shareable chat folders for the current user|
|added_text_composition_style_count_max|Integer|No|*Since TDLib 1.8.65*. The maximum number of added custom text composition styles|
|affiliate_program_commission_per_mille_max|Integer|No|*Since TDLib 1.8.41*. The maximum commission that can be used for an affiliate program|
|affiliate_program_commission_per_mille_min|Integer|No|*Since TDLib 1.8.41*. The minimum commission that can be used for an affiliate program|
|animation_search_bot_username|String|No|Username of a bot which can be used in inline mode for animations search|
|anti_spam_bot_user_id|Integer|No|*Since TDLib 1.8.24*. User identifier of the Telegram Anti-Spam bot|
|authentication_token|String|No|An authentication token to be used on subsequent authorizations|
|authorization_date|Integer|No|Point in time (Unix timestamp) when authorization was received|
|basic_group_size_max|Integer|No|The maximum number of members in a basic group|
|bio_length_max|Integer|No|*Since TDLib 1.8.24*. The maximum allowed length of the current user's bio|
|bot_media_preview_count_max|Integer|No|*Since TDLib 1.8.34*. The maximum number of media previews that can be added for a bot|
|bot_verification_custom_description_length_max|Integer|No|*Since TDLib 1.8.42*. The maximum length of custom description for verification provided by a third-party organization|
|business_chat_link_count_max|Integer|No|*Since TDLib 1.8.28*. The maximum number of created short chat links by a Telegram Business account|
|business_start_page_message_length_max|Integer|No|*Since TDLib 1.8.28*. The maximum allowed length of the start page message of a Telegram Business account|
|business_start_page_title_length_max|Integer|No|*Since TDLib 1.8.28*. The maximum allowed length of the start page title of a Telegram Business account|
|call_connect_timeout_ms|Integer|No|The maximum time to wait for call connection creation to be passed to tgcalls|
|call_packet_timeout_ms|Integer|No|The maximum time to wait for call packet delivery to be passed to tgcalls|
|can_accept_calls|Boolean|No|*Since TDLib 1.8.48*. If true, the user can accept calls from this device|
|can_archive_and_mute_new_chats_from_unknown_users|Boolean|No|If true, new chats from unknown users can be automatically archived and muted via `archiveChatListSettings`|
|can_enable_paid_messages|Boolean|No|*Since TDLib 1.8.46*. If true, the user can enable paid messages|
|can_gift_stars|Boolean|No|*Since TDLib 1.8.34*. If true, Telegram Stars can be gifted to other users|
|can_ignore_sensitive_content_restrictions|Boolean|No|If true, the option "ignore_sensitive_content_restrictions" can be changed|
|can_preload_weather|Boolean|No|*Since TDLib 1.8.34*. If true, the current weather must be preloaded before adding the media area to the story. Otherwise, weather must be loaded only after the user has chosen weather media area.|
|can_set_new_chat_privacy_settings|Boolean|No|*Since TDLib 1.8.28*. If true, then the current user can change privacy settings for new chats|
|can_use_login_passkey|Boolean|No|*Since TDLib 1.8.59*. If true, then passkey can be used to log in and new passkeys can be added|
|can_use_text_entities_in_story_caption|Boolean|No|*Since TDLib 1.8.24*. If true, then the current user can use text entities in story captions|
|can_withdraw_chat_revenue|Boolean|No|*Since TDLib 1.8.28*. If true, then revenue from sponsored messages in chats can be withdrawn|
|channel_bot_user_id|Integer|No|Identifier of the bot which is shown as the sender of messages sent on behalf of channels when viewed from an outdated client|
|chat_available_reaction_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of manually chosen reactions for a chat|
|chat_boost_level_max|Integer|No|*Since TDLib 1.8.24*. The maximum boost level available to a chat|
|chat_folder_chosen_chat_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of always included or excluded chats in a chat folder for the current user|
|chat_folder_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of chat folders that the current user can have|
|chat_folder_invite_link_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of shareable chat folders with owned invite links|
|chat_folder_new_chats_update_period|Integer|No|*Since TDLib 1.8.24*. The minimum interval between calls to getChatFolderNewChats in shareable chat folders|
|checklist_task_count_max|Integer|No|*Since TDLib 1.8.51*. The maximum number of tasks in a checklist|
|checklist_task_text_length_max|Integer|No|*Since TDLib 1.8.51*. The maximum length of text of a task in a checklist|
|checklist_title_length_max|Integer|No|*Since TDLib 1.8.51*. The maximum length of title of a checklist|
|commit_hash|String|No|*Since TDLib 1.8.24*. If known, the hash of the source code commit that was used to build TDLib. Can be received synchronously.|
|community_bot_count_max|Integer|No|*Since TDLib 1.8.67*. The maximum number of bots that can be added to a community|
|community_chat_count_max|Integer|No|*Since TDLib 1.8.67*. The maximum number of supergroups and channels that can be added to a community|
|direct_channel_message_star_count_default|Integer|No|*Since TDLib 1.8.50*. Default value for the price of incoming messages in direct channels|
|enabled_proxy_id|Integer|No|Identifier of the enabled proxy|
|expect_blocking|Boolean|No|If true, access to Telegram is likely blocked for the user|
|fact_check_length_max|Integer|No|*Since TDLib 1.8.30*. The maximum allowed length of a fact-check|
|favorite_stickers_limit|Integer|No|The maximum number of favorite stickers|
|forwarded_message_count_max|Integer|No|The maximum number of forwarded messages per one request|
|gift_collection_count_max|Integer|No|*Since TDLib 1.8.53*. The maximum number of gift collections|
|gift_collection_size_max|Integer|No|*Since TDLib 1.8.54*. The maximum number of gifts in a gift collection|
|gift_premium_from_attachment_menu|Boolean|No|*Since TDLib 1.8.24*. If true, then a suggestion to gift Telegram Premium needs to be shown in the attachment menu if appropriate|
|gift_premium_from_input_field|Boolean|No|*Since TDLib 1.8.24*. If true, then a suggestion to gift Telegram Premium needs to be shown in the input field if appropriate|
|gift_resale_earnings_per_mille|Integer|No|*TDLib 1.8.49-1.8.52*. The amount of Telegram Stars received by the user for each 1000 Telegram Stars paid for gifts bought from them|
|gift_resale_gram_cent_count_max|Integer|No|*Since TDLib 1.8.65*. The maximum price in 1/100 of TON Gram for a gift that is available for resale|
|gift_resale_gram_cent_count_min|Integer|No|*Since TDLib 1.8.65*. The minimum price in 1/100 of TON Gram for a gift that is available for resale|
|gift_resale_gram_earnings_per_mille|Integer|No|*Since TDLib 1.8.65*. The amount of TON Grams received by the user for each 1000 Grams paid for gifts bought from them|
|gift_resale_star_count_max|Integer|No|*Since TDLib 1.8.49*. The maximum price in Telegram Stars for a gift that is available for resale|
|gift_resale_star_count_min|Integer|No|*Since TDLib 1.8.49*. The minimum price in Telegram Stars for a gift that is available for resale|
|gift_resale_star_earnings_per_mille|Integer|No|*Since TDLib 1.8.53*. The amount of Telegram Stars received by the user for each 1000 Telegram Stars paid for gifts bought from them|
|gift_resale_toncoin_cent_count_max|Integer|No|*TDLib 1.8.53-1.8.64*. The maximum price in 1/100 of TON Gram for a gift that is available for resale|
|gift_resale_toncoin_cent_count_min|Integer|No|*TDLib 1.8.53-1.8.64*. The minimum price in 1/100 of TON Gram for a gift that is available for resale|
|gift_resale_toncoin_earnings_per_mille|Integer|No|*TDLib 1.8.53-1.8.64*. The amount of TON Grams received by the user for each 1000 Grams paid for gifts bought from them|
|gift_sell_period|Integer|No|*Since TDLib 1.8.38*. The number of seconds after gift receiving for which it can be sold for Telegram Stars|
|gift_text_length_max|Integer|No|*Since TDLib 1.8.37*. The maximum length of a message added to a sent gift|
|giveaway_additional_chat_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of additional chats that can be added to a giveaway|
|giveaway_boost_count_per_premium|Integer|No|*Since TDLib 1.8.24*. The number of boosts that received by the channel for each giveaway prize|
|giveaway_country_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of countries that can be added to a giveaway|
|giveaway_duration_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of additional chats that can be added to a giveaway|
|gram_top_up_url|String|No|*Since TDLib 1.8.65*. The URL that can be used to top up TON Gram balance of the current user|
|group_anonymous_bot_user_id|Integer|No|Identifier of the bot which is shown as the sender of anonymous messages in groups when viewed from an outdated client|
|group_call_message_text_length_max|Integer|No|*Since TDLib 1.8.56*. The maximum length of a message text in a group call that isn't a live story|
|group_call_participant_count_max|Integer|No|*Since TDLib 1.8.48*. The maximum number of participants in a group call that is not bound to a chat|
|is_premium|Boolean|No|*Since TDLib 1.8.24*. If true, then the current user subscribed to Telegram Premium|
|is_premium_available|Boolean|No|*Since TDLib 1.8.24*. If true, then the current user can subscribe to Telegram Premium. Otherwise, all premium-related features must be hidden|
|login_passkey_count_max|Integer|No|*Since TDLib 1.8.59*. The maximum number of login passkeys that can be added|
|message_caption_length_max|Integer|No|The maximum length of a message caption|
|message_reply_quote_length_max|Integer|No|*Since TDLib 1.8.24*. The maximum length of quote from the replied message|
|message_text_length_max|Integer|No|The maximum length of a message text|
|million_gram_to_usd_rate|Integer|No|*Since TDLib 1.8.65*. The number of US dollars that can be received by selling 1000000 TON Grams on a third-party exchange|
|million_toncoin_to_usd_rate|Integer|No|*TDLib 1.8.52-1.8.64*. The number of US dollars that can be received by selling 1000000 TON Grams on a third-party exchange|
|monthly_sent_story_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of stories that can be posted per month by the current user|
|my_id|Integer|No|Identifier of the current user|
|notification_sound_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of saved notification sounds|
|notification_sound_duration_max|Integer|No|*Since TDLib 1.8.24*. The maximum duration of an audio that can be used as a notification sound|
|notification_sound_size_max|Integer|No|*Since TDLib 1.8.24*. The maximum size of the audio file that can be used as a notification sound|
|owned_bot_count_max|Integer|No|*Since TDLib 1.8.63*. The maximum number of bots that can be owned by the current user|
|paid_group_call_message_star_count_max|Integer|No|*Since TDLib 1.8.57*. The maximum number of Telegram Stars that can be set as the price for paid group call messages|
|paid_media_message_star_count_max|Integer|No|*Since TDLib 1.8.32*. The maximum price of a paid post in Telegram Stars|
|paid_message_earnings_per_mille|Integer|No|*Since TDLib 1.8.46*. The amount of Telegram Stars received by the user or the supergroup for each 1000 Telegram Stars paid for their incoming messages|
|paid_message_star_count_max|Integer|No|*Since TDLib 1.8.46*. The maximum number of Telegram Stars that can be set as the price for paid messages|
|paid_reaction_star_count_max|Integer|No|*Since TDLib 1.8.35*. The maximum number of Telegram Stars that can be added as paid reaction to a message in one request|
|pending_text_message_period|Integer|No|*Since TDLib 1.8.56*. The maximum number of seconds to show a pending message from a bot|
|photo_search_bot_username|String|No|Username of a bot which can be used in inline mode for photos search|
|pinned_archived_chat_count_max|Integer|No|The maximum number of pinned cloud chats in the Archive chat list for the current user. The same amount of secret chats can be pinned locally|
|pinned_chat_count_max|Integer|No|The maximum number of pinned cloud chats in the Main chat list for the current user. The same amount of secret chats can be pinned locally|
|pinned_forum_topic_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of pinned forum topics|
|pinned_gift_count_max|Integer|No|*Since TDLib 1.8.46*. The maximum number of pinned unique gifts|
|pinned_saved_messages_topic_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of pinned topics in Saved Messages for the current user|
|pinned_story_count_max|Integer|No|*Since TDLib 1.8.29*. The maximum number of pinned stories on a chat page|
|poll_answer_count_max|Integer|No|*Since TDLib 1.8.50*. The maximum number of options in a poll message|
|poll_country_count_max|Integer|No|*Since TDLib 1.8.63*. The maximum number of countries for which a poll can be restricted|
|poll_open_period_max|Integer|No|*Since TDLib 1.8.63*. The maximum amount of time after which the poll may be automatically closed; in seconds|
|premium_download_speedup|Integer|No|*Since TDLib 1.8.28*. Approximate number of times file download speed will increase if the user subscribes to Telegram Premium|
|premium_gift_boost_count|Integer|No|*Since TDLib 1.8.24*. The number of boosts that is obtained by gifting Telegram Premium to another user|
|premium_upload_speedup|Integer|No|*Since TDLib 1.8.28*. Approximate number of times file upload speed will increase if the user subscribes to Telegram Premium|
|quick_reply_shortcut_count_max|Integer|No|*Since TDLib 1.8.28*. The maximum number of quick reply shortcuts that can be created by a Telegram Business account|
|quick_reply_shortcut_message_count_max|Integer|No|*Since TDLib 1.8.28*. The maximum number of messages that can be added to a quick reply shortcut by a Telegram Business account|
|replies_bot_chat_id|Integer|No|Identifier of the @replies bot|
|rich_message_block_count_max|Integer|No|*Since TDLib 1.8.65*. The maximum number of blocks in a rich message|
|rich_message_depth_max|Integer|No|*Since TDLib 1.8.65*. The maximum depth of nested blocks in a rich message|
|rich_message_media_count_max|Integer|No|*Since TDLib 1.8.65*. The maximum number of media files in a rich message|
|rich_message_table_column_count_max|Integer|No|*Since TDLib 1.8.65*. The maximum number of columns in a table of a rich message|
|rich_message_text_length_max|Integer|No|*Since TDLib 1.8.65*. The maximum length of a rich message text|
|show_message_edit_date_by_default|Boolean|No|If true, then message edit date must be shown along the message instead of the message send date|
|stake_dice_stake_amount_max|Integer|No|*Since TDLib 1.8.60*. The maximum amount of TON Grams that can be staked for a roll in nanograms|
|stake_dice_stake_amount_min|Integer|No|*Since TDLib 1.8.60*. The minimum amount of TON Grams that can be staked for a roll in nanograms|
|star_withdrawal_count_max|Integer|No|*Since TDLib 1.8.52*. The maximum number of Telegram Stars that can be withdrawn|
|star_withdrawal_count_min|Integer|No|*Since TDLib 1.8.31*. The minimum number of Telegram Stars that can be withdrawn|
|story_album_count_max|Integer|No|*Since TDLib 1.8.53*. The maximum number of story albums|
|story_album_size_max|Integer|No|*Since TDLib 1.8.54*. The maximum number of stories in a story album|
|story_caption_length_max|Integer|No|*Since TDLib 1.8.24*. The maximum length of story caption for the current user|
|story_link_area_count_max|Integer|No|*Since TDLib 1.8.31*. The maximum number of link areas that can be added to a story by Telegram Premium users|
|story_stealth_mode_cooldown_period|Integer|No|*Since TDLib 1.8.24*. The number of seconds that must pass between before Stealth Mode can be enabled again|
|story_stealth_mode_future_period|Integer|No|*Since TDLib 1.8.24*. The number of seconds in the future the Stealth Mode will last|
|story_stealth_mode_past_period|Integer|No|*Since TDLib 1.8.24*. The number of seconds in the past during which all views of stories from the current user will be hidden if Stealth Mode is enabled|
|story_suggested_reaction_area_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of suggested reaction areas that can be added to a story|
|story_viewers_expiration_delay|Integer|No|*Since TDLib 1.8.24*. The number of seconds after story expiration date for which story viewers still can be received|
|subscription_star_count_max|Integer|No|*Since TDLib 1.8.35*. The maximum number of Telegram Stars that can be asked for monthly subscription to a chat|
|suggested_language_pack_id|String|No|Identifier of the language pack, suggested for the user by the server|
|suggested_post_gram_cent_count_max|Integer|No|*Since TDLib 1.8.65*. The maximum price of a suggested post in TON Gram cents|
|suggested_post_gram_cent_count_min|Integer|No|*Since TDLib 1.8.65*. The minimum price of a suggested post in TON Gram cents|
|suggested_post_gram_earnings_per_mille|Integer|No|*Since TDLib 1.8.65*. The amount of TON Grams received by a channel for each 1000 Grams paid for suggested post publication in the channel|
|suggested_post_lifetime_min|Integer|No|*Since TDLib 1.8.52*. The minimum amount of time for which a suggested post must be published in a channel to receive payment for the post; in seconds|
|suggested_post_send_delay_max|Integer|No|*Since TDLib 1.8.52*. The maximum delay for suggested post publish date; in seconds|
|suggested_post_send_delay_min|Integer|No|*Since TDLib 1.8.52*. The minimum delay for suggested post publish date; in seconds|
|suggested_post_star_count_max|Integer|No|*Since TDLib 1.8.52*. The maximum price of a suggested post in Telegram Stars|
|suggested_post_star_count_min|Integer|No|*Since TDLib 1.8.52*. The minimum price of a suggested post in Telegram Stars|
|suggested_post_star_earnings_per_mille|Integer|No|*Since TDLib 1.8.52*. The amount of Telegram Stars received by a channel for each 1000 Telegram Stars paid for suggested post publication in the channel|
|suggested_post_toncoin_cent_count_max|Integer|No|*TDLib 1.8.52-1.8.64*. The maximum price of a suggested post in TON Gram cents|
|suggested_post_toncoin_cent_count_min|Integer|No|*TDLib 1.8.52-1.8.64*. The minimum price of a suggested post in TON Gram cents|
|suggested_post_toncoin_earnings_per_mille|Integer|No|*TDLib 1.8.52-1.8.64*. The amount of TON Grams received by a channel for each 1000 Grams paid for suggested post publication in the channel|
|suggested_video_note_audio_bitrate|Integer|No|Suggested bit rate for audio encoding in video notes, in kbit/s|
|suggested_video_note_length|Integer|No|Suggested width and height of the video in video notes|
|suggested_video_note_video_bitrate|Integer|No|Suggested bit rate for video encoding in video notes, in kbit/s|
|supergroup_size_max|Integer|No|The maximum number of members in a supergroup|
|t_me_url|String|No|Current value of t.me URL, i.e. `https://t.me/`|
|telegram_service_notifications_chat_id|Integer|No|Identifier of the Telegram Service Notifications chat|
|test_mode|Boolean|No|If true, the test environment is being used instead of the production environment|
|text_composition_style_example_count|Integer|No|*Since TDLib 1.8.64*. The number of examples that are available for each text composition style|
|text_composition_style_prompt_length_max|Integer|No|*Since TDLib 1.8.64*. The maximum allowed length of the text composition style prompt|
|text_composition_style_title_length_max|Integer|No|*Since TDLib 1.8.64*. The maximum allowed length of the text composition style title|
|thousand_star_to_usd_rate|Integer|No|*Since TDLib 1.8.35*. The number of US dollars that can be received by withdrawing 1000 Telegram Stars|
|ton_blockchain_explorer_url|String|No|*Since TDLib 1.8.45*. A prefix of the URL that can be used to get information about a TON blockchain address|
|toncoin_top_up_url|String|No|*TDLib 1.8.52-1.8.64*. The URL that can be used to top up TON Gram balance of the current user|
|unix_time|Integer|No|An estimation of the current Unix timestamp. The option will not be updated automatically unless the difference between the previous estimation and the locally available monotonic clocks changes significantly|
|usd_to_thousand_star_rate|Integer|No|*Since TDLib 1.8.35*. The number of US dollars needed to buy 1000 Telegram Stars|
|user_note_text_length_max|Integer|No|*Since TDLib 1.8.56*. The maximum length of text of a user note|
|venue_search_bot_username|String|No|Username of a bot which can be used in inline mode for venues search|
|verification_codes_bot_chat_id|Integer|No|*Since TDLib 1.8.37*. Identifier of the Verification Codes chat with codes from Telegram Gateway|
|version|String|No|TDLib version. This options is guaranteed to come before all other updates. Can be received synchronously.|
|web_app_allowed_protocols|String|No|*Since TDLib 1.8.32*. A space-separated list of URL protocols that are allowed to be open by the call to `web_app_open_link` from Web Apps.|
|weekly_sent_story_count_max|Integer|No|*Since TDLib 1.8.24*. The maximum number of stories that can be posted per week by the current user|
|welcome_message_count_max|Integer|No|*Since TDLib 1.8.67*. The maximum number of welcome messages that can be added for a chat|

Additionally any option beginning with 'x' or 'X' is writeable and can be safely used by the application to persistently store some small amount of data.
