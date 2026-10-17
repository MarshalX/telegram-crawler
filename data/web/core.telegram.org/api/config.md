# Client configuration


The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.  

### Machine-readable configuration index

Unlike the client-side and MTProto configuration parameters described below (which are fetched at runtime with [help.getAppConfig](/method/help.getAppConfig.md) and [help.getConfig](/method/help.getConfig.md)), the API also relies on a number of **API constants**: sets of identifiers and enumerated values that are **not** returned by [help.getAppConfig](/method/help.getAppConfig.md) or [help.getConfig](/method/help.getConfig.md), but are instead hardcoded into official clients and change from layer to layer.  

Examples include client configuration key names, [Premium features and limits](/api/premium.md), [business features](/api/business.md), suggested actions, [incoming web events](/api/web-events.md), [webPage](/constructor/webPage.md) type values and more. Because these constants are tied to the schema, any change to them is documented in the per-layer changelogs on the [layers page &raquo;](/api/layers.md).  

For programmatic access, an aggregated machine-readable index of the current layer of the API is published at the permalink [/api/config.json](/api/config.json.md).  

The endpoint is a single JSON object whose top-level keys each embed, as native JSON, the corresponding dataset of the latest layer:

* `layer` – the current [API layer &raquo;](/api/layers.md) number that all the datasets below belong to.
* `constants` – the aggregated **API constants** described in this article, whose shape is documented below.
* `push`, `push_arguments` – the schemas of the [push notification service messages &raquo;](/api/push-updates.md), and their localization arguments.

Make sure to also consider the following configuration files which are **not** included in `config.json`, and are instead available as separate files:

* The full RPC error database in [/api/errors.json](/api/errors.json.md), documented [here &raquo;](/api/errors.md#error-database).
* The [TL schema &raquo;](/schema.md) of the current layer in [/schema/json](/schema/json).
* The [end-to-end encryption schema &raquo;](/schema/end-to-end.md) in [/schema/end-to-end-json](/schema/end-to-end-json).
* The [end-to-end encrypted group call schema &raquo;](/api/end-to-end/group-calls.md).
* The schemas and map of the [file reference database &raquo;](/api/file-references.md).

#### API constants

The `constants` object is keyed by a **globally-unique section name** – a human-readable identifier for each list of API constants (for example `premium features`, `basic suggestions` or `webpage type`).

Each value is an object describing that section, with three keys:

* `description` – the **human-readable description** of the section as a whole.
* `type` – either `map` or `list`, indicating the shape of `entries` below, so consumers can distinguish the two shapes without inspecting the JSON type of `entries`.
* `entries` – the list of API constants in the section, whose shape matches `type`:
  * when `type` is `map`, an **object** keyed by the **entry identifier** (the string constant, e.g. `message_length_max`, `telegram_nft`, `double_limits__channels`), whose value is the **human-readable description** of that entry (a markdown string).
  * when `type` is `list`, an **array** of the bare entry identifiers (plain strings), for sections whose entries don't carry individual descriptions.

For example:

```json
{
    "layer": 225,
    "constants": {
        "webpage type": {
            "description": "Web page type values from the [webPage](/constructor/webPage.md) constructor.",
            "type": "map",
            "entries": {
                "telegram_nft": "Preview of a collectible gift link.",
                "video": "Preview of an external video."
            }
        },
        "settings paths": {
            "description": "In-app settings deep link paths openable via [settings deep links »](/api/links.md#settings-links).",
            "type": "list",
            "entries": [
                "appearance",
                "appearance/themes",
                "appearance/wallpapers"
            ]
        }
    }
}
```

### MTProto configuration

    config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;
    nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;

    updateConfig#a229dd06 = Update;

    ---functions---

    help.getConfig#c4f9186b = Config;
    help.getNearestDc#1fb33026 = NearestDc;

The huge [config](/constructor/config.md) constructor contains lots of useful information, from chat and message size limitations, to privacy settings, online status refresh interval and timeout, VoIP configuration, default inline bot usernames for GIF, image and venue lookup, and lots of other global and user-specific information, check out the [constructor page](/constructor/config.md) for more information.

The configuration should be manually refreshed immediately upon receival of an [updateConfig](/constructor/updateConfig.md) update.  

### Client configuration

    jsonObjectValue#c0de1bd9 key:string value:JSONValue = JSONObjectValue;

    jsonNull#3f6d7b68 = JSONValue;
    jsonBool#c7345e6a value:Bool = JSONValue;
    jsonNumber#2be0dfa4 value:double = JSONValue;
    jsonString#b71e767a value:string = JSONValue;
    jsonArray#f7444763 value:Vector<JSONValue> = JSONValue;
    jsonObject#99c1d49d value:Vector<JSONObjectValue> = JSONValue;

    help.appConfigNotModified#7cde641d = help.AppConfig;
    help.appConfig#dd18782e hash:int config:JSONValue = help.AppConfig;

    updateConfig#a229dd06 = Update;

    ---functions---

    help.getAppConfig#61e3f854 hash:int = help.AppConfig;

The [help.getAppConfig](/method/help.getAppConfig.md) method returns a JSON object containing rapidly evolving, client-specific configuration parameters.  
While [help.getConfig](/method/help.getConfig.md) returns MTProto-specific configuration with information about server-side limitations and other MTProto-related information, [help.getAppConfig](/method/help.getAppConfig.md) returns configuration parameters useful for graphical Telegram clients.

When first invoking [help.getAppConfig](/method/help.getAppConfig.md), pass `0` to hash; in future calls, use the `hash` contained in the previously returned [help.appConfig](/constructor/help.appConfig.md); if the configuration hasn't changed, a [help.appConfigNotModified](/constructor/help.appConfigNotModified.md) will be returned instead of [help.appConfig](/constructor/help.appConfig.md).

The configuration should be manually refreshed immediately upon receival of an [updateConfig](/constructor/updateConfig.md) update.  

If any of the configuration keys are not available at runtime, a default value must be used.  
Specifically, the relative value from the default object must be used if [help.getAppConfig](/method/help.getAppConfig.md) was invoked successfully but the desired key is not available in [help.appConfig](/constructor/help.appConfig.md).`config`, or if the invocation of [help.getAppConfig](/method/help.getAppConfig.md) returned an RPC error and there is no cached value.  

Here's the full list of defaults that must be used:  

<!-- start config -->

<pre><code>{
    "<a href="#about-length-limit-default">about_length_limit_default</a>": 70,
    "<a href="#about-length-limit-premium">about_length_limit_premium</a>": 140,
    "<a href="#aicompose-tone-examples-num">aicompose_tone_examples_num</a>": 3,
    "<a href="#aicompose-tone-prompt-length-max">aicompose_tone_prompt_length_max</a>": 1024,
    "<a href="#aicompose-tone-saved-limit-default">aicompose_tone_saved_limit_default</a>": 5,
    "<a href="#aicompose-tone-saved-limit-premium">aicompose_tone_saved_limit_premium</a>": 20,
    "<a href="#aicompose-tone-title-length-max">aicompose_tone_title_length_max</a>": 12,
    "<a href="#authorization-autoconfirm-period">authorization_autoconfirm_period</a>": 604800,
    "<a href="#autoarchive-setting-available">autoarchive_setting_available</a>": true,
    "<a href="#autologin-domains">autologin_domains</a>": [
        "instantview.telegram.org",
        "translations.telegram.org",
        "contest.dev",
        "contest.com",
        "bugs.telegram.org",
        "suggestions.telegram.org",
        "themes.telegram.org",
        "promote.telegram.org",
        "ads.telegram.org"
    ],
    "<a href="#background-connection">background_connection</a>": true,
    "<a href="#boosts-channel-level-max">boosts_channel_level_max</a>": 100,
    "<a href="#boosts-per-sent-gift">boosts_per_sent_gift</a>": 3,
    "<a href="#bot-preview-medias-max">bot_preview_medias_max</a>": 12,
    "<a href="#bot-verification-description-length-limit">bot_verification_description_length_limit</a>": 70,
    "<a href="#bots-create-limit-default">bots_create_limit_default</a>": 20,
    "<a href="#bots-create-limit-premium">bots_create_limit_premium</a>": 40,
    "<a href="#business-chat-links-limit">business_chat_links_limit</a>": 100,
    "<a href="#business-promo-order">business_promo_order</a>": [
        "business_location",
        "business_hours",
        "quick_replies",
        "greeting_message",
        "away_message",
        "business_links",
        "business_intro",
        "business_bots",
        "emoji_status",
        "folder_tags",
        "stories"
    ],
    "<a href="#call-requests-disabled">call_requests_disabled</a>": false,
    "<a href="#can-edit-factcheck">can_edit_factcheck</a>": false,
    "<a href="#caption-length-limit-default">caption_length_limit_default</a>": 1024,
    "<a href="#caption-length-limit-premium">caption_length_limit_premium</a>": 4096,
    "<a href="#channel-autotranslation-level-min">channel_autotranslation_level_min</a>": 3,
    "<a href="#channel-bg-icon-level-min">channel_bg_icon_level_min</a>": 4,
    "<a href="#channel-custom-wallpaper-level-min">channel_custom_wallpaper_level_min</a>": 10,
    "<a href="#channel-emoji-status-level-min">channel_emoji_status_level_min</a>": 8,
    "<a href="#channel-profile-bg-icon-level-min">channel_profile_bg_icon_level_min</a>": 7,
    "<a href="#channel-restrict-sponsored-level-min">channel_restrict_sponsored_level_min</a>": 50,
    "<a href="#channel-revenue-withdrawal-enabled">channel_revenue_withdrawal_enabled</a>": true,
    "<a href="#channel-wallpaper-level-min">channel_wallpaper_level_min</a>": 9,
    "<a href="#channels-limit-default">channels_limit_default</a>": 500,
    "<a href="#channels-limit-premium">channels_limit_premium</a>": 1000,
    "<a href="#channels-public-limit-default">channels_public_limit_default</a>": 10,
    "<a href="#channels-public-limit-premium">channels_public_limit_premium</a>": 20,
    "<a href="#chat-read-mark-expire-period">chat_read_mark_expire_period</a>": 604800,
    "<a href="#chat-read-mark-size-threshold">chat_read_mark_size_threshold</a>": 100,
    "<a href="#chatlist-invites-limit-default">chatlist_invites_limit_default</a>": 3,
    "<a href="#chatlist-invites-limit-premium">chatlist_invites_limit_premium</a>": 100,
    "<a href="#chatlist-update-period">chatlist_update_period</a>": 3600,
    "<a href="#chatlists-joined-limit-default">chatlists_joined_limit_default</a>": 2,
    "<a href="#chatlists-joined-limit-premium">chatlists_joined_limit_premium</a>": 20,
    "<a href="#conference-call-size-limit">conference_call_size_limit</a>": 200,
    "<a href="#contact-note-length-limit">contact_note_length_limit</a>": 128,
    "<a href="#default-emoji-statuses-stickerset-id">default_emoji_statuses_stickerset_id</a>": "773947703670341676",
    "<a href="#dialog-filters-chats-limit-default">dialog_filters_chats_limit_default</a>": 100,
    "<a href="#dialog-filters-chats-limit-premium">dialog_filters_chats_limit_premium</a>": 200,
    "<a href="#dialog-filters-enabled">dialog_filters_enabled</a>": true,
    "<a href="#dialog-filters-limit-default">dialog_filters_limit_default</a>": 10,
    "<a href="#dialog-filters-limit-premium">dialog_filters_limit_premium</a>": 30,
    "<a href="#dialog-filters-tooltip">dialog_filters_tooltip</a>": false,
    "<a href="#dialogs-folder-pinned-limit-default">dialogs_folder_pinned_limit_default</a>": 100,
    "<a href="#dialogs-folder-pinned-limit-premium">dialogs_folder_pinned_limit_premium</a>": 200,
    "<a href="#dialogs-pinned-limit-default">dialogs_pinned_limit_default</a>": 5,
    "<a href="#dialogs-pinned-limit-premium">dialogs_pinned_limit_premium</a>": 10,
    "<a href="#emojies-animated-zoom">emojies_animated_zoom</a>": 0.625,
    "<a href="#emojies-send-dice">emojies_send_dice</a>": [
        "\ud83c\udfb2",
        "\ud83c\udfaf",
        "\ud83c\udfc0",
        "\u26bd",
        "\u26bd\ufe0f",
        "\ud83c\udfb0",
        "\ud83c\udfb3"
    ],
    "<a href="#emojies-send-dice-success">emojies_send_dice_success</a>": {
        "\ud83c\udfaf": {
            "value": 6,
            "frame_start": 62
        },
        "\ud83c\udfc0": {
            "value": 5,
            "frame_start": 110
        },
        "\u26bd": {
            "value": 5,
            "frame_start": 110
        },
        "\u26bd\ufe0f": {
            "value": 5,
            "frame_start": 110
        },
        "\ud83c\udfb0": {
            "value": 64,
            "frame_start": 110
        },
        "\ud83c\udfb3": {
            "value": 6,
            "frame_start": 110
        }
    },
    "<a href="#emojies-sounds">emojies_sounds</a>": [],
    "<a href="#factcheck-length-limit">factcheck_length_limit</a>": 1024,
    "<a href="#fragment-prefixes">fragment_prefixes</a>": [
        "888"
    ],
    "<a href="#freeze-appeal-url">freeze_appeal_url</a>": "",
    "<a href="#freeze-since-date">freeze_since_date</a>": 0,
    "<a href="#freeze-until-date">freeze_until_date</a>": 0,
    "<a href="#gif-search-branding">gif_search_branding</a>": "none",
    "<a href="#gif-search-emojies">gif_search_emojies</a>": [
        "\ud83d\udc4d",
        "\ud83d\ude18",
        "\ud83d\ude0d",
        "\ud83d\ude21",
        "\ud83e\udd73",
        "\ud83d\ude02",
        "\ud83d\ude2e",
        "\ud83d\ude44",
        "\ud83d\ude0e",
        "\ud83d\udc4e"
    ],
    "<a href="#giveaway-add-peers-max">giveaway_add_peers_max</a>": 10,
    "<a href="#giveaway-boosts-per-premium">giveaway_boosts_per_premium</a>": 4,
    "<a href="#giveaway-countries-max">giveaway_countries_max</a>": 10,
    "<a href="#giveaway-gifts-purchase-available">giveaway_gifts_purchase_available</a>": false,
    "<a href="#giveaway-period-max">giveaway_period_max</a>": 2678400,
    "<a href="#group-call-message-length-limit">group_call_message_length_limit</a>": 128,
    "<a href="#group-call-message-ttl">group_call_message_ttl</a>": 10,
    "<a href="#group-custom-wallpaper-level-min">group_custom_wallpaper_level_min</a>": 10,
    "<a href="#group-emoji-status-level-min">group_emoji_status_level_min</a>": 8,
    "<a href="#group-emoji-stickers-level-min">group_emoji_stickers_level_min</a>": 4,
    "<a href="#group-profile-bg-icon-level-min">group_profile_bg_icon_level_min</a>": 5,
    "<a href="#group-transcribe-level-min">group_transcribe_level_min</a>": 6,
    "<a href="#group-wallpaper-level-min">group_wallpaper_level_min</a>": 9,
    "<a href="#groupcall-video-participants-max">groupcall_video_participants_max</a>": 1000,
    "<a href="#hidden-members-group-size-min">hidden_members_group_size_min</a>": 100,
    "<a href="#ignore-restriction-reasons">ignore_restriction_reasons</a>": [],
    "<a href="#inapp-update-check-delay">inapp_update_check_delay</a>": 86400,
    "<a href="#intro-description-length-limit">intro_description_length_limit</a>": 70,
    "<a href="#intro-title-length-limit">intro_title_length_limit</a>": 32,
    "<a href="#keep-alive-service">keep_alive_service</a>": true,
    "<a href="#large-queue-max-active-operations-count">large_queue_max_active_operations_count</a>": 2,
    "<a href="#message-animated-emoji-max">message_animated_emoji_max</a>": 100,
    "<a href="#message-typing-draft-ttl">message_typing_draft_ttl</a>": 30,
    "<a href="#music-search-username">music_search_username</a>": "ugcmusicbot",
    "<a href="#need-age-video-verification">need_age_video_verification</a>": false,
    "<a href="#new-noncontact-peers-require-premium-without-ownpremium">new_noncontact_peers_require_premium_without_ownpremium</a>": false,
    "<a href="#no-forwards-request-expire-period">no_forwards_request_expire_period</a>": 86400,
    "<a href="#passkeys-account-passkeys-max">passkeys_account_passkeys_max</a>": 5,
    "<a href="#phone-country-iso2">phone_country_iso2</a>": "",
    "<a href="#pm-read-date-expire-period">pm_read_date_expire_period</a>": 604800,
    "<a href="#poll-answer-delete-period">poll_answer_delete_period</a>": 300,
    "<a href="#poll-answers-max">poll_answers_max</a>": 12,
    "<a href="#poll-close-period-max">poll_close_period_max</a>": 2628000,
    "<a href="#poll-countries-max">poll_countries_max</a>": 12,
    "<a href="#premium-bot-username">premium_bot_username</a>": "PremiumBot",
    "<a href="#premium-gift-attach-menu-icon">premium_gift_attach_menu_icon</a>": true,
    "<a href="#premium-gift-text-field-icon">premium_gift_text_field_icon</a>": false,
    "<a href="#premium-invoice-slug">premium_invoice_slug</a>": "abc",
    "<a href="#premium-manage-subscription-url">premium_manage_subscription_url</a>": "https://t.me/premiumbot?start=status",
    "<a href="#premium-promo-order">premium_promo_order</a>": [
        "stories",
        "more_upload",
        "double_limits",
        "business",
        "last_seen",
        "voice_to_text",
        "faster_download",
        "translations",
        "animated_emoji",
        "emoji_status",
        "saved_tags",
        "peer_colors",
        "wallpapers",
        "profile_badge",
        "message_privacy",
        "pm_noforwards",
        "advanced_chat_management",
        "no_ads",
        "app_icons",
        "infinite_reactions",
        "animated_userpics",
        "premium_stickers",
        "effects",
        "ai_compose",
        "todo"
    ],
    "<a href="#premium-purchase-blocked">premium_purchase_blocked</a>": false,
    "<a href="#qr-login-camera">qr_login_camera</a>": true,
    "<a href="#qr-login-code">qr_login_code</a>": "primary",
    "<a href="#quick-replies-limit">quick_replies_limit</a>": 100,
    "<a href="#quick-reply-messages-limit">quick_reply_messages_limit</a>": 20,
    "<a href="#quote-length-max">quote_length_max</a>": 1024,
    "<a href="#reactions-in-chat-max">reactions_in_chat_max</a>": 100,
    "<a href="#reactions-uniq-max">reactions_uniq_max</a>": 11,
    "<a href="#reactions-user-max-default">reactions_user_max_default</a>": 1,
    "<a href="#reactions-user-max-premium">reactions_user_max_premium</a>": 3,
    "<a href="#recommended-channels-limit-default">recommended_channels_limit_default</a>": 10,
    "<a href="#recommended-channels-limit-premium">recommended_channels_limit_premium</a>": 100,
    "<a href="#restriction-add-platforms">restriction_add_platforms</a>": [],
    "<a href="#ringtone-duration-max">ringtone_duration_max</a>": 5,
    "<a href="#ringtone-saved-count-max">ringtone_saved_count_max</a>": 100,
    "<a href="#ringtone-size-max">ringtone_size_max</a>": 307200,
    "<a href="#round-video-encoding">round_video_encoding</a>": {
        "diameter": 384,
        "video_bitrate": 1000,
        "audio_bitrate": 64,
        "max_size": 12582912
    },
    "<a href="#saved-dialogs-pinned-limit-default">saved_dialogs_pinned_limit_default</a>": 5,
    "<a href="#saved-dialogs-pinned-limit-premium">saved_dialogs_pinned_limit_premium</a>": 100,
    "<a href="#saved-gifs-limit-default">saved_gifs_limit_default</a>": 200,
    "<a href="#saved-gifs-limit-premium">saved_gifs_limit_premium</a>": 400,
    "<a href="#settings-display-passkeys">settings_display_passkeys</a>": false,
    "<a href="#small-queue-max-active-operations-count">small_queue_max_active_operations_count</a>": 5,
    "<a href="#sponsored-links-inapp-allow">sponsored_links_inapp_allow</a>": false,
    "<a href="#stargifts-blocked">stargifts_blocked</a>": true,
    "<a href="#stargifts-collection-gifts-limit">stargifts_collection_gifts_limit</a>": 500,
    "<a href="#stargifts-collections-limit">stargifts_collections_limit</a>": 10,
    "<a href="#stargifts-convert-period-max">stargifts_convert_period_max</a>": 604800,
    "<a href="#stargifts-craft-attribute-permilles">stargifts_craft_attribute_permilles</a>": [
        [
            100
        ],
        [
            80,
            400
        ],
        [
            70,
            350,
            700
        ],
        [
            60,
            300,
            600,
            1000
        ]
    ],
    "<a href="#stargifts-message-length-max">stargifts_message_length_max</a>": 128,
    "<a href="#stargifts-pinned-to-top-limit">stargifts_pinned_to_top_limit</a>": 6,
    "<a href="#starref-connect-allowed">starref_connect_allowed</a>": false,
    "<a href="#starref-max-commission-permille">starref_max_commission_permille</a>": 800,
    "<a href="#starref-min-commission-permille">starref_min_commission_permille</a>": 1,
    "<a href="#starref-program-allowed">starref_program_allowed</a>": false,
    "<a href="#starref-start-param-prefixes">starref_start_param_prefixes</a>": [
        "_tgr_"
    ],
    "<a href="#stars-gifts-enabled">stars_gifts_enabled</a>": true,
    "<a href="#stars-groupcall-message-amount-max">stars_groupcall_message_amount_max</a>": 35000,
    "<a href="#stars-groupcall-message-limits">stars_groupcall_message_limits</a>": [
        {
            "stars": 10000,
            "pin_period": 3600,
            "text_length_max": 400,
            "emoji_max": 20,
            "color1": "5B6676",
            "color2": "7B899D",
            "color_bg": "252C36"
        },
        {
            "stars": 2000,
            "pin_period": 1800,
            "text_length_max": 280,
            "emoji_max": 10,
            "color1": "E14741",
            "color2": "E96139",
            "color_bg": "8B0503"
        },
        {
            "stars": 500,
            "pin_period": 900,
            "text_length_max": 200,
            "emoji_max": 7,
            "color1": "ED771E",
            "color2": "ED771E",
            "color_bg": "9B3100"
        },
        {
            "stars": 250,
            "pin_period": 600,
            "text_length_max": 150,
            "emoji_max": 4,
            "color1": "E29A09",
            "color2": "E29A09",
            "color_bg": "9A3E00"
        },
        {
            "stars": 100,
            "pin_period": 300,
            "text_length_max": 110,
            "emoji_max": 3,
            "color1": "40A920",
            "color2": "40A920",
            "color_bg": "176200"
        },
        {
            "stars": 50,
            "pin_period": 120,
            "text_length_max": 80,
            "emoji_max": 2,
            "color1": "46A3EB",
            "color2": "46A3EB",
            "color_bg": "00508E"
        },
        {
            "stars": 10,
            "pin_period": 60,
            "text_length_max": 60,
            "emoji_max": 1,
            "color1": "955CDB",
            "color2": "955CDB",
            "color_bg": "49079B"
        },
        {
            "stars": 0,
            "pin_period": 30,
            "text_length_max": 30,
            "emoji_max": 0,
            "color1": "955CDB",
            "color2": "955CDB",
            "color_bg": "49079B"
        }
    ],
    "<a href="#stars-paid-message-amount-max">stars_paid_message_amount_max</a>": 35000,
    "<a href="#stars-paid-message-commission-permille">stars_paid_message_commission_permille</a>": 850,
    "<a href="#stars-paid-messages-available">stars_paid_messages_available</a>": true,
    "<a href="#stars-paid-messages-channel-amount-default">stars_paid_messages_channel_amount_default</a>": 10,
    "<a href="#stars-paid-post-amount-max">stars_paid_post_amount_max</a>": 25000,
    "<a href="#stars-paid-reaction-amount-max">stars_paid_reaction_amount_max</a>": 10000,
    "<a href="#stars-purchase-blocked">stars_purchase_blocked</a>": true,
    "<a href="#stars-rating-learnmore-url">stars_rating_learnmore_url</a>": "https://telegram.org/faq#q-what-does-profile-rating-mean",
    "<a href="#stars-revenue-withdrawal-max">stars_revenue_withdrawal_max</a>": 25000000,
    "<a href="#stars-revenue-withdrawal-min">stars_revenue_withdrawal_min</a>": 1000,
    "<a href="#stars-stargift-resale-amount-max">stars_stargift_resale_amount_max</a>": 100000,
    "<a href="#stars-stargift-resale-amount-min">stars_stargift_resale_amount_min</a>": 125,
    "<a href="#stars-stargift-resale-commission-permille">stars_stargift_resale_commission_permille</a>": 800,
    "<a href="#stars-subscription-amount-max">stars_subscription_amount_max</a>": 10000,
    "<a href="#stars-suggested-post-age-min">stars_suggested_post_age_min</a>": 86400,
    "<a href="#stars-suggested-post-amount-max">stars_suggested_post_amount_max</a>": 100000,
    "<a href="#stars-suggested-post-amount-min">stars_suggested_post_amount_min</a>": 5,
    "<a href="#stars-suggested-post-commission-permille">stars_suggested_post_commission_permille</a>": 850,
    "<a href="#stars-suggested-post-future-max">stars_suggested_post_future_max</a>": 2678400,
    "<a href="#stars-suggested-post-future-min">stars_suggested_post_future_min</a>": 300,
    "<a href="#stars-usd-sell-rate-x1000">stars_usd_sell_rate_x1000</a>": 1410,
    "<a href="#stars-usd-withdraw-rate-x1000">stars_usd_withdraw_rate_x1000</a>": 1300,
    "<a href="#stickers-emoji-cache-time">stickers_emoji_cache_time</a>": 86400,
    "<a href="#stickers-emoji-suggest-only-api">stickers_emoji_suggest_only_api</a>": false,
    "<a href="#stickers-faved-limit-default">stickers_faved_limit_default</a>": 5,
    "<a href="#stickers-faved-limit-premium">stickers_faved_limit_premium</a>": 10,
    "<a href="#stickers-normal-by-emoji-per-premium-num">stickers_normal_by_emoji_per_premium_num</a>": 3,
    "<a href="#stickers-premium-by-emoji-num">stickers_premium_by_emoji_num</a>": 0,
    "<a href="#stories-album-stories-limit">stories_album_stories_limit</a>": 1000,
    "<a href="#stories-albums-limit">stories_albums_limit</a>": 100,
    "<a href="#stories-area-url-max">stories_area_url_max</a>": 3,
    "<a href="#stories-changelog-user-id">stories_changelog_user_id</a>": 777000,
    "<a href="#stories-entities">stories_entities</a>": "premium",
    "<a href="#stories-pinned-to-top-count-max">stories_pinned_to_top_count_max</a>": 3,
    "<a href="#stories-posting">stories_posting</a>": "enabled",
    "<a href="#stories-sent-monthly-limit-default">stories_sent_monthly_limit_default</a>": 10,
    "<a href="#stories-sent-monthly-limit-premium">stories_sent_monthly_limit_premium</a>": 3000,
    "<a href="#stories-sent-weekly-limit-default">stories_sent_weekly_limit_default</a>": 3,
    "<a href="#stories-sent-weekly-limit-premium">stories_sent_weekly_limit_premium</a>": 700,
    "<a href="#stories-stealth-cooldown-period">stories_stealth_cooldown_period</a>": 10800,
    "<a href="#stories-stealth-future-period">stories_stealth_future_period</a>": 1500,
    "<a href="#stories-stealth-past-period">stories_stealth_past_period</a>": 300,
    "<a href="#stories-suggested-reactions-limit-default">stories_suggested_reactions_limit_default</a>": 1,
    "<a href="#stories-suggested-reactions-limit-premium">stories_suggested_reactions_limit_premium</a>": 5,
    "<a href="#stories-venue-search-username">stories_venue_search_username</a>": "foursquare",
    "<a href="#story-caption-length-limit-default">story_caption_length_limit_default</a>": 200,
    "<a href="#story-caption-length-limit-premium">story_caption_length_limit_premium</a>": 2048,
    "<a href="#story-expiring-limit-default">story_expiring_limit_default</a>": 1,
    "<a href="#story-expiring-limit-premium">story_expiring_limit_premium</a>": 100,
    "<a href="#story-viewers-expire-period">story_viewers_expire_period</a>": 86400,
    "<a href="#story-weather-preload">story_weather_preload</a>": false,
    "<a href="#telegram-antispam-group-size-min">telegram_antispam_group_size_min</a>": 200,
    "<a href="#telegram-antispam-user-id">telegram_antispam_user_id</a>": "5434988373",
    "<a href="#todo-item-length-max">todo_item_length_max</a>": 200,
    "<a href="#todo-items-max">todo_items_max</a>": 30,
    "<a href="#todo-title-length-max">todo_title_length_max</a>": 255,
    "<a href="#ton-blockchain-explorer-url">ton_blockchain_explorer_url</a>": "https://tonviewer.com/",
    "<a href="#ton-proxy-address">ton_proxy_address</a>": "magic.org",
    "<a href="#ton-stargift-resale-amount-max">ton_stargift_resale_amount_max</a>": 100000000000000,
    "<a href="#ton-stargift-resale-amount-min">ton_stargift_resale_amount_min</a>": 700,
    "<a href="#ton-stargift-resale-commission-permille">ton_stargift_resale_commission_permille</a>": 900,
    "<a href="#ton-suggested-post-amount-max">ton_suggested_post_amount_max</a>": 10000000000000,
    "<a href="#ton-suggested-post-amount-min">ton_suggested_post_amount_min</a>": 1,
    "<a href="#ton-suggested-post-commission-permille">ton_suggested_post_commission_permille</a>": 850,
    "<a href="#ton-topup-url">ton_topup_url</a>": "https://fragment.com/ads/topup",
    "<a href="#ton-usd-rate">ton_usd_rate</a>": 3,
    "<a href="#topics-pinned-limit">topics_pinned_limit</a>": 5,
    "<a href="#transcribe-audio-trial-duration-max">transcribe_audio_trial_duration_max</a>": 300,
    "<a href="#transcribe-audio-trial-weekly-number">transcribe_audio_trial_weekly_number</a>": 0,
    "<a href="#upload-max-fileparts-default">upload_max_fileparts_default</a>": 4000,
    "<a href="#upload-max-fileparts-premium">upload_max_fileparts_premium</a>": 8000,
    "<a href="#upload-premium-speedup-download">upload_premium_speedup_download</a>": 10,
    "<a href="#upload-premium-speedup-notify-period">upload_premium_speedup_notify_period</a>": 3600,
    "<a href="#upload-premium-speedup-upload">upload_premium_speedup_upload</a>": 10,
    "<a href="#url-auth-domains">url_auth_domains</a>": [
        "web.telegram.org",
        "web.t.me",
        "k.t.me",
        "z.t.me",
        "a.t.me"
    ],
    "<a href="#verify-age-bot-username">verify_age_bot_username</a>": "",
    "<a href="#verify-age-country">verify_age_country</a>": "",
    "<a href="#verify-age-min">verify_age_min</a>": 0,
    "<a href="#video-ignore-alt-documents">video_ignore_alt_documents</a>": false,
    "<a href="#weather-search-username">weather_search_username</a>": "StoryWeatherBot",
    "<a href="#web-app-allowed-protocols">web_app_allowed_protocols</a>": [
        "http",
        "https"
    ],
    "<a href="#whitelisted-bots">whitelisted_bots</a>": [],
    "<a href="#whitelisted-domains">whitelisted_domains</a>": [
        "telegram.dog",
        "telegram.me",
        "telegram.org",
        "t.me",
        "telesco.pe",
        "fragment.com",
        "translations.telegram.org"
    ]
}</code></pre>

<!-- end config -->

The fields included in the resulting JSON object are:  

<!-- start config description 4 -->

#### `weather_search_username`

Contains the username of the bot used to query the current weather, to use in [weather media areas as specified here&nbsp;&raquo;](/api/stories.md#weather). (string)

#### `story_weather_preload`

If true, clients should preload the current weather on startup (as opposed to only when creating a [weather media area](/api/stories.md#weather)) by querying the bot specified in [weather_search_username](#weather-search-username). (boolean)

#### `emojies_animated_zoom`

[Animated emojis](/api/animated-emojis.md) and [animated dice](/api/dice.md) should be scaled by this factor before being shown to the user (float)

#### `keep_alive_service`

Whether app clients should start a keepalive service to keep the app running and fetch updates even when the app is closed (boolean)

#### `background_connection`

Whether app clients should start a background TCP connection for MTProto update fetching (boolean)

#### `emojies_send_dice`

A list of supported [animated dice](/api/dice.md) stickers (array of strings).

#### `emojies_send_dice_success`

For [animated dice](/api/dice.md) emojis other than the basic 🎲, indicates the winning dice value and the final frame of the animated sticker, at which to show the fireworks 🎆 (object with emoji keys and object values, containing `value` and `frame_start` float values)

#### `emojies_sounds`

A map of soundbites to be played when the user clicks on the specified [animated emoji](/api/animated-emojis.md); the [file reference field](/api/file-references.md) should be base64-decoded before [downloading the file](/api/files.md) (map of [file IDs](/api/files.md) ([inputDocument](/constructor/inputDocument.md).id), with emoji string keys)

Example:

```json
{
    "\ud83c\udf83": {
        "id": "4956223179606458539",
        "access_hash": "-2107001400913062971",
        "file_reference_base64": ""
    },
    "\u26b0": {
        "id": "4956223179606458540",
        "access_hash": "-1498869544183595185",
        "file_reference_base64": ""
    }
}
```

#### `gif_search_branding`

Specifies the name of the service providing GIF search through [gif_search_username](#mtproto-configuration) (string)

#### `gif_search_emojies`

Specifies a list of emojis that should be suggested as search term in a bar above the GIF search box (array of string emojis)

#### `stickers_emoji_suggest_only_api`

Specifies that the app should not display [local sticker suggestions&nbsp;&raquo;](/api/stickers.md#sticker-suggestions) for emojis at all and just use the result of [messages.getStickers](/method/messages.getStickers.md) (bool)

#### `stickers_emoji_cache_time`

Specifies the validity period of the local cache of [messages.getStickers](/method/messages.getStickers.md), also relevant when generating the [pagination hash](/api/offsets.md#hash-generation) when invoking the method. (integer)

#### `qr_login_camera`

Whether the Settings->Devices menu should show an option to scan a [QR login code](/api/qr-login.md) (boolean)

#### `qr_login_code`

Whether the login screen should show a [QR code login option](/api/qr-login.md), possibly as default login method (string, "disabled", "primary" or "secondary")

#### `dialog_filters_enabled`

Whether clients should show an option for managing [dialog filters AKA folders](/api/folders.md) (boolean)

#### `dialog_filters_tooltip`

Whether clients should actively show a tooltip, inviting the user to configure [dialog filters AKA folders](/api/folders.md); typically this happens when the chat list is long enough to start getting cluttered. (boolean)

#### `autoarchive_setting_available`

Whether clients _can_ invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md) with [`globalPrivacySettings.archive_and_mute_new_noncontact_peers = boolTrue`](/constructor/globalPrivacySettings.md), to automatically archive and mute new incoming chats from non-contacts. (boolean)

#### `topics_pinned_limit`

Maximum number of [topics](/api/forum.md#forum-topics) that can be pinned in a single [forum](/api/forum.md). (integer)

#### `telegram_antispam_user_id`

The ID of the official [native antispam bot](/api/antispam.md), that will automatically delete spam messages if enabled as specified in the [native antispam documentation&nbsp;&raquo;](/api/antispam.md).  
When fetching the admin list of a supergroup using [channels.getParticipants](/method/channels.getParticipants.md), if native antispam functionality in the specified supergroup, the bot should be manually added to the admin list displayed to the user.  (numeric string that represents a Telegram user/bot ID, should be casted to an int64)

#### `telegram_antispam_group_size_min`

Minimum number of group members required to enable [native antispam functionality](/api/antispam.md). (integer)

#### `fragment_prefixes`

List of phone number prefixes for anonymous [Fragment](https://fragment.com) phone numbers. (array of strings).

#### `hidden_members_group_size_min`

Minimum number of participants required to hide the participants list of a supergroup using [channels.toggleParticipantsHidden](/method/channels.toggleParticipantsHidden.md). (integer)

#### `url_auth_domains`

A list of domains that support automatic login with manual user confirmation, [click here for more info on URL authorization&nbsp;&raquo;](/api/url-authorization.md#link-url-authorization). (array of strings)

#### `autologin_domains`

A list of Telegram domains that support automatic login with no user confirmation, [click here for more info on URL authorization&nbsp;&raquo;](/api/url-authorization.md#link-url-authorization). (array of strings)

#### `whitelisted_domains`

A list of Telegram domains that can always be opened without additional user confirmation, when clicking on in-app links where the URL is not fully displayed (i.e. [messageEntityTextUrl](/constructor/messageEntityTextUrl.md) entities). (array of strings)

Note that when opening [direct Mini App links](/api/links.md#direct-mini-app-links) for the first time, confirmation should still be requested from the user, even if the domain of the containing deep link is whitelisted (i.e. `t.me/<bot_username>/<short_name>?startapp=<start_parameter>`, where `t.me` is whitelisted).  

Confirmation should **always** be asked, even if we already opened the [direct Mini App](/api/links.md#direct-mini-app-links) before, if the link is not visible (i.e. [messageEntityTextUrl](/constructor/messageEntityTextUrl.md) text links, inline buttons etc.).

#### `round_video_encoding`

Contains a set of recommended codec parameters for round videos.  (object, as described in the example)

#### `chat_read_mark_size_threshold`

Per-user read receipts, fetchable using [messages.getMessageReadParticipants](/method/messages.getMessageReadParticipants.md), will be available in groups with an amount of participants less or equal to `chat_read_mark_size_threshold`. (integer)

#### `chat_read_mark_expire_period`

To protect user privacy, read receipts for chats are only stored for `chat_read_mark_expire_period` seconds after the message was sent. (integer)

#### `pm_read_date_expire_period`

To protect user privacy, read receipts for private chats are only stored for `pm_read_date_expire_period` seconds after the message was sent. (integer)

#### `groupcall_video_participants_max`

Maximum number of participants in a group call (livestreams allow ∞ participants) (integer)

#### `reactions_uniq_max`

Maximum number of unique reactions for any given message: for example, if there are 2000 👍 and 1000 custom emoji 😁 reactions and reactions_uniq_max = 2, you can't add a 👎 reaction, because that would raise the number of unique reactions to 3 > 2. (integer)

#### `reactions_in_chat_max`

Maximum number of reactions that can be marked as allowed in a chat using [chatReactionsSome](/constructor/chatReactionsSome.md). (integer)

#### `reactions_user_max_default`

Maximum number of reactions that can be added to a single message by a non-Premium user. (integer)

#### `reactions_user_max_premium`

Maximum number of reactions that can be added to a single message by a Premium user. (integer)

#### `default_emoji_statuses_stickerset_id`

Default emoji status stickerset ID. (integer)  
Note that the stickerset can be fetched using [inputStickerSetEmojiDefaultStatuses](/constructor/inputStickerSetEmojiDefaultStatuses.md).

#### `ringtone_duration_max`

The maximum duration in seconds of [uploadable notification sounds&nbsp;&raquo;](/api/ringtones.md) (integer)

#### `ringtone_size_max`

The maximum post-conversion size in bytes of [uploadable notification sounds&nbsp;&raquo;](/api/ringtones.md)

#### `ringtone_saved_count_max`

The maximum number of [saveable notification sounds&nbsp;&raquo;](/api/ringtones.md)

#### `message_animated_emoji_max`

The maximum number of [custom emojis](/api/custom-emoji.md) that may be present in a message. (integer)

#### `stickers_premium_by_emoji_num`

Defines how many [Premium stickers](/api/premium.md) to show in the sticker suggestion popup when entering an emoji into the text field, see the [sticker docs for more info](/api/stickers.md#sticker-suggestions) (integer)

#### `stickers_normal_by_emoji_per_premium_num`

For [Premium users](/api/premium.md), used to define the suggested sticker list, see the [sticker docs for more info](/api/stickers.md#sticker-suggestions) (integer)

#### `premium_purchase_blocked`

The user can't purchase [Telegram Premium](/api/premium.md). The app must also hide all Premium features, including stars for other users, et cetera. (boolean)

#### `channels_limit_default`

The maximum number of [channels and supergroups](/api/channel.md) a non-[Premium](/api/premium.md) user may join (integer)

#### `channels_limit_premium`

The maximum number of [channels and supergroups](/api/channel.md) a [Premium](/api/premium.md) user may join (integer)

#### `saved_gifs_limit_default`

The maximum number of GIFs a non-[Premium](/api/premium.md) user may save (integer)

#### `saved_gifs_limit_premium`

The maximum number of GIFs a [Premium](/api/premium.md) user may save (integer)

#### `stickers_faved_limit_default`

The maximum number of stickers a non-[Premium](/api/premium.md) user may [add to Favorites&nbsp;&raquo;](/api/stickers.md#favorite-stickersets) (integer)

#### `stickers_faved_limit_premium`

The maximum number of stickers a [Premium](/api/premium.md) user may [add to Favorites&nbsp;&raquo;](/api/stickers.md#favorite-stickersets) (integer)

#### `dialog_filters_limit_default`

The maximum number of [folders](/api/folders.md) a non-[Premium](/api/premium.md) user may create (integer)

#### `dialog_filters_limit_premium`

The maximum number of [folders](/api/folders.md) a [Premium](/api/premium.md) user may create (integer)

#### `dialog_filters_chats_limit_default`

The maximum number of chats a non-[Premium](/api/premium.md) user may add to a [folder](/api/folders.md) (integer)

#### `dialog_filters_chats_limit_premium`

The maximum number of chats a [Premium](/api/premium.md) user may add to a [folder](/api/folders.md) (integer)

#### `dialogs_pinned_limit_default`

The maximum number of chats a non-[Premium](/api/premium.md) user may pin (integer)

#### `dialogs_pinned_limit_premium`

The maximum number of chats a [Premium](/api/premium.md) user may pin (integer)

#### `dialogs_folder_pinned_limit_default`

The maximum number of chats a non-[Premium](/api/premium.md) user may pin in a folder (integer)

#### `dialogs_folder_pinned_limit_premium`

The maximum number of chats a [Premium](/api/premium.md) user may pin in a folder (integer)

#### `channels_public_limit_default`

The maximum number of public [channels or supergroups](/api/channel.md) a non-[Premium](/api/premium.md) user may create (integer)

#### `channels_public_limit_premium`

The maximum number of public [channels or supergroups](/api/channel.md) a [Premium](/api/premium.md) user may create (integer)

#### `caption_length_limit_default`

The maximum UTF-8 length of media captions sendable by non-[Premium](/api/premium.md) users (integer)

#### `caption_length_limit_premium`

The maximum UTF-8 length of media captions sendable by [Premium](/api/premium.md) users (integer)

#### `upload_max_fileparts_default`

The maximum number of file parts uploadable by non-[Premium](/api/premium.md) users (integer, the maximum file size can be extrapolated by multiplying this value by `524288`, the biggest possible chunk size)

#### `upload_max_fileparts_premium`

The maximum number of file parts uploadable by [Premium](/api/premium.md) users (integer, the maximum file size can be extrapolated by multiplying this value by `524288`, the biggest possible chunk size)

#### `about_length_limit_default`

The maximum UTF-8 length of bios of non-[Premium](/api/premium.md) users (integer)

#### `about_length_limit_premium`

The maximum UTF-8 length of bios of [Premium](/api/premium.md) users (integer)

#### `premium_promo_order`

Array of string identifiers, indicating the order of [Telegram Premium](/api/premium.md) features in the Telegram Premium promotion popup, [see here for the possible values&nbsp;&raquo;](/api/premium.md#telegram-premium-features)

#### `business_promo_order`

Array of string identifiers, indicating the order of [Telegram Business](/api/business.md) features in the Telegram Business promotion popup, [see here for the possible values&nbsp;&raquo;](/api/business.md#business-features-promo-page)

#### `premium_bot_username`

Contains the username of the official [Telegram Premium](/api/premium.md) bot that may be used to buy a [Telegram Premium](/api/premium.md) subscription, see [here for detailed instructions&nbsp;&raquo;](/api/premium.md) (string)

#### `premium_invoice_slug`

Contains an [invoice slug](/api/payments.md) that may be used to buy a [Telegram Premium](/api/premium.md) subscription, see [here for detailed instructions&nbsp;&raquo;](/api/premium.md) (string)

#### `premium_gift_attach_menu_icon`

Whether a gift icon should be shown in the attachment menu in private chats with users, offering the current user to gift a [Telegram Premium](/api/premium.md) subscription to the other user in the chat. (boolean)

#### `premium_gift_text_field_icon`

Whether a gift icon should be shown in the text bar in private chats with users (ie like the `/` icon in chats with bots), offering the current user to gift a [Telegram Premium](/api/premium.md) subscription to the other user in the chat. Can only be true if `premium_gift_attach_menu_icon` is also true. (boolean)

#### `chatlist_update_period`

Users that import a folder using a [chat folder deep link »](/api/links.md#chat-folder-links) should retrieve additions made to the folder by invoking [chatlists.getChatlistUpdates](/method/chatlists.getChatlistUpdates.md) at most every `chatlist_update_period` seconds. (integer)

#### `chatlist_invites_limit_default`

Maximum number of per-folder [chat folder deep links »](/api/links.md#chat-folder-links) that can be created by non-[Premium](/api/premium.md) users. (integer)

#### `chatlist_invites_limit_premium`

Maximum number of per-folder [chat folder deep links »](/api/links.md#chat-folder-links) that can be created by [Premium](/api/premium.md) users. (integer)

#### `chatlists_joined_limit_default`

Maximum number of [shareable folders](/api/links.md#chat-folder-links) non-[Premium](/api/premium.md) users may have. (integer)

#### `chatlists_joined_limit_premium`

Maximum number of [shareable folders](/api/links.md#chat-folder-links) [Premium](/api/premium.md) users may have. (integer)

#### `small_queue_max_active_operations_count`

A soft limit, specifying the maximum number of files that should be downloaded in parallel from the same DC, for files smaller than 20MB. (integer)

#### `large_queue_max_active_operations_count`

A soft limit, specifying the maximum number of files that should be downloaded in parallel from the same DC, for files bigger than 20MB. (integer)

#### `authorization_autoconfirm_period`

An [unconfirmed session&nbsp;&raquo;](/api/auth.md#confirming-login) will be autoconfirmed this many seconds after login. (integer)

#### `story_viewers_expire_period`

The exact list of users that viewed the story will be hidden from the poster this many seconds after the story expires. (integer)

This limit applies **only** to non-[Premium](/api/premium.md) users, [Premium](/api/premium.md) users can **always** access the viewer list.

#### `story_expiring_limit_default`

The maximum number of active [stories](/api/stories.md) for non-[Premium](/api/premium.md) users (integer).

#### `story_expiring_limit_premium`

The maximum number of active [stories](/api/stories.md) for [Premium](/api/premium.md) users (integer).

#### `story_caption_length_limit_premium`

The maximum UTF-8 length of story captions for [Premium](/api/premium.md) users. (integer)

#### `story_caption_length_limit_default`

The maximum UTF-8 length of story captions for non-[Premium](/api/premium.md) users. (integer)

#### `stories_posting`

Indicates whether users can post stories. (string)

One of:

* `enabled` - Any user can post stories.
* `premium` - Only users with a [Premium](/api/premium.md) subscription can post stories.
* `disabled` - Users can't post stories.

#### `stories_stealth_past_period`

Enabling [stories stealth mode](/api/stories.md#stealth-mode) with the `past` flag will erase views of any story opened in the past `stories_stealth_past_period` seconds. (integer)

#### `stories_stealth_future_period`

Enabling [stories stealth mode](/api/stories.md#stealth-mode) with the `future` flag will hide views of any story opened in the next `stories_stealth_future_period` seconds. (integer)

#### `stories_stealth_cooldown_period`

After enabling [stories stealth mode](/api/stories.md#stealth-mode), this many seconds must elapse before the user is allowed to enable it again. (integer)

#### `stories_sent_weekly_limit_default`

Maximum number of stories that can be sent in a week by non-[Premium](/api/premium.md) users. (integer)

#### `stories_sent_weekly_limit_premium`

Maximum number of stories that can be sent in a week by [Premium](/api/premium.md) users. (integer)

#### `stories_sent_monthly_limit_default`

Maximum number of stories that can be sent in a month by non-[Premium](/api/premium.md) users. (integer)

#### `stories_sent_monthly_limit_premium`

Maximum number of stories that can be sent in a month by [Premium](/api/premium.md) users. (integer)

#### `stories_suggested_reactions_limit_default`

Maximum number of [story reaction media areas&nbsp;&raquo;](/api/stories.md#media-areas) that can be added to a story by non-[Premium](/api/premium.md) users. (integer)

#### `stories_suggested_reactions_limit_premium`

Maximum number of [story reaction media areas&nbsp;&raquo;](/api/stories.md#media-areas) that can be added to a story by [Premium](/api/premium.md) users. (integer)

#### `stories_venue_search_username`

Username of the inline bot to use to generate venue location tags for stories, see [here&nbsp;&raquo;](/api/stories.md#location-tags) for more info. (string)

#### `stories_changelog_user_id`

ID of the official Telegram user that will post stories about new Telegram features: stories posted by this user should be shown on the [active or active and hidden stories bar](/api/stories.md#watching-stories) just like for contacts, even if the user was removed from the contact list. (integer)

#### `stories_entities`

Whether [styled text entities](/api/entities.md) and links in story text captions can be used by all users (`enabled`), only [Premium](/api/premium.md) users) (`premium`), or no one (`disabled`). (string)

This field is used both when posting stories, to indicate to the user whether they can use entities, and when viewing stories, to hide entities (client-side) on stories posted by users whose [Premium](/api/premium.md) subscription has expired (if `stories_entities == "premium"` and [user](/constructor/user.md).`premium` is not set, or if `stories_entities == "disabled"`).

#### `stories_area_url_max`

Maximum number of [URL media areas&nbsp;&raquo;](/api/stories.md#media-areas) that can be added to a posted story. (integer)

#### `giveaway_gifts_purchase_available`

Whether [giveaways](/api/giveaways.md) can be started by the current user. (boolean)

#### `giveaway_add_peers_max`

The maximum number of users that can be specified when making a [direct giveaway](/api/giveaways.md). (integer)

#### `giveaway_countries_max`

The maximum number of countries that can be specified when restricting the set of participating countries in a [giveaway](/api/giveaways.md).  (integer)

#### `giveaway_boosts_per_premium`

The number of [boosts](/api/boost.md) that will be gained by a channel for each winner of a [giveaway](/api/giveaways.md). (integer)

#### `giveaway_period_max`

The maximum duration in seconds of a [giveaway](/api/giveaways.md). (integer)

#### `boosts_channel_level_max`

Maximum [boost level](/api/boost.md) for channels. (integer)

#### `boosts_per_sent_gift`

The number of additional [boost slots](/api/boost.md) that the current user will receive when [gifting a Telegram Premium subscription](/api/premium.md#gifting-telegram-premium).

#### `transcribe_audio_trial_weekly_number`

The maximum number of [speech recognition&nbsp;&raquo;](/api/transcribe.md) calls per week for non-[Premium](/api/premium.md) users. (integer)

#### `transcribe_audio_trial_duration_max`

The maximum allowed duration of media in seconds for [speech recognition&nbsp;&raquo;](/api/transcribe.md) for non-[Premium](/api/premium.md) users. (integer)

#### `recommended_channels_limit_default`

The maximum number of similar channels that can be recommended by [channels.getChannelRecommendations&raquo;](/method/channels.getChannelRecommendations.md) to non-[Premium](/api/premium.md) users. (integer)

#### `recommended_channels_limit_premium`

The maximum number of similar channels that can be recommended by [channels.getChannelRecommendations&raquo;](/method/channels.getChannelRecommendations.md) to [Premium](/api/premium.md) users. (integer)

#### `quote_length_max`

Maximum UTF-8 length of [quoted text](/constructor/inputReplyToMessage.md). (integer)

#### `channel_bg_icon_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), channels gain the ability to change their [message accent palette emoji&nbsp;&raquo;](/api/colors.md).  (integer)

#### `channel_profile_bg_icon_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md) and the boost level specified in the `channel_min_level` field of the [help.peerColorOption](/constructor/help.peerColorOption.md) constructor for the chosen palette, channels gain the ability to change the emoji and color used in the [profile accent palette&nbsp;&raquo;](/api/colors.md).  (integer)

#### `group_profile_bg_icon_level_min`

After reaching at least this [boost level](/api/boost.md) and the boost level specified in the `group_min_level` field of the [help.peerColorOption](/constructor/help.peerColorOption.md) constructor for the chosen palette, supergroups gain the ability to change the emoji and color used in the [profile accent palette&nbsp;&raquo;](/api/colors.md).  (integer)

#### `channel_emoji_status_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), channels gain the ability to change their [status emoji&nbsp;&raquo;](/api/emoji-status.md).  (integer)

#### `group_emoji_status_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), supergroups gain the ability to change their [status emoji&nbsp;&raquo;](/api/emoji-status.md).  (integer)

#### `channel_wallpaper_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), channels gain the ability to set a [fill channel wallpaper, see here &raquo; for more info](/api/wallpapers.md#channel-and-supergroup-wallpapers).  (integer)

#### `group_wallpaper_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), supergroups gain the ability to set a [fill supergroup wallpaper, see here &raquo; for more info](/api/wallpapers.md#channel-and-supergroup-wallpapers).  (integer)

#### `channel_custom_wallpaper_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), channels gain the ability to set any custom [wallpaper](/api/wallpapers.md), not just [fill channel wallpapers, see here &raquo; for more info](/api/wallpapers.md).  (integer)

#### `group_custom_wallpaper_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), supergroups gain the ability to set any custom [wallpaper](/api/wallpapers.md), not just [fill supergroup wallpapers, see here &raquo; for more info](/api/wallpapers.md).  (integer)

#### `group_transcribe_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), non-[Premium](/api/premium.md) users in the supergroup gain the ability to [transcribe any voice message](/api/transcribe.md), without using up their free transcription quota.  (integer)

#### `group_emoji_stickers_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), supergroups gain the ability to associate a [custom emoji stickerset&nbsp;&raquo;](/api/custom-emoji.md), which can be used by all users of the group (including non-[Premium](/api/premium.md) users!), for messages sent within the group.  (integer)

#### `channel_restrict_sponsored_level_min`

After reaching at least this [boost level](/api/boost.md), channel owners may disable ads on the channel for all users using [channels.restrictSponsoredMessages](/method/channels.restrictSponsoredMessages.md).  (integer)

#### `saved_dialogs_pinned_limit_default`

Maximum number of pinned dialogs in [saved messages](/api/saved-messages.md) for non-[Premium](/api/premium.md) users.  (integer)

#### `saved_dialogs_pinned_limit_premium`

Maximum number of pinned dialogs in [saved messages](/api/saved-messages.md) for [Premium](/api/premium.md) users.  (integer)

#### `can_edit_factcheck`

If true, the current user is an independent fact-checker and [may edit fact-checks&nbsp;&raquo;](/api/factcheck.md).  (boolean)

#### `factcheck_length_limit`

Maximum UTF-8 length [of fact-checks&nbsp;&raquo;](/api/factcheck.md).  (integer)

#### `quick_replies_limit`

Maximum number of [quick reply shortcuts&nbsp;&raquo;](/api/business.md#quick-reply-shortcuts) that may be created. (integer)

#### `quick_reply_messages_limit`

Maximum number of messages that may be added to a  [quick reply shortcut&nbsp;&raquo;](/api/business.md#quick-reply-shortcuts). (integer)

#### `intro_title_length_limit`

Maximum UTF-8 length of the [business introduction title&nbsp;&raquo;](/constructor/businessIntro.md). (integer)

#### `intro_description_length_limit`

Maximum UTF-8 length of the [business introduction description&nbsp;&raquo;](/constructor/businessIntro.md). (integer)

#### `business_chat_links_limit`

Maximum number of active [business chat links](/api/business.md#business-chat-links). (integer)

#### `upload_premium_speedup_upload`

Indicates the file upload speedup enjoyed by [Premium subscribers](/api/premium.md), used [as specified here&nbsp;&raquo;](/api/files.md#uploading-files) in the Premium modal shown when receiving `FLOOD_WAIT_PREMIUM_X` errors during file uploads. (integer)

#### `upload_premium_speedup_download`

Indicates the file download speedup enjoyed by [Premium subscribers](/api/premium.md), used [as specified here&nbsp;&raquo;](/api/files.md#downloading-files) in the Premium modal shown when receiving `FLOOD_WAIT_PREMIUM_X` errors during file downloads. (integer)

#### `upload_premium_speedup_notify_period`

The Premium modal shown when receiving `FLOOD_WAIT_PREMIUM_X` errors during file uploads/downloads should be shown at most every `upload_premium_speedup_notify_period` seconds.  (integer)

#### `stories_pinned_to_top_count_max`

The maximum number of [stories that can be pinned on top of the profile&nbsp;&raquo;](/api/stories.md#pinned-or-archived-stories).  (integer)

#### `channel_revenue_withdrawal_enabled`

If true, indicates that [channel ad revenue withdrawal is enabled in the current region](/api/revenue.md); otherwise, all ad revenue-related UI options should be hidden from the user. (boolean)

#### `stars_purchase_blocked`

If false, indicates that [Telegram Stars may be used in the current region](/api/stars.md); otherwise, all Star-related UI options should be hidden from the user. (boolean)

#### `stars_revenue_withdrawal_min`

Minimum required amount of [Telegram Stars](/api/stars.md) on a channel or bot's balance to allow [withdrawal&nbsp;&raquo;](/api/stars.md#withdrawing-revenue). (integer)

#### `stars_paid_post_amount_max`

Maximum price in [Telegram Stars](/api/stars.md) for posted [paid media](/api/paid-media.md). (integer)

#### `stars_gifts_enabled`

[Star gifting functionality](/api/stars.md#buying-or-gifting-stars) should only be enabled if this flag is equal to true. (boolean)

#### `bot_preview_medias_max`

Maximum number of [main mini app previews&nbsp;&raquo;](/api/bots/webapps.md#main-mini-app-previews) that can be added for a localization. (integer)

#### `web_app_allowed_protocols`

Specifies a list of allowed schemes for URLs received in [web_app_open_link events](/api/web-events.md#web-app-open-link). (array of strings)

#### `ton_proxy_address`

Specifies the domain name to be used to securely open [TON sites&nbsp;&raquo;](/api/links.md#ton-sites). (string)

#### `stars_subscription_amount_max`

Specifies the maximum allowed price in Stars of a [Telegram Star subscription &raquo;](/api/stars.md#star-subscriptions). (int)

#### `stars_usd_sell_rate_x1000`

Specifies the number of US dollars required to buy one thousand [Telegram Stars](/api/stars.md). (float)

#### `stars_usd_withdraw_rate_x1000`

Specifies the number of US dollars that will be received by [withdrawing &raquo;](/api/stars.md#withdrawing-revenue) one thousand [Telegram Stars](/api/stars.md). (float)

#### `stars_paid_reaction_amount_max`

Maximum number of [paid reactions](/api/reactions.md#paid-reactions) that may be sent on a post. (integer)

#### `stargifts_message_length_max`

The maximum length of [gift messages, see here &raquo;](/api/gifts.md) for more info. (integer)

#### `stargifts_blocked`

If true, [gifts &raquo;](/api/gifts.md) must be disabled. (boolean)

#### `stargifts_convert_period_max`

A [Gift &raquo;](/api/gifts.md) can be converted back into [Telegram Stars](/api/stars.md) only if it was received less than `stargifts_convert_period_max` seconds ago. (integer)

#### `video_ignore_alt_documents`

If true, indicates that the [messageMediaDocument](/constructor/messageMediaDocument.md).`alt_documents` field must be ignored. (boolean)

#### `starref_start_param_prefixes`

Start parameter [referral program prefixes for referral links &raquo;](/api/links.md#referral-links). (array of strings)

#### `starref_program_allowed`

If false, the current user [cannot create referral programs &raquo;](/api/bots/referrals.md#creating-an-affiliate-program) for bots they own. (boolean)

#### `starref_connect_allowed`

If false, the current user [cannot join referral programs, becoming an affiliate &raquo;](/api/bots/referrals.md#becoming-an-affiliate). (boolean)

#### `starref_min_commission_permille`

Minimum allowed permille affiliate commission for [referral programs &raquo;](/api/bots/referrals.md). (integer)

#### `starref_max_commission_permille`

Maximum allowed permille affiliate commission for [referral programs &raquo;](/api/bots/referrals.md). (integer)

#### `inapp_update_check_delay`

[help.getAppUpdate](/method/help.getAppUpdate.md) should be invoked every `inapp_update_check_delay` update seconds to check for app updates. (integer)

#### `premium_manage_subscription_url`

URL/deep link that can be opened to manage the premium subscription. (string)

#### `sponsored_links_inapp_allow`

If true, non-[deep/TON links](/api/links.md) opened from [sponsored messages](/api/sponsored-messages.md) must be opened in the in-app browser (if present); otherwise they must be opened in the standard, external browser. (boolean)

#### `ignore_restriction_reasons`

Array of strings, containing restriction reasons that must be ignored if encountered in [restrictionReason](/constructor/restrictionReason.md).`reason`.

#### `restriction_add_platforms`

Array of strings, containing additional platform identifiers that must be used when parsing [restrictionReason](/constructor/restrictionReason.md).

#### `new_noncontact_peers_require_premium_without_ownpremium`

If true, the [globalPrivacySettings](/constructor/globalPrivacySettings.md).`new_noncontact_peers_require_premium` setting may be enabled even if we don't have a [Premium](/api/premium.md) account, see [here &raquo;](/api/privacy.md#global-privacy-settings) for more info.  (boolean)

#### `bot_verification_description_length_limit`

Maximum UTF-8 length of [bot verification description fields &raquo;](/api/bots/verification.md). (integer)

#### `channel_autotranslation_level_min`

After reaching at least this [boost level&nbsp;&raquo;](/api/boost.md), channels gain the ability to enable [autotranslation for all users &raquo;](/api/translation.md#autotranslation-for-channels).  (integer)

#### `conference_call_size_limit`

Maximum number of members in an [E2E conference call](/api/end-to-end/group-calls.md).

#### `freeze_since_date`

If set and non-zero, indicates the unixtime when the account was [frozen](/api/auth.md#frozen-accounts). (integer)

#### `freeze_until_date`

If set and non-zero, indicates the unixtime when a [frozen](/api/auth.md#frozen-accounts) account be deleted, unless an appeal is submitted to the `freeze_appeal_url` and accepted. (integer)

#### `freeze_appeal_url`

A URL that the user can open to submit an appeal. (string)

#### `poll_answers_max`

The maximum number of allowed [quiz poll answers](/api/poll.md). (integer)

#### `stargifts_pinned_to_top_limit`

Maximum number of [gifts](/api/gifts.md) that [be pinned to a profile &raquo;](/api/gifts.md#pinning-a-received-gift). (integer)

#### `stars_paid_message_amount_max`

Specifies the maximum price of [paid messages &raquo;](/api/paid-messages.md). (integer)

#### `stars_paid_message_commission_permille`

When sending a [paid message](/api/paid-messages.md), the receiver will receive an amount of stars equal to the price of the message multiplied by `stars_paid_message_commission_permille` divided by 1000. (integer)

#### `stars_paid_messages_available`

Specifies whether [paid messages &raquo;](/api/paid-messages.md) can be enabled for the current user. (bool)

#### `stars_paid_messages_channel_amount_default`

When choosing the price for [paid direct channel messages](/api/paid-messages.md), the UI should display [stars_paid_messages_channel_amount_default](/api/config.md#stars-paid-messages-channel-amount-default) as the initial default value.

#### `stars_revenue_withdrawal_max`

Maximum amount of [Telegram Stars](/api/stars.md) that can be [withdrawn &raquo;](/api/stars.md#withdrawing-revenue) from a channel or bot's balance. (integer)

#### `stars_stargift_resale_amount_max`

The maximum price that can be specified when [reselling collectible gifts &raquo;](/api/gifts.md#reselling-collectible-gifts). (integer)

#### `stars_stargift_resale_amount_min`

The minimum price that can be specified when [reselling collectible gifts &raquo;](/api/gifts.md#reselling-collectible-gifts). (integer)

#### `stars_stargift_resale_commission_permille`

When [reselling collectible gifts &raquo;](/api/gifts.md#reselling-collectible-gifts), you will get `resell_stars*stars_stargift_resale_commission_permille/1000` stars. (integer)

#### `stars_suggested_post_age_min`

A [suggested post](/api/suggested-posts.md) must stay posted on the channel at least for the specified amount of seconds in order for the transaction to complete successfully. (integer)

#### `stars_suggested_post_amount_max`

Maximum price in [Stars](/api/stars.md) for a [suggested post &raquo;](/api/suggested-posts.md). (integer)

#### `stars_suggested_post_amount_min`

Minimum price in [Stars](/api/stars.md) for a [suggested post &raquo;](/api/suggested-posts.md). (integer)

#### `stars_suggested_post_commission_permille`

When [suggesting posts &raquo;](/api/suggested-posts.md), the channel will get `price*stars_suggested_post_commission_permille/1000` stars. (integer)

#### `stars_suggested_post_future_max`

When [suggesting scheduled posts at a specific time &raquo;](/api/suggested-posts.md), the client may only allow dates at most `stars_suggested_post_future_max` seconds in the future. (integer)

#### `stars_suggested_post_future_min`

When [suggesting scheduled posts at a specific time &raquo;](/api/suggested-posts.md), the client may only allow dates at least `stars_suggested_post_future_max` seconds in the future. (integer)

#### `todo_item_length_max`

Maximum length of [todo list item titles &raquo;](/api/todo.md). (integer)

#### `todo_items_max`

Maximum number of [todo list items &raquo;](/api/todo.md). (integer)

#### `todo_title_length_max`

Maximum length of the title of a [todo list &raquo;](/api/todo.md). (integer)

#### `ton_blockchain_explorer_url`

Contains the base explorer URL to prepend to TON addresses. (string)

#### `ton_suggested_post_amount_max`

Maximum price in nanograms for a [suggested post &raquo;](/api/suggested-posts.md). (integer)

#### `ton_suggested_post_amount_min`

Maximum price in nanograms for a [suggested post &raquo;](/api/suggested-posts.md). (integer)

#### `ton_suggested_post_commission_permille`

When [suggesting posts &raquo;](/api/suggested-posts.md) while paying using Grams, the channel will get `price*ton_suggested_post_commission_permille/1000` nanograms. (integer)

#### `ton_topup_url`

URL to open to topup the current TON balance. (string)

#### `ton_usd_rate`

Current TON to USD conversion rate.  (float)

#### `stargifts_collection_gifts_limit`

Maximum number of gifts that can be added to a [gift collection](/api/gifts.md#gift-collections). (integer)

#### `stargifts_collections_limit`

Maximum number of [gift collections](/api/gifts.md#gift-collections) that can be added to a profile. (integer)

#### `stars_rating_learnmore_url`

URL users can open to obtain more info about [star ratings &raquo;](/api/stars.md#star-rating). (string)

#### `stories_album_stories_limit`

Maximum number of stories that can be added to a [story album](/api/stories.md#story-albums). (integer)

#### `stories_albums_limit`

Maximum number of [story albums](/api/stories.md#story-albums) that can be added to a profile. (integer)

#### `ton_stargift_resale_amount_max`

The maximum price in nanograms that can be specified when [reselling collectible gifts &raquo;](/api/gifts.md#reselling-collectible-gifts) using Grams. (integer)

#### `ton_stargift_resale_amount_min`

The minimum price in nanograms that can be specified when [reselling collectible gifts &raquo;](/api/gifts.md#reselling-collectible-gifts) using Grams. (integer)

#### `ton_stargift_resale_commission_permille`

When [reselling collectible gifts &raquo;](/api/gifts.md#reselling-collectible-gifts) using Grams, you will get `price*ton_stargift_resale_commission_permille/1000` nanograms. (integer)

#### `need_age_video_verification`

Specifies whether [age verification &raquo;](/api/age-verification.md) is required in the current jurisdiction to view sensitive content. 

This flag will also be set to `false` if the current jurisdiction requires age verification for restricted content, **and** the user has successfully passed it on another device, or on the current device.  

(boolean)

#### `verify_age_country`

Unique name for the country or region whose legislation required [age verification &raquo;](/api/age-verification.md).  (string)

#### `verify_age_min`

Contains the minimum age required to view `sensitive` content, in the context of [age verification &raquo;](/api/age-verification.md).  (integer)

#### `verify_age_bot_username`

Contains the username of the bot whose [Main Mini App](/api/bots/webapps.md#main-mini-apps) must be opened in order to proceed with [age verification &raquo;](/api/age-verification.md).  (string)

#### `call_requests_disabled`

If not set or false, an incoming [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) with the `missed` and `active` flags **not** set should trigger ringing and an incoming call screen, just like for one-on-one calls. (boolean)

#### `passkeys_account_passkeys_max`

Maximum number of [passkeys &raquo;](/api/passkeys.md) that can be associated to a single account.  (integer)

#### `settings_display_passkeys`

[Passkey support &raquo;](/api/passkeys.md) should only be enabled if this key is equal to true. (bool)

#### `stars_groupcall_message_amount_max`

Maximum number of [Telegram Stars](/api/stars.md) that can be paid to send a single text message during a [group call or live video stream &raquo;](/api/group-calls.md). (integer)

#### `stars_groupcall_message_limits`

Defines the highlight tiers applied to [paid messages/comments sent during a group call or live video stream &raquo;](/api/group-calls.md#paid-live-story-comments), as a function of the number of [Telegram Stars](/api/stars.md) donated with the message.  

This is a JSON array of objects, each describing one tier with the following keys:

* `stars` (long integer) - Minimum number of donated Stars required to reach this tier.
* `pin_period` (integer) - For how many seconds a message in this tier stays pinned/highlighted.
* `text_length_max` (integer) - Maximum number of UTF-8 characters allowed in a message in this tier.
* `emoji_max` (integer) - Maximum number of [custom emojis](/api/custom-emoji.md) allowed in a message in this tier.
* `color1` (string) - The first color used to show the message text, as a 6-digit hexadecimal RGB string (e.g. `955CDB`).
* `color2` (string) - The second color used to show the message text, as a 6-digit hexadecimal RGB string (e.g. `955CDB`).
* `color2` (string) - Background color used to show the message text, as a 6-digit hexadecimal RGB string.

Tiers are sorted by ascending `stars`, and the tier with `stars` equal to `0` describes the appearance of free (non-paid) messages (clients should assume such a tier exists, falling back to a default if the array does not provide one).  
To render a given message, clients select the tier with the highest `stars` threshold that is still less than or equal to the amount donated with the message ([groupCallMessage](/constructor/groupCallMessage.md).`paid_message_stars`).

#### `whitelisted_bots`

Array of bot user IDs that official clients grant additional trust, treating them like bots the user has already explicitly opened or added to the [attachment menu](/api/bots/attach.md). Specifically, for a whitelisted bot:

* The [bot launch confirmation prompt &raquo;](/api/bots/webapps.md) shown before opening one of its [Mini Apps](/api/bots/webapps.md) is skipped, as if the user had already confirmed opening it.
* Its [Mini Apps](/api/bots/webapps.md) are allowed to read the system clipboard through the [`web_app_read_text_from_clipboard` &raquo;](/api/web-events.md#web-app-read-text-from-clipboard) event, just like the Mini Apps of [attachment menu](/api/bots/attach.md) bots.

#### `stargifts_craft_attribute_permilles`

Attribute persistence probabilities used when displaying the [collectible gift crafting UI &raquo;](/api/gifts.md#crafting-collectible-gifts).  
This is an array of 4 arrays of integers; the array with index N has N+1 integers, each containing a probability in permille, see [here &raquo;](/api/gifts.md#crafting-collectible-gifts) for more info.

#### `no_forwards_request_expire_period`

Pending [requests to disable content protection in private chats &raquo;](/api/content-protection.md#for-users) will automatically expire [no_forwards_request_expire_period &raquo;](#no-forwards-request-expire-period) seconds after they're sent, unless they are manually accepted or rejected, first. (integer)

#### `contact_note_length_limit`

Maximum length of [private contact notes &raquo;](/api/contacts.md#private-notes-for-contacts). (integer)

#### `group_call_message_length_limit`

Maximum length, in UTF-8 characters, of a text message sent during a [group call or live video stream &raquo;](/api/group-calls.md). (integer)

#### `group_call_message_ttl`

Number of seconds a text message sent during a [group call or live video stream &raquo;](/api/group-calls.md) stays displayed before disappearing. (integer)

#### `message_typing_draft_ttl`

[Live draft messages &raquo;](/api/bots/ai.md#live-response-streaming) should be deleted automatically by graphical clients this many seconds after they're received, or when receiving a normal message within the same chat/bot forum topic, whichever comes first.  (integer)

#### `bots_create_limit_default`

Maximum number of [bots](/api/bots.md) that can be owned by non-[Premium](/api/premium.md) users. (integer)

#### `bots_create_limit_premium`

Maximum number of [bots](/api/bots.md) that can be owned by [Premium](/api/premium.md) users. (integer)

#### `poll_answer_delete_period`

For [polls](/api/poll.md) that allow users to add their own answer options, the time window (in seconds) during which the user that added an option may still delete it again. (integer)

#### `poll_close_period_max`

Maximum allowed value, in seconds, for the auto-close timer of a [poll](/api/poll.md). (integer)

#### `music_search_username`

Username of the inline bot used to search for music. (string)

#### `aicompose_tone_examples_num`

Number of preview examples available for each [custom AI composer tone &raquo;](/api/ai.md#ai-compose-tones), to be cycled through with [aicompose.getToneExample](/method/aicompose.getToneExample.md). (integer)

#### `aicompose_tone_prompt_length_max`

Maximum UTF-8 length of the `prompt` of a [custom AI composer tone &raquo;](/api/ai.md#ai-compose-tones). (integer)

#### `aicompose_tone_title_length_max`

Maximum UTF-8 length of the `title` of a [custom AI composer tone &raquo;](/api/ai.md#ai-compose-tones). (integer)

#### `poll_countries_max`

Maximum number of countries that can be selected when restricting a [poll](/api/poll.md) by country. (integer)

#### `aicompose_tone_saved_limit_default`

Maximum number of [custom AI composer tones &raquo;](/api/ai.md#ai-compose-tones) a non-[Premium](/api/premium.md) user may install. (integer)

#### `aicompose_tone_saved_limit_premium`

Maximum number of [custom AI composer tones &raquo;](/api/ai.md#ai-compose-tones) a [Premium](/api/premium.md) user may install. (integer)

#### `phone_country_iso2`

Two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the current user, derived by the server from the user's phone number. Clients use it to enforce [country-restricted polls &raquo;](/api/poll.md#country-restricted-polls): the user may vote only if this code is contained in the poll's [`countries_iso2`](/constructor/poll.md) list. (string)

<!-- end config description -->

### Suggestions

    help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
    
    help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
    
    ---functions---
    
    help.getPromoData#c0977421 = help.PromoData;

The API can return a set of useful suggestions and PSA/MTProxy info for users of graphical clients using the [help.getPromoData](/method/help.getPromoData.md) method.  

This method should be invoked:
 
- On client startup
- After [help.PromoData](/type/help.PromoData.md).`expires` seconds, until the client is shut down.
- Every time a new MTProxy connection is established.  

#### PSA info

    help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
    
    help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
    
    ---functions---
    
    help.getPromoData#c0977421 = help.PromoData;
    
    help.hidePromoData#1e251c95 peer:InputPeer = Bool;

The `peer`, `psa_type` (type of the announcement) and `psa_message` (text of the announcement) flags of a [help.promoData](/constructor/help.promoData.md) returned by [help.getPromoData](/method/help.getPromoData.md) will all be set for Public Service Announcement peers that should be pinned on top of the chat list.  

In this case, the `proxy` flag will never be set.  

Invoke [help.hidePromoData](/method/help.hidePromoData.md) to hide the PSA peer from [help.promoData](/constructor/help.promoData.md).  

#### MTProxy sponsor

    help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
    
    help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
    
    ---functions---
    
    help.getPromoData#c0977421 = help.PromoData;

    help.hidePromoData#1e251c95 peer:InputPeer = Bool;

The `peer`, `proxy` flags of a [help.promoData](/constructor/help.promoData.md) returned by [help.getPromoData](/method/help.getPromoData.md) will all be set when connecting using an MTProxy that has configured an associated peer (i.e. the channel that sponsored the MTProxy) that should be pinned on top of the chat list.  

Invoke [help.hidePromoData](/method/help.hidePromoData.md) to hide the MTProxy peer from [help.promoData](/constructor/help.promoData.md).  

#### Basic suggestions

    help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
    
    help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
    
    ---functions---
    
    help.getPromoData#c0977421 = help.PromoData;

    help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;

The `pending_suggestions` field contained in a [help.promoData](/constructor/help.promoData.md) returned by [help.getPromoData](/method/help.getPromoData.md) contains a list of suggestions that should be actively shown as a tooltip to the user.

[help.dismissSuggestion](/method/help.dismissSuggestion.md) may be invoked to dismiss a suggestion (with `peer=`[inputPeerEmpty](/constructor/inputPeerEmpty.md)), which will remove it from the `pending_suggestions` field.  

List of suggestion values:

<!-- start basic suggestions 5 -->

##### `AUTOARCHIVE_POPULAR`

Users _should_ invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md) with [`globalPrivacySettings.archive_and_mute_new_noncontact_peers = boolTrue`](/constructor/globalPrivacySettings.md), to automatically archive and mute new incoming chats from non-contacts.

##### `VALIDATE_PASSWORD`

Users should make sure they still remember their [2-step verification password](/api/srp.md).

##### `VALIDATE_PHONE_NUMBER`

Users should check whether their [authorization phone number](/api/auth.md) is correct and change the phone number if it is inaccessible.

##### `NEWCOMER_TICKS`

Show the user a hint about the meaning of one and two ticks on sent messages.

##### `SETUP_PASSWORD`

Show the user a hint, asking them to check whether they still remember their [2FA password](/api/srp.md)

##### `PREMIUM_ANNUAL`

Suggests the user to subscribe to Telegram Premium (with annual payments)

##### `PREMIUM_UPGRADE`

Suggests the user to upgrade their existing Premium subscription from monthly payments to annual payments

##### `PREMIUM_RESTORE`

Suggests the user to restore a recently expired Premium subscription

##### `PREMIUM_CHRISTMAS`

Suggests the user to [gift Telegram Premium](/api/premium.md#gifting-telegram-premium) subscriptions to friends for Christmas.

##### `PREMIUM_GRACE`

Suggests the user to extend their expiring Telegram Premium subscription

##### `BIRTHDAY_SETUP`

Suggests the user to set a [birthday&nbsp;&raquo;](/api/profile.md#birthday).

##### `STARS_SUBSCRIPTION_LOW_BALANCE`

When we get close to the end of the subscription period of one or more active subscriptions, and the current [Telegram Star balance](/api/stars.md) is not high enough to autorenew at least one of them, this suggestion will be activated: when the user clicks on the suggestion, the client should fetch and display the list of expiring subscriptions by invoking [payments.getStarsSubscriptions](/method/payments.getStarsSubscriptions.md), passing [inputPeerSelf](/constructor/inputPeerSelf.md) to `peer` and setting the `missing_balance` flag: the returned subscriptions may be renewed by [filling up the current Telegram Star balance](/api/stars.md) with at least [payments.starsStatus](/constructor/payments.starsStatus.md).`subscriptions_missing_balance` stars.

##### `USERPIC_SETUP`

Suggests the user to set a [profile picture &raquo;](/api/files.md#uploading-profile-or-chat-pictures).

##### `SETUP_LOGIN_EMAIL`

Suggests the user to set a [login email &raquo;](/api/auth.md#email-verification).

##### `SETUP_LOGIN_EMAIL_NOSKIP`

Requires the user to set a [login email &raquo;](/api/auth.md#email-verification): this suggestion is not skippable, and must be presented as a non-dismissable full-screen view, which fully prevents usage of the app until a login email is configured.

##### `SETUP_PASSKEY`

Invites the user to set up a [passkey &raquo;](/api/passkeys.md).

<!-- end basic suggestions -->

#### Custom suggestions

    help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
    
    pendingSuggestion#e7e82e12 suggestion:string title:TextWithEntities description:TextWithEntities url:string = PendingSuggestion;

    ---functions---
    
    help.getPromoData#c0977421 = help.PromoData;

    help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;

The `custom_pending_suggestion` field contained in a [help.promoData](/constructor/help.promoData.md) returned by [help.getPromoData](/method/help.getPromoData.md) contains a list of *custom* suggestions that should be actively shown as a tooltip to the user.

Custom suggestions have a pre-populated `title`, `description`, a `url` that should be opened when the suggestion is clicked, and a `suggestion` field that contains an identifier that should be used when invoking [help.dismissSuggestion](/method/help.dismissSuggestion.md) to dismiss a suggestion (with `peer=`[inputPeerEmpty](/constructor/inputPeerEmpty.md)), which will remove it from the `custom_pending_suggestion` field.  

This is different from [basic suggestions &raquo;](#basic-suggestions), which effectively only have the `suggestion` identifier, and the client should populate the description, title and action accordingly.  

#### Inverted suggestions

    help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
    
    help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
    
    ---functions---
    
    help.getPromoData#c0977421 = help.PromoData;

    help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;

These suggestions are *enabled by default*, and are never returned in the `pending_suggestions` field returned by [help.getPromoData](/method/help.getPromoData.md).  

They can be dismissed by invoking [help.dismissSuggestion](/method/help.dismissSuggestion.md) as usual, but unlike [basic suggestions](#basic-suggestions) (with `peer=`[inputPeerEmpty](/constructor/inputPeerEmpty.md)), once dismissed they will appear in the `dismissed_suggestions` field of the [client configuration object](#client-configuration).  

List of inverted suggestions:

<!-- start inverted suggestions 5 -->

##### `BIRTHDAY_CONTACTS_TODAY`

If not dismissed, indicates that the client should display the tooltip that recommends to gift a Telegram Premium subscription to contacts on their [birthday&nbsp;&raquo;](/api/profile.md#birthday).  

This suggestion can be dismissed by invoking [help.dismissSuggestion](/method/help.dismissSuggestion.md) when the user hides the tooltip, but it is also automatically dismissed by the server if the user gifts one or more Telegram Premium subscriptions to friends with birthdays falling within the next/previous 24 hours.

<!-- end inverted suggestions -->

#### Channel suggestions

    messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---

    channels.getFullChannel#8736a09 channel:InputChannel = messages.ChatFull;

Some [channel/supergroup](/api/channel.md)-related suggestions can also be contained in the `pending_suggestions` field of the [channelFull](/constructor/channelFull.md) constructor, returned by [channels.getFullChannel](/method/channels.getFullChannel.md).  
Here's a list of possible suggestions:  

<!-- start channel suggestions 5 -->

##### `CONVERT_GIGAGROUP`

The [supergroup](/api/channel.md) has many participants: the admin should call [channels.convertToGigagroup](/method/channels.convertToGigagroup.md) to convert it to a gigagroup.

<!-- end channel suggestions -->

#### Dismissing suggestions

    boolFalse#bc799737 = Bool;
    boolTrue#997275b5 = Bool;

    ---functions---

    help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;

[help.dismissSuggestion](/method/help.dismissSuggestion.md) can be used to dismiss a suggestion.  
Pass [inputPeerEmpty](/constructor/inputPeerEmpty.md) to `peer` for [basic suggestions](#basic-suggestions) and [custom suggestions](#custom-suggestions) and the [channel/supergroup](/api/channel.md)'s peer for [channel suggestions](#channel-suggestions).

### App-specific configuration

    help.appUpdate#ccbbce30 flags:# can_not_skip:flags.0?true id:int version:string text:string entities:Vector<MessageEntity> document:flags.1?Document url:flags.2?string sticker:flags.3?Document = help.AppUpdate;
    help.noAppUpdate#c45a6536 = help.AppUpdate;

    updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
    updateServiceNotification#ebe46819 flags:# popup:flags.0?true invert_media:flags.2?true inbox_date:flags.1?int type:string message:string media:MessageMedia entities:Vector<MessageEntity> = Update;

    help.inviteText#18cb9f78 message:string = help.InviteText;

    ---functions---

    help.getAppUpdate#522d5a7d source:string = help.AppUpdate;

    help.getInviteText#4d392343 = help.InviteText;

* [help.getAppUpdate](/method/help.getAppUpdate.md) - Get info about an application update, can contain the updated application binary in the attached document
* [help.getInviteText](/method/help.getInviteText.md) - Returns a localized invitation message that can be sent via SMS to contacts that haven't signed up to Telegram yet

### Terms of service

    help.termsOfServiceUpdateEmpty#e3309f7f expires:int = help.TermsOfServiceUpdate;
    help.termsOfServiceUpdate#28ecf961 expires:int terms_of_service:help.TermsOfService = help.TermsOfServiceUpdate;

    help.termsOfService#780a0310 flags:# popup:flags.0?true id:DataJSON text:string entities:Vector<MessageEntity> min_age_confirm:flags.1?int = help.TermsOfService;

    auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;

    ---functions---

    help.getTermsOfServiceUpdate#2ca51fd1 = help.TermsOfServiceUpdate;
    help.acceptTermsOfService#ee72f79a id:DataJSON = Bool;

    auth.signIn#8d52a951 flags:# phone_number:string phone_code_hash:string phone_code:flags.0?string email_verification:flags.1?EmailVerification = auth.Authorization;

    account.deleteAccount#a2c0cf74 flags:# reason:string password:flags.0?InputCheckPasswordSRP = Bool;

These methods can be used for managing consent to Telegram's [Terms Of Service](https://telegram.org/tos).  

Typically, before a user [signs up](/api/auth.md#sign-in-sign-up) by invoking [auth.signUp](/method/auth.signUp.md), apps should show a pop-up (if the `popup` flag of the [help.termsOfService](/constructor/help.termsOfService.md) method is set), asking the user to accept Telegram's terms of service; in case of denial, the user is to be returned to the initial page of the login flow.  

When signing up for the first time, the [help.termsOfService](/constructor/help.termsOfService.md) is to be obtained from the [auth.authorizationSignUpRequired](/constructor/auth.authorizationSignUpRequired.md) constructor returned by the [auth.signIn](/method/auth.signIn.md).  

After signing up, or when logging in as an existing user, apps are supposed to call [help.getTermsOfServiceUpdate](/method/help.getTermsOfServiceUpdate.md) to check for any updates to the Terms of Service; this call should be repeated after `expires` seconds have elapsed.  
If an update to the Terms Of Service is available, clients are supposed to show a consent popup; if accepted, clients should call [help.acceptTermsOfService](/method/help.acceptTermsOfService.md), providing the [termsOfService `id` JSON object](/constructor/help.termsOfService.md); in case of denial, clients are to delete the account using [account.deleteAccount](/method/account.deleteAccount.md), providing `Decline ToS update` as deletion `reason`.  

Example implementation: [android (signup)](https://github.com/DrKLO/Telegram/blob/68d51749c4fcbaffa584829f23936565df55e08b/TMessagesProj/src/main/java/org/telegram/ui/LoginActivity.java#L7757), [android (after login)](https://github.com/DrKLO/Telegram/blob/eee720ef5e48e1c434f4c5a83698dc4ada34aaa9/TMessagesProj/src/main/java/org/telegram/ui/Components/TermsOfServiceView.java)

### Telegram support info

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    help.support#17c6b5f6 phone_number:string user:User = help.Support;
    help.supportName#8c05f1c9 name:string = help.SupportName;

    ---functions---

    help.getSupport#9cdf08cd = help.Support;
    help.getSupportName#d360e72c = help.SupportName;

These methods can be used for fetching info about Telegram's support user, that users can use to get support and ask questions about the app.  
- [help.getSupport](/method/help.getSupport.md) - Will return the [user](/constructor/user.md) object that can be used for contacting support.
- [help.getSupportName](/method/help.getSupportName.md) - Will return a localized name for the support chat.

### Country information and login phone patterns

    help.countryCode#4203c5ef flags:# country_code:string prefixes:flags.0?Vector<string> patterns:flags.1?Vector<string> = help.CountryCode;

    help.country#c3878e23 flags:# hidden:flags.0?true iso2:string default_name:string name:flags.1?string country_codes:Vector<help.CountryCode> = help.Country;

    help.countriesListNotModified#93cc1f32 = help.CountriesList;
    help.countriesList#87d0759e countries:Vector<help.Country> hash:int = help.CountriesList;

    ---functions---
    help.getCountriesList#735787a8 lang_code:string hash:int = help.CountriesList;

[help.getCountriesList](/method/help.getCountriesList.md) can be used to fetch a list of localized names for all available countries and phone code patterns for logging in.  

The phone code pattern should be used when showing the [login](/api/auth.md) screen, or when changing phone number: for example, a pattern value of `XXX XXX XXX` with `country_code` `+39` indicates that the phone field for login should accept a spaced pattern like `+39 123 456 789`.  
Also, the beginning of the national part of the phone number (`123 456 789`) should match one of the `prefixes`, if any were returned.  

Additionally, the `fragment_prefixes` [client configuration parameter](/api/config.md#client-configuration) contains a list of phone number prefixes for anonymous [Fragment](https://fragment.com) phone numbers.
