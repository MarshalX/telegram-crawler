# Bot attachment menu and side menu entries


Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile [mini apps](/api/bots/webapps.md#attachment-menu-mini-apps).

Schema:

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    attachMenuBotsBot#93bf667f bot:AttachMenuBot users:Vector<User> = AttachMenuBotsBot;

    attachMenuBot#d90d8dfe flags:# inactive:flags.0?true has_settings:flags.1?true request_write_access:flags.2?true show_in_attach_menu:flags.3?true show_in_side_menu:flags.4?true side_menu_disclaimer_needed:flags.5?true bot_id:long short_name:string peer_types:flags.3?Vector<AttachMenuPeerType> icons:Vector<AttachMenuBotIcon> = AttachMenuBot;

    attachMenuPeerTypeSameBotPM#7d6be90e = AttachMenuPeerType;
    attachMenuPeerTypeBotPM#c32bfa1a = AttachMenuPeerType;
    attachMenuPeerTypePM#f146d31f = AttachMenuPeerType;
    attachMenuPeerTypeChat#509113f = AttachMenuPeerType;
    attachMenuPeerTypeBroadcast#7bfbdefc = AttachMenuPeerType;

    attachMenuBotIcon#b2a7386b flags:# name:string icon:Document colors:flags.0?Vector<AttachMenuBotIconColor> = AttachMenuBotIcon;

    attachMenuBotIconColor#4576f3f0 name:string color:int = AttachMenuBotIconColor;

    updateAttachMenuBots#17b7a20b = Update;

    attachMenuBotsNotModified#f1d88a5c = AttachMenuBots;
    attachMenuBots#3c4301c0 hash:long bots:Vector<AttachMenuBot> users:Vector<User> = AttachMenuBots;

    ---functions---

    messages.getAttachMenuBot#77216192 bot:InputUser = AttachMenuBotsBot;

    messages.toggleBotInAttachMenu#69f59d69 flags:# write_allowed:flags.0?true bot:InputUser enabled:Bool = Bool;

    messages.getAttachMenuBots#16fcc2cb hash:long = AttachMenuBots;

Bots that have the `bot_attach_menu` flag set offer an attachment or side menu entry that can be added to the in-app attachment menu or main view side menu.  

Use [messages.getAttachMenuBot](/method/messages.getAttachMenuBot.md) to get info about the attachment/side menu entry of a given bot, see the [attachMenuBot constructor page for more info&nbsp;&raquo;](/constructor/attachMenuBot.md).  

The currently installed attachment/side menu list can be fetched using [messages.getAttachMenuBots](/method/messages.getAttachMenuBots.md).  

Use [messages.toggleBotInAttachMenu](/method/messages.toggleBotInAttachMenu.md) to enable or disable the attachment and/or side menu of a given bot (the entries that must be installed or uninstalled depend on the values of the [attachMenuBot](/constructor/attachMenuBot.md).`show_in_attach_menu` and [attachMenuBot](/constructor/attachMenuBot.md).`show_in_side_menu` flags).  
Changes made using this method will trigger an [updateAttachMenuBots](/constructor/updateAttachMenuBots.md) update in other clients, which should trigger a [messages.getAttachMenuBots](/method/messages.getAttachMenuBots.md) call to fetch the full updated list of installed attachment/side menu entries.  
The attachment/side menu list should also be refreshed if the user changes the app's language in the settings.  

Once an attachment/side menu is enabled for a certain user, the [user](/constructor/user.md).`attach_menu_enabled` flag will be set _for the bot_, and the [attachMenuBot](/constructor/attachMenuBot.md).`inactive` flag will be unset.  

Clicking on the attachment/side menu entry should open the related [attachment menu mini app](/api/bots/webapps.md#attachment-menu-mini-apps), see [here&nbsp;&raquo;](/api/bots/webapps.md#attachment-menu-mini-apps) and [here&nbsp;&raquo;](/api/bots/webapps.md#side-menu-mini-apps) for more info on the required steps.

Attachment menus can be installed and opened through [attachment/side menu deep links](/api/links.md#bot-attachment-or-side-menu-links).

In particular, when clicking on such a link, [messages.getAttachMenuBot](/method/messages.getAttachMenuBot.md) should be invoked to check if the bot has an associated attachment/side menu entry, and if yes:  

* If the [attachMenuBot](/constructor/attachMenuBot.md).`inactive` flag:
  * ...is set, the attachment/side menu entry is not installed.  
    Thus, before launching the mini app when clicking on a [attachment/side menu deep link](/api/links.md#bot-attachment-or-side-menu-links), the client should show a prompt to the user, asking to add the mini app to the attachment/side menu.  
    Note that if the [attachMenuBot](/constructor/attachMenuBot.md).`side_menu_disclaimer_needed` flag is set, an additional mandatory checkbox to accept the [mini apps TOS](https://telegram.org/tos/mini-apps) and a disclaimer indicating that this Mini App is not affiliated to Telegram should be shown in the installation prompt.  
    If the user accepts, invoke [messages.toggleBotInAttachMenu](/method/messages.toggleBotInAttachMenu.md) with the `write_allowed` flag set and proceed to the next step, otherwise abort the process.  
  * ...is not set, and the [attachMenuBot](/constructor/attachMenuBot.md).`side_menu_disclaimer_needed` flag is still set, an additional mandatory checkbox to accept the [mini apps TOS](https://telegram.org/tos/mini-apps) and a disclaimer indicating that this Mini App is not affiliated to Telegram should be shown.  
    If the user accepts, proceed to the next step, otherwise abort the process.  
* Open the Mini App:
  * If the link is a [direct mini app link](/api/links.md#direct-mini-app-links), open the Mini App regardless of the currently open Telegram chat (in fact, the Mini App should be opened even if the client itself is minimized), as specified [here&nbsp;&raquo;](/api/bots/webapps.md#direct-link-mini-apps).  
  * For [attachment/side menu links](/api/links.md#bot-attachment-or-side-menu-links), check that the attachment menu can be opened in the chosen chat type by checking the [attachMenuBot](/constructor/attachMenuBot.md).`peer_types` field.  
    * If the chosen chat is supported, open the [attachment menu mini app&nbsp;&raquo;](/api/bots/webapps.md#attachment-menu-mini-apps) as specified [here&nbsp;&raquo;](/api/bots/webapps.md#attachment-menu-mini-apps).
    * Otherwise:
        * If the user has just installed the attachment menu @ step 1, notify the user that the attachment menu was installed successfully.
        * Otherwise, notify the user that the attachment menu webapp can't be opened in the specified chat.
