# Affiliate programs


Developers can open affiliate programs for their [mini app](/api/bots/webapps.md) – allowing **content creators**, other **mini app developers** and **any Telegram user** to promote it and earn commissions on purchases made by people they referred.

### Creating an affiliate program

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    starsAmount#bbb6b4a3 amount:long nanos:int = StarsAmount;
    starRefProgram#dd0c66f2 flags:# bot_id:long commission_permille:int duration_months:flags.0?int end_date:flags.1?int daily_revenue_per_user:flags.2?StarsAmount = StarRefProgram;

    ---functions---

    bots.getAdminedBots#b0711d83 = Vector<User>;

    bots.updateStarRefProgram#778b5ab3 flags:# bot:InputUser commission_permille:int duration_months:flags.0?int = StarRefProgram;

A mini app developer can invoke [bots.updateStarRefProgram](/method/bots.updateStarRefProgram.md) to create, edit or delete the [affiliate program](https://telegram.org/tour/affiliate-programs) of [mini apps &raquo;](/api/bots/webapps.md) they own.  
Owned bots can be fetched using [bots.getAdminedBots](/method/bots.getAdminedBots.md), or by checking the `bot_can_edit` flag of the associated [user](/constructor/user.md).  

If the `bot_can_edit` flag is set, graphical clients should display an "Affiliate program" option when editing the bot's profile, that can be used to create and edit the bot's affiliate program.  
Note that all UI elements and functionality related to the creation of affiliate programs by bot owners must be hidden and disabled if the [`starref_program_allowed` client configuration parameter &raquo;](/api/config.md#starref-program-allowed) is set and equal to false.  

When invoking [bots.updateStarRefProgram](/method/bots.updateStarRefProgram.md), pass the following parameters:

* The `bot` parameter must contain the ID of the bot that owns the [mini app](/api/bots/webapps.md).  
* The `commission_permille` parameter specifies the permille commission rate: it indicates the share of Telegram Stars received by affiliates for every transaction made by users they referred inside of the mini app.  
  The minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](/api/config.md#starref-min-commission-permille) and [starref_max_commission_permille](/api/config.md#starref-max-commission-permille) client configuration parameters.  
* The `duration_months` can be optionally populated, indicating the duration of the affiliate program; if not set, there is no expiration date.  

Both the duration and the commission may only be raised after creation of the program: to lower them, the program must first be terminated and a new one created.  

To end an affiliate program, pass `0` to `commission_permille`: around 24 hours after invoking the method (specifically, exactly at the time specified in [userFull](/constructor/userFull.md).`starref_program`.`end_date`), the program will be terminated, invalidating all [created affiliate links](#becoming-an-affiliate).  
A new affiliate program can only be created after termination of the current one (after [userFull](/constructor/userFull.md).`starref_program`.`end_date`); invoking the method before the end_date will emit a `STARREF_AWAITING_END` RPC error.   
Note that after termination, affiliates will still retain all commissions they earned before the program was terminated. Additionally, future purchases by users who were referred by affiliates that joined while the program was active will continue generating commissions for those affiliates until their originally specified commission period has elapsed.  

If a bot has an active affiliate program, the [userFull](/constructor/userFull.md).`starref_program` flag will be set, containing info about the referral program.  
Mini apps, channel owners and simple users can join the referral program as specified [here &raquo;](#becoming-an-affiliate).  

### Becoming an affiliate

    starsAmount#bbb6b4a3 amount:long nanos:int = StarsAmount;
    starRefProgram#dd0c66f2 flags:# bot_id:long commission_permille:int duration_months:flags.0?int end_date:flags.1?int daily_revenue_per_user:flags.2?StarsAmount = StarRefProgram;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    payments.suggestedStarRefBots#b4d5d859 flags:# count:int suggested_bots:Vector<StarRefProgram> users:Vector<User> next_offset:flags.0?string = payments.SuggestedStarRefBots;

    connectedBotStarRef#19a13f71 flags:# revoked:flags.1?true url:string date:int bot_id:long commission_permille:int duration_months:flags.0?int participants:long revenue:long = ConnectedBotStarRef;

    payments.connectedStarRefBots#98d5ea1d count:int connected_bots:Vector<ConnectedBotStarRef> users:Vector<User> = payments.ConnectedStarRefBots;

    ---functions---

    payments.getSuggestedStarRefBots#0d6b48f7 flags:# order_by_revenue:flags.0?true order_by_date:flags.1?true peer:InputPeer offset:string limit:int = payments.SuggestedStarRefBots;

    payments.connectStarRefBot#7ed5348a peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;

    payments.getConnectedStarRefBots#5869a553 flags:# peer:InputPeer offset_date:flags.2?int offset_link:flags.2?string limit:int = payments.ConnectedStarRefBots;
    payments.getConnectedStarRefBot#b7d998f0 peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;

    payments.editConnectedStarRefBot#e4fca4a3 flags:# revoked:flags.0?true peer:InputPeer link:string = payments.ConnectedStarRefBots;

[Mini apps](/api/bots/webapps.md) with the [userFull](/constructor/userFull.md).`starref_program` flag set have affiliate programs that the user may join, becoming an affiliate.  
An affiliate gets a commission of [starRefProgram](/constructor/starRefProgram.md).`commission_permille`‰ [Telegram Stars](/api/stars.md) for every mini app transaction made by users they refer, for `duration_months` months after your referral link is imported by any user, earning an estimated `daily_revenue_per_user * commission_permille / 1000` stars per day per referred user.  

Users may obtain a list of suggested [mini apps](/api/bots/webapps.md) with available affiliate programs using [payments.getSuggestedStarRefBots](/method/payments.getSuggestedStarRefBots.md).  

To become an affiliate, invoke [payments.connectStarRefBot](/method/payments.connectStarRefBot.md), passing to `bot` the identifier of the mini app that we want to affiliate with, and to `peer` the affiliate peer, either:

- The current user ([inputPeerSelf](/constructor/inputPeerSelf.md))
- A bot we own (one of the bots returned by [bots.getAdminedBots](/method/bots.getAdminedBots.md))
- A channel we own (one of the channels returned by [channels.getAdminedPublicChannels](/method/channels.getAdminedPublicChannels.md), locally filtering out only [channels](/constructor/channel.md) with the `post_messages` [admin right](/api/rights.md))

This will create a [referral link](/api/links.md#referral-links) for the mini app passed in `bot`: the link will be contained in the `url` field of the returned [connectedBotStarRef](/constructor/connectedBotStarRef.md) constructor.  

These links can then be shared (responsibly): any Telegram user who starts the mini app for the first time after following a referral link will be considered a successful referral – and any purchases they make with Telegram Stars within the mini app will earn us commissions (as specified above), transferring [Stars](/api/stars.md) to the star balance of the affiliate passed to `peer`.  

Use [payments.getConnectedStarRefBots](/method/payments.getConnectedStarRefBots.md) to fetch all affiliations we have created for a certain affiliate `peer`.  
Use [payments.getConnectedStarRefBot](/method/payments.getConnectedStarRefBot.md) to fetch info about a specific affiliation we have created for a certain affiliate `peer` with a certain `bot`.  
Use [payments.editConnectedStarRefBot](/method/payments.editConnectedStarRefBot.md) to revoke an affiliation for a specific affiliate `peer`, revoking the specified  [referral link &raquo;](/api/links.md#referral-links) ([connectedBotStarRef](/constructor/connectedBotStarRef.md).`url`).  

Note that all UI elements that would allow the user to join affiliate programs and becoming an affiliate must be hidden and disabled if the [`starref_connect_allowed` client configuration parameter &raquo;](/api/config.md#starref-connect-allowed) is set and equal to false.  

### Importing an affiliate link

    ---functions---

    contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;

When clicking on a [referral link &raquo;](/api/links.md#referral-links), created by an affiliated user, channel or mini app as [specified here &raquo;](#becoming-an-affiliate), the `referrer` parameter must be passed to the `referer` parameter of [contacts.resolveUsername](/method/contacts.resolveUsername.md).  

When opening [referral links &raquo;](/api/links.md#referral-links), [contacts.resolveUsername](/method/contacts.resolveUsername.md) must be **always** invoked, even if the client already has a cached [Peer](/type/Peer.md) for the associated `username`.  

If a `STARREF_EXPIRED` RPC error is returned by the method, an error indicating that the passed referral link is invalid must be shown to the user. 