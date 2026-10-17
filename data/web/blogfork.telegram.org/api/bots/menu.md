# Bot menu button


Bots can choose the behavior of the menu button shown next to the text input field.  

For a simplified description using the HTTP bot API, see [here »](/bots/api.md).  

### Setting the menu button

Schema:

    botMenuButtonDefault#7533a588 = BotMenuButton;
    botMenuButtonCommands#4258c205 = BotMenuButton;
    botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;

    inputUserEmpty#b98886cf = InputUser;
    inputUser#f21158c6 user_id:long access_hash:long = InputUser;

    ---functions---

    bots.setBotMenuButton#4504d54f user_id:InputUser button:BotMenuButton = Bool;

Bots can use [bots.setBotMenuButton](/method/bots.setBotMenuButton.md) to change the menu button for a certain user, or for all users.

#### Set scope: all users

To change the menu button for all users use the following parameters:
* `user_id` - [inputUserEmpty](/constructor/inputUserEmpty.md)
* `button` - one of the following constructors:
    * [botMenuButton](/constructor/botMenuButton.md) - Opens a [bot mini app](/api/bots/webapps.md) when clicked.
    * [botMenuButtonCommands](/constructor/botMenuButtonCommands.md) - Opens the bot's command list when clicked.

[botMenuButtonDefault](/constructor/botMenuButton.md) shouldn't be used as it has no effect, keeping the previously set menu button (either [botMenuButton](/constructor/botMenuButton.md) or [botMenuButtonCommands](/constructor/botMenuButtonCommands.md)).

#### Set scope: specific users

To change the menu button for a specific user use the following parameters:
* `user_id` - [inputUser](/constructor/inputUser.md) with the user ID/access hash
* `button` - one of the following constructors:
    * [botMenuButton](/constructor/botMenuButton.md) - Opens a [bot mini app](/api/bots/webapps.md) when clicked.
    * [botMenuButtonCommands](/constructor/botMenuButtonCommands.md) - Opens the bot's command list when clicked.
    * [botMenuButtonDefault](/constructor/botMenuButton.md) - Resets the behavior of the button to the [default scope (all users)](#set-scope-all-users).  

### Getting the menu button

#### Bots

    botMenuButtonDefault#7533a588 = BotMenuButton;
    botMenuButtonCommands#4258c205 = BotMenuButton;
    botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;

    inputUserEmpty#b98886cf = InputUser;
    inputUser#f21158c6 user_id:long access_hash:long = InputUser;

    ---functions---

    bots.getBotMenuButton#9c60eb28 user_id:InputUser = BotMenuButton;

Bots might need to know the button type currently used in a given chat or in all chats: [bots.getBotMenuButton](/method/bots.getBotMenuButton.md) can be used for this.

Users can't use this method, and should use the [user](#users) method instead.  

##### Get scope: all users

To get the menu button used for all users use the following parameter:
* `user_id` - [inputUserEmpty](/constructor/inputUserEmpty.md)

One of the following constructors will be returned:
 * [botMenuButton](/constructor/botMenuButton.md) - Opens a [bot mini app](/api/bots/webapps.md) when clicked.
 * [botMenuButtonCommands](/constructor/botMenuButtonCommands.md) - Opens the bot's command list when clicked.

[botMenuButtonDefault](/constructor/botMenuButton.md) will never be returned in this case.

##### Get scope: specific users

To get the menu button used for a specific user use the following parameter:
* `user_id` - [inputUser](/constructor/inputUser.md) with the user ID access/hash

One of the following constructors will be returned:
 * [botMenuButton](/constructor/botMenuButton.md) - Opens a [bot mini app](/api/bots/webapps.md) when clicked.
 * [botMenuButtonCommands](/constructor/botMenuButtonCommands.md) - Opens the bot's command list when clicked.
* [botMenuButtonDefault](/constructor/botMenuButton.md) - The [default scope (all users) button behavior is in use](#get-scope-all-users).  

#### Users

    updateBotMenuButton#14b85813 bot_id:long button:BotMenuButton = Update;

    botMenuButtonCommands#4258c205 = BotMenuButton;
    botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;

    botInfo#4d8a0299 flags:# has_preview_medias:flags.6?true user_id:flags.0?long description:flags.1?string description_photo:flags.4?Photo description_document:flags.5?Document commands:flags.2?Vector<BotCommand> menu_button:flags.3?BotMenuButton privacy_policy_url:flags.7?string app_settings:flags.8?BotAppSettings verifier_settings:flags.9?BotVerifierSettings = BotInfo;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    users.getFullUser#b60f5918 id:InputUser = users.UserFull;

Users will receive an [updateBotMenuButton](/constructor/updateBotMenuButton.md) update when a bot changes the behavior of the menu button globally or in the private chat with the user.  

For new bots, [users.getFullUser](/method/users.getFullUser.md) can be used to fetch the [userFull](/constructor/userFull.md) related to the bot, containing the [botInfo](/constructor/botInfo.md) constructor with various info about the bot, including the menu button behavior.  

[botMenuButtonDefault](/constructor/botMenuButton.md) will never be returned in an [updateBotMenuButton](/constructor/updateBotMenuButton.md) or in a [botInfo](/constructor/botInfo.md) (but if it does happen, treat it like a [botMenuButtonCommands](/constructor/botMenuButtonCommands.md)).

Bots should use the [bot](#bots) method instead.  

