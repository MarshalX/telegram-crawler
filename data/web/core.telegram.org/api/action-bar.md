# Action bar


Sometimes, when interacting with Telegram users via private or secret chats, an action bar must be shown on top of the chat, offering convenient action buttons or notices regarding the user.

Schema:

    peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    updatePeerSettings#6a7e7366 peer:Peer settings:PeerSettings = Update;

    messages.peerSettings#6880b94d settings:PeerSettings chats:Vector<Chat> users:Vector<User> = messages.PeerSettings;

    ---functions---

    messages.getPeerSettings#efd9a6a2 peer:InputPeer = messages.PeerSettings;

    messages.hidePeerSettingsBar#4facb138 peer:InputPeer = Bool;

The action bar is represented by the [peerSettings](/constructor/peerSettings.md) constructor, fetchable using [messages.getPeerSettings](/method/messages.getPeerSettings.md); it is also contained in the [userFull](/constructor/userFull.md) constructor returned by [users.getFullUser](/method/users.getFullUser.md).

Changes to the chat bar may also be notified by the server using [updatePeerSettings](/constructor/updatePeerSettings.md).  

The currently active action bar may also be dismissed using [messages.hidePeerSettingsBar](/method/messages.hidePeerSettingsBar.md).  

What follows is a list of the various (*mutually exclusive*) chat bar types, along with the **condition** used to identify each type, by checking the appropriate flags of [peerSettings](/constructor/peerSettings.md).  

### Report spam, block or add contact

    inputReportReasonSpam#58dbcab8 = ReportReason;

    ---functions---

    account.reportPeer#c5ba3d86 peer:InputPeer reason:ReportReason message:string = Bool;

    contacts.addContact#d9ba2e54 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string note:flags.1?TextWithEntities = Updates;

    contacts.block#2e2e8734 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;

This action bar, associated to a private or secret chat, offers the user buttons to:
- Report the chat for spam using [account.reportPeer](/method/account.reportPeer.md) and [inputReportReasonSpam](/constructor/inputReportReasonSpam.md).  
  If the other user has an emoji status, then the bar should also show a notice, indicating that the emoji status is shown next to the user's name because they have purchased [Telegram Premium](/api/premium.md) (i.e. this is useful to avoid issues if the user uses an emoji status similar to a verified checkmark).  
  Additionally, if the chat was automatically [archived&nbsp;&raquo;](/api/folders.md#peer-folders) (according to [peerSettings](/constructor/peerSettings.md).`autoarchived`), an extra button can be shown to unarchive the chat [as specified here&nbsp;&raquo;](/api/folders.md#peer-folders) instead of reporting it.
- Add the other user of the chat to the contact list using [contacts.addContact](/method/contacts.addContact.md).  
  Optionally, the [peerSettings](/constructor/peerSettings.md).`need_contacts_exception` flag may also be set: if so, the `add_phone_privacy_exception` flag **must** be set if the user clicks on the add contact button, invoking [contacts.addContact](/method/contacts.addContact.md).  
- Block the other user of the chat from writing to us using [contacts.block](/method/contacts.block.md) (without setting the `my_stories_from` flag).  

**Condition**: the [peerSettings](/constructor/peerSettings.md).`report_spam`, [peerSettings](/constructor/peerSettings.md).`add_contact`, [peerSettings](/constructor/peerSettings.md).`block_contact` flags must all be set.

Additionally, if the [peerSettings](/constructor/peerSettings.md).`geo_distance` flag is set, the bar should also display the distance between us and the user, indicating that the user found us by invoking [contacts.getLocated](/method/contacts.getLocated.md), because we are currently advertising our location with the same method.

#### Account information

    peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;

When a user contacts you for the first time, the `registration_month`, `phone_country`, `name_change_date` and `photo_change_date` flags will be set in their [peerSettings](/constructor/peerSettings.md) constructor: these fields should be used to generate an info box, containing the following information:

* `registration_month` - Used to display the user's registration year and month, the string is in `MM.YYYY` format, where `MM` is the registration month (`1-12`), and `YYYY` is the registration year.  
* `phone_country` - The country code of the user's phone number.
* `name_change_date` - When was the user's name last changed.
* `photo_change_date` - When was the user's photo last changed.

The above information can come in handy for users to detect and [block](#report-spam-block-or-add-contact) spam or recently hijacked accounts.  

### Report spam or unarchive

    inputReportReasonSpam#58dbcab8 = ReportReason;

    ---functions---

    account.reportPeer#c5ba3d86 peer:InputPeer reason:ReportReason message:string = Bool;

This action bar, associated to a private or secret chat, offers the user a button to report the chat for spam using [account.reportPeer](/method/account.reportPeer.md) and [inputReportReasonSpam](/constructor/inputReportReasonSpam.md).  

If the other user has an emoji status, then the bar should also show a notice, indicating that the emoji status is shown next to the user's name because they have purchased [Telegram Premium](/api/premium.md) (i.e. this is useful to avoid issues if the user uses an emoji status similar to a verified checkmark).  

**Condition**: the [peerSettings](/constructor/peerSettings.md).`report_spam` flag must be set, and the [peerSettings](/constructor/peerSettings.md).`add_contact`, [peerSettings](/constructor/peerSettings.md).`block_contact` flags must **not** be set.

Additionally, if the chat was automatically [archived&nbsp;&raquo;](/api/folders.md#peer-folders) (according to [peerSettings](/constructor/peerSettings.md).`autoarchived`), an extra button can be shown to unarchive the chat [as specified here&nbsp;&raquo;](/api/folders.md#peer-folders) instead of reporting it.

### Add contact

    ---functions---

    contacts.addContact#d9ba2e54 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string note:flags.1?TextWithEntities = Updates;

This action bar, associated to a private or secret chat, offers the user a button to add the other user of the chat to the contact list using [contacts.addContact](/method/contacts.addContact.md).  

**Conditions**: the [peerSettings](/constructor/peerSettings.md).`add_contact` flag must be set **and**:
- For secret chats, the chat must **not** be archived.
- For private chats, the `block_contact` and `report_spam` flags must **not** be set.

Optionally, the [peerSettings](/constructor/peerSettings.md).`need_contacts_exception` flag may also be set: if so, the `add_phone_privacy_exception` flag **must** be set if the user clicks on the add contact button, invoking [contacts.addContact](/method/contacts.addContact.md).  

### Share phone number

    ---functions---

    contacts.acceptContact#f831a20f id:InputUser = Updates;

This action bar, associated to a private or secret chat, offers the user a button to share their phone number with the other user using [contacts.acceptContact](/method/contacts.acceptContact.md).  

**Condition**: the [peerSettings](/constructor/peerSettings.md).`share_contact` flag must be set.

This flag is set and the bar is activated only if the other user has added us as a contact using [contacts.addContact](/method/contacts.addContact.md), without using a phone number, and none of the `add_contact`, `report_spam`, `block_contact` flags are set.

### Report irrelevant geolocation

    inputReportReasonGeoIrrelevant#dbd4feed = ReportReason;

    ---functions---

    account.reportPeer#c5ba3d86 peer:InputPeer reason:ReportReason message:string = Bool;

This bar indicates that the associated location-based supergroup can be reported for having an unrelated location using a bar button that invokes [account.reportPeer](/method/account.reportPeer.md) with `reason` [inputReportReasonGeoIrrelevant](/constructor/inputReportReasonGeoIrrelevant.md).  

**Condition**: the [peerSettings](/constructor/peerSettings.md).`report_geo` flag must be set.

### Invite new members

    ---functions---
    
    messages.addChatUser#cbc6d107 chat_id:long user_id:InputUser fwd_limit:int = messages.InvitedUsers;

    channels.inviteToChannel#c9e33d54 channel:InputChannel users:Vector<InputUser> = messages.InvitedUsers;
    
This bar indicates that the associated group was created recently, and it offers a bar button to invite new members using [messages.addChatUser](/method/messages.addChatUser.md) or [channels.inviteToChannel](/method/channels.inviteToChannel.md), depending on whether the associated peer is a [group or a supergroup](/api/channel.md).

**Condition**: the [peerSettings](/constructor/peerSettings.md).`invite_members` flag must be set.

### An admin from a recent join request is contacting you

This bar indicates that the associated private or secret chat is a chat with an administrator of a [group or channel](/api/channel.md) to which the user sent a [join request, see here for more info on join requests&nbsp;&raquo;](/api/invites.md#join-requests).  

**Condition**: the `request_chat_title` and `request_chat_date` fields of [peerSettings](/constructor/peerSettings.md) must both be set; optionally `request_chat_broadcast` may also be set:

* `request_chat_title` - Contains the group/channel's title.
* `request_chat_date` - Contains the timestamp indicating when the join request was sent.
* `request_chat_broadcast` - This flag is set if the join request is related to a channel (otherwise, the join request is related to a group).

### Manage a connected business bot

This bar indicates that the associated private (non-secret) chat *with another user* is currently being managed by a [business bot connected to our current account&nbsp;&raquo;](/api/bots/connected-business-bots.md).  

**Condition**: the `business_bot_id` and `business_bot_manage_url` fields of [peerSettings](/constructor/peerSettings.md) must both be set; optionally, `business_bot_paused` and/or `business_bot_can_reply` may also be set:

* `business_bot_id` - Contains the ID of the [business bot&nbsp;&raquo;](/api/bots/connected-business-bots.md) managing this chat, used to display info about the bot in the action bar.  
* `business_bot_manage_url` - Contains a [deep link&nbsp;&raquo;](/api/links.md), used to open a management menu in the business bot.  
* `business_bot_paused` - Whether the business bot was paused in this chat using [account.toggleConnectedBotPaused&nbsp;&raquo;](/method/account.toggleConnectedBotPaused.md).  
* `business_bot_can_reply` - Whether the business bot can reply to messages in this chat, as specified by the settings during [initial configuration](/api/bots/connected-business-bots.md).  

The main action button of the action bar should be a Pause/Resume button that invokes [account.toggleConnectedBotPaused&nbsp;&raquo;](/method/account.toggleConnectedBotPaused.md).  

The action bar dropdown menu should contain:

- A button to manage the bot, by opening the deep link in `business_bot_manage_url`
- A button to disconnect the bot from this chat, which when pressed should invoke [account.disablePeerConnectedBot&nbsp;&raquo;](/method/account.toggleConnectedBotPaused.md) to permanently disconnect the bot from this peer (this will also hide the action bar, unsetting the `business_bot_manage_url` and `business_bot_id` fields).  

See [here&nbsp;&raquo;](/api/bots/connected-business-bots.md) for more info on business bots.  

### Bot ads

This bar contains [advertisements](/api/sponsored-messages.md).  

**Condition**: the current chat is a private chat with a bot and [messages.getSponsoredMessages](/method/messages.getSponsoredMessages.md) returned some sponsored messages for this bot.  

See [here &raquo;](/api/sponsored-messages.md#displaying-sponsored-messages) for more info on how to render this action bar.  