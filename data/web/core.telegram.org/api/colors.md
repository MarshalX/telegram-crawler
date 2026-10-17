# Accent colors


Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

### Color palette options

    help.peerColorOption#adec6ebe flags:# hidden:flags.0?true color_id:int colors:flags.1?help.PeerColorSet dark_colors:flags.2?help.PeerColorSet channel_min_level:flags.3?int group_min_level:flags.4?int = help.PeerColorOption;

    help.peerColorsNotModified#2ba1f5ce = help.PeerColors;
    help.peerColors#00f8ed08 hash:int colors:Vector<help.PeerColorOption> = help.PeerColors;

    ---functions---

    help.getPeerColors#da80f42f hash:int = help.PeerColors;
    help.getPeerProfileColors#abcfa9fd hash:int = help.PeerColors;

Available color palettes are represented by the [help.peerColorOption](/constructor/help.peerColorOption.md) constructor, which contains the palette's ID, the actual light/dark mode color palettes, and some extra information.  

Use [help.getPeerProfileColors](/method/help.getPeerProfileColors.md) to obtain all [help.peerColorOption](/constructor/help.peerColorOption.md)s that can be used in the background of a profile page, and use [help.getPeerColors](/method/help.getPeerColors.md) to obtain all [help.peerColorOption](/constructor/help.peerColorOption.md)s that can be used in message accents.  

[help.peerColorOption](/constructor/help.peerColorOption.md).`color_id` is the ID of the palette (not an RGB24 color, just a numeric ID), passed to [peerColor](/constructor/peerColor.md) when changing the profile/message palette and pattern.  

If the [help.peerColorOption](/constructor/help.peerColorOption.md).`hidden` flag is set, the current palette should not be displayed as an option to the user when choosing a palette to use in the profile page or in message accents (however, the palette should still be used if encountered in messages and profiles).  

The [help.peerColorOption](/constructor/help.peerColorOption.md).`colors`/`dark_colors` fields contain the actual color palette for light/dark mode, represented by a [help.PeerColorSet](/type/help.PeerColorSet.md) (see [below &raquo;](#color-palettes) for more info).  

Note: `colors` will be empty for palette IDs `0` to `6` inclusive, in which case a palette containing a single color from the following colors should be used: red, orange, violet, green, cyan, blue, pink for indexes 0 to 6 (i.e. the same colors used for the [randomized fallback color palette](/api/colors.md#randomized-fallback-color-palette)).  

`dark_colors` will also be empty for those IDs (in this case, use a similarly generated dark mode palette), it may be empty for other IDs as well (in this case, fallback to `colors`).

#### Color palettes

    help.peerColorSet#26219a58 colors:Vector<int> = help.PeerColorSet;
    help.peerColorProfileSet#767d61eb palette_colors:Vector<int> bg_colors:Vector<int> story_colors:Vector<int> = help.PeerColorSet;

Color palettes contained in [color palette options &raquo;](#color-palette-options) are represented by [help.peerColorSet](/constructor/help.peerColorSet.md) (returned by [help.getPeerColors](/method/help.getPeerColors.md), containing a palette for message accents) or a [help.peerColorProfileSet](/constructor/help.peerColorProfileSet.md) (returned by [help.getPeerColors](/method/help.getPeerColors.md) containing a palette for profile pages) constructors.  

Both constructors contain a variable list of colors RGB format to be used in different ways to generate the background palette, see the relative constructor pages for more info.  

### Background pattern emojis

    stickerSet#2dd14edc flags:# archived:flags.1?true official:flags.2?true masks:flags.3?true emojis:flags.7?true text_color:flags.9?true channel_emoji_status:flags.10?true creator:flags.11?true installed_date:flags.0?int id:long access_hash:long title:string short_name:string thumbs:flags.4?Vector<PhotoSize> thumb_dc_id:flags.4?int thumb_version:flags.4?int thumb_document_id:flags.8?long count:int hash:int = StickerSet;

    ---functions---

    account.getDefaultBackgroundEmojis#a60ab9ce hash:long = EmojiList;

Use [account.getDefaultBackgroundEmojis](/method/account.getDefaultBackgroundEmojis.md) to obtain a list of IDs of [custom emojis](/api/custom-emoji.md) that can be used in a palette's background pattern.  

All custom emojis in [custom emoji stickersets&nbsp;&raquo;](/api/custom-emoji.md) with [stickerSet](/constructor/stickerSet.md).`text_color` flag set can also be used for the same purpose.  

### Setting the color palette and background emoji pattern

Schema:

    peerColor#b54b5acf flags:# color:flags.0?int background_emoji_id:flags.1?long = PeerColor;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    ---functions---

    account.updateColor#684d214e flags:# for_profile:flags.1?true color:flags.2?PeerColor = Bool;

    channels.updateColor#d8aa3671 flags:# for_profile:flags.1?true channel:InputChannel color:flags.2?int background_emoji_id:flags.0?long = Updates;

A [peerColor](/constructor/peerColor.md) constructor contains a color palette ID (`id`, pointing to a [color palette option &raquo;](#color-palette-options)) and a [custom emoji sticker&nbsp;&raquo;](#background-pattern-emojis) (`background_emoji_id`) to be re-colored using the colors in the palette and spread out throughout the palette, generating a background that can be used in various places throughout the UI, depending on the value of `for_profile`:

* If `for_profile` is set, invoking the methods will update the **profile palette and pattern**, available in [user](/constructor/user.md).`profile_color` and [channel](/constructor/channel.md).`profile_color`.   

  The profile palette and pattern will be used in the backdrop of the user or channel's profile page.  

* If `for_profile` is **not** set, invoking the methods will update the **message palette and pattern**, available in [user](/constructor/user.md).`color` and [channel](/constructor/channel.md).`color`.  

  The message palette and pattern will be used in webpage preview message frames and message accent colors when quoting or replying to messages sent by the channel or user.  

Use [account.updateColor](/method/account.updateColor.md) to update the color palette of the current account's message accents and/or profile page; note that the current account must be subscribed to [Telegram Premium](/api/premium.md) in order to call the method.  

Use [channels.updateColor](/method/channels.updateColor.md) to update the color palette of a channel/supergroup's profile page accents, or a channel's message accent (in this case, the background emoji ID, if any, must be provided directly to the method).  

Changing any of the palettes will emit an [updateChannel](/constructor/updateChannel.md)/[updateUser](/constructor/updateUser.md) update.  

Note that channels/supergroups can use a message accent palette or profile palette only after reaching at least the [boost level](/api/boost.md) specified in the `channel_min_level`/`group_min_level` field of the [help.peerColorOption](/constructor/help.peerColorOption.md) constructor for the chosen palette.  

Additionally, to change **profile** palettes, channels/supergroups must **also** reach at least the [boost level](/api/boost.md) specified in the [`channel_profile_bg_icon_level_min`&nbsp;&raquo;](/api/config.md#channel-profile-bg-icon-level-min)/[`group_profile_bg_icon_level_min`&nbsp;&raquo;](/api/config.md#group-profile-bg-icon-level-min) config parameters.  

#### Randomized fallback color palette

If no palette is specified for a peer, a random color from red, orange, violet, green, cyan, blue, pink (eventually tweaked according to the client's theme) must be chosen locally as message accent palette once for every met peer.  

### Collectible gift palettes
    
Some [collectible gifts &raquo;](/api/gifts.md#collectible-gifts) have an associated color palette that can be used on profile background palettes and message palettes.  

#### Collectible profile palettes
    
    account.emojiStatusesNotModified#d08ce645 = account.EmojiStatuses;
    account.emojiStatuses#90c467d1 hash:long statuses:Vector<EmojiStatus> = account.EmojiStatuses;
    
    emojiStatusCollectible#7184603b flags:# collectible_id:long document_id:long title:string slug:string pattern_document_id:long center_color:int edge_color:int pattern_color:int text_color:int until:flags.0?int = EmojiStatus;

    ---functions---
    
    account.getCollectibleEmojiStatuses#2e7b4543 hash:long = account.EmojiStatuses;

    account.updateEmojiStatus#fbd3de6b emoji_status:EmojiStatus = Bool;
    channels.updateEmojiStatus#f0d3e6a8 channel:InputChannel emoji_status:EmojiStatus = Updates;

Profile palettes based on [collectible gifts &raquo;](/api/gifts.md#collectible-gifts) can only be set using [account.updateEmojiStatus](/method/account.updateEmojiStatus.md)/[channels.updateEmojiStatus](/method/channels.updateEmojiStatus.md), not [account.updateColor](/method/account.updateColor.md).  

Use [account.getCollectibleEmojiStatuses](/method/account.getCollectibleEmojiStatuses.md) to obtain the list of available collectible emoji statuses for owned or [hosted collectible gifts &raquo;](/api/gifts.md#hosted-collectible-gifts) (as [emojiStatusCollectible](/constructor/emojiStatusCollectible.md) objects), choose one, convert it to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) and [set it as described here &raquo;](/api/emoji-status.md#setting-an-emoji-status), using [account.updateEmojiStatus](/method/account.updateEmojiStatus.md).

The colors and custom emoji to be used in the profile backdrop are specified in the chosen [emojiStatusCollectible](/constructor/emojiStatusCollectible.md), and will only be visible in [user](/constructor/user.md)/[channel](/constructor/channel.md).`emoji_status`, **not** [user](/constructor/user.md)/[channel](/constructor/channel.md).`profile_color`.  

Collectible emoji statuses are not compatible with custom profile palette/patterns: setting a collectible emoji status will remove any previously configured profile palette/pattern, and vice versa, setting a custom profile palette/pattern will remove any previously configured collectible emoji status.  

#### Collectible message palettes

    starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;

    starGift#313a9547 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true require_premium:flags.7?true limited_per_user:flags.8?true peer_color_available:flags.10?true auction:flags.11?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int availability_resale:flags.4?long convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long resell_min_stars:flags.4?long title:flags.5?string released_by:flags.6?Peer per_user_total:flags.8?int per_user_remains:flags.8?int locked_until_date:flags.9?int auction_slug:flags.11?string gifts_per_round:flags.11?int auction_start_date:flags.11?int upgrade_variants:flags.12?int background:flags.13?StarGiftBackground = StarGift;

    inputPeerColorCollectible#b8ea86a9 collectible_id:long = PeerColor;

    peerColorCollectible#b9c0639a flags:# collectible_id:long gift_emoji_id:long background_emoji_id:long accent_color:int colors:Vector<int> dark_accent_color:flags.0?int dark_colors:flags.1?Vector<int> = PeerColor;

    ---functions---

    payments.getSavedStarGifts#a319e569 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_unique:flags.4?true sort_by_value:flags.5?true exclude_upgradable:flags.7?true exclude_unupgradable:flags.8?true peer_color_available:flags.9?true exclude_hosted:flags.10?true peer:InputPeer collection_id:flags.6?int offset:string limit:int = payments.SavedStarGifts;

    account.updateColor#684d214e flags:# for_profile:flags.1?true color:flags.2?PeerColor = Bool;

Owned or [hosted collectible gifts &raquo;](/api/gifts.md#hosted-collectible-gifts) may be used as message palettes, which are used in webpage preview message frames and message accent colors when quoting or replying to messages sent by the channel or user.

To obtain the list of owned or hosted collectible gifts that can be used as message palettes invoke [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) with the `peer_color_available` flag set, which will return a list of [starGiftUnique](/constructor/starGiftUnique.md) constructors with the `peer_color` parameter populated with a [peerColorCollectible](/constructor/peerColorCollectible.md) constructor, containing the palette and pattern associated with the gift.

Note: simple, non-upgraded gifts represented by [starGift](/constructor/starGift.md) that will have an associated palette once upgraded to a collectible gift have the [starGift](/constructor/starGift.md).`peer_color_available` flag set.  

The chosen [starGiftUnique](/constructor/starGiftUnique.md) is then used to generate an [inputPeerColorCollectible](/constructor/inputPeerColorCollectible.md), passed to [account.updateColor](/method/account.updateColor.md).  

Once configured, the collectible message palette will be available in [message](/constructor/message.md).`color` as a full [peerColorCollectible](/constructor/peerColorCollectible.md) constructor.  

[inputPeerColorCollectible](/constructor/inputPeerColorCollectible.md) can't be used for profile palettes (`for_profile`), use [account.updateEmojiStatus](/method/account.updateEmojiStatus.md) for those instead, see [here &raquo;](#collectible-profile-palettes) for the full flow.  

[inputPeerColorCollectible](/constructor/inputPeerColorCollectible.md) also can't be used by channels with [channels.updateColor](/method/channels.updateColor.md) (for message palettes, collectible profile palettes for channels are usable with [channels.updateEmojiStatus](/method/channels.updateEmojiStatus.md)).
